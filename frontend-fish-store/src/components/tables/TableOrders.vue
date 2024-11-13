<script setup lang="ts">
import { computed, ref } from 'vue';
import { Dialog, Notify, QTableColumn } from 'quasar';

import { Order, OrderItem } from 'src/shared/interface/order';
import { useOrdersStore } from 'src/stores/orders';
import { DialogOrderDetails } from 'src/components/dialogs';
import { BadgeOrderStatus } from 'src/components/badge';
import { OrderStatus } from 'src/shared/enums/order';
import { useAuthStore } from 'src/stores/auth';

defineOptions({
  name: 'TableOrders',
});

const columns: QTableColumn[] = [
  {
    name: 'id',
    required: true,
    label: 'Order Id',
    align: 'left',
    field: (row: Order) => row.id,
    format: (val: string) => `${val}`,
  },
  {
    name: 'total_amount',
    required: true,
    label: 'Total Amount',
    align: 'left',
    field: (row: Order) => row.total_amount,
    format: (val: string) => `₱${val}`,
  },
  {
    name: 'total_weight',
    required: true,
    label: 'Total Weight',
    align: 'left',
    field: (row: Order) => row.total_weight,
    format: (val: string) => `${val} lb`,
  },
  {
    name: 'status',
    required: true,
    label: 'Order Status',
    align: 'left',
    field: 'status',
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: 'created_at',
    required: true,
    label: 'Created Date',
    align: 'left',
    field: (row: Order) => new Date(row.created_at || '').toDateString(),
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: 'action',
    label: 'Action',
    align: 'left',
    field: '',
  },
];

const ordersStore = useOrdersStore();
const auth = useAuthStore();

const dialog = ref(false);
const selectedOrder = ref<Order>();

const orders = computed(() => ordersStore.list);

function rowClicked(e: Event, row: Order) {
  selectedOrder.value = row;
  if (selectedOrder.value) {
    dialog.value = true;
  }
}

function cancelOrder(row: Order) {
  Dialog.create({
    title: 'Cancel Order',
    message:
      'Are you sure you want to cancel this order? This action cannot be undone.',
    ok: {
      label: 'Cancel Order',
      color: 'negative',
    },
    cancel: {
      label: 'Keep Order',
    },
  }).onOk(async () => {
    if (process.env.ENABLE_STATIC_MODE === 'true') {
      Notify.create({
        message: process.env.RISTRICTED_NOTIFY_MESSAGE,
        timeout: 8000,
        color: 'negative',
      });
      return;
    }
    const res = await ordersStore.cancelOrder(row.id, auth.userToken);

    Notify.create({
      color: res?.success ? 'positive' : 'negative',
      message: res?.message || 'Order has been canceled',
      timeout: 6000,
    });

    console.log(res?.message);
  });
}

function viewOrderItems(items: OrderItem[]) {
  console.log('items', items);
  if (process.env.TEST_MODE) {
    Notify.create({
      message: process.env.RISTRICTED_NOTIFY_MESSAGE,
      timeout: 8000,
      color: 'negative',
    });
    return;
  }
}
</script>

<template>
  <dialog-order-details
    @cancel="cancelOrder"
    @view-items="viewOrderItems"
    v-model="dialog"
    :order="selectedOrder"
  />

  <q-card flat class="tw-border">
    <q-card-section class="tw-p-0 tw-py-4" v-if="orders.length">
      <q-responsive :ratio="$q.screen.gt.sm ? 16 / 9 : 9 / 16">
        <q-table
          class="my-sticky-header-table"
          flat
          :rows="orders"
          :columns="columns"
          row-key="name"
          @row-click="rowClicked"
        >
          <template v-slot:top>
            <h1 class="tw-text-[24px] tw-font-anton">Orders List</h1>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <div>
                <badge-order-status :status="props.value" />
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-action="props">
            <q-td @click.stop :props="props">
              <q-btn
                @click.stop="cancelOrder(props.row)"
                unelevated
                color="negative"
                dense
                padding="4px 8px"
                v-if="
                  props.row.status !== OrderStatus.Cancelled &&
                  props.row.status !== OrderStatus.Received
                "
              >
                <q-icon name="mdi-cancel" size="16px"></q-icon>
                <span class="tw-capitalize tw-ml-1 gt-sm">Cancel</span>
              </q-btn>

              <span v-else>---</span>
            </q-td>
          </template>
        </q-table>
      </q-responsive>
    </q-card-section>

    <q-card-section class="tw-flex tw-flex-col tw-items-center tw-py-12" v-else>
      <h1
        class="tw-text-[16px] sm:tw-text-[20px] tw-leading-relaxed tw-font-normal tw-mb-8"
      >
        {{ $t('orders.emptyTable') }}
      </h1>

      <q-img
        src="~assets/image-svg/empty-box.svg"
        class="tw-my-[24px] tw-max-w-[300px] animate-float"
        width="100%"
        height="100%"
      />
      <div>
        <q-btn
          :label="$t('orders.startShopping')"
          padding="8px 32px"
          unelevated
          to="/products"
          color="primary"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
