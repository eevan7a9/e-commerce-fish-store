<script setup lang="ts">
import { computed, ref } from 'vue';
import { Dialog, Loading, Notify, QTableColumn, useQuasar } from 'quasar';

import { Order } from 'src/shared/interface/order';
import { useOrdersStore } from 'src/stores/orders';
import { DialogOrderDetails } from 'src/components/dialogs';
import { BadgeOrderStatus } from 'src/components/badge';
import { OrderStatus } from 'src/shared/enums/order';
import { useAuthStore } from 'src/stores/auth';

defineOptions({
  name: 'TableOrders',
});

const $q = useQuasar();

const visibleColumns = computed(() =>
  $q.screen.gt.sm
    ? ['id', 'total_amount', 'total_weight', 'status', 'created_at', 'action']
    : ['id', 'total_amount', 'status']
);

const columns: QTableColumn[] = [
  {
    name: 'id',
    label: 'Order Id',
    align: 'center',
    field: (row: Order) => row.id,
    format: (val: string) => `0${val}`,
  },
  {
    name: 'total_amount',
    label: 'Total Amount',
    align: 'left',
    field: (row: Order) => row.total_amount,
    format: (val: string) => `₱${val}`,
  },
  {
    name: 'total_weight',
    label: 'Total Weight',
    align: 'left',
    field: (row: Order) => row.total_weight,
    format: (val: string) => `${val} lb`,
  },
  {
    name: 'status',
    label: 'Order Status',
    align: 'left',
    field: 'status',
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: 'created_at',
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
const filter = ref('');

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
      unelevated: true,
      icon: 'mdi-trash-can',
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
      message: 'Updating Order, please wait...',
      messageColor: 'white',
      spinnerColor: 'white',
    });

    const res = await ordersStore.cancelOrder(row.id, auth.userToken);

    Loading.hide();

    Notify.create({
      color: res?.success ? 'positive' : 'negative',
      message: res?.message || 'Order has been canceled',
      timeout: 6000,
    });
  });
}

function viewOrderItems() {
  console.log('viewOrderItems');
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

  <q-card square flat class="tw-border">
    <q-card-section
      class="tw-bg-primary tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-gap-3 tw-justify-between"
    >
      <h1 class="tw-text-[24px] tw-font-anton tw-text-white">Orders List</h1>

      <div class="tw-flex tw-items-center tw-gap-3">
        <q-icon name="mdi-shopping" size="32px" color="white" />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          class="tw-bg-white tw-px-3 tw-rounded-full"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-section class="tw-p-0" v-if="orders.length">
      <q-responsive :ratio="$q.screen.gt.sm ? 16 / 9 : 9 / 16">
        <q-table
          class="my-sticky-header-table"
          flat
          :visible-columns="visibleColumns"
          :rows="orders"
          :filter="filter"
          :columns="columns"
          row-key="name"
          @row-click="rowClicked"
          :rows-per-page-options="[15, 50, 100]"
        >
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
                glossy
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
