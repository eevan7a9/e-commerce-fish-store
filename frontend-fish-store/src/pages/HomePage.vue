<script setup lang="ts">
import {
  HomeCategories,
  HomeCarousel,
  HomeFishingBanner,
  HomeHero,
  HomePaymentSupport,
} from 'src/components/home';
import { ProductsLatestSlide } from 'src/components/products';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

defineOptions({
  name: 'HomePage',
});
</script>

<template>
  <main class="tw-min-h-screen tw-pb-[200px]">
    <home-hero />
    <div class="tw-h-[130px]" v-if="$q.screen.lt.md"></div>
    <home-categories />

    <home-payment-support />
    <home-fishing-banner class="tw-z-0 tw-mb-12 md:tw-mb-16" />

    <section class="tw-max-w-screen-xl tw-mx-auto tw-bg-white">
      <div class="tw-py-[3px] tw-px-3 md:tw-px-8">
        <products-latest-slide enable-animation class="tw-pl-2 lg:tw-pl-12 tw-mt-[80px]">
          <div class="tw-text-center tw-py-6">
            <q-btn to="/products" color="primary" unelevated glossy padding="14px 24px">
              <q-icon name="mdi-shopping" />
              <span class="tw-ml-2 md:tw-text-[18px] tw-font-anton">
                View All Products
              </span>
            </q-btn>
          </div>
        </products-latest-slide>
      </div>
    </section>

    <home-carousel class="tw-mt-[50px] xl:tw-mt-[80px] md:tw-px-12" />
  </main>
</template>
