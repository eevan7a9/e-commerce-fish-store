<script setup lang="ts">
import { QTableColumn, useQuasar } from 'quasar';
import { OrderCustomer } from 'src/shared/interface/order';
import { computed, ref } from 'vue';
import { useOrdersStore } from 'src/stores/orders';
import { DialogCustomerDetails } from 'src/components/dialogs';
import {
  mockRequest,
  generateMockOrdersCustomers,
} from 'src/shared/utils/mock';
import { useAuthStore } from 'src/stores/auth';

defineOptions({
  name: 'TableOrdersCustomers',
});

const $q = useQuasar();
const props = withDefaults(
  defineProps<{
    tableClassWrapper?: string;
    title?: string;
  }>(),
  { tableClassWrapper: 'tw-h-screen tw-max-h-[500px]' }
);

const columns: QTableColumn[] = [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    classes: 'tw-max-w-[100px] lg:tw-max-w-[200px] ellipsis',
    field: 'name',
    format: (val: string) => val,
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: 'email',
    classes: 'tw-max-w-[100px] lg:tw-max-w-[200px] ellipsis',
    format: (val: string) => val,
  },
  {
    name: 'phone',
    label: 'Phone Number',
    align: 'left',
    field: 'phone',
    classes: 'tw-max-w-[100px] lg:tw-max-w-[150px] ellipsis',
    format: (val: string) => val,
  },
  {
    name: 'address',
    label: 'Shipping Address',
    align: 'left',
    field: 'address',
    classes: 'tw-max-w-[100px] lg:tw-max-w-[200px] ellipsis tw-capitalize',
    format: (val: string) => val,
  },
  {
    name: 'has_stripe',
    label: 'Card Payment',
    align: 'center',
    field: 'has_stripe',
    format: (val: string) => val,
  },
  {
    name: 'orders_made',
    label: 'Number of Orders',
    align: 'center',
    field: 'orders_made',
    format: (val: string) => val,
  },
  {
    name: 'user_id',
    label: 'Registered',
    align: 'left',
    field: 'user_id',
    format: (val: string) => val,
  },
];

const auth = useAuthStore();
const ordersStore = useOrdersStore();

const filter = ref('');

const dialog = ref<boolean>(false);
const selectCustomer = ref<OrderCustomer>();

const customers = computed(() => ordersStore.listCustomers);

const customersLoaded = ref(false);
const customersLoading = ref(false);

const visibleColumns = computed(() =>
  $q.screen.gt.sm
    ? [
        'name',
        'email',
        'phone',
        'address',
        'address',
        'has_stripe',
        'orders_made',
        'user_id',
      ]
    : ['name', 'email', 'orders_made']
);

function rowClicked(e: Event, row: OrderCustomer) {
  selectCustomer.value = row;
  dialog.value = !dialog.value;
  console.log(e, row);
}

async function loadCustomers() {
  customersLoading.value = true;
  if (process.env.ENABLE_STATIC_MODE === 'true') {
    await mockRequest(generateMockOrdersCustomers(32), {}, (res) =>
      ordersStore.setCustomers(res)
    );
  } else {
    await ordersStore.fetchCustomers(auth.userToken);
  }
  customersLoading.value = false;
  customersLoaded.value = true;
}
</script>

<template>
  <q-card flat class="tw-border tw-relative">
    <div
      class="tw-absolute tw-z-10 tw-w-full tw-h-full tw-top-0 tw-bg-opacity-25 tw-bg-dark tw-flex tw-justify-center tw-items-center"
      v-if="!customersLoaded"
    >
      <q-btn
        :loading="customersLoading"
        padding="16px 26px"
        push
        glossy
        color="primary"
        @click="loadCustomers"
      >
        <q-icon name="mdi-reload" class="tw-mr-2" />
        Load All Customers
      </q-btn>
    </div>

    <dialog-customer-details
      v-model="dialog"
      :customer="selectCustomer"
      v-if="selectCustomer"
    />

    <q-card-section
      class="tw-bg-primary tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-gap-3 tw-justify-between"
    >
      <h1 class="tw-text-[24px] tw-font-anton tw-text-white">Customers</h1>

      <div class="tw-flex tw-items-center tw-gap-3">
        <q-icon name="mdi-account-cash" size="32px" color="white" />
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

    <q-card-section class="tw-p-0 tw-py-4">
      <q-responsive :class="props.tableClassWrapper">
        <q-table
          class="my-sticky-header-table"
          flat
          :rows="customers"
          :columns="columns"
          :loading="customersLoading"
          row-key="name"
          :visible-columns="visibleColumns"
          @row-click="rowClicked"
          :rows-per-page-options="[25, 50, 100]"
        >
          <template v-slot:body-cell-email="props">
            <q-td @click.stop>
              <a :href="'mailto:' + props.value" class="tw-underline">
                {{ props.value }}
              </a>
            </q-td>
          </template>

          <template v-slot:body-cell-phone="props">
            <q-td @click.stop>
              <a :href="'tel:' + props.value" class="tw-underline">
                {{ props.value }}
              </a>
            </q-td>
          </template>

          <template v-slot:body-cell-has_stripe="props">
            <q-td>
              <div class="tw-text-center">
                <q-icon
                  :name="
                    props.value
                      ? 'mdi-credit-card-check'
                      : 'mdi-credit-card-remove'
                  "
                  :color="props.value ? 'positive' : 'negative'"
                  size="32px"
                >
                  <q-tooltip class="tw-text-[16px] tw-capitalize">
                    {{ props.value ? 'has card payment' : 'No card payment' }}
                  </q-tooltip>
                </q-icon>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-user_id="props">
            <q-td>
              <div class="tw-text-center">
                <q-icon
                  :name="
                    props.value ? 'mdi-account-check' : 'mdi-account-question'
                  "
                  :color="props.value ? 'positive' : 'negative'"
                  size="32px"
                >
                  <q-tooltip class="tw-text-[16px] tw-capitalize">
                    has card payment
                  </q-tooltip>
                </q-icon>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-responsive>
    </q-card-section>

    <q-card-section
      class="tw-flex tw-flex-col tw-items-center tw-py-12"
      v-if="false"
    >
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
