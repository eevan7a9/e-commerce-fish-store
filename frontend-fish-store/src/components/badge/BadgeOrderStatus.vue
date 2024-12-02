<script setup lang="ts">
import { OrderStatus } from 'src/shared/enums/order';
import { computed } from 'vue';

defineOptions({
  name: 'BadgeOrderStatus',
});

const props = defineProps<{ status: string }>();
const color = computed(() => {
  switch (props.status) {
    case OrderStatus.Approved:
      return 'info';

    case OrderStatus.Received:
      return 'positive';

    case OrderStatus.Approved:
      return 'info';

    case OrderStatus.Cancelled:
      return 'negative';

    case OrderStatus.Shipped:
      return 'warning';

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
