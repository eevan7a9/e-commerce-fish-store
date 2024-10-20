<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import { useLang } from './shared/composables/useLang';

defineOptions({
  name: 'App',
});

const auth = useAuthStore();
const lang = useLang();

onMounted(() => {
  auth.loadUser();
  lang.loadLanguage();
  console.log('loading user...');
});

console.log({
  mode: process.env.NODE_ENV,
  appName: process.env.VUE_APP_NAME,
  port: process.env.VUE_APP_DEV_PORT,
});
</script>
