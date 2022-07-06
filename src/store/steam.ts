import { defineRefStore } from "./lib/defineRefStore.js";

export const useSteamStore = defineRefStore("steam", () => {
  const currentTokens = ref(0);

  return {
    currentTokens,
  };
});
