<script lang="ts" setup>
import { useCartStore } from 'src/stores/cart';
import { computed } from 'vue';
import { ExpansionCartItem } from 'src/components/expansion-item';
import { Notify } from 'quasar';

defineOptions({
  name: 'ProfileCartContent',
});

const cart = useCartStore();
const items = computed(() => cart.list);

function clear() {
  cart.clear();
  Notify.create({
    message: 'All items have been removed from your cart.',
    color: 'info',
    timeout: 5000,
  });
}
</script>

<template>
  <q-card square bordered flat class="tw-mt-4">
    <q-card-section
      class="tw-px-8 tw-py-3 tw-bg-primary tw-text-white tw-flex tw-items-center tw-justify-between"
    >
      <span class="tw-text-[18px] md:tw-text-[20px] tw-font-anton">
        My Cart
      </span>
      <q-icon name="mdi-cart" size="28px" />
    </q-card-section>

    <q-separator />

    <q-card-section v-if="!items.length">
      <div
        class="tw-py-3 tw-flex tw-flex-col tw-items-center tw-justify-center"
      >
        <span>Cart is empty.</span>
        <div class="tw-h-[200px] tw-w-[200px]">
          <q-img src="/src//assets//image-svg/empty_cart.svg"></q-img>
        </div>
        <q-btn
          label="Start Shopping"
          class="tw-capitalize tw-text-[16px]"
          unelevated
          glossy
          :to="{ path: '/products' }"
          color="primary"
        />
      </div>
    </q-card-section>

    <q-card-section>
      <q-list separator>
        <template v-for="(item, i) of items" :key="item.product.id">
          <expansion-cart-item :item="item" :default-opened="i === 0" />
        </template>
      </q-list>
    </q-card-section>

    <q-separator />

    <q-card-section class="tw-pt-[36px]">
      <q-btn
        class="tw-w-full tw-mb-3"
        outline
        color="negative"
        :disable="!items.length"
        @click="clear()"
      >
        <q-icon name="mdi-cart-remove" class="tw-mr-2" />
        EMPTY CART
      </q-btn>

      <q-btn
        class="tw-w-full"
        padding="10px 24px"
        unelevated
        glossy
        color="primary"
        to="/checkout"
        :disable="!items.length"
      >
        <q-icon name="mdi-cart-arrow-up" class="tw-mr-2" />
        CHECKOUT NOW
      </q-btn>
    </q-card-section>
  </q-card>
</template>
