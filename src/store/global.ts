import { defineRefStore } from "./lib/defineRefStore.js";

import { Screen } from "quasar";

export const useGlobalStore = defineRefStore("global", () => {
  const isMobile = computed(() => Boolean(Screen.lt.sm));

  const intervals = ref<{ [name: string]: number }>({});

  function createInterval(name: string, callback: () => void, ms: number) {
    if (!intervals.value[name]) {
      intervals.value[name] = setInterval(callback, ms) as unknown as number;
    }
  }

  function stopInterval(name: string) {
    if (intervals.value[name]) {
      clearInterval(intervals.value[name]);

      delete intervals.value[name];
    }
  }

  return {
    isMobile,
    createInterval,
    stopInterval,
  };
});
