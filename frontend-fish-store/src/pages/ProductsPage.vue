<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import {
  ProductsList,
  ProductsTagsFilter,
  ProductsCategoryFilter,
} from 'src/components/products';

import { MenuSort } from 'src/components/menus';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'quasar';

defineOptions({
  name: 'ProductsPage',
});

const router = useRouter();
const route = useRoute();

// for Filter
const initialFilter = {
  search: '',
  tags: [],
  categories: [],
};
const filter = ref<{
  search: string;
  tags: string[];
  categories: string[];
}>(structuredClone(initialFilter));

// for Sort
const sort = ref('');

const updateParams = debounce((val) => {
  const { search, tags, categories, sort } = val;
  router.replace({
    query: {
      ...(search ? { search } : {}),
      ...(tags.length ? { tags: tags.join(',') } : {}),
      ...(categories.length ? { categories: categories.join(',') } : {}),
      ...(sort ? { sort } : {}),
    },
  });
}, 800);

watch(
  [filter, sort],
  (val) => {
    const params = { ...val[0], sort: val[1] };
    updateParams(params);
  },
  { deep: true }
);
watch(
  () => route.fullPath,
  (val) => {
    if (val === '/products') {
      filter.value = structuredClone(initialFilter);
      sort.value = 'latest';
    }
  }
);
onMounted(() => {
  const { search, tags, categories, sort: sortQuery } = route.query;

  filter.value.search = search ? String(search) : '';
  filter.value.tags = tags ? String(tags).split(',') : [];
  filter.value.categories = categories ? String(categories).split(',') : [];
  sort.value = sortQuery ? String(sortQuery) : 'latest';
});
</script>

<template>
  <main
    class="tw-max-w-screen-xl tw-relative tw-mx-auto tw-grid md:tw-grid-cols-12 tw-min-h-screen"
  >
    <aside class="md:tw-col-span-3 tw-pt-12 tw-px-3 md:tw-px-6">
      <div class="md:tw-sticky md:tw-top-[80px]">
        <q-input
          outlined
          v-model="filter.search"
          clearable
          :label="filter.search?.length ? 'Searching...' : 'Search something'"
        >
          <template #prepend>
            <q-icon name="search" size="32px" />
          </template>
        </q-input>

        <q-separator class="tw-my-6" />
        <products-tags-filter v-model="filter.tags" />
        <q-separator class="tw-my-6" />
        <products-category-filter v-model="filter.categories" />
        <q-separator class="tw-my-6" />
      </div>
    </aside>

    <section
      class="md:tw-col-span-9 tw-bg-slate-100 tw-relative tw-py-8 md:tw-py-12"
    >
      <div class="tw-mb-12 tw-flex">
        <menu-sort v-model="sort" class="tw-ml-auto tw-mr-0" />
      </div>

      <products-list />
    </section>
  </main>
</template>
