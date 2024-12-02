<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {
  BillingDetails,
  loadStripe,
  PaymentMethod,
  Stripe,
  StripeElements,
} from '@stripe/stripe-js';
import { Notify } from 'quasar';

defineOptions({
  name: 'StripeCardElement',
});

const emits = defineEmits<{ paymentMethod: [value: PaymentMethod] }>();

const stripe = ref<Stripe | null>(null);
const elements = ref<StripeElements | null>(null);
const cardElementContainer = ref(null);
const stripePK = process.env.STRIPE_PK || '';

function check() {
  console.log(true);
}

async function submit(
  details?: BillingDetails,
  items?: { product_id: string | number; quantity: number }[]
): Promise<PaymentMethod | void> {
  if (!stripe.value || !elements.value) {
    return;
  }
  const card = elements.value.getElement('card');
  if (!card) {
    console.error('Card element is not available');
    return;
  }

  try {
    const { paymentMethod, error } = await stripe.value.createPaymentMethod({
      type: 'card',
      card,
      billing_details: details,
      metadata: {
        order_items: JSON.stringify(items),
      },
    });

    if (error) {
      Notify.create({
        color: 'negative',
        timeout: 3000,
        message: error.message || 'Error creating payment method',
      });
      console.error('Error creating payment method:', error);
    } else {
      // console.log('PaymentMethod:', paymentMethod);
      emits('paymentMethod', paymentMethod);
      return paymentMethod;
    }
  } catch (error: unknown) {
    console.error('Exception during payment method creation:', error);
    if (error instanceof Error) {
      Notify.create({
        color: 'negative',
        timeout: 3000,
        message: error?.message || 'Exception during payment method creation',
      });
    }
  }
}

onMounted(async () => {
  stripe.value = await loadStripe(stripePK);
  if (stripe.value) {
    elements.value = stripe.value.elements();
  }
  if (elements.value) {
    const card = elements.value.create('card');
    if (cardElementContainer.value) {
      card.mount(cardElementContainer.value);
    }
  }
});

defineExpose({
  check,
  submit,
});
</script>

<template>
  <div>
    <div class="tw-p-0 tw-flex tw-gap-1 tw-mb-2">
      <span class="tw-font-semibold">Supports: </span>
      <q-img width="40px" src="~assets/bank-cards/american_express.png" />
      <q-img width="40px" src="~assets/bank-cards/discover.png" />
      <q-img width="40px" src="~assets/bank-cards/jcb.png" />
      <q-img width="40px" src="~assets/bank-cards/visa.png" />
      <q-img width="40px" src="~assets/bank-cards/master_card.png" />
    </div>
    <q-card flat class="tw-border">
      <q-card-section class="tw-p-3">
        <div ref="cardElementContainer"></div>
      </q-card-section>
    </q-card>
  </div>
</template>
