<script setup lang="ts">
import { HomeSearchField, HomeSocials } from 'src/components/home/index';
import { RainStorm } from 'src/components/illustrations';
</script>

<template>
  <section class="hero-bg-image">
    <div
      class="tw-z-10 tw-relative tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-3"
    >
      <div class="tw-font-anton tw-mb-4">
        <h1
          class="tw-text-[42px] lg:tw-text-[60px] tw-font-black 2xl:tw-text-[72px] heading-gradient-primary"
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
          color="accent"
          push
          glossy
          unelevated
          square
        >
          <q-icon
            name="mdi-shopping"
            :size="$q.screen.gt.sm ? '36px' : '24px'"
            class="tw-mr-2"
          />
          <span class="shop-now-btn tw-text-[20px] sm:tw-text-[28px]">
            Shop Now
          </span>
        </q-btn>
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
  height: 70vh;
  max-height: 800px;
  min-height: 400px;
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
    color: white;
    text-shadow: 2px 2px 0 #c00fec, -2px 2px 0 #c00fec, 2px -2px 0 #c00fec,
      -2px -2px 0 #c00fec; /* Adds a shadow to all sides */
    letter-spacing: 2px;
  }
}
</style>
