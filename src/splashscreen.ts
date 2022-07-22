import "./css/app.scss";
import "./css/roboto.scss";

import { tsParticles } from "tsparticles-engine";
import { loadFirePreset } from "tsparticles-preset-fire";

import { listen } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";

async function main() {
  const message = document.getElementById("message");

  if (!message) {
    return;
  }

  await listen<string>("initialization", (event) => {
    message.innerText = event.payload;
  });

  await appWindow.emit("splashscreen_loaded");

  await loadFirePreset(tsParticles);

  await tsParticles.load("app", {
    preset: "fire",
  });
}

document.addEventListener("DOMContentLoaded", main);
