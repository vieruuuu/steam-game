import "./css/app.scss";

import { listen } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";

async function main() {
  const app = document.getElementById("app");

  if (!app) {
    return;
  }

  await listen<string>("initialization", (event) => {
    app.innerHTML = app.innerHTML + `<h1>${event.payload}</h1> <br>`;
  });

  await appWindow.emit("splashscreen_loaded");
}

document.addEventListener("DOMContentLoaded", main);
