<script setup lang="ts">
import { Order } from 'src/shared/interface/order';
import { BadgeOrderStatus } from 'src/components/badge';

defineOptions({
  name: 'DialogOrderDetails',
});

const dialog = defineModel({
  type: Boolean,
  default: false,
});
const props = defineProps<{ order?: Order }>();
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card class="tw-w-[500px]" v-if="props.order">
      <q-card-section
        class="tw-border-b tw-flex tw-items-center tw-justify-between"
      >
        <h1>
          <span class="tw-font-semibold">Order ID:</span>
          {{ props.order.id }}
        </h1>

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

      <q-card-section class="tw-pt-0">
        <!-- Address Line 1 -->
        <div class="tw-flex tw-items-start tw-gap-x-2 tw-border-b tw-py-3">
          <span class="tw-min-w-[180px] tw-text-right tw-font-bold">
            Shipping Address Line 1:
          </span>
          <span>
            {{ props.order.shipping_address_line1 }}
          </span>
        </div>

        <!-- Address Line 2 -->
        <div
          class="tw-flex tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          v-if="props.order.shipping_address_line2"
        >
          <span class="tw-min-w-[180px] tw-text-right tw-font-bold">
            Shipping Address Line 2:
          </span>
          <span>
            {{ props.order.shipping_address_line2 }}
          </span>
        </div>

        <!-- Country -->
        <div class="tw-flex tw-items-start tw-gap-x-2 tw-border-b tw-py-3">
          <span class="tw-min-w-[180px] tw-text-right tw-font-bold">
            Shipping Country:
          </span>
          <span>
            {{ props.order.shipping_country }}
          </span>
        </div>

        <!-- City -->
        <div class="tw-flex tw-items-start tw-gap-x-2 tw-border-b tw-py-3">
          <span class="tw-min-w-[180px] tw-text-right tw-font-bold">
            Shipping City:
          </span>
          <span>
            {{ props.order.shipping_city }}
          </span>
        </div>

        <!-- State -->
        <div class="tw-flex tw-items-start tw-gap-x-2 tw-border-b tw-py-3">
          <span class="tw-min-w-[180px] tw-text-right tw-font-bold">
            Shipping State:
          </span>
          <span>
            {{ props.order.shipping_state }}
          </span>
        </div>

        <!-- Zipcode -->
        <div class="tw-flex tw-items-start tw-gap-x-2 tw-border-b tw-py-3">
          <span class="tw-min-w-[180px] tw-text-right tw-font-bold">
            Shipping Zipcode:
          </span>
          <span>
            {{ props.order.shipping_zip_code }}
          </span>
        </div>

        <!-- Status -->
        <div class="tw-flex tw-items-start tw-gap-x-2 tw-border-b tw-py-3">
          <span class="tw-min-w-[180px] tw-text-right tw-font-bold">
            Shipping Status:
          </span>
          <span>
            <badge-order-status :status="props.order.status" />
          </span>
        </div>

        <!-- Zipcode -->
        <div class="tw-flex tw-items-start tw-gap-x-2 tw-border-b tw-py-3">
          <span class="tw-min-w-[180px] tw-text-right tw-font-bold">
            Order Created:
          </span>
          <span>
            {{ new Date(props.order.created_at!).toDateString() }}
          </span>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
