<script setup lang="ts">
import {
  LatestPendingList,
  OrderStatusChart,
  OrderOvertime,
  OrdersStats,
} from 'src/components/admin';

defineOptions({
  name: 'AdminDashboard',
});
</script>

<template>
  <q-page
    class="tw-max-w-screen-xl tw-mx-auto tw-px-2 sm:tw-px-3 tw-pb-[200px]"
  >
    <section class="tw-pt-4 md:tw-pt-8">
      <h1 class="tw-text-[20px] md:tw-text-[32px] tw-font-anton">
        Store Overview
      </h1>
      <p class="tw-pt-3 md:tw-text-[18px] tw-leading-normal">
        Get a quick overview of your store’s performance, key metrics, and
        recent activity. Monitor sales, track orders, and stay updated in one
        place.
      </p>
    </section>

    <q-separator class="tw-my-6" />

    <!-- ORDERS STATS -->
    <orders-stats />

    <q-separator class="tw-my-5" />

    <!-- ORDERS LINE GRAPH -->
    <section class="tw-mt-3">
      <order-overtime />
    </section>

    <q-separator class="tw-my-5" />

    <section
      class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-min-h-[500px] tw-gap-3"
    >
      <!-- Lists of pending Orders from customers -->
      <latest-pending-list class="tw-w-full" />

      <!-- Chart graph of Recieved, Cancelled, Pending -->
      <order-status-chart class="tw-w-full tw-h-full" />
    </section>
  </q-page>
</template>
