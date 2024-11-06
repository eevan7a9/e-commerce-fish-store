<script setup lang="ts">
import {
  FormCheckoutPayment,
  FormShippingAddress,
} from 'src/shared/interface/form';
import { useCartStore } from 'src/stores/cart';
import { computed, ref } from 'vue';
import { Loading, Notify } from 'quasar';
import { OrderPaymentMethod } from 'src/shared/enums/order';
import { useCountries } from 'src/shared/composables/useCountries';

const countries = useCountries();

const props = defineProps<{
  contactDetails: object;
  shippingAddress: FormShippingAddress;
  payment: FormCheckoutPayment;
}>();

const emits = defineEmits<{ done: [] }>();
const cart = useCartStore();
const loading = ref(false);

const payment = computed(() => ({
  method:
    props.payment.method === OrderPaymentMethod.Stripe
      ? 'Online Card Payment (via Stripe)'
      : 'Cash on Delivery (COD)',
  ...(props.payment.stripePaymentMethod?.card && {
    last_4: props.payment.stripePaymentMethod
      ? props.payment.stripePaymentMethod.card?.last4
      : undefined,
    brand: props.payment.stripePaymentMethod
      ? props.payment.stripePaymentMethod.card?.brand
      : undefined,
  }),
}));

function placeOrder() {
  console.log('place order...');

  loading.value = true;
  Loading.show({
    spinnerColor: 'primary',
    message: 'Processing your order... Please wait a moment.',
  });

  setTimeout(() => {
    cart.clear();
    Notify.create({
      message: 'Order has been created',
      color: 'positive',
      timeout: 4000,
    });
    Loading.hide();
    emits('done');
  }, 2000);
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

    <q-separator />

    <q-card-section class="tw-flex tw-flex-col tw-gap-y-3 sm:tw-gap-0">
      <h2 class="tw-text-[16px] md:tw-text-[18px] tw-font-anton tw-mb-3">
        Contact Details
      </h2>
      <div
        v-for="(value, key, i) of props.contactDetails"
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
        v-for="(value, key, i) of props.shippingAddress"
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
