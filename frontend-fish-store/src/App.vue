<template>
  <router-view class="tw-bg-slate-100" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import { useLang } from './shared/composables/useLang';
import { useProductsStore } from './stores/products';
import { useCategoriesStore } from './stores/categories';

import productsTestData from 'src/assets/test-data/products';
import categoriesTestData from 'src/assets/test-data/categories';
import { useCartStore } from './stores/cart';

defineOptions({
  name: 'App',
});

const auth = useAuthStore();
const lang = useLang();
const products = useProductsStore();
const categories = useCategoriesStore();
const carts = useCartStore();

onMounted(() => {
  // Fetch initial data
  products.setProducts(productsTestData);
  categories.setCategories(categoriesTestData);

  auth.loadUser();
  lang.loadLanguage();
  carts.loadItems();
  console.log('loading user...');
});

console.log({
  mode: process.env.NODE_ENV,
  appName: process.env.VUE_APP_NAME,
  port: process.env.VUE_APP_DEV_PORT,
});
</script>
