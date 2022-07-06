<template>
  <HelloWorld :msg="msg" />
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "vue";
import { invoke } from "@tauri-apps/api";

const msg = ref("");

(async () => {
  const response: string = await invoke("get_player_name");

  msg.value = response;
})();
</script>
