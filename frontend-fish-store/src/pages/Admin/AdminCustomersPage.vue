<script lang="ts" setup>
import { TableOrdersCustomers, TableUsers } from 'src/components/tables';

defineOptions({
  name: 'AdminCustomersPage',
});
</script>

<template>
  <q-page
    class="tw-max-w-screen-xl tw-mx-auto tw-px-2 sm:tw-px-3 tw-pb-[200px]"
  >
    <section class="tw-pt-4 md:tw-pt-8">
      <h1 class="tw-text-[20px] md:tw-text-[32px] tw-font-anton">
        Users Overview
      </h1>
      <p class="tw-pt-3 md:tw-text-[18px] tw-leading-normal">
        View and manage all registered users in your system. Access detailed
        profiles, track user orders.
      </p>
    </section>

    <section class="tw-mt-3 md:tw-mt-8">
      <table-users />
    </section>

    <q-separator class="tw-my-12" />

    <section class="tw-pt-4 md:tw-pt-8">
      <h1 class="tw-text-[18px] md:tw-text-[26px] tw-font-anton">
        All Customers Who Purchased
      </h1>
      <p class="tw-pt-3 md:tw-text-[18px] tw-leading-normal">
        View and manage all customers in your store, both registered and
        unregistered who have made a purchase in your store. Access detailed
        information.
      </p>
    </section>

    <section class="tw-mt-3 md:tw-mt-8">
      <table-orders-customers />
    </section>
  </q-page>
</template>
