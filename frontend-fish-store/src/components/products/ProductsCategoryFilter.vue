<script setup lang="ts">
import { useCategoriesStore } from 'src/stores/categories';
import { computed } from 'vue';

defineOptions({
  name: 'ProductsCategoryFilter',
});

const model = defineModel<string[]>({
  default: [],
});
const categoriesStore = useCategoriesStore();
const categories = computed(() => categoriesStore.list);

function selectCategory(name: string) {
  if (model.value.includes(name)) {
    model.value = [...model.value.filter((item) => item !== name)];
    return;
  }
  model.value.push(name);
}
</script>

<template>
  <h1 class="tw-py-3 tw-text-[18px] tw-font-bold">
    Categories:
    <small>Selected({{ model.length }})</small>
    <q-btn
      icon="restart_alt"
      class="tw-ml-3"
      round
      padding="4px"
      unelevated
      color="primary"
      @click="model = []"
      v-if="model.length"
    />
  </h1>
  <q-chip
    v-for="category of categories"
    :key="category.name"
    :selected="model.includes(category.name)"
    @click="selectCategory(category.name)"
    :color="model.includes(category.name) ? 'positive' : 'primary'"
    text-color="white"
    icon="category"
    class="tw-min-w-[180px]"
  >
    <span class="tw-capitalize">
      {{ category.name }}
    </span>
  </q-chip>
</template>
