<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "vue"
import { invoke } from '@tauri-apps/api'

const msg = ref("nu mai esti undefined bro")
invoke('get_player_name')
  .then((response) => msg.value = response as string)
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld :msg="msg" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
