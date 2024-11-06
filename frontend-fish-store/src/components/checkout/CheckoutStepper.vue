<script lang="ts" setup>
defineOptions({
  name: 'CheckoutStepper',
});

const steps = [
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
];

const model = defineModel({
  default: 1,
  type: Number,
});

function prevStep() {
  if (model.value <= 1) {
    return;
  }
  model.value--;
}
</script>

<template>
  <q-stepper
    class="tw-border"
    flat
    v-model="model"
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
        :done="model > step.step"
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
</template>
