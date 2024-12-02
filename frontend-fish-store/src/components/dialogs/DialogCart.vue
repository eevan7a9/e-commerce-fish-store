<script setup lang="ts">
import { Notify } from 'quasar';
import { computed } from 'vue';

import { useCartStore } from 'src/stores/cart';
import { ExpansionCartItem } from 'src/components/expansion-item';
defineOptions({
  name: 'DialogCart',
});

const dialog = defineModel({
  default: false,
});

const props = withDefaults(defineProps<{ hideAction?: boolean }>(), {
  hideAction: false,
});

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.list);
const cartTotalPrice = computed(() =>
  cartStore.list
    .reduce(
      (prev, curr) => prev + Number(curr.product.price) * curr.quantity,
      0
    )
    .toFixed(2)
);
const cartTotalWeight = computed(() =>
  cartStore.list
    .reduce(
      (prev, curr) => prev + Number(curr.product.weight) * curr.quantity,
      0
    )
    .toFixed(2)
);
function emptyCart() {
  cartStore.clear();
  Notify.create({
    color: 'positive',
    message: 'Your cart has been emptied.',
    timeout: 3000,
  });
}
</script>

<template>
  <q-dialog
    v-model="dialog"
    :maximized="$q.screen.lt.sm"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="tw-w-[800px]">
      <q-card-section
        class="tw-border-b tw-flex tw-items-center tw-justify-between"
      >
        <h1>
          <span class="tw-font-semibold tw-text-[16px]">My Cart</span>
        </h1>

        <q-btn
          @click="dialog = false"
          icon="close"
          size="12px"
          padding="4px"
          round
          color="dark"
          flat
        />
      </q-card-section>

      <q-card-section
        class="tw-flex tw-flex-col tw-items-center tw-justify-center"
        v-if="!cartItems.length"
      >
        <div class="tw-text-[20px]">Your cart is empty.</div>
        <div class="tw-h-[200px] tw-w-[200px]">
          <q-img src="/src//assets//image-svg/empty_cart.svg"></q-img>
        </div>
      </q-card-section>

      <q-card-section class="tw-p-0" v-else>
        <q-list separator>
          <expansion-cart-item
            v-for="(item, i) of cartItems"
            :key="i"
            :default-opened="i === 0"
            :item="item"
          />
        </q-list>
      </q-card-section>

      <q-separator />

      <q-card-section class="tw-text-right">
        <div class="tw-text-[14px] tw-mb-2">
          Total Weight:
          <span class="tw-font-semibold tw-px-3 tw-mx-1 tw-text-[16px]">
            {{ cartTotalWeight }} lb
          </span>
        </div>
        <div class="tw-text-[16px]">
          Total Price:
          <span
            class="tw-font-anton tw-bg-gray-200 tw-px-3 tw-mx-1 tw-text-[20px]"
          >
            ₱{{ cartTotalPrice }}
          </span>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section
        class="tw-flex tw-flex-col-reverse sm:tw-flex-row tw-gap-3 tw-justify-end"
        v-if="!props.hideAction"
      >
        <q-btn
          :disable="!cartItems.length"
          color="negative"
          outline
          unelevated
          @click="emptyCart()"
        >
          <q-icon name="mdi-cart-remove" class="tw-mr-2" /> Empty Cart
        </q-btn>
        <q-btn
          color="primary"
          :disable="!cartItems.length"
          unelevated
          glossy
          to="/checkout"
        >
          <q-icon name="mdi-cart-arrow-up" class="tw-mr-2" /> Checkout now
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
