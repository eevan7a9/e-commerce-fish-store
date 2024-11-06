<script setup lang="ts">
import { Order, OrderItem } from 'src/shared/interface/order';
import { BadgeOrderStatus, BadgePaymentStatus } from 'src/components/badge';
import { computed } from 'vue';
import { OrderPaymentMethod, OrderStatus } from 'src/shared/enums/order';

defineOptions({
  name: 'DialogOrderDetails',
});

const dialog = defineModel({
  type: Boolean,
  default: false,
});

const props = defineProps<{ order?: Order }>();
const emits = defineEmits<{
  cancel: [value: Order];
  viewItems: [id: OrderItem[]];
}>();

const paymentMethod = computed(() => {
  if (!props.order?.payment_status) return '';
  switch (props.order?.payment_method) {
    case OrderPaymentMethod.Stripe:
      return 'Online Payment (via Stripe)';

    default:
      return 'Cash on Delivery (COD)';
  }
});

const showCancel = computed(
  () =>
    props.order?.status !== OrderStatus.Cancelled &&
    props.order?.status !== OrderStatus.Received
);
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card class="tw-w-[500px]" v-if="props.order">
      <q-card-section
        class="tw-border-b tw-flex tw-items-center tw-justify-between"
      >
        <h1 class="sm:tw-text-[18px]">
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
        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Shipping Address Line 1:
          </span>
          <span>
            {{ props.order.line1 }}
          </span>
        </div>

        <!-- Address Line 2 -->
        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          v-if="props.order.line2"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Shipping Address Line 2:
          </span>
          <span>
            {{ props.order.line2 }}
          </span>
        </div>

        <!-- Country -->
        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Shipping Country:
          </span>
          <span>
            {{ props.order.country }}
          </span>
        </div>

        <!-- City -->
        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Shipping City:
          </span>
          <span>
            {{ props.order.city }}
          </span>
        </div>

        <!-- State -->
        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Shipping State:
          </span>
          <span>
            {{ props.order.state }}
          </span>
        </div>

        <!-- Zipcode -->
        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Shipping Zipcode:
          </span>
          <span>
            {{ props.order.postal_code }}
          </span>
        </div>

        <!-- Status -->
        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Shipping Status:
          </span>
          <span>
            <badge-order-status :status="props.order.status" />
          </span>
        </div>

        <!-- Payment Method -->
        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Payment Method:
          </span>
          <span> {{ paymentMethod }} </span>
        </div>

        <!-- Status -->
        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          v-if="props.order.payment_status"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Payment Status:
          </span>
          <span>
            <badge-payment-status :status="props.order.payment_status" />
          </span>
        </div>

        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Order Created:
          </span>
          <span>
            {{ new Date(props.order.created_at!).toDateString() }}
          </span>
        </div>

        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          v-if="order?.total_weight"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Total Weight:
          </span>
          <span> {{ order?.total_weight }} lb </span>
        </div>

        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-gap-x-2 tw-border-b tw-py-3"
        >
          <span class="tw-min-w-[180px] sm:tw-text-right tw-font-bold">
            Total Amount:
          </span>
          <span class="tw-text-[20px] tw-font-semibold">
            ₱{{ order?.total_amount }}
          </span>
        </div>
      </q-card-section>

      <q-card-actions class="tw-p-3 tw-pt-0 tw-flex tw-flex-col tw-gap-3">
        <q-btn
          label="View Products"
          padding="8px 32px"
          color="primary"
          class="tw-w-full"
          outline
          @click="emits('viewItems', order?.order_items || [])"
        />
        <q-btn
          label="cancel order"
          padding="8px 32px"
          color="negative"
          class="tw-w-full"
          unelevated
          @click="emits('cancel', props.order)"
          v-if="showCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
