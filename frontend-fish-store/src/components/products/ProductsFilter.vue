<script lang="ts" setup>
import { debounce } from 'quasar';
import {
  ProductsTagsSelection,
  ProductsCategorySelection,
} from 'src/components/products';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

defineOptions({
  name: 'ProductsFilter',
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

const showClearFilter = computed(() => {
  const { search, tags, categories } = filter.value;
  return search.length || tags.length || categories.length;
});

function resetFilterSearch() {
  filter.value = structuredClone(initialFilter);
}

const updateFilterParams = debounce((val) => {
  const { search, tags, categories } = val;
  const { sort } = route.query;
  router.replace({
    query: {
      ...(search ? { search } : {}),
      ...(tags.length ? { tags: tags.join(',') } : {}),
      ...(categories.length ? { categories: categories.join(',') } : {}),
      // Add the sort query params
      ...(sort ? { sort } : {}),
    },
  });
}, 800);

watch(
  filter,
  (val) => {
    updateFilterParams(val);
  },
  { deep: true }
);

onMounted(() => {
  const { search, tags, categories } = route.query;
  filter.value.search = search ? String(search) : '';
  filter.value.tags = tags ? String(tags).split(',') : [];
  filter.value.categories = categories ? String(categories).split(',') : [];
});
</script>

<template>
  <div>
    <q-input
      outlined
      v-model="filter.search"
      dense
      clearable
      :label="filter.search?.length ? 'Searching...' : 'Search something'"
    >
      <template #prepend>
        <q-icon name="search" size="32px" />
      </template>
    </q-input>

    <q-separator class="tw-my-6" />

    <products-tags-selection v-model="filter.tags" />

    <q-separator class="tw-my-6" />

    <products-category-selection multiple v-model="filter.categories" />

    <q-separator class="tw-my-6" />

    <div class="tw-text-center md:tw-text-left">
      <q-btn
        color="negative"
        dense
        unelevated
        outline
        :rounded="$q.screen.gt.sm"
        icon="mdi-cancel"
        label="Clear Filters"
        padding="8px 12px"
        class="tw-w-full tw-max-w-[300px]"
        @click="resetFilterSearch"
        v-if="showClearFilter"
      />
    </div>
  </div>
</template>
