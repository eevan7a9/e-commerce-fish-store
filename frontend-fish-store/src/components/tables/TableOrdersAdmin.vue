<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { QTableColumn } from 'quasar/dist/types/api';
import { Order } from 'src/shared/interface/order';
import { useOrdersStore } from 'src/stores/orders';
import { ref, computed } from 'vue';
import {
  OrderStatusDropdown,
  OrderPaymentDropdown,
} from 'src/components/admin';
import { DialogOrderDetails } from 'src/components/dialogs';

defineOptions({
  name: 'TableOrdersAdmin',
});

const $q = useQuasar();

const props = withDefaults(
  defineProps<{
    tableWrapperClass?: string;
    tableClass?: string;
    dark?: boolean;
    tableClassWrapper?: string;
  }>(),
  {
    tableClassWrapper: 'tw-h-screen tw-max-h-[75dvh]',
  }
);

const filter = ref('');

const visibleColumns = computed(() =>
  $q.screen.gt.sm
    ? [
        'id',
        'total_amount',
        'total_weight',
        'payment_status',
        'status',
        'created_at',
        'user_id',
      ]
    : ['id', 'status', 'payment_status']
);

const columns: QTableColumn[] = [
  {
    name: 'id',
    label: 'Order Id',
    align: 'center',
    classes: 'tw-underline text-info',
    field: (row: Order) => row.id,
    format: (val: string) => `0${val}`,
  },
  {
    name: 'total_amount',
    label: 'Price',
    align: 'left',
    field: 'total_amount',
    format: (val: string) => `₱${val}`,
    sortable: true,
  },
  {
    name: 'total_weight',
    label: 'Price',
    align: 'left',
    field: 'total_weight',
    format: (val: string) => `${val} lb`,
    sortable: true,
  },
  {
    name: 'payment_status',
    label: 'Payment',
    align: 'left',
    field: 'payment_status',
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: 'user_id',
    label: 'Customer',
    align: 'left',
    field: 'user_id',
    format: (val: string) => (val ? 'Registered' : ''),
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: 'status',
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: 'created_at',
    label: 'Created Date',
    align: 'left',
    field: (row: Order) => row.created_at, // Keep raw data for consistency
    format: (val) =>
      new Date(val || '').toLocaleTimeString('en', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      }),
    sort: (a, b) => new Date(a || '').getTime() - new Date(b || '').getTime(),
    sortable: true,
  },
];

const ordersStore = useOrdersStore();

const dialogDetails = ref(false);
const selectedOrder = ref<Order>();

const orders = computed(() => ordersStore.list);

function rowClicked(e: Event, row: Order) {
  selectedOrder.value = row;
  if (selectedOrder.value) {
    dialogDetails.value = true;
  }
}
</script>

<template>
  <q-card flat class="tw-border">
    <dialog-order-details
      :order="selectedOrder"
      is-admin
      v-model="dialogDetails"
    />
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
      <q-responsive :class="tableClassWrapper">
        <q-table
          class="my-sticky-header-table"
          :class="props.tableWrapperClass"
          flat
          :dark="props.dark"
          :rows="orders"
          :columns="columns"
          :filter="filter"
          :table-class="props.tableClass"
          @row-click="rowClicked"
          :rows-per-page-options="[25, 50, 100]"
          separator="vertical"
          :visible-columns="visibleColumns"
        >
          <template v-slot:body-cell-payment_status="props">
            <q-td>
              <div>
                <order-payment-dropdown
                  @click.stop
                  :icon-only="$q.screen.lt.sm"
                  :order="props.row"
                />
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-user_id="props">
            <q-td class="tw-flex tw-items-center">
              <q-icon
                color="grey-8"
                :size="$q.screen.gt.md ? '42px' : '32px'"
                name="mdi-account-question"
                v-if="!props.value"
              />

              <q-icon
                name="mdi-account-check"
                color="positive"
                :size="$q.screen.gt.md ? '42px' : '32px'"
                v-else
              />

              <div
                @click.stop
                class="tw-px-2 md:tw-text-[14px] ellipsis tw-max-w-[200px]"
              >
                <a :href="'mailto:' + props.row.email" class="tw-underline">
                  {{ props.row.email }}
                </a>
              </div>
              <q-tooltip
                class="tw-text-[16px]"
                :class="{ ' bg-positive': props.value }"
              >
                {{ props.value ? 'Registered' : 'Unknown' }}
              </q-tooltip>
            </q-td>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td @click.stop :props="props">
              <order-status-dropdown
                :order="props.row"
                :icon-only="$q.screen.lt.sm"
                :flat="$q.screen.lt.sm"
              />
            </q-td>
          </template>
        </q-table>
      </q-responsive>
    </q-card-section>

    <q-card-section class="tw-flex tw-flex-col tw-items-center tw-py-12" v-else>
      <h1
        class="tw-text-[16px] sm:tw-text-[20px] tw-leading-relaxed tw-font-normal tw-mb-8"
      >
        There are currently no orders. New orders will appear here.
      </h1>

      <q-img
        src="~assets/image-svg/empty-box.svg"
        class="tw-my-[24px] tw-max-w-[300px] animate-float"
        width="100%"
        height="100%"
      />
    </q-card-section>
  </q-card>
</template>
