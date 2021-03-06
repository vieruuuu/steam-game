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
use tauri::{async_runtime::spawn, AppHandle, Manager, State, Window};
use tokio::sync::oneshot;

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

            spawn(async move {
                let splashscreen_window_ = splashscreen_window.clone();

                splashscreen_window.once("splashscreen_loaded", move |_| {
                    spawn(splashscreen_loaded(handle, splashscreen_window_));
                });
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

async fn splashscreen_loaded<R: tauri::Runtime>(handle: AppHandle<R>, splashscreen_window: Window) {
    let (tx, rx) = tokio::sync::oneshot::channel::<()>();

    initialise_steamworks_client(handle.clone(), tx);

    let _ = rx.await;

    handle
        .emit_to("splashscreen", "initialization", "Initializing App...")
        .unwrap();

    let main_window =
        tauri::WindowBuilder::new(&handle, "main", tauri::WindowUrl::App("index.html".into()))
            .title("Steam Game")
            .visible(false)
            .min_inner_size(800., 600.)
            .inner_size(800., 600.)
            .build()
            .expect("failed to build window");

    let main_window_ = main_window.clone();

    main_window.once("app_loaded", move |_| {
        main_window_.show().unwrap();
        splashscreen_window.close().unwrap();
    });
}

fn initialise_steamworks_client<R: tauri::Runtime>(handle: AppHandle<R>, tx: oneshot::Sender<()>) {
    std::thread::spawn(move || loop {
        handle
            .emit_to("splashscreen", "initialization", "Initializing Steam...")
            .unwrap();

        let steamworks = SteamworksClient::init_app(480);

        match steamworks {
            Ok(client) => {
                handle.manage(client.0);

                handle
                    .emit_to("splashscreen", "initialization", "Initialized Steam!")
                    .unwrap();

                let _ = tx.send(());

                break;
            }
            Err(why) => println!("Failed to init steamworks, will try again...\n\tError: {why}"),
        }

        std::thread::sleep(Duration::from_secs(1));
    });
}
