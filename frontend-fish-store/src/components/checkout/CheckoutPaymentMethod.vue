<script lang="ts" setup>
defineOptions({
  name: 'CheckoutPaymentMethod',
});

const emits = defineEmits<{ done: [] }>();

const model = defineModel({
  default: 'card',
});
</script>

<template>
  <q-card class="tw-border" flat>
    <q-card-section>
      <h1 class="tw-text-[18px] md:tw-text-[24px] tw-font-anton">
        Payment Method
      </h1>
      <p class="tw-mt-3 tw-leading-[150%]">
        Choose your preferred payment option for a secure and convenient
        checkout experience. You can pay online with your card through Stripe
        for immediate processing, or opt for Cash on Delivery to pay upon
        receipt.
      </p>
    </q-card-section>

    <q-separator />

    <q-card-section class="tw-pb-8">
      <h1 class="tw-text-[16px] tw-font-semibold">
        Pleast Select your preferred Payment option:
      </h1>

      <section class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 tw-py-4">
        <q-card flat class="tw-border tw-w-full">
          <q-card-actions class="tw-p-0">
            <q-radio
              dense
              v-model="model"
              val="card"
              label="Online Card Payment (via Stripe)"
              class="tw-p-3 tw-w-full"
            />
          </q-card-actions>
        </q-card>

        <q-card flat class="tw-border tw-w-full">
          <q-card-actions class="tw-p-0">
            <q-radio
              dense
              v-model="model"
              val="cod"
              label="Cash on Delivery (COD)"
              class="tw-p-3 tw-w-full"
            />
          </q-card-actions>
        </q-card>
      </section>

      <div
        class="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-around tw-gap-8 md:tw-gap-3 tw-mt-3 tw-pt-4"
      >
        <article
          class="tw-cursor-pointer tw-bg-slate-400 tw-bg-opacity-10 tw-h-[300px] tw-w-[300px] tw-rounded-full tw-border tw-border-dashed tw-border-primary"
          v-if="model === 'card'"
        >
          <h2 class="tw-text-[20px] tw-font-anton tw-bg-white tw-bg-opacity-15">
            Online Payment (via Stripe)
            <q-icon color="primary" name="mdi-check-circle" size="32px" />
          </h2>

          <div class="tw-flex tw-justify-center">
            <q-img
              src="~assets/image-svg/stripe-payment.svg"
              class="tw-w-[230px]"
            />
          </div>
        </article>

        <article
          class="tw-cursor-pointer tw-bg-slate-700 tw-bg-opacity-10 tw-rounded-full tw-border tw-border-dashed tw-border-primary"
          v-else
        >
          <h2 class="tw-text-[20px] tw-font-anton tw-bg-white tw-bg-opacity-15">
            Cash on Delivery (COD)
            <q-icon color="primary" name="mdi-check-circle" size="32px" />
          </h2>

          <div class="tw-flex tw-justify-center tw">
            <q-img src="~assets/image-svg/cod.svg" class="tw-w-[250px]" />
          </div>
        </article>
      </div>
    </q-card-section>
  </q-card>

  <q-card class="tw-border tw-mt-3" flat>
    <q-card-section class="tw-pb-0">
      <div v-if="model === 'cod'">
        Pay in cash when your order is delivered. Please ensure you have the
        exact amount as the delivery personnel may not carry change.
      </div>
      <div v-if="model === 'card'">
        Securely pay online using your debit or credit card through Stripe. Your
        payment details are encrypted and protected for safe transactions.
      </div>
    </q-card-section>

    <q-card-section class="md:tw-text-center">
      <q-btn
        color="primary"
        class="tw-w-full md:tw-w-auto"
        padding="8px 24px"
        label="Confirm"
        @click="emits('done')"
      />
    </q-card-section>
  </q-card>
</template>
