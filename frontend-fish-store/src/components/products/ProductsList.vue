<script setup lang="ts">
defineOptions({
  name: 'ProductsList',
});
import { useProductsStore } from 'src/stores/products';
import { computed } from 'vue';
import { CardProduct } from 'src/components/cards';

const productsSore = useProductsStore();
const products = computed(() => productsSore.list);
</script>

<template>
  <card-product
    v-for="product of products"
    :key="product.id"
    class="tw-max-w-[380px]"
    :product="product"
  />
</template>
