<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';
import { FormShippingAddress, FormContactDetails } from 'src/components/forms';
import {
  CheckoutStepper,
  CheckoutOrderSummary,
  CheckoutPaymentMethod,
  CheckoutSuccess,
} from 'src/components/checkout';
import { OrderPaymentMethod } from 'src/shared/enums/order';
import { FormCheckout } from 'src/shared/interface/form';
import { DialogCart } from 'src/components/dialogs';
import { useCartStore } from 'src/stores/cart';

const cartStore = useCartStore();

const initialValues = {
  contactDetails: {
    name: '',
    email: '',
    phone: '',
  },
  shippingAddress: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  },
  payment: {
    method: OrderPaymentMethod.Stripe,
    stripePaymentMethod: undefined,
  },
};

const currStep = ref(1);
const checkoutInfo = reactive<FormCheckout>(structuredClone(initialValues));

const showCart = ref(false);
const cart = computed(() => {
  return {
    total_quantity: cartStore.list.reduce(
      (prev, curr) => prev + curr.quantity,
      0
    ),
    total_weight:
      cartStore.list.reduce(
        (prev, curr) => prev + Number(curr.product.weight) * curr.quantity,
        0
      ) + ' lb',
    total_price:
      '₱' +
      cartStore.list
        .reduce(
          (prev, curr) => prev + Number(curr.product.price) * curr.quantity,
          0
        )
        .toFixed(2),
  };
});

function checkoutComplete() {
  Object.assign(checkoutInfo, structuredClone(initialValues));
  currStep.value = 5;
}
</script>

<template>
  <main
    class="tw-max-w-screen-xl tw-w-full tw-mx-auto tw-z-10 tw-grid md:tw-grid-cols-12 tw-gap-2 md:tw-gap-5 tw-px-2 md:tw-px-4 tw-py-2 md:tw-py-8"
  >
    <aside class="md:tw-col-span-4 md:tw-pl-8">
      <checkout-stepper v-model="currStep" />

      <q-card flat class="tw-border tw-mt-4">
        <q-card-section>
          <div class="tw-flex tw-items-center tw-justify-between tw-py-1">
            <h2 class="tw-text-[16px] md:tw-text-[18px] tw-font-anton">
              Shopping Cart
            </h2>

            <q-btn
              icon="mdi-cart"
              label="SHow"
              color="primary"
              outline
              dense
              padding="2px 8px"
              @click="showCart = true"
              v-if="cart.total_quantity"
            />
          </div>
          <dialog-cart hide-action v-model="showCart" />
        </q-card-section>

        <q-card-section class="tw-pt-0" v-if="cart.total_quantity">
          <template v-for="(value, name, i) of cart" :key="i">
            <div class="tw-flex tw-flex-col sm:tw-flex-row tw-w-full">
              <div class="tw-border tw-w-full tw-py-2 tw-px-3 tw tw-capitalize">
                {{ name.split('_').join(' ').toUpperCase() }}
              </div>

              <div
                class="tw-border tw-w-full tw-py-2 tw-px-3 tw-capitalize tw-bg-slate-100"
              >
                {{ value }}
              </div>
            </div>
          </template>
        </q-card-section>

        <q-card-section class="tw-p-0" v-else>
          <div
            class="tw-py-3 tw-flex tw-flex-col tw-items-center tw-justify-center"
          >
            <span>Your cart is empty.</span>
            <div class="tw-h-[200px] tw-w-[200px]">
              <q-img src="/src//assets//image-svg/empty_cart.svg"></q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </aside>

    <section class="md:tw-col-span-8">
      <form-contact-details
        @done="currStep = 2"
        v-model="checkoutInfo.contactDetails"
        v-if="currStep === 1"
      />

      <form-shipping-address
        @done="currStep = 3"
        v-model="checkoutInfo.shippingAddress"
        v-if="currStep === 2"
      />

      <checkout-payment-method
        v-model="checkoutInfo.payment"
        :billing-details="{
          ...checkoutInfo.contactDetails,
          address: {
            ...checkoutInfo.shippingAddress,
          },
        }"
        @done="currStep = 4"
        v-if="currStep === 3"
      />

      <checkout-order-summary
        :checkout="checkoutInfo"
        @done="checkoutComplete()"
        v-if="currStep === 4"
      />

      <checkout-success v-if="currStep === 5" />
    </section>
  </main>
</template>

<style lang="scss" scoped></style>
