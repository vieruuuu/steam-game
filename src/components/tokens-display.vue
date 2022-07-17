<template>
  <div class="row flex-center text-subtitle1 text-weight-bold text-green">
    {{ tokens }}

    <q-icon size="sm" rounded name="paid" class="q-ml-xs" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: number;
}>();

const tokens = computed(() => {
  if (props.value) {
    return props.value;
  }

  return currentTokens.value;
});

const { currentTokens, addTokensUpdater, removeTokensUpdater } =
  useSteamStore();

addTokensUpdater();

onUnmounted(() => {
  removeTokensUpdater();
});
</script>
