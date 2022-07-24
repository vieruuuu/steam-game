import { Howl } from "howler";

import { defineRefStore } from "./lib/defineRefStore.js";

// import { invoke } from "@tauri-apps/api";

type InventoryItem = { name: string };

const coinSound = new Howl({
  src: [getAsset("sounds/coin.mp3")],
});

export const useSteamStore = defineRefStore("steam", () => {
  const { createInterval, stopInterval } = useGlobalStore();

  const fastTokens = ref(0);
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

  function addTokensUpdater() {
    createInterval(
      "fastTokens",
      () => {
        if (++fastTokens.value === 60) {
          fastTokens.value = 0;
          currentTokens.value = currentTokens.value + 60;
          coinSound.play();
        }
      },
      1000
    );
  }

  function removeTokensUpdater() {
    stopInterval("currentTokens");
  }

  return {
    fastTokens,
    currentTokens,
    inventoryItems,
    addTokensUpdater,
    removeTokensUpdater,
  };
});
