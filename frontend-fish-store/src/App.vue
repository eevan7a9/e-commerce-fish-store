<template>
  <router-view class="tw-bg-slate-100" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import { useLang } from './shared/composables/useLang';
import { useProductsStore } from './stores/products';
import { useCategoriesStore } from './stores/categories';

import { useCartStore } from './stores/cart';
import { useTagsStore } from './stores/tags';
import { SessionStorage } from 'quasar';
import { useLogout } from './shared/composables/useLogout';

defineOptions({
  name: 'App',
});

const auth = useAuthStore();
const lang = useLang();
const products = useProductsStore();
const categories = useCategoriesStore();
const tags = useTagsStore();
const carts = useCartStore();

const logout = useLogout();

function checkTokenExpiration() {
  const currentTime = new Date();
  const expirationTime =
    SessionStorage.getItem('expires') &&
    new Date(SessionStorage.getItem('expires') || '');

  // If the current time is past the expiration time
  if (expirationTime && currentTime >= expirationTime) {
    logout.logout({
      color: 'negative',
      message: 'Session expired or invalid',
    });
  }
}

onMounted(() => {
  // Fetch initial data
  console.log('set initial data...');
  if (process.env.ENABLE_STATIC_MODE === 'true') {
    products.fetchJsonProducts();
    categories.fetchJsonCategories();
    tags.fetchJsonTags();
  } else {
    // fetch Data from Server
    console.log('Fetch data from server...');
    products.fetchProducts();
    categories.fetchCategories();
    tags.fetchTags();
  }

  auth.loadUser();
  lang.loadLanguage();
  carts.loadItems();
  console.log('loading user...');

  checkTokenExpiration();
});
</script>
