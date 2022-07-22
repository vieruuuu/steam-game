<template>
  <q-layout view="lHh lpr lFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>{{ playerName }}</q-toolbar-title>

        <q-space />

        <tokens-display />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { invoke } from "@tauri-apps/api";

import TokensDisplay from "@@/tokens-display.vue";

const playerName = ref("");

(async () => {
  const response = await invoke<string>("get_player_name");

  playerName.value = response;
})();
</script>
