<script setup lang="ts">
import { Order } from 'src/shared/interface/order';
import { BadgeOrderStatus, BadgePaymentStatus } from 'src/components/badge';
import {
  OrderStatusDropdown,
  OrderPaymentDropdown,
} from 'src/components/admin';
import { DialogOrderProducts } from 'src/components/dialogs';
import { ref } from 'vue';

defineOptions({
  name: 'ExpansionUserOrder',
});

const props = defineProps<{ order: Order }>();
const emits = defineEmits<{ updatedStatus: []; updatedPayments: [] }>();
const dialog = ref();
</script>

<template>
  <q-expansion-item
    icon="perm_identity"
    label="Account settings"
    caption="John Doe"
    group="orders-list"
    class="tw-pb-3"
  >
    <template #header>
      <q-item-section>
        <q-item-label class="md:tw-text-[16px] tw-font-normal">
          ₱{{ props.order.total_amount }} |
          <small>Order ID: 0{{ props.order.id }}</small>
        </q-item-label>
        <q-item-label
          class="sm:tw-text-[14px] tw-capitalize ellipsis tw-max-w-[280px] sm:tw-max-w-[400px] md:tw-max-w-[600px]"
          caption
        >
          {{ props.order.email }}
        </q-item-label>
      </q-item-section>

      <q-item-section side top v-if="$q.screen.gt.xs">
        <q-item-label caption>
          {{ new Date(props.order.created_at).toDateString() }}
        </q-item-label>
        <div class="tw-mt-2 tw-flex tw-gap-2">
          <badge-payment-status :status="props.order.payment_status" />
          <badge-order-status :status="props.order.status" />
        </div>
      </q-item-section>
    </template>

    <q-card bordered>
      <q-card-section
        class="tw-flex tw-flex-col tw-gap-2 tw-capitalize tw-bg-slate-50 sm:tw-text-[14px] tw-font-normal"
      >
        <div>
          <span class="tw-font-light">Amount:</span>
          ₱{{ props.order.total_amount }}
        </div>

        <div class="">
          <span class="tw-font-light">Weight:</span>
          {{ props.order.total_weight }}lb
        </div>

        <div>
          <span class="tw-font-light">Shipping Details:</span>
          {{ props.order.line1 }} {{ props.order.state }},
          {{ props.order.city }}, {{ props.order.country }},
          {{ props.order.postal_code }}
        </div>

        <div>
          <span class="tw-font-light">Payment Details:</span>
          {{ props.order.payment_method }}, {{ props.order.payment_status }}
        </div>

        <div>
          <span class="tw-font-light">Contact Information:</span>
          {{ props.order.email }} | {{ props.order.phone }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn
          icon="mdi-shopping"
          color="primary"
          outline
          class="tw-w-full"
          label="Show Products"
          @click="dialog = true"
        />
        <dialog-order-products v-model="dialog" :order="props.order" />
      </q-card-section>

      <q-card-section
        class="tw-pt-0 tw-flex tw-gap-2 tw-flex-nowrap tw-flex-col md:tw-flex-row"
      >
        <order-payment-dropdown
          @update-success="emits('updatedPayments')"
          class="tw-w-full"
          :order="order"
        />
        <order-status-dropdown
          @update-success="emits('updatedStatus')"
          class="tw-w-full"
          :order="order"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
