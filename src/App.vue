<template>
  <router-view />
</template>

<script setup lang="ts">
import { getAll } from "@tauri-apps/api/window";

onMounted(() => {
  const windows = getAll();

  const mainWindow = windows.find((window) => window.label === "main");
  const splashWindow = windows.find(
    (window) => window.label === "splashscreen"
  );

  setTimeout(() => {
    splashWindow?.close();
    mainWindow?.show();
  }, 500);
});
</script>
