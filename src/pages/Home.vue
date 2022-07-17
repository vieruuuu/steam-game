<template>
  <p>Items in Inventory:</p>

  <router-link to="/error">test</router-link>

  <div class="q-gutter-md row flex-center">
    <q-card
      v-for="item in inventoryItems"
      :key="item.name"
      flat
      bordered
      style="width: 200px"
    >
      <q-card-section>
        <q-img src="https://cdn.quasar.dev/img/parallax1.jpg" />

        <q-card-section>
          <div class="text-h6">{{ item.name }}</div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
const { inventoryItems } = useSteamStore();
</script>
