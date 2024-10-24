<script setup lang="tsx">
import { Product } from 'src/shared/interface/product';

defineOptions({
  name: 'CardProduct',
});
defineProps<{ product: Product }>();

const lorem =
  'Taisho Sanke, or Sanke for short, are koi with a solid white base overlaid by patterns of both red and black. It is commonly said that a high quality Sanke pattern begins with a great Kohaku pattern, to which the black is a welcome complement.';
</script>

<template>
  <q-card class="my-card tw-pb-3 tw-relative tw-border" flat>
    <q-badge class="tw-absolute tw-text-[16px] tw-py-2 -tw-translate-y-3">
      Culinary
    </q-badge>
    <img src="https://cdn.quasar.dev/img/mountains.jpg" draggable="false" />

    <q-card-section>
      <div class="text-h6">{{ product.name }}</div>
      <div class="text-subtitle2">
        Added at: {{ new Date().toLocaleDateString() }}
      </div>
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="tw-max-h-[100px] ellipsis-3-lines">
        {{ lorem }}
      </div>
    </q-card-section>

    <q-card-section class="tw-relative tw-px-0 tw-flex">
      <div
        class="tw-bg-primary tw-font-anton tw-flex tw-items-center tw-text-[20px] tw-text-white tw-px-4 tw-min-w-[150px] tw-max-w-[200px] tw-rounded-r-full"
      >
        $200.00
      </div>
      <q-btn
        icon="add_shopping_cart"
        class="tw-ml-auto tw-mr-[24px] tw-text-[16px]"
        round
        color="primary"
      >
      </q-btn>
    </q-card-section>
  </q-card>
</template>
