<script setup lang="ts">
import {
  ProductsList,
  ProductsFilter,
  ProductsSort,
} from 'src/components/products';
import { CardProduct } from 'src/components/cards';
defineOptions({
  name: 'ProductsPage',
});
</script>

<template>
  <main
    class="tw-max-w-screen-xl tw-relative tw-mx-auto tw-grid md:tw-grid-cols-12 tw-min-h-screen"
  >
    <aside class="md:tw-col-span-3 tw-pt-12 tw-px-3 md:tw-px-6">
      <products-filter enable-animation class="md:tw-sticky md:tw-top-[80px]" />
    </aside>

    <section class="md:tw-col-span-9 tw-relative tw-py-8 md:tw-py-12">
      <div
        class="tw-mb-12 tw-flex tw-gap-3 tw-px-3 md:tw-px-0 tw-flex-wrap tw-justify-center md:tw-justify-end tw-items-center"
      >
        <products-sort class="tw-py-2 tw-w-full tw-max-w-[300px]" />
      </div>

      <products-list enable-animation>
        <template #default="{ product }">
          <card-product
            class="tw-max-w-[350px]"
            :view-redirect="'/products/' + product.id"
            :product="product"
          />
        </template>
      </products-list>
    </section>
  </main>
</template>
