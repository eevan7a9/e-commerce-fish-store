<script setup lang="ts">
import { OrderCustomer } from 'src/shared/interface/order';
import { computed } from 'vue';

defineOptions({
  name: 'DialogCustomerDetails',
});

const dialog = defineModel({
  type: Boolean,
  default: false,
});

const props = defineProps<{ customer: OrderCustomer }>();

const tableData = computed(() =>
  Object.keys(props.customer).map((key) => ({
    key: formatKey(key),
    value: formatValue(key, props.customer[key as keyof OrderCustomer]),
  }))
);

function formatKey(key: string) {
  switch (key) {
    case 'user_id':
      return 'Registered';
    case 'has_stripe':
      return 'Card Payment';
    default:
      return key.split('_').join(' ');
  }
}

function formatValue(key: string, value: unknown) {
  switch (key) {
    case 'user_id':
      return value ? 'Yes' : 'No';
    case 'has_stripe':
      return value ? 'Yes' : 'No';
    default:
      return value;
  }
}
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card class="tw-w-[700px]" v-if="props.customer">
      <q-card-section
        class="tw-border-b tw-flex tw-items-center tw-justify-between"
      >
        <h1 class="sm:tw-text-[18px] tw-font-semibold">Customer Details</h1>
        <q-btn
          @click="dialog = false"
          icon="close"
          size="12px"
          padding="4px"
          round
          color="dark"
          flat
        />
      </q-card-section>

      <q-card-section>
        <template v-for="(item, i) of tableData" :key="i">
          <div class="tw-flex tw-py-3 tw-gap-3 tw-border">
            <div class="tw-text-right tw-min-w-[150px] tw-capitalize">
              {{ item.key }}
            </div>

            <div class="tw-border-l tw-px-3 tw-capitalize">
              {{ item.value }}
            </div>
          </div>
        </template>
      </q-card-section>

      <q-separator />

      <q-card-section class="tw-flex tw-justify-end">
        <q-btn label="OK" class="tw-w-[100px]" color="primary" unelevated />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
