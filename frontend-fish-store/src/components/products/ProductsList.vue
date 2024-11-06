<script setup lang="ts">
defineOptions({
  name: 'ProductsList',
});
import { useProductsStore } from 'src/stores/products';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { CardProduct } from 'src/components/cards';
import { Product } from 'src/shared/interface/product';
import { ProductsListEmpty } from 'src/components/products';
import { LocationQuery, useRoute } from 'vue-router';

const route = useRoute();
const productsSore = useProductsStore();

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
});
</script>

<template>
  <div
    class="tw-grid sm:tw-grid-cols-2 xl:tw-grid-cols-3 tw-justify-items-center tw-gap-y-6 tw-gap-x-3"
  >
    <card-product
      v-for="product of products"
      :key="product.id"
      class="tw-max-w-[350px]"
      :product="product"
    />
  </div>

  <products-list-empty
    :empty="!products.length"
    :filtered="
      !!(filter.tags?.length || filter.search || filter.categories?.length)
    "
  />
</template>
