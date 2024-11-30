<script lang="ts" setup>
import { ChartLine } from 'src/components/charts';
import { useOrdersStore } from 'src/stores/orders';
import { computed } from 'vue';

const ordersStore = useOrdersStore();

const loading = computed(() => ordersStore.loading);

const data = computed<Array<(number | string)[]>>(() => [
  ['25-01-01', 0, 0],
  ['24-11-01', 65, 10],
  ['24-11-02', 26, 15],
  ['24-11-03', 55, 5],
  ['24-11-04', 67, 20],
  ['24-11-05', 80, 25],
]);

const labels = computed(() => ['day', 'Orders', 'Cancelled']);
const options = {
  title: 'The Overtime Orders Made',
  curveType: 'function',
  width: '100%',
  height: 600,
  chartArea: {
    left: '5%',
    right: 1,
    top: '10%',
    bottom: '20%',
    width: '90%',
    height: '80%',
  },
  vAxes: {
    // Adds titles to each axis.
    0: { title: 'Orders Made' },
    1: { title: 'Orders Cancelled' },
  },
  vAxis: {
    textStyle: { color: '#FFFFFF' }, // Change vertical axis text color
    titleTextStyle: { color: '#FFFFFF' }, // Change vertical axis title color
    gridlines: { color: '#555555' }, // Change vertical gridlines color
  },
  hAxis: {
    title: 'Day',
    slantedText: true,
    slantedTextAngle: 45,
    textStyle: { color: '#FFFFFF' }, // Change horizontal axis text color
    titleTextStyle: { color: '#FFFFFF' }, // Change horizontal axis title color
    gridlines: { color: '#555555' }, // Change horizontal gridlines color
  },
  series: {
    0: { axis: 'made' }, // Series 1 (Orders Received) uses the 'received' axis
    1: { axis: 'cancelled' }, // Series 0 (Orders Cancelled) uses the 'cancelled' axis
  },
  colors: ['#c971ff', '#FF6347'], // Define colors for each series
  legend: {
    position: 'bottom',
    alignment: 'center',
    textStyle: { color: '#fff' },
  },
  backgroundColor: '#230a43', // Change the background color
  titleTextStyle: {
    color: '#FFFFFF', // Change the title text color
    fontSize: 16,
  },
};
</script>

<template>
  <q-card class="tw-bg-shade tw-text-white" flat bordered>
    <q-card-section class="tw-min-h-[300px] tw-h-full" v-if="loading">
      <q-inner-loading
        :showing="loading"
        label="Please wait..."
        color="accent"
        label-class="tw-text-accent"
        label-style="font-size: 1.1em"
        class="tw-pt-5"
      />
    </q-card-section>

    <q-card-section
      class="tw-overflow-x-auto tw-relative"
      :class="loading ? 'tw-opacity-0 tw-h-0' : ''"
    >
      <chart-line
        class="tw-w-full"
        :data="data"
        :labels="labels"
        :options="options"
      />

      <div
        class="tw-absolute tw-top-8 tw-right-12 tw-text-white md:tw-text-[18px]"
        v-if="$q.screen.gt.sm"
      >
        Last Updated: {{ new Date('11/22/2024').toDateString() }}
      </div>
    </q-card-section>
  </q-card>
</template>
