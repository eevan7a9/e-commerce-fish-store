<script lang="ts" setup>
import { computed } from 'vue';
import { CardCategory } from 'src/components/cards';
import { useCategoriesStore } from 'src/stores/categories';
import { Dialog } from 'quasar';
import { Category } from 'src/shared/interface/category';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'HomeCategories',
});

const categoriesStore = useCategoriesStore();
const categories = computed(() => categoriesStore.list);
const router = useRouter();
function categoryShow(category: Category) {
  Dialog.create({
    color: 'primary',
    title: category.name,
    message: category.description,
    cancel: true,
    ok: {
      label: 'FIND Products',
    },
  }).onOk(() => {
    router.push({
      path: '/products',
      query: { categories: category.name },
    });
  });
}
</script>

<template>
  <div class="tw-relative tw-max-w-screen-2xl tw-mx-auto tw-px-3 2xl:tw-px-5">
    <div
      class="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-justify-items-center tw-gap-5 -tw-translate-y-[60px]"
    >
      <template v-for="item of categories" :key="item.name">
        <card-category @click="categoryShow(item)" :category="item" />
      </template>
    </div>
  </div>
</template>
