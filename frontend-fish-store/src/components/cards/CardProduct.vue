<script setup lang="tsx">
import { Dialog, Loading, Notify } from 'quasar';
import { Product } from 'src/shared/interface/product';
import { useAuthStore } from 'src/stores/auth';
import { useCartStore } from 'src/stores/cart';
import { useProductsStore } from 'src/stores/products';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'CardProduct',
});

const props = defineProps<{
  product: Product;
  isAdmin?: boolean;
  viewRedirect?: string;
}>();

const emits = defineEmits<{ viewProduct: [product: Product] }>();

const router = useRouter();

const cartStore = useCartStore();
const productsStore = useProductsStore();
const auth = useAuthStore();

function addToCart() {
  cartStore.addItem(props.product);

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

function viewProduct() {
  if (props.viewRedirect) {
    router.push(props.viewRedirect);
  }
  emits('viewProduct', props.product);
}

function deleteProduct() {
  Dialog.create({
    title: 'Delete Product',
    message:
      'Are you sure you want to delete this product? This action cannot be undone.',
    ok: {
      label: 'Delete Product',
      color: 'negative',
      icon: 'mdi-trash-can',
      unelevated: true,
    },
    cancel: {
      label: 'cancel',
      outline: true,
    },
  }).onOk(async () => {
    if (process.env.ENABLE_STATIC_MODE === 'true') {
      return Notify.create({
        message: process.env.RISTRICTED_NOTIFY_MESSAGE,
        timeout: 8000,
        color: 'negative',
      });
    }

    Loading.show({
      message: 'Deleting Product, please wait...',
      messageColor: 'white',
      spinnerColor: 'white',
    });

    const res = await productsStore.deleteProduct(
      props.product.id,
      auth.userToken
    );

    Loading.hide();

    Notify.create({
      color: res?.success ? 'positive' : 'negative',
      message: res?.message || 'Order has been canceled',
      timeout: 6000,
    });

    console.log(res?.message);
  });
}
</script>

<template>
  <q-card flat class="tw-pb-3 tw-relative tw-border tw-m-0">
    <q-badge
      class="tw-z-10 tw-absolute tw-text-[16px] tw-py-2 -tw-translate-y-3 tw-capitalize"
    >
      {{ $t(`categories.${product.category_name}`) || 'Unkown' }}
    </q-badge>

    <q-card-section @click="viewProduct()" class="tw-p-0 tw-overflow-hidden">
      <q-img
        src="https://cdn.quasar.dev/img/mountains.jpg"
        class="tw-h-[260px] tw-cursor-pointer hover:tw-scale-150 tw-transition-all tw-duration-300 tw-ease-in-out"
        :alt="product.name"
        v-if="!product?.images?.length"
      />
      <img
        :src="product.images[0]"
        class="tw-h-[260px] tw-cursor-pointer hover:tw-scale-150 tw-transition-all tw-duration-300 tw-ease-in-out"
        draggable="false"
        alt="product_name"
        v-else
      />
    </q-card-section>

    <q-card-section
      class="tw-cursor-pointer hover:tw-underline tw-relative tw-px-3"
    >
      <div
        @click="viewProduct()"
        class="ellipsis tw-overflow-hidden tw-relative tw-max-w-[300px] sm:tw-max-w-[350px] tw-text-[16px] sm:tw-text-[20px]"
      >
        {{ product.name }}
      </div>

      <div class="text-subtitle2">
        {{ new Date(product.created_at).toDateString() }}
      </div>
    </q-card-section>

    <q-card-section class="tw-pt-0 tw-px-2" v-if="product.tags?.length">
      <div
        class="tags-scroll-container tw-items-center tw-flex tw-overscroll-x-auto"
      >
        <q-chip
          v-for="tag of product.tags.slice(0, $q.screen.lt.sm ? 1 : 2)"
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
      <div class="tw-h-[65px] ellipsis-3-lines">
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
        icon="mdi-trash-can"
        class="tw-ml-auto tw-mr-[24px] tw-text-[16px]"
        round
        push
        glossy
        outline
        color="negative"
        aria-label="add-to-cart-btn"
        @click.stop="deleteProduct()"
        v-if="props.isAdmin"
      >
      </q-btn>

      <q-btn
        icon="add_shopping_cart"
        class="tw-ml-auto tw-mr-[24px] tw-text-[16px]"
        round
        color="primary"
        push
        glossy
        aria-label="add-to-cart-btn"
        @click.stop="addToCart()"
        v-else
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
