<script setup lang="ts">
import { FormCheckout } from 'src/shared/interface/form';
import { useCartStore } from 'src/stores/cart';
import { computed } from 'vue';
import { Loading, Notify } from 'quasar';
import { OrderPaymentMethod } from 'src/shared/enums/order';
import { useCountries } from 'src/shared/composables/useCountries';
import { useOrdersStore } from 'src/stores/orders';
import { useAuthStore } from 'src/stores/auth';
import { mockRequest } from 'src/shared/utils/mock';

const countries = useCountries();

const props = defineProps<{
  checkout: FormCheckout;
}>();

const emits = defineEmits<{ done: [] }>();

const ordersStore = useOrdersStore();
const cart = useCartStore();
const auth = useAuthStore();

const loading = computed(() => ordersStore.loading);

const payment = computed(() => {
  const { method, stripePaymentMethod } = props.checkout.payment;
  const isStripe = method === OrderPaymentMethod.Stripe;

  return {
    method: isStripe
      ? 'Online Card Payment (via Stripe)'
      : 'Cash on Delivery (COD)',
    ...(isStripe && { last_4: stripePaymentMethod?.card?.last4 }),
    ...(isStripe && { brand: stripePaymentMethod?.card?.brand }),
  };
});

async function placeOrder() {
  const items = cart.list.map((item) => ({
    product_id: item.product.id,
    quantity: item.quantity,
  }));

  Loading.show({
    spinnerColor: 'primary',
    message: 'Processing your order... Please wait a moment.',
  });

  const res =
    process.env.ENABLE_STATIC_MODE === 'true'
      ? await mockRequest({}, {}, () => ordersStore.setLoading(false))
      : await ordersStore.createOrder(props.checkout, items, auth.userToken);

  Notify.create({
    message:
      res?.message ||
      '🚀 Order placed! Hang tight while we prepare your items.',
    color: res?.success ? 'positive' : 'negative',
    timeout: 4000,
  });

  Loading.hide();
  cart.clear();
  emits('done');
}
</script>

<template>
  <q-card class="tw-border" flat>
    <q-card-section>
      <h1 class="tw-text-[18px] md:tw-text-[24px] tw-font-anton">
        Order Summary
      </h1>
      <p class="tw-mt-3 tw-leading-[150%]">
        Take a moment to review the details of your order, including items,
        quantities, and delivery information. Ensure everything is correct
        before proceeding to complete your purchase.
      </p>
    </q-card-section>

    <q-separator />

    <q-card-section class="tw-flex tw-flex-col tw-gap-y-3 sm:tw-gap-0">
      <h2 class="tw-text-[16px] md:tw-text-[18px] tw-font-anton tw-mb-3">
        Contact Details
      </h2>
      <div
        v-for="(value, key, i) of checkout.contactDetails"
        :key="i"
        class="tw-flex tw-flex-col sm:tw-flex-row tw-w-full"
      >
        <div
          class="tw-border tw-w-full md:tw-w-[350px] tw-py-2 tw-px-3 tw tw-capitalize"
        >
          {{ key }}
        </div>

        <div
          class="tw-border tw-w-full tw-py-2 tw-px-3 tw-capitalize tw-bg-slate-100"
        >
          {{ value }}
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="tw-flex tw-flex-col tw-gap-y-3 sm:tw-gap-0">
      <h2 class="tw-text-[16px] md:tw-text-[18px] tw-font-anton tw-mb-3">
        Shipping Address
      </h2>
      <div
        v-for="(value, key, i) of checkout.shippingAddress"
        :key="i"
        class="tw-flex tw-flex-col sm:tw-flex-row tw-w-full"
      >
        <div
          class="tw-border tw-w-full md:tw-w-[350px] tw-py-2 tw-px-3 tw tw-capitalize"
        >
          {{ key.split('_').join(' ') }}
        </div>

        <div
          class="tw-border tw-w-full tw-py-2 tw-px-3 tw-capitalize tw-bg-slate-100"
        >
          {{ key !== 'country' ? value : countries.getLabelByAlpha2(value) }}
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="tw-flex tw-flex-col tw-gap-y-3 sm:tw-gap-0">
      <h2 class="tw-text-[16px] md:tw-text-[18px] tw-font-anton tw-mb-3">
        Payment Method
      </h2>
      <div
        v-for="(value, key, i) of payment"
        :key="i"
        class="tw-flex tw-flex-col sm:tw-flex-row tw-w-full"
      >
        <div
          class="tw-border tw-w-full md:tw-w-[350px] tw-py-2 tw-px-3 tw tw-capitalize"
        >
          {{ key.split('_').join(' ') }}
        </div>

        <div
          class="tw-border tw-w-full tw-py-2 tw-px-3 tw-capitalize tw-bg-slate-100"
        >
          {{ value }}
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="tw-px-4 tw-pb-3 tw-flex tw-flex-col tw-gap-3">
      <div class="tw-text-[14px]">
        You're almost done! Review all order details once more and click "Place
        Order" to confirm. We’ll send a confirmation email with your order
        summary and delivery information shortly after completion.
      </div>

      <q-btn
        color="primary"
        unelevated
        padding="8px 24px"
        class="tw-w-full md:tw-w-auto"
        @click="placeOrder()"
        :disable="loading"
      >
        Place Order
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
