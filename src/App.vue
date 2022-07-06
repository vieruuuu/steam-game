<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>{{ msg }}</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
            praesentium molestias a adipisci, dolore vitae odit, quidem
            consequatur optio voluptates asperiores pariatur eos numquam rerum
            delectus commodi perferendis voluptate?
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { invoke } from "@tauri-apps/api";

const msg = ref("");

(async () => {
  const response: string = await invoke("get_player_name");

  msg.value = response;
})();
</script>
