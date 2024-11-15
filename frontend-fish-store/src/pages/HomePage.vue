<script setup lang="ts">
import {
  HomeCategories,
  HomeLatestProducts,
  HomeCarousel,
  HomeFishingBanner,
  HomeHero,
} from 'src/components/home/index';
defineOptions({
  name: 'HomePage',
});
</script>

<template>
  <main class="tw-min-h-screen tw-pb-[200px]">
    <home-hero />
    <home-categories />
    <home-fishing-banner />
    <home-latest-products class="tw-pl-2 lg:tw-pl-12 tw-mt-[80px]" />
    <home-carousel class="tw-mt-[100px] xl:tw-mt-[150px] md:tw-px-12" />
  </main>
</template>
