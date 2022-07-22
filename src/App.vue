<template>
  <router-view />
</template>

<script setup lang="ts">
import { appWindow } from "@tauri-apps/api/window";

onMounted(async () => {
  await appWindow.emit("app-mounted");
});
</script>
