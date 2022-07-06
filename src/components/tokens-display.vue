<template>
  <div class="row items-center flex-center">
    <div class="text-subtitle1 text-weight-bold text-green">
      {{ tokens }}
    </div>

    <div class="q-ml-xs">
      <q-icon size="sm" rounded name="paid" class="text-green" />
    </div>
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

const { currentTokens } = useSteamStore();

if (!props.value) {
  const intervalId = setInterval(() => currentTokens.value++, 1000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
}
</script>
