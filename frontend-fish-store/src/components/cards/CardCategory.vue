<script setup lang="ts">
import { Category } from 'src/shared/interface/category';

defineOptions({
  name: 'CardCategorty',
});

defineProps<{ category: Category; index: number }>();
</script>

<template>
  <q-card
    class="my-card tw-group tw-rounded-2xl tw-max-w-[420px] tw-border tw-cursor-pointer"
    flat
  >
    <div
      class="image-category tw-h-[200px] sm:tw-h-[280px] tw-relative tw-overflow-hidden tw-pt-3 tw-flex tw-items-center tw-justify-center"
      :class="[
        { 'image-1': index === 0 },
        { 'image-2': [1, 2].includes(index) },
        { 'image-3': index >= 3 },
        { 'flip-bg': index % 2 === 0 },
      ]"
    >
      <q-icon
        name="search"
        size="32px"
        color="accent"
        class="tw-absolute tw-top-3 tw-right-3 tw-transition-opacity tw-ease-in-out tw-duration-500 group-hover:tw-opacity-0 tw-bg-black tw-bg-opacity-15 tw-rounded-full tw-p-1"
      />
      <img
        :src="category.imgSrc"
        alt="category_img"
        fit="contain"
        class="tw-object-contain tw-max-w-[150px] sm:tw-max-w-[300px] sm:tw-max-h-[150px] tw-z-20 sm:group-hover:tw-scale-125 tw-transition-all tw-ease-in-out tw-duration-300"
      />
      <div
        class="heading-primary-text tw-flex tw-items-center tw-font-anton tw-absolute tw-h-[80px] tw-bottom-0 tw-w-full tw-pl-3 sm:tw-bg-accent sm:tw-bg-opacity-15"
      >
        <span
          class="tw-uppercase tw-py-3 tw-text-[28px] sm:tw-text-[34px] xl:tw-text-[42px]"
        >
          {{ category.name }}
        </span>
      </div>
    </div>

    <q-card-section class="tw-h-[80px] ellipsis-3-lines">
      {{ category.description }}
    </q-card-section>

    <q-card-section></q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.image-category {
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center bottom;
    // opacity: 0.8;
  }
  &.image-1::before {
    background-image: url('/images/fish-bg-category.png');
  }
  &.image-2::before {
    background-image: url('/images/fish-bg-category-2.png');
  }
  &.image-3::before {
    background-image: url('/images/fish-bg-category-3.png');
  }
  // Flip the background when .flip-bg class is added
  &.flip-bg::before {
    transform: scaleX(-1);
  }
}

@media (max-width: 600px) {
  .image-category {
    &::before {
      background-size: cover;
    }
  }
}
</style>
