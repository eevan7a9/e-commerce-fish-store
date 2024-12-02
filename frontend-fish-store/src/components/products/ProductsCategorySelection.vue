<script setup lang="ts">
import { Category } from 'src/shared/interface/category';
import { useCategoriesStore } from 'src/stores/categories';
import { computed, onMounted } from 'vue';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

defineOptions({
  name: 'ProductsCategorySelection',
});

const props = defineProps<{
  multiple?: boolean;
  noReset?: boolean;
  enableAnimation?: boolean;
}>();

const model = defineModel<string[] | string>({
  default: [],
});
const categoriesStore = useCategoriesStore();
const categories = computed(() => categoriesStore.list);

function selectCategory(category: Category) {
  if (typeof model.value === 'object' && props.multiple) {
    if (model.value.includes(category.name)) {
      model.value = [...model.value.filter((item) => item !== category.name)];
      return;
    }
    model.value.push(category.name);
  } else {
    model.value = category.name;
  }
}

onMounted(() => {
  if (props.enableAnimation) {
    gsap.from('[gsap="products-filter-category"]', {
      y: 300,
      x: 300,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'sine.inOut',
    });
  }
});
</script>

<template>
  <div gsap="products-filter-categories-container">
    <h1
      class="tw-py-3 tw-text-[18px] tw-font-semibold tw-relative tw-capitalize"
    >
      {{ $t('products.categories') }}:
      <small>
        {{ $t('products.selected') }}
        ({{ !props.multiple ? model : model.length }})
      </small>
      <q-btn
        icon="restart_alt"
        class="tw-ml-3 tw-absolute -tw-translate-y-2"
        round
        padding="4px"
        unelevated
        color="primary"
        aria-label="reset-selection-category"
        @click="model = []"
        v-if="model.length && !noReset"
      />
    </h1>

    <q-chip
      v-for="category of categories"
      :key="category.name"
      :selected="
        props.multiple ? model.includes(category.name) : model === category.name
      "
      @click="selectCategory(category)"
      :outline="
        props.multiple ? model.includes(category.name) : model === category.name
      "
      color="primary"
      text-color="white"
      class="sm:tw-min-w-[180px]"
      gsap="products-filter-category"
    >
      <div class="tw-flex tw-w-full tw-justify-between tw-items-center">
        <span class="tw-capitalize"> {{ category.name }}</span>
        <q-icon name="category" size="20px" />
      </div>
    </q-chip>
  </div>
</template>
