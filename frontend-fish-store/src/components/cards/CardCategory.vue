<script setup lang="ts">
import { Category } from 'src/shared/interface/category';

defineOptions({
  name: 'CardCategorty',
});

defineProps<{ category: Category }>();
</script>

<template>
  <q-card
    class="my-card tw-group tw-rounded-2xl tw-max-w-[420px] tw-border tw-cursor-pointer"
    flat
  >
    <div
      class="image-category tw-bg-slate-100 tw-h-[200px] sm:tw-h-[280px] tw-relative tw-overflow-hidden tw-pt-3 tw-flex tw-items-center tw-justify-center"
    >
      <img
        :src="category.imgSrc"
        class="tw-object-contain tw-max-w-[200px] sm:group-hover:tw-scale-150 tw-transition-all tw-ease-in-out tw-duration-300"
      />
      <div
        class="heading-primary-text tw-uppercase tw-py-3 tw-font-anton tw-text-white tw-absolute tw-h-[80px] tw-bottom-0 tw-w-full tw-text-[28px] md:tw-text-[38px] tw-pl-3 tw-bg-black tw-bg-opacity-25"
      >
        {{ category.name }}
      </div>
    </div>

    <q-card-section class="tw-h-[80px] ellipsis-3-lines">
      {{ category.description }}
    </q-card-section>

    <q-card-section></q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
// .image-category {
// background-image: url('/images/svg/block-a.svg');
// &::after {
//   content: '';
//   position: absolute;
//   background-color: rgba(5, 5, 5, 0.253);
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// }
// }
</style>
