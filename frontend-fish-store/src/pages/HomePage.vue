<script setup lang="ts">
import {
  HomeSearchField,
  HomeCategories,
  HomeLatestProducts,
  HomeCarousel,
} from 'src/components/home/index';

defineOptions({
  name: 'HomePage',
});
</script>

<template>
  <main class="tw-min-h-screen tw-pb-[200px]">
    <section class="hero-bg-image">
      <div class="tw-w-full tw-h-full tw-flex tw-items-center tw-px-3">
        <home-search-field />
      </div>
    </section>

    <home-categories />
    <home-carousel class="tw-my-[100px] xl:tw-my-[150px] md:tw-px-12" />
    <home-latest-products class="tw-pl-2 lg:tw-pl-12" />
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
    background: rgba(0, 0, 0, 0.363);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  & > * {
    position: relative;
    z-index: 1;
  }
}
</style>
