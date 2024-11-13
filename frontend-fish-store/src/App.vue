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
  const expirationTime = new Date(SessionStorage.getItem('expires') || '');

  console.log(expirationTime);
  // If the current time is past the expiration time
  if (currentTime >= expirationTime) {
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
    // check for 'true' in the TEST_DATA env variable
    console.log('Load mock data...');
    products.loadMockProducts();
    categories.loadMockCategories();
    tags.loadMockTags();

    console.log({
      mode: process.env.NODE_ENV,
      appName: process.env.VUE_APP_NAME,
      port: process.env.VUE_APP_DEV_PORT,
      server: process.env.SERVER_API_URL,
    });
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
