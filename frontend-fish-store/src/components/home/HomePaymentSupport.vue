<script lang="ts" setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

onMounted(() => {
  gsap.from('[gsap="payment-support-title"]', {
    scrollTrigger: {
      trigger: '[gsap="payment-support-title"]',
      start: 'top bottom',
      toggleActions: 'play none none reverse',
    },
    x: 800,
    duration: 2,
    opacity: 0,
  });

  // PAYMENT STRIPE PHONE IMAGE
  gsap.from('[gsap="payment-card-img"]', {
    scrollTrigger: {
      trigger: '[gsap="payment-card-container"]',
      start: 'top-=100 center',
      toggleActions: 'play none none reverse',
    },
    y: 700,
    opacity: 0,
    duration: 1,
  });
  const stripeEl = [
    '[gsap="stripe-title"]',
    '[gsap="stripe-description"]',
    '[gsap="stripe-cards"]',
  ];
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '[gsap="payment-card-container"]',
        start: 'top-=100 center',
        toggleActions: 'play none none reverse',
      },
    })
    .from(stripeEl, {
      x: -500,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
      ease: 'power2.out',
    });

  // EMPTY BOX
  gsap.from('[gsap="empty-box-payment"]', {
    scrollTrigger: {
      trigger: '[gsap="payment-support-title"]',
      start: 'top bottom',
      toggleActions: 'play none none reverse',
    },
    scale: 0,
    opacity: 0,
    duration: 1,
    onComplete: () =>
      document
        .querySelector('[gsap="empty-box-payment"]')
        ?.classList?.add('animate-float'),
    onReverseComplete: () =>
      document
        .querySelector('[gsap="empty-box-payment"]')
        ?.classList?.remove('animate-float'),
  });

  // PAYMENT COD IMAGE
  gsap.from('[gsap="payment-cod-img"]', {
    scrollTrigger: {
      trigger: '[gsap="payment-cod-container"]',
      start: 'top-=200 center',
      toggleActions: 'play none none reverse',
    },
    y: 700,
    opacity: 0,
    duration: 1,
  });

  const codEl = ['[gsap="cod-title"]', '[gsap="cod-description"]'];
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '[gsap="payment-cod-container"]', // Starts when the title enters the viewport
        start: 'top-=200 center',
        toggleActions: 'play none none reverse',
      },
    })
    .from(codEl, {
      x: 500,
      opacity: 0,
      stagger: 0.3, // Add stagger effect for smooth entrance
      duration: 0.8,
      ease: 'power2.out',
    });
});
</script>

<template>
  <section
    gsap="payment-support-container"
    class="tw-z-50 tw-relative tw-pt-20 sm:tw-pt-0 tw-pb-16 tw-bg-white"
  >
    <div class="tw-relative tw-max-w-screen-lg tw-m-auto tw-px-3">
      <div
        class="tw-overflow-x-hidden tw-py-[70px] tw-font-anton tw-mb-8 tw-text-[28px] md:tw-text-[38px] xl:tw-text-[42px] 2xl:tw-text-[48px]"
      >
        <div
          gsap="payment-support-title"
          class="tw-max-w-[600px] tw-font-black tw-text-center tw-relative"
        >
          <span class="tw-relative heading-gradient-primary tw-z-10">
            Payment Methods We Support
          </span>
          <q-img
            src="~assets/image-svg/empty_cart.svg"
            class="tw-absolute tw-bottom-0 tw-right-0 tw-translate-y-[50px] -tw-translate-x-[100px] sm:tw-translate-x-[24px] tw-z-0"
            width="180px"
          />
        </div>
      </div>

      <article
        gsap="payment-cod-container"
        class="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-3 tw-relative"
      >
        <q-img
          src="~assets/image-svg/empty-box.svg"
          class="-tw-top-[100px] tw-right-0 tw-mb-20 tw-absolute"
          width="280px"
          v-if="$q.screen.gt.sm"
          gsap="empty-box-payment"
        />

        <div
          class="oval-shape tw-max-w-[300px] tw-h-[200px] sm:tw-h-[400px] sm:tw-max-w-[700px] tw-absolute tw-translate-y-[40px] sm:-tw-translate-y-[30px] sm:tw-bottom-0"
        ></div>
        <q-img
          src="~assets/image-svg/cod.svg"
          class="tw-max-w-[300px] sm:tw-max-w-[400px] md:tw-max-w-[500px]"
          gsap="payment-cod-img"
        />
        <div class="tw-z-10 tw-relative tw-overflow-x-hidden">
          <h1
            gsap="cod-title"
            class="heading-gradient-primary tw-font-black tw-text-center md:tw-text-left tw-text-[20px] md:tw-text-[24px] lg:tw-text-[28px] tw-font-anton"
          >
            Cash on Delivery Available
          </h1>
          <p
            gsap="cod-description"
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
            gsap="stripe-title"
          >
            Credit & Debit Card Payments via Stripe
          </h1>
          <p
            gsap="stripe-description"
            class="sm:tw-text-right lg:tw-text-[20px] tw-mt-4 tw-max-w-[800px] tw-leading-relaxed tw-font-light"
          >
            Securely pay with your credit or debit card through Stripe. All
            transactions are encrypted and protected to ensure your payment
            information remains safe. Please ensure your card details are
            entered correctly. Payments may be subject to additional
            verification for security purposes.
          </p>
          <div
            gsap="stripe-cards"
            class="tw-p-0 tw-flex tw-gap-1 tw-mt-8 sm:tw-justify-end"
          >
            <q-img width="40px" src="~assets/bank-cards/american_express.png" />
            <q-img width="40px" src="~assets/bank-cards/discover.png" />
            <q-img width="40px" src="~assets/bank-cards/jcb.png" />
            <q-img width="40px" src="~assets/bank-cards/visa.png" />
            <q-img width="40px" src="~assets/bank-cards/master_card.png" />
          </div>
        </div>

        <div
          gsap="payment-card-container"
          class="sm:tw-h-[400px] tw-h-full tw-w-full tw-max-w-[500px]"
        >
          <q-img
            src="~assets/image-svg/stripe-payment.svg"
            class="tw-h-[300px] sm:tw-h-[500px] md:tw-h-[600px] tw-w-full"
            fit="contain"
            gsap="payment-card-img"
          />
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.oval-shape {
  width: 100%;
  background: #f7954023;
  -moz-border-radius: 400px / 250px;
  -webkit-border-radius: 400px / 250px;
  border-radius: 400px / 250px;
  z-index: 0;
}
</style>
