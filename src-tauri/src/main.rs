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

use steamworks::{Client as SteamworksClient, ClientManager};
use tauri::State;

#[tauri::command]
fn get_player_name(client: State<'_, SteamworksClient<ClientManager>>) -> String {
    client.networking_utils();

    println!("hello {}", client.friends().name());

    client.friends().name()
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .manage(SteamworksClient::init_app(480).unwrap().0)
        .invoke_handler(tauri::generate_handler![get_player_name])
        .menu(if cfg!(target_os = "macos") {
            tauri::Menu::os_default(&context.package_info().name)
        } else {
            tauri::Menu::default()
        })
        .run(context)
        .expect("error while running tauri application");
}
