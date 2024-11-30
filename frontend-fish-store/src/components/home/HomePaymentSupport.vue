<template>
  <section class="tw-z-50 tw-relative tw-pt-24 tw-pb-16 tw-bg-white">
    <div class="tw-relative tw-max-w-screen-lg tw-m-auto tw-px-3">
      <h1
        class="tw-relative tw-max-w-[600px] tw-font-anton tw-mb-8 tw-text-[28px] md:tw-text-[38px] xl:tw-text-[42px] 2xl:tw-text-[48px]"
      >
        <div class="heading-gradient-primary tw-font-black tw-text-center">
          Payment Methods We Support
        </div>
        <q-img
          src="~assets/image-svg/empty_cart.svg"
          class="tw-absolute tw-top-0 tw-left-0 -tw-translate-y-[150px]"
          width="180px"
        />
      </h1>

      <article
        class="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-3 tw-relative"
      >
        <q-img
          src="~assets/image-svg/empty-box.svg"
          class="animate-float tw-top-0 tw-right-0 tw-absolute"
          width="150px"
          v-if="$q.screen.gt.sm"
        />

        <q-img
          src="~assets/image-svg/cod.svg"
          class="tw-max-w-[300px] sm:tw-max-w-[400px] md:tw-max-w-[500px]"
        />
        <div>
          <h1
            class="heading-gradient-primary tw-font-black tw-text-center md:tw-text-left tw-text-[20px] md:tw-text-[24px] lg:tw-text-[28px] tw-font-anton"
          >
            Cash on Delivery Available
          </h1>
          <p
            class="lg:tw-text-[20px] tw-mt-4 tw-max-w-[800px] tw-pb-[100px] tw-leading-relaxed tw-font-light"
          >
            With Cash on Delivery (COD), you can shop confidently and pay only
            when your order arrives at your doorstep. Please note: Ensure you
            have the exact amount ready as some couriers may not provide change.
            Orders with COD must be confirmed via phone or email before
            shipping.
          </p>
        </div>
      </article>

      <article
        class="tw-flex tw-flex-col-reverse sm:tw-flex-row tw-items-center tw-gap-3"
      >
        <div>
          <h1
            class="tw-text-center sm:tw-text-right heading-gradient-primary tw-font-black tw-text-[20px] md:tw-text-[24px] lg:tw-text-[28px] tw-font-anton"
          >
            Credit & Debit Card Payments via Stripe
          </h1>
          <p
            class="sm:tw-text-right lg:tw-text-[20px] tw-mt-4 tw-max-w-[800px] tw-leading-relaxed tw-font-light"
          >
            Securely pay with your credit or debit card through Stripe. All
            transactions are encrypted and protected to ensure your payment
            information remains safe. Please ensure your card details are
            entered correctly. Payments may be subject to additional
            verification for security purposes.
          </p>
          <div class="tw-p-0 tw-flex tw-gap-1 tw-mt-8 sm:tw-justify-end">
            <q-img width="40px" src="~assets/bank-cards/american_express.png" />
            <q-img width="40px" src="~assets/bank-cards/discover.png" />
            <q-img width="40px" src="~assets/bank-cards/jcb.png" />
            <q-img width="40px" src="~assets/bank-cards/visa.png" />
            <q-img width="40px" src="~assets/bank-cards/master_card.png" />
          </div>
        </div>

        <div class="sm:tw-h-[400px] tw-h-full tw-w-full tw-max-w-[500px]">
          <q-img
            src="~assets/image-svg/stripe-payment.svg"
            class="tw-h-[300px] sm:tw-h-[500px] md:tw-h-[600px] tw-w-full"
            fit="contain"
          />
        </div>
      </article>
    </div>
  </section>
</template>
