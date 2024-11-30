<script lang="ts" setup>
import { ChartPie } from 'src/components/charts';
import { useOrdersStore } from 'src/stores/orders';
import { computed } from 'vue';

defineOptions({
  name: 'OrderStatusChart',
});

const ordersStore = useOrdersStore();

const loading = computed(() => ordersStore.loading);
const data = computed<Array<[string, number]>>(() => [
  ['Cancelled', 10],
  ['Received', 60],
  ['Pending', 20],
  ['Shipped', 10],
]);

const options = computed(() => ({
  is3D: true,
  title: 'Order Status',
  legend: {
    position: 'top',
    textStyle: { color: '#FFFFFF', fontSize: 14 },
  },
  slices: {
    0: { color: '#FF6347' }, // (Cancelled)
    1: { color: '#32CD32' }, // (Received)
    2: { color: '#4682B4', offset: 0.2 }, // (Pending, offset for emphasis)
    3: { color: '#FFD700' }, // (Shipped)
  },
  backgroundColor: '#230a43',
  titleTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  pieSliceTextStyle: {
    color: '#FFFFFF',
  },
}));
</script>

<template>
  <q-card class="tw-bg-shade" flat bordered>
    <q-toolbar class="tw-bg-primary tw-text-white">
      <q-toolbar-title class="tw-text-white"> Order Status </q-toolbar-title>
      <q-icon name="mdi-chart-pie" size="32px" />
    </q-toolbar>

    <q-card-section class="tw-h-full tw-p-0 tw-min-h-[400px] tw-relative">
      <q-inner-loading
        :showing="loading"
        label="Please wait..."
        color="accent"
        label-class="tw-text-accent"
        label-style="font-size: 1.1em"
        class="tw-pt-5 tw-z-10"
      />

      <chart-pie
        class="tw-flex tw-justify-center"
        :class="{ 'tw-opacity-0': loading }"
        :options="options"
        :data="data"
        :labels="['Order Status', 'Numbers']"
      />
      <div
        class="tw-absolute tw-bottom-[80px] tw-left-12 tw-text-white md:tw-text-[18px]"
      >
        Last Updated: {{ new Date('11/22/2024').toDateString() }}
      </div>
    </q-card-section>
  </q-card>
</template>
