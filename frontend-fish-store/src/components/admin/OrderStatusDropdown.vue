<script lang="ts" setup>
import { Order } from 'src/shared/interface/order';
import { OrderStatus } from 'src/shared/enums/order';
import { computed } from 'vue';
import { Dialog, Loading, Notify } from 'quasar';
import { useOrdersStore } from 'src/stores/orders';
import { useAuthStore } from 'src/stores/auth';

interface Action {
  label: string;
  value: OrderStatus;
  icon: string;
  caption: string;
  color: string;
}

defineOptions({
  name: 'OrderStatusDropdown',
});

const auth = useAuthStore();
const ordersStore = useOrdersStore();

const props = defineProps<{ order: Order; iconOnly?: boolean }>();

const emits = defineEmits<{ updateSuccess: [val: OrderStatus] }>();

const disableAction = computed(
  () =>
    props.order.status === OrderStatus.Cancelled ||
    props.order.status === OrderStatus.Received
);

const color = computed(() => {
  switch (props.order.status) {
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
      return 'grey-7';
  }
});

const icon = computed(
  () => actions.find((item) => item.value === props.order.status)?.icon
);

const actions: Action[] = [
  {
    label: 'Pending',
    value: OrderStatus.Pending,
    icon: 'mdi-help-circle',
    caption: 'Awaiting Approval',
    color: 'primary',
  },
  {
    label: 'Approved',
    value: OrderStatus.Approved,
    icon: 'mdi-thumb-up',
    caption: 'Ready for Processing',
    color: 'info',
  },
  {
    label: 'Shipped',
    value: OrderStatus.Shipped,
    icon: 'mdi-truck-delivery',
    caption: 'Out for Delivery',
    color: 'warning',
  },
  {
    label: 'Delivered',
    value: OrderStatus.Received,
    icon: 'mdi-emoticon',
    caption: 'Received by Customer',
    color: 'positive',
  },
  {
    label: 'Cancelled',
    value: OrderStatus.Cancelled,
    icon: 'mdi-cancel',
    caption: 'Transaction Void',
    color: 'negative',
  },
];

function orderAction(action: Action) {
  if (disableAction.value) {
    return;
  }

  Dialog.create({
    title: `Change Status to "${action.label}"`,
    message: `Are you sure you want to set this Order as "${action.label}"? ${
      action.value === OrderStatus.Cancelled ||
      action.value === OrderStatus.Received
        ? 'This action cannot be undone.'
        : ''
    }`,

    ok: {
      label: 'Confirm',
      unelevated: true,
      color: action.value === OrderStatus.Cancelled ? 'negative' : 'positive',
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
      auth.userToken
    );

    Loading.hide();

    Notify.create({
      color: res?.success ? 'positive' : 'negative',
      message: res?.message || 'Order status has been updated',
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
    :label="props.iconOnly ? '' : props.order.status"
    :cover="$q.screen.lt.md"
    :dropdown-icon="disableAction ? '_' : 'mdi-menu-down'"
    :disable-dropdown="disableAction"
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
            <q-item-label>{{ action.label }}</q-item-label>
            <q-item-label caption>{{ action.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-btn-dropdown>
</template>
