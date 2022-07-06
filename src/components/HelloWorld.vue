<template>
  <h1>{{ msg }}</h1>

  {{ isMobile }}
</template>

<script setup lang="ts">
defineProps<{ msg: string }>();

const { isMobile } = useGlobalStore();
</script>
