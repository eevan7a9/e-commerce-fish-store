<script setup lang="tsx">
import { Notify } from 'quasar';
import { Product } from 'src/shared/interface/product';
import { useCartStore } from 'src/stores/cart';

defineOptions({
  name: 'CardProduct',
});
defineProps<{ product: Product }>();

const cartStore = useCartStore();

function addToCart(product: Product) {
  cartStore.addItem(product);

  Notify.create({
    message: 'Item has been added to your cart.',
    color: 'positive',
    // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    icon: 'shopping_cart',
    position: 'bottom-right',
    progress: true,
    group: false,
  });
}
</script>

<template>
  <q-card class="my-card tw-pb-3 tw-relative tw-border tw-m-0" flat>
    <q-badge
      class="tw-z-10 tw-absolute tw-text-[16px] tw-py-2 -tw-translate-y-3 tw-capitalize"
    >
      {{ product.category_name || 'Unkown' }}
    </q-badge>

    <q-card-section class="tw-p-0 tw-overflow-hidden">
      <router-link :to="'/products/' + product.id">
        <q-img
          src="https://cdn.quasar.dev/img/mountains.jpg"
          class="tw-h-[260px] tw-cursor-pointer hover:tw-scale-150 tw-transition-all tw-duration-300 tw-ease-in-out"
          :alt="product.name"
          v-if="!product.images?.length"
        />
        <img
          :src="product.images[0]"
          class="tw-h-[260px] tw-cursor-pointer hover:tw-scale-150 tw-transition-all tw-duration-300 tw-ease-in-out"
          draggable="false"
          alt="product_name"
          v-else
        />
      </router-link>
    </q-card-section>

    <q-card-section class="tw-cursor-pointer hover:tw-underline">
      <router-link class="tw-w-full" :to="'/products/' + product.id">
        <div
          class="ellipsis tw-overflow-hidden tw-text-[14px] sm:tw-text-[20px]"
        >
          {{ product.name }}
        </div>
      </router-link>

      <div class="text-subtitle2">
        {{ new Date(product.created_at).toDateString() }}
      </div>
    </q-card-section>

    <q-card-section class="tw-pt-0 tw-px-2">
      <div
        class="tags-scroll-container tw-items-center tw-flex tw-overscroll-x-auto"
      >
        <q-chip
          v-for="tag of product.tags.slice(0, 2)"
          :key="tag"
          text-color="white"
          color="primary"
        >
          <span class="tw-capitalize">
            {{ tag }}
          </span>
        </q-chip>

        <q-chip
          text-color="white"
          color="primary"
          outline
          v-if="product.tags.length > 2"
        >
          <span class="tw-capitalize">
            More ({{ product.tags.length - 2 }})...
          </span>
        </q-chip>
      </div>
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="tw-max-h-[100px] ellipsis-3-lines">
        {{ product.description }}
      </div>
    </q-card-section>

    <q-card-section class="tw-relative tw-px-0 tw-flex">
      <div
        class="tw-bg-primary tw-font-anton tw-flex tw-items-center tw-text-[20px] tw-text-white tw-px-4 tw-min-w-[150px] tw-max-w-[200px] tw-rounded-r-full"
      >
        ₱{{ product.price }}
      </div>
      <q-btn
        icon="add_shopping_cart"
        class="tw-ml-auto tw-mr-[24px] tw-text-[16px]"
        round
        color="primary"
        aria-label="add-to-cart-btn"
        @click.stop="addToCart(product)"
      >
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.tags-scroll-container {
  overflow-x: auto;
  padding-right: 10px; /* Add space to ensure scroll */
  scrollbar-width: none;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 90px; /* Width of the fade effect */
    pointer-events: none;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 50%, #fff 90%);
  }
}
</style>
