#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![warn(unused_qualifications)]
#![warn(clippy::match_same_arms)]
#![warn(clippy::trivially_copy_pass_by_ref)]
#![warn(clippy::semicolon_if_nothing_returned)]
#![warn(clippy::useless_conversion)]
#![warn(clippy::dbg_macro)]

use std::time::Duration;

use steamworks::{Client as SteamworksClient, ClientManager};
use tauri::{Manager, State};

#[tauri::command]
fn get_player_name(client: State<'_, SteamworksClient<ClientManager>>) -> String {
    client.networking_utils();

    println!("hello {}", client.friends().name());

    client.friends().name()
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();

            app.emit_to("splashscreen", "initialising-steamworks", ())
                .unwrap();
            splashscreen_window.show().unwrap();

            app.manage(initialise_steamworks_client());

            let steamworks = app.state::<SteamworksClient<ClientManager>>();
            app.emit_to(
                "splashscreen",
                "initialised-steam",
                steamworks.friends().name(),
            )
            .unwrap();

            std::thread::sleep(Duration::from_secs(1));

            splashscreen_window.close().unwrap();
            main_window.show().unwrap();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_player_name])
        .menu(if cfg!(target_os = "macos") {
            tauri::Menu::os_default(&context.package_info().name)
        } else {
            tauri::Menu::default()
        })
        .run(context)
        .expect("error while running tauri application");
}

fn initialise_steamworks_client() -> SteamworksClient<ClientManager> {
    loop {
        let steamworks = SteamworksClient::init_app(480);

        match steamworks {
            Ok(client) => return client.0,
            Err(why) => println!("Failed to init steamworks, will try again...\n\tError: {why}"),
        }

        std::thread::sleep(Duration::from_secs(1));
    }
}
