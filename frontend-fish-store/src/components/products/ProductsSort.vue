<script setup lang="ts">
import { debounce } from 'quasar';
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

defineOptions({
  name: 'ProductsSort',
});

const sortOptions = ref(['latest', 'price', 'name']);

const router = useRouter();
const route = useRoute();

// for Sort
const sort = ref('latest');

const updateSortParams = debounce((val) => {
  const currentQuery = route.query;
  router.replace({
    query: {
      ...currentQuery,
      ...(val ? { sort: val } : {}),
    },
  });
}, 800);

watch(
  sort,
  (val) => {
    updateSortParams(val);
  },
  { deep: true }
);

onMounted(() => {
  const { sort: sortQuery } = route.query;
  sort.value = sortQuery ? String(sortQuery) : 'latest';
});
</script>

<template>
  <q-btn
    :label="`sort by: ${sort}`"
    aria-label="sort-menu"
    color="primary"
    unelevated
    icon="sort"
  >
    <q-menu>
      <q-list separator style="min-width: 200px">
        <q-item
          v-for="option of sortOptions"
          :key="option"
          clickable
          @click="sort = option"
          v-close-popup
        >
          <q-item-section class="tw-capitalize">{{ option }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
