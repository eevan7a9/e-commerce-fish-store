<script lang="ts" setup>
import { Order } from 'src/shared/interface/order';
import { OrderPaymentStatus } from 'src/shared/enums/order';
import { computed } from 'vue';
import { Dialog, Loading, Notify } from 'quasar';
import { useOrdersStore } from 'src/stores/orders';
import { useAuthStore } from 'src/stores/auth';

interface Action {
  value: OrderPaymentStatus;
  icon: string;
  caption: string;
  color: string;
}

defineOptions({
  name: 'OrderPaymentDropdown',
});

const auth = useAuthStore();
const ordersStore = useOrdersStore();

const props = defineProps<{
  order: Order;
  iconOnly?: boolean;
}>();

const emits = defineEmits<{ updateSuccess: [val: OrderPaymentStatus] }>();

const color = computed(() => {
  switch (props.order.payment_status) {
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

const icon = computed(
  () => actions.find((item) => item.value === props.order.payment_status)?.icon
);

const actions: Action[] = [
  {
    value: OrderPaymentStatus.Unpaid,
    icon: 'mdi-cash-remove',
    caption: 'Awaiting Approval',
    color: 'negative',
  },
  {
    value: OrderPaymentStatus.Paid,
    icon: 'mdi-cash-multiple',
    caption: 'Ready for Processing',
    color: 'positive',
  },
  {
    value: OrderPaymentStatus.Refunded,
    icon: 'mdi-cash-refund',
    caption: 'Out for Delivery',
    color: 'info',
  },
];

function orderAction(action: Action) {
  Dialog.create({
    title: `Change Status to "${action.value}"`,
    message: `Are you sure you want to set this Order as "${action.value}"?`,

    ok: {
      label: 'Confirm',
      unelevated: true,
      color:
        action.value === OrderPaymentStatus.Refunded ? 'negative' : 'positive',
    },
    cancel: {
      label: 'cancel',
      color: 'accent',
      outline: true,
    },
  }).onOk(async () => {
    if (process.env.ENABLE_STATIC_MODE === 'true') {
      return Notify.create({
        message: process.env.RISTRICTED_NOTIFY_MESSAGE,
        timeout: 8000,
        color: 'negative',
      });
    }

    Loading.show({
      message: 'Updating order status, please wait...',
      messageColor: 'accent',
      spinnerColor: 'accent',
    });

    const res = await ordersStore.updateOrderStatus(
      props.order.id,
      action.value,
      auth.userToken,
      true
    );

    Loading.hide();

    Notify.create({
      color: res?.success ? 'positive' : 'negative',
      message: res?.message || 'Order payment status has been updated',
      timeout: 6000,
    });
    if (res && res.success) {
      emits('updateSuccess', action.value);
    }
  });
}
</script>

<template>
  <q-btn-dropdown
    unelevated
    dense
    align="between"
    class="tw-capitalize tw-min-w-[85px] sm:tw-min-w-[170px] tw-pl-3"
    toggle-aria-label="status-dropdown-action-admin"
    :color="color"
    :icon="icon"
    :label="props.iconOnly ? '' : props.order.payment_status"
    :cover="$q.screen.lt.md"
  >
    <q-list>
      <template v-for="action of actions" :key="action.value">
        <q-item clickable v-close-popup @click="orderAction(action)">
          <q-item-section avatar>
            <q-avatar
              :icon="action.icon"
              :color="action.color"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="tw-capitalize">
              {{ action.value }}
            </q-item-label>
            <q-item-label caption>{{ action.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-btn-dropdown>
</template>
