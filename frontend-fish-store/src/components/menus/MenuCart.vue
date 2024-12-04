<script setup lang="ts">
import { Notify } from 'quasar';
import { useCartStore } from 'src/stores/cart';
import { DialogCart } from 'src/components/dialogs';
import { ref } from 'vue';

defineOptions({
  name: 'MenuCart',
});

const cartStore = useCartStore();
const showCart = ref(false);

function removeItem(id: string | number) {
  cartStore.removeItem(id);
  Notify.create({
    message: 'Item has been removed from your cart.',
    color: 'info',
    // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    icon: 'shopping_cart',
    position: 'bottom-right',
    progress: true,
    group: false,
  });
}

function viewShoppingCart() {
  showCart.value = true;
}
</script>

<template>
  <q-btn icon="shopping_cart" aria-label="shopping-cart-btn">
    <Transition name="bounce">
      <q-badge v-if="cartStore.total" color="red" class="shake" floating>
        {{ cartStore.total }}
      </q-badge>
    </Transition>

    <q-menu max-width="320px" class="tw-w-[320px]">
      <div class="">
        <h1 class="tw-text-[16px] tw-font-normal tw-p-3">
          Cart Items:
          <small>({{ cartStore.total }})</small>
        </h1>

        <q-separator />

        <q-list separator>
          <q-item
            v-for="item of cartStore.list.slice(0, 2)"
            :key="item.product.name"
            clickable
            v-ripple
          >
            <q-item-section
              class="tw-text-[18px] tw-font-bold tw-text-primary"
              side
            >
              <q-badge class="tw-py-1 tw-text-[14px] tw-font-anton">
                {{ item.quantity }}
              </q-badge>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                <div class="ellipsis tw-overflow-hidden">
                  {{ item.product.name }}
                </div>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                size="16px"
                flat
                dense
                round
                icon="delete_forever"
                @click.stop="removeItem(item.product.id)"
              />
            </q-item-section>
          </q-item>

          <q-item v-if="!cartStore.total">
            <q-item-section>
              <div
                class="tw-py-3 tw-flex tw-flex-col tw-items-center tw-justify-center"
              >
                <span>Your cart is empty.</span>
                <div class="tw-h-[200px] tw-w-[200px]">
                  <q-img src="~assets/image-svg/empty_cart.svg"></q-img>
                </div>
              </div>
            </q-item-section>
          </q-item>
          <q-item
            class="tw-flex-col tw-items-center tw-justify-center tw-pt-3 tw-pb-6"
            v-else
          >
            <span v-if="cartStore.list.length > 2">
              {{ cartStore.list.length - 2 }} More
            </span>
            <q-btn
              class="tw-mt-2 tw-w-full"
              color="primary"
              @click="viewShoppingCart"
              outline
              aria-label="view-shopping-cart"
              v-close-popup
            >
              <q-icon name="mdi-eye-check" class="tw-mr-2" /> View my cart
            </q-btn>

            <q-btn
              class="tw-mt-2 tw-w-full"
              color="primary"
              to="/checkout"
              aria-label="go-checkout"
              unelevated
              glossy
              v-close-popup
            >
              <q-icon name="mdi-cart-arrow-up" class="tw-mr-2" /> Checkout now
            </q-btn>
          </q-item>
        </q-list>
      </div>
    </q-menu>

    <dialog-cart v-model="showCart" />
  </q-btn>
</template>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
