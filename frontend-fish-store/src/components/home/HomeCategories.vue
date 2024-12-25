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
  <section gsap="home-categories-container" class="tw-relative tw-max-w-screen-xl tw-mx-auto tw-px-3 2xl:tw-px-5">
    <div class="tw-py-8 md:tw-py-16">
      <h1 class="tw-text-[18px] lg:tw-text-[22px] tw-font-anton">
        Explore Categories
      </h1>
      <p class="lg:tw-text-[18px] tw-mt-3">
        Whether you're fishing or feasting, explore our curated categories of
        fresh fish and premium bait.
      </p>

      <div
        class="tw-mt-8 tw-py-8 tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-justify-items-center tw-gap-12 lg:tw-gap-3">
        <template v-for="(item, i) of categories" :key="i.name">
          <card-category gsap="home-category-card" class="tw-col-span-1" @click="categoryShow(item)" :category="item" />
        </template>
      </div>
    </div>

    <div class="tw-w-full tw-py-[200px] tw-text-center" v-if="categoriesLoading">
      <h1 class="tw-text-[28px] tw-font-anton tw-font-normal">
        Fetching Categories...
      </h1>
      <q-spinner-hourglass color="primary" size="4em" class="tw-mx-auto tw-mt-3" />
    </div>
  </section>
</template>
