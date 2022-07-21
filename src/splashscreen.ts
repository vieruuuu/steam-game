import "./css/app.scss";

import { listen } from "@tauri-apps/api/event";

async function main() {
  console.log("loaded");

  const app = document.getElementById("app");

  if (!app) {
    return;
  }

  listen<string>("initialization", (event) => {
    app.innerHTML = app.innerHTML + `<h1>${event.payload}</h1> <br>`;
  });
}

document.addEventListener("DOMContentLoaded", main);
