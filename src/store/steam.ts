import { defineRefStore } from "./lib/defineRefStore.js";

export const useSteamStore = defineRefStore("steam", () => {
  const currentTokens = ref(0);

  const inventoryItems = ref([
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
  ]);

  return {
    currentTokens,
    inventoryItems,
  };
});
