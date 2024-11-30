<script setup lang="ts">
import { Order } from 'src/shared/interface/order';
import { BadgeOrderStatus, BadgePaymentStatus } from 'src/components/badge';
import { computed, ref } from 'vue';
import { OrderPaymentMethod, OrderStatus } from 'src/shared/enums/order';
import {
  OrderStatusDropdown,
  OrderPaymentDropdown,
} from 'src/components/admin';
import { DialogOrderProducts } from 'src/components/dialogs';

defineOptions({
  name: 'DialogOrderDetails',
});

const dialog = defineModel({
  type: Boolean,
  default: false,
});
const dialogProducts = ref(false);
const props = defineProps<{ order?: Order; isAdmin?: boolean }>();

const emits = defineEmits<{
  cancel: [value: Order];
  viewItems: [];
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

const disableCancel = computed(
  () =>
    props.order?.status === OrderStatus.Cancelled ||
    props.order?.status === OrderStatus.Received
);
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card style="width: 100vw; max-width: 700px" v-if="props.order">
      <q-card-section
        class="tw-border-b tw-flex tw-items-center tw-justify-between tw-bg-primary tw-text-white"
      >
        <h1 class="sm:tw-text-[18px]">
          <span>Order ID: 0{{ props.order.id }}</span>
        </h1>

        <q-btn
          @click="dialog = false"
          icon="close"
          size="12px"
          padding="4px"
          round
          color="light"
          flat
        />
      </q-card-section>

      <q-card-section class="tw-pt-0 sm:tw-pt-2">
        <q-scroll-area class="tw-h-screen tw-max-h-[400px] md:tw-max-h-[550px]">
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Total Amount:
            </span>
            <span class="sm:tw-text-[20px] tw-font-anton">
              ₱{{ order?.total_amount }}
            </span>
          </div>

          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Email Address:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ props.order.email }}
            </span>
          </div>

          <!-- Address Line 1 -->
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Phone:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ props.order.phone }}
            </span>
          </div>
          <!-- Address Line 1 -->
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Shipping Address Line 1:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ props.order.line1 }}
            </span>
          </div>

          <!-- Address Line 2 -->
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
            v-if="props.order.line2"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Shipping Address Line 2:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ props.order.line2 }}
            </span>
          </div>

          <!-- Country -->
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Shipping Country:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ props.order.country }}
            </span>
          </div>

          <!-- City -->
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Shipping City:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ props.order.city }}
            </span>
          </div>

          <!-- State -->
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Shipping State:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ props.order.state }}
            </span>
          </div>

          <!-- Zipcode -->
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Shipping Zipcode:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ props.order.postal_code }}
            </span>
          </div>

          <!-- Status -->
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Shipping Status:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              <badge-order-status :status="props.order.status" />
            </span>
          </div>

          <!-- Payment Method -->
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Payment Method:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ paymentMethod }}
            </span>
          </div>

          <!-- Status -->
          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
            v-if="props.order.payment_status"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Payment Status:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              <badge-payment-status :status="props.order.payment_status" />
            </span>
          </div>

          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Order Created:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ new Date(props.order.created_at!).toDateString() }}
            </span>
          </div>

          <div
            class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-gap-x-2 tw-border-b tw-py-3"
            v-if="order?.total_weight"
          >
            <span class="tw-min-w-[180px] sm:tw-text-right tw-font-normal">
              Total Weight:
            </span>
            <span class="sm:tw-text-[16px] tw-font-light">
              {{ order?.total_weight }} lb
            </span>
          </div>
        </q-scroll-area>
      </q-card-section>

      <q-card-actions class="tw-p-3 tw-pt-0 tw-flex tw-flex-col tw-gap-3">
        <q-btn
          label="View Products"
          padding="8px 32px"
          color="primary"
          class="tw-w-full"
          outline
          @click="dialogProducts = true"
        />
        <dialog-order-products v-model="dialogProducts" :order="props.order" />

        <q-btn
          label="Cancel Order"
          icon="mdi-cancel"
          padding="8px 32px"
          color="negative"
          class="tw-w-full"
          unelevated
          @click="emits('cancel', props.order)"
          :disable="disableCancel"
          v-if="!props.isAdmin"
        />
      </q-card-actions>

      <q-card-section class="tw-pt-0" v-if="order && isAdmin">
        <q-separator class="tw-mb-3" />
        <order-payment-dropdown
          :dense="false"
          class="tw-w-full tw-h-[40px] tw-mb-3"
          :order="order"
        />
        <order-status-dropdown
          :dense="false"
          class="tw-w-full tw-h-[40px]"
          :order="order"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
