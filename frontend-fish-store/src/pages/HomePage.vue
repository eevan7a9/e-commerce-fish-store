<script setup lang="ts">
import {
  HomeSearchField,
  HomeCategories,
  HomeLatestProducts,
  HomeCarousel,
  HomeFishingBanner,
  HomeSocials,
} from 'src/components/home/index';
import { RainStorm } from 'src/components/illustrations';
defineOptions({
  name: 'HomePage',
});
</script>

<template>
  <main class="tw-min-h-screen tw-pb-[200px]">
    <section class="hero-bg-image">
      <div
        class="tw-z-10 tw-relative tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-3"
      >
        <div class="tw-font-anton tw-mb-4">
          <h1
            class="tw-text-[42px] tw-font-black xl:tw-text-[72px] heading-gradient-primary"
          >
            Hooked on Quality!
          </h1>
        </div>

        <home-socials class="tw-my-3" />
        <home-search-field />

        <div class="tw-text-center tw-py-[40px]">
          <q-btn
            to="/products"
            class="tw-w-[300px] tw-h-[40px] sm:tw-h-[60px] tw-font-anton hover:tw-scale-110 tw-transition-all tw-duration-300 tw-ease-in-out"
            padding="8px "
            color="primary"
            glossy
          >
            <span class="tw-font-black tw-text-[20px] sm:tw-text-[28px]">
              Shop Now
            </span>
          </q-btn>
        </div>
      </div>

      <div class="tw-absolute tw-w-full tw-top-0 tw-h-[400px] tw-z-0">
        <rain-storm />
      </div>
    </section>

    <home-categories />
    <home-fishing-banner />
    <home-latest-products class="tw-pl-2 lg:tw-pl-12 tw-mt-[80px]" />
    <home-carousel class="tw-mt-[100px] xl:tw-mt-[150px] md:tw-px-12" />
  </main>
</template>

<style lang="scss" scoped>
.hero-bg-image {
  background-image: url('/images/showcase-bg.webp');
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  height: 50vh;
  min-height: 500px;
  position: relative;
  &::before {
    content: '';
    background: rgba(0, 0, 0, 0.247);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
}
</style>
