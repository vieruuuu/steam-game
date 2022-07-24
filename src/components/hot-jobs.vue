<template>
  <div>
    <p class="text-body1">
      <q-icon name="local_fire_department" color="red" size="md" />
      Hot Jobs Right Now
    </p>

    <div
      ref="divRef"
      class="q-gutter-x-md q-pb-md"
      style="overflow: auto; white-space: nowrap"
    >
      <q-card
        v-for="(job, i) in sortedJobs"
        :key="i"
        bordered
        flat
        style="width: 200px; display: inline-block; white-space: normal"
        @mousedown="onMouseOver"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
        @mouseup="onMouseLeave"
      >
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />

        <q-card-section>
          <p class="text-h6">{{ job.name }}</p>

          <div>
            <div class="text-subtitle1 row text-blue-grey-7">
              {{ job.interested }}
              <q-icon
                style="cursor: default"
                class="q-ml-xs"
                name="group"
                size="sm"
              />

              <q-tooltip :delay="1000" style="font-size: 12px">
                Interested Buyers
              </q-tooltip>
            </div>
            <div class="text-h6 text-green row">
              {{ job.pay }}
              <q-icon
                style="cursor: default"
                class="q-ml-xs"
                name="paid"
                size="md"
              />

              <q-tooltip :delay="1000" style="font-size: 12px">
                Estimated Market Value
              </q-tooltip>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="row justify-between">
          <q-btn flat rounded color="primary" icon="info" />

          <q-btn outline label="apply" color="primary" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScrollContainer } from "@/lib/useScrollContainer";

const divRef = ref();

const { onMouseLeave, onMouseMove, onMouseOver } = useScrollContainer(divRef);

const random = () => Math.floor(Math.random() * 9000);

const DEMO_JOBS = [
  {
    name: "Engineer",
    interested: random(),
    pay: random(),
  },
  {
    name: "Artist",
    interested: random(),
    pay: random(),
  },
  {
    name: "Builder",
    interested: random(),
    pay: random(),
  },
  {
    name: "Programmer",
    interested: random(),
    pay: random(),
  },
  {
    name: "Butcher",
    interested: random(),
    pay: random(),
  },
  {
    name: "Lumberjack",
    interested: random(),
    pay: random(),
  },
];

const sortedJobs = computed(() => {
  const jobsCopy = [...DEMO_JOBS];

  jobsCopy.sort((a, b) => b.interested - a.interested);

  return jobsCopy;
});
</script>
