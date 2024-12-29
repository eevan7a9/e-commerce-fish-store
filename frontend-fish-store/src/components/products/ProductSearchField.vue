<script setup lang="tsx">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'HomeSearchField',
});

const router = useRouter();
const search = ref('');

function submit() {
  if (!search.value) return;
  router.push({ path: '/products', query: { search: search.value } }).then(() => {
    search.value = ''
  });
}
</script>

<template>
  <div
    class="tw-text-dark tw-rounded-lg tw-bg-opacity-75 tw-h-[40px] sm:tw-h-[48px] tw-w-full tw-max-w-[350px] tw-flex">
    <input v-model="search" placeholder="Search..." @keydown.enter="submit()"
      class="tw-border tw-py-2 tw-pl-5 placeholder:tw-text-[14px] tw-text-[16px] lg:tw-text-[18px] tw-w-full tw-h-full tw-rounded-tl-lg tw-rounded-bl-lg" />
    <button v-ripple @click="submit()" aria-label="home-search-btn"
      class="tw-bg-white tw-relative tw-h-full tw-px-3 tw-rounded-tr-lg tw-rounded-br-lg">
      <q-icon name="search" color="primary" class="" size="20px" />
    </button>
  </div>
</template>
