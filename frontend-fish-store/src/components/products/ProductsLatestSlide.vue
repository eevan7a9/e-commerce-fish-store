<script setup lang="ts">
import { CardProduct } from 'src/components/cards';
import { Product } from 'src/shared/interface/product';
import { useProductsStore } from 'src/stores/products';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

defineOptions({
  name: 'ProductsLatestSlide',
});

const productsStore = useProductsStore();

const props = defineProps<{ enableAnimation?: boolean }>();

const products = computed<Product[]>(() => productsStore.list.slice(0, 7));
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

function toMove(number: number) {
  if (!scrollContainer.value) return;
  scrollContainer.value.scrollBy({
    left: number, // Adjust the scroll amount here (200px to the right)
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

  if (props.enableAnimation) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '[gsap="latest-products-title"]',
          start: 'top-=100 center',
          toggleActions: 'play none none reverse',
        },
      })
      .from('[gsap="latest-products-card"]', {
        y: 500,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: 'power2.out',
      });
  }
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
  <section class="tw-max-w-screen-2xl tw-overflow-visible tw-mx-auto tw-relative">
    <div class="tw-w-full tw-py-[300px] tw-text-center" v-if="productsLoading">
      <h1 class="tw-text-[28px] tw-font-anton tw-font-normal">
        Fetching Products...
      </h1>
      <q-spinner-hourglass color="primary" size="4em" class="tw-mx-auto tw-mt-3" />
    </div>

    <q-btn icon="mdi-chevron-double-left" size="20px" round class="tw-absolute tw-left-8 tw-bottom-[40%] tw-z-10"
      color="primary" aria-label="forward-latest-products" @click="toMove(-200)"></q-btn>

    <q-btn icon="mdi-chevron-double-right" size="20px" round class="tw-absolute tw-right-0 tw-bottom-[40%] tw-z-10"
      color="primary" aria-label="forward-latest-products" @click="toMove(200)"></q-btn>

    <h1 gsap="latest-products-title" class="tw-font-anton tw-mb-8 tw-text-[28px] md:tw-text-[38px]">
      Newest Arrivals
    </h1>

    <div ref="scrollContainer"
      class="products-scroll-container tw-flex tw-overflow-y-hidden tw-overflow-x-auto tw-gap-x-4 tw-py-3 tw-cursor-grabbing">
      <template v-for="product of products" :key="product.id">
        <card-product :product="product" :view-redirect="'/products/' + product.id"
          class="tw-min-w-[300px] xl:tw-min-w-[350px]" gsap="latest-products-card" />
      </template>
    </div>

    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
.products-scroll-container {
  overflow-x: auto;
  padding-right: 20px;
  /* Add space to ensure scroll */
  scrollbar-width: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 90px;
    pointer-events: none;
    background: linear-gradient(to right,
        rgba(255, 255, 255, 0) 10%,
        #fff 70%);
  }
}
</style>
