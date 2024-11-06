<script setup lang="ts">
import { OrderPaymentStatus } from 'src/shared/enums/order';
import { computed } from 'vue';

defineOptions({
  name: 'BadgePaymentStatus',
});

const props = defineProps<{ status: string }>();
const color = computed(() => {
  switch (props.status) {
    case OrderPaymentStatus.Unpaid:
      return 'negative';

    case OrderPaymentStatus.Paid:
      return 'positive';

    case OrderPaymentStatus.Refunded:
      return 'info';

    default:
      return 'dark';
  }
});
</script>

<template>
  <q-badge :color="color" class="tw-py-1 tw-capitalize">
    {{ props.status }}
  </q-badge>
</template>
