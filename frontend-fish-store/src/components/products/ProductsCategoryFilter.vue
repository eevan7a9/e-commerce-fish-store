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
  <h1 class="tw-py-3 tw-text-[18px] tw-font-semibold tw-relative tw-capitalize">
    {{ $t('products.categories') }}:
    <small>{{ $t('products.selected') }}({{ model.length }})</small>
    <q-btn
      icon="restart_alt"
      class="tw-ml-3 tw-absolute -tw-translate-y-2"
      round
      padding="4px"
      unelevated
      color="primary"
      aria-label="reset-filter-category"
      @click="model = []"
      v-if="model.length"
    />
  </h1>
  <q-chip
    v-for="category of categories"
    :key="category.name"
    :selected="model.includes(category.name)"
    @click="selectCategory(category.name)"
    :outline="model.includes(category.name)"
    color="primary"
    text-color="white"
    class="sm:tw-min-w-[180px]"
  >
    <div class="tw-flex tw-w-full tw-justify-between tw-items-center">
      <span class="tw-capitaliz">
        {{ category.name }}
      </span>
      <q-icon name="category" size="20px" />
    </div>
  </q-chip>
</template>
