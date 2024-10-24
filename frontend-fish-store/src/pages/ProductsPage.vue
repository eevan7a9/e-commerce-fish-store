<script setup lang="ts">
import { ref } from 'vue';
import {
  ProductsList,
  ProductsTagsFilter,
  ProductsCategoryFilter,
} from 'src/components/products';

defineOptions({
  name: 'ProductsPage',
});

const searchText = ref('');
const tagsSelected = ref([]);
const categorySelected = ref([]);
</script>

<template>
  <main
    class="tw-max-w-screen-xl tw-relative tw-mx-auto tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-min-h-screen"
  >
    <aside class="md:tw-col-span-3 tw-pt-12 tw-px-3 md:tw-px-6">
      <div class="md:tw-sticky md:tw-top-[80px]">
        <q-input
          outlined
          v-model="searchText"
          :label="searchText.length ? 'Searching...' : 'Search something'"
        >
          <template #prepend>
            <q-icon name="search" size="32px" />
          </template>
        </q-input>

        <q-separator class="tw-my-6" />
        <products-tags-filter v-model="tagsSelected" />
        <q-separator class="tw-my-6" />
        <products-category-filter v-model="categorySelected" />
        <q-separator class="tw-my-6" />
      </div>
    </aside>

    <section class="md:tw-col-span-9 tw-bg-slate-100 tw-relative tw-py-8">
      <div
        class="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-justify-items-center tw-gap-6"
      >
        <products-list />
      </div>
    </section>
  </main>
</template>
