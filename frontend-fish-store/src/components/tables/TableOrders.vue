<script setup lang="ts">
import { computed, ref } from 'vue';
import { Dialog, Notify, QTableColumn } from 'quasar';

import { Order } from 'src/shared/interface/order';
import { useOrdersStore } from 'src/stores/orders';
import { DialogOrderDetails } from 'src/components/dialogs';
import { BadgeOrderStatus } from 'src/components/badge';
import { OrderStatus } from 'src/shared/enums/order';

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
    name: 'address',
    required: true,
    label: 'Shipping Address',
    align: 'left',
    field: (row: Order) =>
      row.shipping_address_line1.length > 30
        ? row.shipping_address_line1.slice(0, 30) + '...'
        : row.shipping_address_line1,
    format: (val: string) => `${val}`,
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
  }).onOk(() => {
    if (process.env.RISTRICTED_APP_ENABLED) {
      Notify.create({
        message: process.env.RISTRICTED_NOTIFY_MESSAGE,
        timeout: 8000,
        color: 'negative',
      });
      return;
    }

    console.log('OK', row.id);
  });
}
</script>

<template>
  <dialog-order-details v-model="dialog" :order="selectedOrder" />

  <q-card flat class="tw-border">
    <q-card-section class="tw-p-0 tw-py-4">
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
  </q-card>
</template>
