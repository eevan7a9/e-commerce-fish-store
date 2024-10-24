<script setup lang="ts">
import { Category } from 'src/shared/interface/category';

defineOptions({
  name: 'CardCategorty',
});

defineProps<{ category: Category }>();
</script>

<template>
  <q-card
    class="my-card tw-rounded-2xl tw-max-w-[420px] tw-border tw-cursor-pointer"
    flat
  >
    <div
      class="image-category tw-bg-slate-100 tw-h-[200px] sm:tw-h-[280px] tw-relative tw-overflow-hidden tw-pt-3 tw-flex tw-items-center tw-justify-center"
    >
      <img :src="category.imgSrc" class="tw-object-contain tw-max-h-[250px]" />
      <div
        class="category-title tw-py-3 tw-font-anton tw-text-white tw-absolute tw-h-[80px] tw-bottom-0 tw-w-full tw-text-[28px] md:tw-text-[38px] tw-pl-3 tw-bg-black tw-bg-opacity-25"
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

.category-title {
  color: $primary;
  text-shadow: 2px 2px 0 white, -2px 2px 0 white, 2px -2px 0 white,
    -2px -2px 0 white; /* Adds a shadow to all sides */
}
</style>
