<script lang="ts" setup>
import { ref, watch } from 'vue';
import { loadGoogleChart } from 'src/shared/composables/useGoogleCharts';

defineOptions({
  name: 'ChartLine',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const google: any;

const loaded = ref(false);
const emits = defineEmits<{ loaded: [val: boolean] }>();
const props = defineProps<{
  data: Array<(number | string)[]>;
  labels: string[];
  options: {
    title: string;
    width: number | string;
    height: number | string;
    series: object;
    legend: string | object;
    backgroundColor?: string; // Change the background color
    titleTextStyle: string | object;
    curveType?: string;
    chartArea?: {
      left: string | number;
      right: string | number;
      top: string | number;
      bottom: string | number;
      width: string | number;
      height: string | number;
    };
    vAxes?: object;
    hAxis?: object;
    colors?: string[]; // Define colors for each series
  };
}>();

const chartElement = ref(null);
/**
 * Material line chart has issues, so we switch to classic
 * https://github.com/google/google-visualization-issues/issues/1964
 */
function drawChart() {
  const data = new google.visualization.arrayToDataTable([
    props.labels,
    ...props.data,
  ]);

  var chart = new google.visualization.LineChart(chartElement.value);
  chart.draw(data, props.options);
}

watch(chartElement, async () => {
  await loadGoogleChart();
  drawChart();
  emits('loaded', true);
  loaded.value = true;
});
</script>

<template>
  <div ref="chartElement" class="tw-w-full tw-h-full"></div>
</template>
