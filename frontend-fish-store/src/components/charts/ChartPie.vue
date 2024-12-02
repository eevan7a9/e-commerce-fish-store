<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const google: any;

import { ref, watch } from 'vue';
import { loadGoogleChart } from 'src/shared/composables/useGoogleCharts';

const chartElement = ref('chart');

const emits = defineEmits<{ loaded: [val: boolean] }>();

const props = withDefaults(
  defineProps<{
    options: {
      is3D?: boolean;
      title: string;
      pieSliceText?: string;
      legend?: string | object;
      slices?: object;
      backgroundColor?: string;
    };
    data: Array<[string, number] | [string, string]>;
    labels: string[];
  }>(),
  {}
);

function drawChart() {
  const data = google.visualization.arrayToDataTable([
    props.labels,
    ...props.data,
  ]);
  const chart = new google.visualization.PieChart(chartElement.value);
  chart.draw(data, props.options);
}

watch(chartElement, async () => {
  await loadGoogleChart();
  drawChart();
  emits('loaded', true);
});
</script>

<template>
  <div ref="chartElement" class="tw-h-full tw-w-full"></div>
</template>
