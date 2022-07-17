import { defineRefStore } from "./lib/defineRefStore.js";

// import { invoke } from "@tauri-apps/api";

type InventoryItem = { name: string };

export const useSteamStore = defineRefStore("steam", () => {
  const { createInterval, stopInterval } = useGlobalStore();

  const currentTokens = ref(0);

  const inventoryItems = ref<InventoryItem[]>([
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
  ]);

  // const inventoryItems = computed<InventoryItem[]>(() => {
  //   updateInventory();

  //   return _inventoryItems.value;
  // });

  // async function updateInventory() {
  //   console.log("da");

  //   _inventoryItems.value.push({ name: "test" + _inventoryItems.value.length });
  //   // _inventoryItems.value = await invoke("get_all_items");
  // }

  const addTokensUpdater = () =>
    createInterval(
      "tokens",
      () => {
        currentTokens.value++;
      },
      1000
    );

  const removeTokensUpdater = () => stopInterval("tokens");

  return {
    currentTokens,
    inventoryItems,
    addTokensUpdater,
    removeTokensUpdater,
  };
});
