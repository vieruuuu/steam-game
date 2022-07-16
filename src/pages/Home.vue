<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-img class="col-4" src="https://cdn.quasar.dev/img/parallax1.jpg" />

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>

        <tokens-display :value="10" />
      </q-card-section>
    </q-card-section>
  </q-card>

  <p v-for="n in 15" :key="n">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
    praesentium molestias a adipisci, dolore vitae odit, quidem consequatur
    optio voluptates asperiores pariatur eos numquam rerum delectus commodi
    perferendis voluptate?
  </p>
</template>

<script setup lang="ts">
import TokensDisplay from "@@/tokens-display.vue";
</script>
