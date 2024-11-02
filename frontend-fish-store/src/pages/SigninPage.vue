<script setup lang="ts">
import { FormSignin } from 'src/components/forms';
defineOptions({
  name: 'SigninPage',
});
</script>

<template>
  <q-card flat class="tw-border tw-w-full tw-mx-auto tw-pb-6">
    <q-card-section class="tw-flex tw-items-center">
      <q-avatar>
        <q-img src="~assets/koi-logo.webp" />
      </q-avatar>
      <h1 class="tw-text-[24px] tw-font-normal tw-font-anton tw-ml-2">
        {{ $t('auth.signin') }}
      </h1>
    </q-card-section>

    <q-card-section class="tw-flex tw-flex-col md:tw-flex-row">
      <div class="md:tw-pr-6 md:tw-border-r md:tw-min-w-[450px]">
        <form-signin />
      </div>

      <div class="tw-px-3 md:tw-px-5">
        <h1 class="tw-text-[20px] tw-font-normal tw-font-anton tw-ml-2">
          {{ $t('auth.socials') }}:
        </h1>

        <div
          class="tw-flex tw-gap-4 tw-py-4 tw-justify-center sm:tw-justify-start tw-w-full"
        >
          <q-btn
            icon="mdi-google"
            color="primary"
            outline
            padding="6px"
            size="20px"
            round
          />
          <q-btn
            icon="mdi-github"
            color="primary"
            outline
            padding="6px"
            size="20px"
            round
          />
          <q-btn
            icon="mdi-facebook"
            color="primary"
            outline
            padding="6px"
            size="20px"
            round
          />
        </div>

        <q-separator class="tw-mb-4" />

        <h1
          class="tw-text-[20px] tw-font-normal tw-font-anton tw-ml-2 tw-min-w-[350px]"
        >
          {{ $t('auth.signupNot') }}
        </h1>
        <q-btn
          outline
          color="primary"
          to="/auth/register"
          class="tw-mt-4 tw-w-full"
        >
          {{ $t('auth.registerHere') }}
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>
