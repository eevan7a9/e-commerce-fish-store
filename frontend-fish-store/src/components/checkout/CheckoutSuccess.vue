<script setup lang="ts">
import { Loading } from 'quasar';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'CheckoutSuccess',
});

const router = useRouter();

function backToHome() {
  Loading.show({
    spinnerColor: 'primary',
  });
  setTimeout(() => {
    router.push('/');
    Loading.hide();
  }, 1500);
}
</script>

<template>
  <q-card flat class="tw-border">
    <q-card-section class="tw-pt-[32px] tw-text-center">
      <h1 class="tw-text-[24px] md:tw-text-[32px] tw-font-anton">
        Checkout Complete
      </h1>
    </q-card-section>

    <q-card-section class="tw-w-full tw-flex tw-justify-center">
      <q-img src="~assets/image-svg/complete_success.svg" width="340px" />
    </q-card-section>

    <q-card-section class="">
      <p
        class="sm:tw-text-[16px] tw-leading-[120%] md:tw-leading-[150%] tw-text-center tw-mx-auto tw-max-w-[320px] sm:tw-max-w-[600px]"
      >
        Your order has been successfully placed! We'll send a confirmation email
        with your order details and tracking information soon. You can expect
        updates as your order progresses.
      </p>
    </q-card-section>

    <q-card-actions
      class="tw-pb-8 tw-px-4 sm:tw-px-8 tw-flex tw-justify-center"
    >
      <q-btn
        color="primary"
        class="tw-w-full sm:tw-w-auto"
        padding="8px 24px"
        label="Back to Home"
        @click="backToHome()"
      />
    </q-card-actions>
  </q-card>
</template>
