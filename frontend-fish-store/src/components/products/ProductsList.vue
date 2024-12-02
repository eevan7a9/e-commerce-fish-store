<script setup lang="ts">
defineOptions({
  name: 'ProductsList',
});
import { useProductsStore } from 'src/stores/products';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { Product } from 'src/shared/interface/product';
import { ProductsListEmpty } from 'src/components/products';
import { LocationQuery, useRoute } from 'vue-router';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const productsSore = useProductsStore();

const props = defineProps<{ enableAnimation?: boolean }>();

const filter = reactive<{
  search: string;
  tags: string[];
  categories: string[];
}>({
  search: '',
  tags: [],
  categories: [],
});
const sort = ref('');

const productsLoading = computed(() => productsSore.loading);

const products = computed(() => {
  let temp = productsSore.list;

  if (filter.search) {
    temp = filterBySearch(temp, filter.search);
  }
  if (filter.tags?.length) {
    temp = filterByTags(temp, filter.tags);
  }
  if (filter.categories?.length) {
    temp = filterByCategories(temp, filter.categories);
  }

  switch (sort.value) {
    case 'name':
      temp = sortByName(temp);
      break;
    case 'price':
      temp = sortByPrice(temp);
      break;
    default:
      temp = sortByDate(temp);
      break;
  }
  return temp;
});

function filterBySearch(list: Product[], search = '') {
  search = search?.toLowerCase();
  return list.filter((product) => {
    const name = product.name.toLowerCase();
    const desc = product.description.toLowerCase();
    if (name.includes(search) || desc.includes(search)) {
      return product;
    }
  });
}

function filterByTags(list: Product[], tags: string[] = []) {
  return list.filter((product) =>
    tags.every((tag) => product.tags.includes(tag))
  );
}

function filterByCategories(list: Product[], categories: string[] = []) {
  return list.filter(
    (product) =>
      product.category_name && categories.includes(product.category_name)
  );
}

function sortByName(list: Product[]) {
  return list.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  });
}

function sortByDate(list: Product[]) {
  return list.sort((a, b) => {
    const aDate = new Date(a.created_at);
    const bDate = new Date(b.created_at);
    return bDate.getTime() - aDate.getTime();
  });
}

function sortByPrice(list: Product[]) {
  return list.sort((a, b) => b.price - a.price);
}

function setParamsToState(query: LocationQuery) {
  const { search, tags, categories, sort: sortQuery } = query;
  // Filters
  filter.search = search ? String(search) : '';
  filter.tags = tags ? String(tags).split(',') : [];
  filter.categories = categories ? String(categories).split(',') : [];
  // Sorts
  sort.value = sortQuery ? String(sortQuery) : '';
}

watch(
  () => route.query,
  (queryParams) => {
    setParamsToState(queryParams);
  },
  { deep: true }
);

onMounted(() => {
  setParamsToState(route.query);
  if (props.enableAnimation) {
    gsap.from('[gsap="products-card"]', {
      y: 300,
      opacity: 0,
      scale: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: 'sine.inOut',
    });
  }
});
</script>

<template>
  <div>
    <div
      class="tw-flex tw-flex-wrap tw-justify-center lg:tw-justify-start tw-gap-y-6 tw-gap-x-3"
    >
      <div v-for="product of products" :key="product.id" gsap="products-card">
        <!-- <card-product
          class="tw-max-w-[350px]"
          :product="product"
        /> -->
        <slot :product="product"></slot>
      </div>
    </div>

    <div class="tw-w-full tw-py-[300px] tw-text-center" v-if="productsLoading">
      <h1 class="tw-text-[28px] tw-font-anton tw-font-normal">
        Fetching Products...
      </h1>
      <q-spinner-hourglass
        color="primary"
        size="4em"
        class="tw-mx-auto tw-mt-3"
      />
    </div>

    <products-list-empty
      :empty="!products.length"
      :filtered="
        !!(filter.tags?.length || filter.search || filter.categories?.length)
      "
      v-else
    />
  </div>
</template>
