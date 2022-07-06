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
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-img
              class="col-4"
              src="https://cdn.quasar.dev/img/parallax1.jpg"
            />

            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>

              <tokens-display :value="10" />
            </q-card-section>
          </q-card-section>
        </q-card>

        <p v-for="n in 15" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
          praesentium molestias a adipisci, dolore vitae odit, quidem
          consequatur optio voluptates asperiores pariatur eos numquam rerum
          delectus commodi perferendis voluptate?
        </p>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { invoke } from "@tauri-apps/api";

import TokensDisplay from "@@/tokens-display.vue";

const playerName = ref("");

(async () => {
  const response: string = await invoke("get_player_name");

  playerName.value = response;
})();
</script>
