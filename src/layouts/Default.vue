<template>
  <q-layout view="lHh lpr lFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>{{ playerName }}</q-toolbar-title>

        <q-space />

        <div class="row flex-center text-subtitle1 text-weight-bold text-green">
          <span class="q-mr-xs">{{ currentTokens }}</span>
          <span class="text-yellow-10">+{{ fastTokens }}</span>

          <q-icon size="sm" rounded name="paid" class="q-ml-xs" />

          <q-tooltip class="text-caption">
            Each minute you gain 60 Tokens!
          </q-tooltip>
        </div>
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

const { currentTokens, fastTokens, addTokensUpdater, removeTokensUpdater } =
  useSteamStore();

const playerName = ref("");

addTokensUpdater();

onUnmounted(() => {
  removeTokensUpdater();
});

(async () => {
  const response = await invoke<string>("get_player_name");

  playerName.value = response;
})();
</script>
