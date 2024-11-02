<script setup lang="ts">
import { Notify } from 'quasar';
import { computed } from 'vue';

import { useCartStore } from 'src/stores/cart';

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
          <q-expansion-item
            v-for="(item, i) of cartItems"
            :key="item.product.id"
            icon="mdi-fish"
            :label="item.product.name"
            :default-opened="i === 0"
            :caption="item.product.category_name"
          >
            <template v-slot:header>
              <q-item-section side>
                <q-badge class="tw-p-2 tw-text-[14px] tw-font-semibold">
                  {{ item.quantity }}
                </q-badge>
              </q-item-section>

              <q-item-section class="tw-text-[16px]">
                <small class="tw-text-dark tw-capitalize">
                  {{ item.product.category_name }}
                </small>
                <div
                  class="tw-overflow-x-hidden ellipsis tw-w-full tw-text-primary"
                >
                  {{ item.product.name }}
                </div>
              </q-item-section>

              <q-item-section side>
                <span class="tw-font-bold text-dark">
                  ₱{{ (Number(item.product.price) * item.quantity).toFixed(2) }}
                </span>
              </q-item-section>
            </template>

            <q-card class="tw-border-t">
              <q-card-section class="tw-px-0 sm:tw-px-3">
                <div
                  class="tw-px-2 tw-mb-3 tw-font-semibold"
                  v-if="$q.screen.lt.sm"
                >
                  {{ item.product.name }}
                </div>

                <div class="tw-p-2 tw-bg-slate-200">
                  {{ item.product.description }}
                </div>

                <div
                  class="tw-mt-2 tw-flex tw-flex-col tw-px-3 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between"
                >
                  <div class="">
                    Unit/Order: ₱{{ item.product.price }} lb
                    {{ item.product.weight }}
                  </div>
                  <q-btn
                    flat
                    color="primary"
                    dense
                    class="tw-text-[14px]"
                    :to="'/products/' + item.product.id"
                    v-close-popup
                  >
                    More Details
                  </q-btn>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <q-card-section class="tw-text-right">
        <div class="tw-text-[14px] tw-mb-2">
          Total Weight: lb
          <span
            class="tw-font-bold tw-bg-gray-200 tw-px-3 tw-mx-1 tw-text-[16px]"
          >
            {{ cartTotalWeight }}
          </span>
        </div>
        <div class="tw-text-[16px]">
          Total Price: ₱
          <span
            class="tw-font-bold tw-bg-gray-200 tw-px-3 tw-mx-1 tw-text-[20px]"
          >
            {{ cartTotalPrice }}
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
          Empty Cart
        </q-btn>
        <q-btn
          color="primary"
          :disable="!cartItems.length"
          unelevated
          to="/checkout"
        >
          Checkout now
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
