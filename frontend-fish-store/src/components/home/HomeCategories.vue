<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { CardCategory } from 'src/components/cards';
import { useCategoriesStore } from 'src/stores/categories';
import { Dialog } from 'quasar';
import { Category } from 'src/shared/interface/category';
import { useRouter } from 'vue-router';
// Animation
import { gsap } from 'gsap';

defineOptions({
  name: 'HomeCategories',
});

const categoriesStore = useCategoriesStore();
const router = useRouter();

const categories = computed(() => categoriesStore.list);
const categoriesLoading = computed(() => categoriesStore.loading);

function categoryShow(category: Category) {
  Dialog.create({
    color: 'primary',
    title: category.name.toUpperCase(),
    message: category.description,
    cancel: true,
    ok: {
      icon: 'search',
      label: 'FIND Products',
    },
  }).onOk(() => {
    router.push({
      path: '/products',
      query: { categories: category.name },
    });
  });
}

onMounted(() => {
  gsap.from('[gsap="home-category-card"]', {
    scrollTrigger: {
      trigger: '[gsap="home-categories-container"]',
      start: 'top bottom', // Start animation when top of container is at the bottom of the viewport
      toggleActions: 'play none none reverse', // Adjust based on behavior needed
    },
    y: 500,
    stagger: 0.2,
    scale: 0,
  });
});
</script>

<template>
  <div
    gsap="home-categories-container"
    class="tw-relative tw-max-w-screen-2xl tw-mx-auto tw-px-3 2xl:tw-px-5"
  >
    <div
      class="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-justify-items-center tw-gap-5 -tw-translate-y-[60px]"
    >
      <template v-for="(item, i) of categories" :key="item.name">
        <card-category
          @click="categoryShow(item)"
          :index="i"
          :category="item"
          gsap="home-category-card"
        />
      </template>
    </div>

    <div
      class="tw-w-full tw-py-[200px] tw-text-center"
      v-if="categoriesLoading"
    >
      <h1 class="tw-text-[28px] tw-font-anton tw-font-normal">
        Fetching Categories...
      </h1>
      <q-spinner-hourglass
        color="primary"
        size="4em"
        class="tw-mx-auto tw-mt-3"
      />
    </div>
  </div>
</template>
