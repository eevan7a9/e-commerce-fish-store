<script setup lang="ts">
defineOptions({
  name: 'HomePage',
});
</script>

<template>
  <div
    class="tw-bg-gray-200 tw-py-12 tw-mb-3"
    v-for="(item, i) of new Array(10).fill('__')"
    :key="item"
  >
    <h1 class="tw-text-[50px]">...</h1>

    <small>{{ item }}{{ i }}</small>
  </div>
</template>
