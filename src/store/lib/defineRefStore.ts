import {
  defineStore,
  storeToRefs,
  DefineSetupStoreOptions,
  _ExtractStateFromSetupStore,
  _ExtractGettersFromSetupStore,
  _ExtractActionsFromSetupStore,
  StoreGeneric,
  Store,
  PiniaCustomStateProperties,
} from "pinia";

import { ToRefs } from "vue-demi";

export function defineRefStore<Id extends string, SS>(
  id: Id,
  storeSetup: () => SS,
  options?: DefineSetupStoreOptions<
    Id,
    _ExtractStateFromSetupStore<SS>,
    _ExtractGettersFromSetupStore<SS>,
    _ExtractActionsFromSetupStore<SS>
  >
) {
  const piniaStore = defineStore(id, storeSetup, options);

  return () => {
    const usedPiniaStore = piniaStore() as Store<
      Id,
      _ExtractStateFromSetupStore<null>,
      _ExtractGettersFromSetupStore<null>,
      _ExtractActionsFromSetupStore<SS>
    >;

    const storeRefs = storeToRefs(usedPiniaStore as StoreGeneric) as ToRefs<
      _ExtractStateFromSetupStore<SS> &
        _ExtractGettersFromSetupStore<SS> &
        PiniaCustomStateProperties<_ExtractStateFromSetupStore<SS>>
    >;

    return { ...usedPiniaStore, ...storeRefs };
  };
}
