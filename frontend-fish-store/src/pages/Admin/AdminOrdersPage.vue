<script lang="ts" setup>
import { useOrdersStore } from 'src/stores/orders';
import { computed } from 'vue';
import { TableOrdersAdmin } from 'src/components/tables';

const ordersStore = useOrdersStore();
const loading = computed(() => ordersStore.loading);
</script>

<template>
  <q-page
    class="tw-max-w-screen-xl tw-mx-auto tw-px-2 sm:tw-px-3 tw-pb-[200px]"
  >
    <section class="tw-pt-4 md:tw-pt-8">
      <h1 class="tw-text-[20px] md:tw-text-[32px] tw-font-anton">
        Orders Overview
      </h1>
      <p class="tw-pt-3 md:tw-text-[18px] tw-leading-normal">
        View, approve, and update the status of customer orders in one place.
        Keep track of pending, completed, and canceled orders effortlessly.
      </p>
    </section>

    <section class="tw-mt-8">
      <q-inner-loading
        :showing="loading"
        label="Please wait..."
        color="primary"
        label-class="tw-text-primary"
        label-style="font-size: 1.1em"
        class="tw-pt-5"
      />

      <table-orders-admin class="tw-min-h-[300px]" v-if="!loading" />
    </section>

    <q-separator class="tw-my-6" />
    <section class="md:tw-text-[16px]">
      <p class="tw-mb-2">
        If users are unregistered, they will be displayed as 'Unknown.'
      </p>
      <p class="md:tw-leading-relaxed">
        Setting an order status to 'Received' or 'Cancelled' is a permanent
        action and cannot be undone. This is to ensure the integrity of the
        order history and prevent inconsistencies in your records. Please
        double-check before making these changes.
      </p>
    </section>
  </q-page>
</template>
