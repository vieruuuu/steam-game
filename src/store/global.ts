import { defineRefStore } from "./lib/defineRefStore.js";

import { Screen } from "quasar";

export const useGlobalStore = defineRefStore("global", () => {
  const isMobile = computed(() => Boolean(Screen.lt.sm));

  return {
    isMobile,
  };
});
