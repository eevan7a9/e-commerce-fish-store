<script lang="ts" setup>
import { computed } from 'vue';
import { CardCategory } from 'src/components/cards';
import { useCategoriesStore } from 'src/stores/categories';
defineOptions({
  name: 'HomeCategories',
});

const categoriesStore = useCategoriesStore();
const categories = computed(() => categoriesStore.list);
</script>

<template>
  <div class="tw-relative tw-max-w-screen-2xl tw-mx-auto tw-px-3 2xl:tw-px-5">
    <div
      class="tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-justify-items-center tw-gap-5 -tw-translate-y-14"
    >
      <template v-for="item of categories" :key="item.name">
        <card-category :category="item" />
      </template>
    </div>
  </div>
</template>
