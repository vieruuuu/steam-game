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
            let handle = app.app_handle();

            let splashscreen_window = handle.get_window("splashscreen").unwrap();
            let main_window = handle.get_window("main").unwrap();

            tauri::async_runtime::spawn(async move {
                std::thread::sleep(Duration::from_secs(5));

                handle
                    .emit_to("splashscreen", "initialization", "Initializing Steam")
                    .unwrap();

                handle.manage(initialise_steamworks_client());

                handle.state::<SteamworksClient<ClientManager>>();

                handle
                    .emit_to("splashscreen", "initialization", "Initialized Steam")
                    .unwrap();

                std::thread::sleep(Duration::from_secs(100000));

                main_window.show().unwrap();
                splashscreen_window.close().unwrap();
            });

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
