<script setup lang="ts">
import { HomeSocials } from 'src/components/home/index';
import { RainStorm } from 'src/components/illustrations';
import CardLatestProduct from '../cards/CardLatestProduct.vue';
</script>

<template>
  <section class="hero-bg-image">
    <div
      class="tw-z-10 tw-relative tw-max-w-screen-xl tw-mx-auto tw-w-full tw-h-full tw-flex tw-flex-col md:tw-flex-row tw-items-center">
      <div class="tw-w-full tw-px-3 tw-text-center md:tw-text-left tw-pt-8">
        <home-socials class="tw-mb-4 md:tw-mb-5" />

        <h1
          class="tw-font-anton tw-mb-3 tw-text-[41px] lg:tw-text-[60px] xl:tw-text-[68px] tw-font-black heading-gradient-primary">
          Hooked on Quality!
        </h1>

        <p class="tw-text-white tw-text-[16px] sm:tw-text-[20px] xl:tw-text-[24px] tw-mt-5 tw-mb-6 sm:tw-mb-10">Fresh
          Fish and Bait,
          Delivered Right
          to You.
        </p>

        <div class="tw-mb-4 sm:tw-mb-[20px] xl:tw-mb-[30px]">
          <q-btn to="/products"
            class="tw-w-[250px] xl:tw-w-[300px] tw-h-[40px] lg:tw-h-[50px] xl:tw-h-[60px] tw-font-anton hover:tw-scale-110 tw-transition-all tw-duration-300 tw-ease-in-out"
            padding="8px " color="white">
            <q-icon name="mdi-shopping" color="accent" :size="$q.screen.gt.lg ? '36px' : '24px'" class="tw-mr-2" />
            <span class="shop-now-btn tw-text-[18px] lg:tw-text-[20px] xl:tw-text-[24px]">
              Shop Now
            </span>
          </q-btn>
        </div>
      </div>

      <div class="tw-w-full">
        <card-latest-product />
      </div>
    </div>

    <div class="tw-absolute tw-w-full tw-top-0 tw-h-[400px] tw-z-0">
      <rain-storm />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-bg-image {
  background-image: url('/images/showcase-bg.webp');
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  height: 50vh;
  max-height: 800px;
  min-height: 480px;
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

  .shop-now-btn {
    color: #e4e4e4;
    text-shadow: 1px 1px 0 #c00fec, -1px 1px 0 #c00fec, 1px -1px 0 #c00fec,
      -1px -1px 0 #c00fec;
    /* Adds a shadow to all sides */
    letter-spacing: 1px;
  }
}
</style>
