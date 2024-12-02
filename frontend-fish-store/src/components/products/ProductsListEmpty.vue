<script lang="ts" setup>
defineOptions({
  name: 'ProductListEmpty',
});

const props = defineProps<{
  empty: boolean;
  filtered: boolean;
}>();
</script>

<template>
  <div
    v-if="props.empty"
    class="heading-primary-text tw-px-12 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center"
  >
    <h1 class="tw-text-[24px] md:tw-text-[32px] tw-font-bold">
      There are currently no items to display.
    </h1>

    <q-img
      src="~assets/image-svg/empty-box.svg"
      class="tw-my-[24px] tw-max-w-[300px] animate-float"
      width="100%"
      height="100%"
    />
    <h1
      class="tw-text-[24px] md:tw-text-[32px] tw-font-bold"
      v-if="props.filtered"
    >
      No items available for the chosen filters.
    </h1>
  </div>
</template>
