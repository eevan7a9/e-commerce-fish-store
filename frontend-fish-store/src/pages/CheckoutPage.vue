<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { FormShippingAddress, FormContactDetails } from 'src/components/forms';
import {
  OrderSummary,
  CheckoutPaymentMethod,
  CheckoutSuccess,
} from 'src/components/checkout';
import { DialogCart } from 'src/components/dialogs';
import { useCartStore } from 'src/stores/cart';

const cartStore = useCartStore();

const cart = computed(() => {
  return {
    total_quantity:
      cartStore.list.reduce((prev, curr) => prev + curr.quantity, 0) + ' Item',
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
    hasContent: cartStore.list.length,
  };
});

const showCart = ref(false);
const currStep = ref(1);

const contactDetails = reactive({
  email: '',
  phone: '',
});

const shippingAddress = reactive({
  shipping_address_line1: '',
  shipping_address_line2: '',
  shipping_city: '',
  shipping_state: '',
  shipping_zip_code: '',
  shipping_country: '',
});

const paymentMethod = reactive({
  token: '',
  method: 'card',
});

const steps = ref([
  {
    step: 1,
    title: 'Contact Details',
    icon: 'mdi-pencil',
    caption: 'Email and Phone Information',
    description: `Enter your personal contact details so we can reach you if needed and
          keep you informed about your purchase.`,
    hidePrevBtn: true,
  },
  {
    step: 2,
    title: 'Fill Shipping Address',
    icon: 'mdi-map-marker',
    caption: 'For your order and delivery location',
    description: ` Enter your billing address and delivery information to ensure your
          order is sent to the correct location.`,
  },
  {
    step: 3,
    title: 'Payment Method',
    icon: 'mdi-card-account-details',
    caption: 'Card Payment or Cash',
    description:
      'Provide your payment information to securely process your order.',
  },
  {
    step: 4,
    title: 'Order Summary',
    icon: 'mdi-text-account',
    aciveIcon: 'mdi-eye-outline',
    caption: 'Review Your Order',
    description: `Confirm your order details, payment, and address information before
          completing the checkout.`,
  },
  {
    step: 5,
    hidePrevBtn: true,
    title: 'Order Complete',
    icon: 'mdi-party-popper',
    aciveIcon: 'mdi-party-popper',
    caption: 'Thank You for Your Order!',
    description: 'Your order has been successfully placed!.',
  },
]);

function prevStep() {
  if (currStep.value <= 1) {
    return;
  }
  currStep.value--;
}
</script>

<template>
  <main
    class="tw-max-w-screen-xl tw-w-full tw-mx-auto tw-z-10 tw-grid md:tw-grid-cols-12 tw-gap-2 tw-px-2 md:tw-px-4 tw-py-2 md:tw-py-8"
  >
    <aside class="md:tw-col-span-4 md:tw-pr-8">
      <q-stepper
        class="tw-border"
        flat
        v-model="currStep"
        vertical
        color="primary"
        animated
      >
        <template v-for="step of steps" :key="step.step">
          <q-step
            :name="step.step"
            :title="step.title"
            :icon="step.icon"
            :active-icon="step.aciveIcon || 'mdi-pencil-outline'"
            :caption="step.caption"
            :done="currStep > step.step"
          >
            {{ step.description }}

            <q-stepper-navigation v-if="!step.hidePrevBtn">
              <q-btn
                @click="prevStep()"
                color="primary"
                outline
                label="Previous Step"
              />
            </q-stepper-navigation>
          </q-step>
        </template>
      </q-stepper>

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
              v-if="cart.hasContent"
            />
          </div>
          <dialog-cart hide-action v-model="showCart" />
        </q-card-section>

        <q-card-section class="tw-pt-0" v-if="cart.hasContent">
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
        v-model="contactDetails"
        v-if="currStep === 1"
      />

      <form-shipping-address
        @done="currStep = 3"
        v-model="shippingAddress"
        v-if="currStep === 2"
      />

      <checkout-payment-method
        v-model="paymentMethod.method"
        @done="currStep = 4"
        v-if="currStep === 3"
      />

      <order-summary
        :contact-details="contactDetails"
        :shipping-address="shippingAddress"
        :payment-method="paymentMethod"
        @done="currStep = 5"
        v-if="currStep === 4"
      />

      <checkout-success v-if="currStep === 5" />
    </section>
  </main>
</template>

<style lang="scss" scoped></style>
