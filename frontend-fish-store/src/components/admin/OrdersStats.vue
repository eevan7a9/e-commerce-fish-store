<script lang="ts" setup>
import { useOrdersStore } from 'src/stores/orders';
import { computed, ref } from 'vue';

defineOptions({
  name: 'OrdersStats',
});

const ordersStore = useOrdersStore();

const dateRange = [
  {
    label: 'Lifetime',
    value: 'lifetime',
  },
  {
    label: 'This Year',
    value: 'year',
  },
  {
    label: 'This Month',
    value: 'month',
  },
  {
    label: 'This Week',
    value: 'week',
  },
];

const summaryOrders = [
  {
    label: 'Pending Orders',
    icon: 'mdi-package',
    value: 15,
    color: 'dark',
  },
  {
    label: 'Approved Orders',
    icon: 'mdi-package-up',
    value: 25,
    color: 'info',
  },
  {
    label: 'Received Orders',
    icon: 'mdi-package-check',
    value: 125,
    color: 'positive',
  },
  {
    label: 'Cancelled Orders',
    icon: 'mdi-package-down',
    value: 23,
    color: 'negative',
  },
];

const selectedRange = ref(dateRange[2]);
const loading = computed(() => ordersStore.loading);
</script>

<template>
  <section>
    <div class="tw-text-[20px] tw-pt-3 tw-pb-5">
      <span class="tw-mr-2">Date Range:</span>

      <q-btn-dropdown
        color="primary"
        push
        no-caps
        icon="mdi-calendar"
        :label="selectedRange.label"
        class="tw-text-[18px]"
      >
        <q-list class="tw-w-[200px]">
          <q-item
            clickable
            v-for="item of dateRange"
            :key="item.value"
            @click="selectedRange = item"
            v-close-popup
          >
            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <div
      class="tw-grid tw-justify-items-center tw-grid-cols-1 sm:tw-grid-cols-2 xl:tw-grid-cols-4 tw-gap-3"
    >
      <q-card
        flat
        bordered
        v-for="(order, i) of summaryOrders"
        :key="i"
        class="tw-min-h-[200px] tw-w-full tw-bg-shade"
      >
        <q-inner-loading
          :showing="loading"
          label="Please wait..."
          color="accent"
          label-class="tw-text-accent"
          label-style="font-size: 1.1em"
          class="tw-pt-5"
        />

        <q-card-section
          class="tw-bg-shade tw-flex tw-justify-center tw-items-center order-summary-container"
          v-if="!loading"
        >
          <div class="tw-relative">
            <div
              class="tw-absolute tw-bottom-0 tw-left-0 tw-z-0 tw-rounded-full tw-bg-white"
            >
              <q-icon
                :name="order.icon"
                :color="order.color"
                :size="$q.screen.gt.lg ? '70px' : '60px'"
              />
            </div>
            <div
              class="tw-bg-white tw-rounded-full tw-w-[150px] tw-h-[150px] tw-flex tw-justify-center tw-items-center"
              :class="`tw-bg-${order.color}`"
            >
              <span
                class="tw-font-bold tw-text-[42px] tw-font-anton"
                :class="`text-${order.color}`"
              >
                {{ order.value }}
              </span>
            </div>
          </div>
        </q-card-section>

        <q-card-section
          class="tw-text-[18px] tw-bg-primary tw-text-white ellipsis tw-text-nowrap"
        >
          {{ order.label }} {{ selectedRange.label }}
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.order-summary-container {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-image: url('/images/fish-bg-category.png');
}
</style>
