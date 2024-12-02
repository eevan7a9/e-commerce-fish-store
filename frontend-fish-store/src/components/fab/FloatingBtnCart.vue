<script lang="ts" setup>
import { useCartStore } from 'src/stores/cart';
import { computed, ref } from 'vue';
import { DialogCart } from 'src/components/dialogs';

defineOptions({
  name: 'FloatingBtnCart',
});

const cart = useCartStore();

const dialogCartView = ref();

const totalCartItems = computed(() =>
  cart.list.reduce((prev, curr) => prev + curr.quantity, 0)
);

DialogCart;
</script>

<template>
  <q-page-sticky class="tw-z-50" position="bottom-right" :offset="[20, 50]">
    <q-fab direction="up" class="tw-rounded-full" glossy push color="primary">
      <template #icon>
        <q-badge
          class="tw-absolute -tw-top-6 -tw-right-3 tw-py-1"
          color="negative"
          v-if="totalCartItems"
        >
          {{ totalCartItems }}
        </q-badge>
        <q-icon name="mdi-cart-variant" class="tw-mx-auto" />
      </template>

      <q-fab-action
        external-label
        label-position="left"
        label="Checkout"
        label-class="bg-dark tw-capitalize"
        color="positive"
        icon="mdi-cart-arrow-up"
        :to="'/checkout'"
        glossy
      />

      <q-fab-action
        external-label
        label-position="left"
        label="View Cart"
        label-class="bg-dark tw-capitalize"
        color="info"
        icon="mdi-eye-check"
        glossy
        @click="dialogCartView = true"
      >
        <dialog-cart v-model="dialogCartView" />
      </q-fab-action>
    </q-fab>
  </q-page-sticky>
</template>
