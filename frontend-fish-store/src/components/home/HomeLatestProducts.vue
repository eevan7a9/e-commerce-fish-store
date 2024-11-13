<script setup lang="ts">
import { CardProduct } from 'src/components/cards';
import { Product } from 'src/shared/interface/product';
import { useProductsStore } from 'src/stores/products';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
defineOptions({
  name: 'HomeLatestProducts',
});
const productsStore = useProductsStore();
const products = computed<Product[]>(() => productsStore.list.slice(0, 6));
const productsLoading = computed(() => productsStore.loading);
const scrollContainer = ref<HTMLDivElement | null>(null);
let isDown = false;
let startX: number;
let scrollLeft: number;

function mouseDownHandler(e: MouseEvent) {
  if (!scrollContainer.value) return;
  isDown = true;
  scrollContainer.value.classList.add('active');
  startX = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeft = scrollContainer.value.scrollLeft;
}

function mouseUpHandler() {
  if (!scrollContainer.value) return;
  isDown = false;
  scrollContainer.value.classList.remove('active');
}

function mouseLeaveHandler() {
  if (!scrollContainer.value) return;
  isDown = false;
  scrollContainer.value.classList.remove('active');
}

function mouseMoveHandler(e: MouseEvent) {
  if (!scrollContainer.value) return;
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX) * 2; // Adjust the multiplier to control scroll speed
  scrollContainer.value.scrollLeft = scrollLeft - walk;
}

function toForward() {
  if (!scrollContainer.value) return;
  scrollContainer.value.scrollBy({
    left: 200, // Adjust the scroll amount here (200px to the right)
    behavior: 'smooth',
  });
}

// Attach event listeners when the component is mounted
onMounted(() => {
  if (!scrollContainer.value) return;
  const container = scrollContainer.value;
  container.addEventListener('mousedown', mouseDownHandler);
  container.addEventListener('mouseup', mouseUpHandler);
  container.addEventListener('mouseleave', mouseLeaveHandler);
  container.addEventListener('mousemove', mouseMoveHandler);
});

// Clean up event listeners before the component is unmounted
onBeforeUnmount(() => {
  if (!scrollContainer.value) return;
  const container = scrollContainer.value;
  container.removeEventListener('mousedown', mouseDownHandler);
  container.removeEventListener('mouseup', mouseUpHandler);
  container.removeEventListener('mouseleave', mouseLeaveHandler);
  container.removeEventListener('mousemove', mouseMoveHandler);
});
</script>

<template>
  <section
    class="tw-max-w-screen-2xl tw-overflow-visible tw-mx-auto tw-relative"
  >
    <div class="tw-w-full tw-py-[300px] tw-text-center" v-if="productsLoading">
      <h1 class="tw-text-[28px] tw-font-anton tw-font-normal">
        Fetching Products...
      </h1>
      <q-spinner-hourglass
        color="primary"
        size="4em"
        class="tw-mx-auto tw-mt-3"
      />
    </div>

    <q-btn
      icon="double_arrow"
      size="20px"
      round
      class="tw-absolute tw-right-0 tw-bottom-[40%] tw-z-10"
      color="primary"
      aria-label="forward-latest-products"
      @click="toForward()"
    ></q-btn>
    <h1
      class="tw-font-anton tw-mb-8 tw-text-[28px] md:tw-text-[38px] xl:tw-text-[48px]"
    >
      Recently Added Products:
    </h1>

    <div
      ref="scrollContainer"
      class="products-scroll-container tw-flex tw-overflow-x-auto tw-gap-x-4 tw-py-3 tw-cursor-grabbing"
    >
      <template v-for="product of products" :key="product.id">
        <card-product :product="product" class="tw-min-w-[380px]" />
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.products-scroll-container {
  overflow-x: auto;
  padding-right: 20px; /* Add space to ensure scroll */
  scrollbar-width: none;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 90px; /* Width of the fade effect */
    pointer-events: none;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 10%,
      #f4f7fa 70%
    );
  }
}
</style>
