<script setup lang="ts">
import { QTableColumn, useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { User } from 'src/shared/interface/user';
import { Order } from '@stripe/stripe-js';
import { useUsersStore } from 'src/stores/users';
import { DialogUserDetails, DialogUserOrders } from 'src/components/dialogs';

defineOptions({
  name: 'TableUsers',
});

const $q = useQuasar();

const props = withDefaults(defineProps<{ tableClassWrapper?: string }>(), {
  tableClassWrapper: 'tw-h-screen tw-max-h-[70dvh]',
});

const columns: QTableColumn[] = [
  {
    name: 'id',
    label: 'User ID',
    align: 'center',
    classes:
      'tw-max-w-[80px] lg:tw-max-w-[200px] ellipsis tw-underline tw-text-accent tw-font-semibold',
    field: 'id',
    format: (val: string) => val,
  },
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
    format: (val: Order[]) => `${val}`,
  },
  {
    name: 'created_at',
    required: true,
    label: 'Registered Date',
    align: 'left',
    field: (row: User) => new Date(row.created_at || '').toDateString(),
    format: (val: string) => `${val}`,
    sortable: true,
  },
];

const usersStore = useUsersStore();

const filter = ref('');

const dialogOrders = ref<boolean>(false);
const dialog = ref<boolean>(false);
const selectedUser = ref<User>();

const loading = computed(() => usersStore.loading);
const users = computed(() => usersStore.list);

const visibleColumns = computed(() =>
  $q.screen.gt.sm
    ? [
        'id',
        'name',
        'email',
        'phone',
        'address',
        'address',
        'has_stripe',
        'orders_made',
        'created_at',
      ]
    : ['id', 'name', 'email', 'orders']
);

function rowClicked(e: Event, row: User) {
  selectedUser.value = row;
  dialog.value = !dialog.value;
}
</script>

<template>
  <q-card flat class="tw-border">
    <template v-if="selectedUser">
      <dialog-user-details
        v-model="dialog"
        :user="selectedUser"
        @view-orders="dialogOrders = true"
      />
      <dialog-user-orders v-model="dialogOrders" :user="selectedUser" />
    </template>

    <q-card-section
      class="tw-bg-primary tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-gap-3 tw-justify-between"
    >
      <h1 class="tw-text-[24px] tw-font-anton tw-text-white">
        Registered Users
      </h1>

      <div class="tw-flex tw-items-center tw-gap-3">
        <q-icon name="mdi-account-group" size="32px" color="white" />
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
          :rows="users"
          :columns="columns"
          :loading="loading"
          :filter="filter"
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

          <template v-slot:body-cell-orders="props">
            <q-td>
              <div class="tw-text-center">
                {{ props.value }}
              </div>
            </q-td>
          </template>
        </q-table>
      </q-responsive>
    </q-card-section>
  </q-card>
</template>
