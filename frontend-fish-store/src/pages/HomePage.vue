<script setup lang="ts">
import {
  HomeCategories,
  HomeCarousel,
  HomeFishingBanner,
  HomeHero,
  HomePaymentSupport,
} from 'src/components/home';
import { ProductsLatestSlide } from 'src/components/products';
defineOptions({
  name: 'HomePage',
});
</script>

<template>
  <main class="tw-min-h-screen tw-pb-[200px]">
    <home-hero />
    <home-categories />

    <home-payment-support />
    <home-fishing-banner class="tw-z-0" />

    <products-latest-slide class="tw-pl-2 lg:tw-pl-12 tw-mt-[80px]">
      <div class="tw-text-center tw-pt-6">
        <q-btn
          to="/products"
          color="primary"
          unelevated
          glossy
          padding="14px 24px"
        >
          <q-icon name="mdi-shopping" />
          <span class="tw-ml-2 md:tw-text-[18px] tw-font-anton">
            View All Products
          </span>
        </q-btn>
      </div>
    </products-latest-slide>

    <home-carousel class="tw-mt-[100px] xl:tw-mt-[150px] md:tw-px-12" />
  </main>
</template>
