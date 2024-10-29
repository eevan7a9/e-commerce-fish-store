<script setup lang="ts">
import { RainStorm, FishingNight, WaterWave } from '../illustrations';

defineOptions({
  name: 'HomeFishing',
});
</script>

<template>
  <section class="fishing-container tw-text-white">
    <rain-storm />
    <water-wave />

    <div
      class="tw-max-w-screen-2xl tw-mx-auto tw-grid md:tw-grid-cols-6 tw-relative tw-pl-8 tw-h-2xl:tw-pl-2"
    >
      <div
        class="tw-h-full tw-pt-12 md:tw-col-span-2 tw-flex tw-flex-col tw-items-center tw-justify-center"
      >
        <h1
          class="heading-primary-text animate-float tw-text-center md:tw-text-left tw-w-full tw-font-anton tw-font-bold tw-text-[32px] sm:tw-text-[38px] xl:tw-text-[42px] tw-leading-[150%]"
        >
          Cast Your Net <br />
          On Our Top Selections!
        </h1>
        <p
          class="tw-w-full tw-text-center md:tw-text-left tw-py-3 sm:tw-text-[28px]"
        >
          From the Waters to Your Table
        </p>
      </div>

      <div
        class="tw-w-full tw-max-w-[700px] tw-h-[500px] tw-rounded-full tw-relative"
      >
        <fishing-night />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.fishing-container {
  background-color: #243c5b;
  position: relative;
}
</style>
