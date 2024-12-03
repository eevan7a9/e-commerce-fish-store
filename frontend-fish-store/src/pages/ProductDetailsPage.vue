<script lang="ts" setup>
import { Product } from 'src/shared/interface/product';
import { useProductsStore } from 'src/stores/products';
import { CardProduct } from 'src/components/cards';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategoriesStore } from 'src/stores/categories';
import { Category } from 'src/shared/interface/category';
import { useCartStore } from 'src/stores/cart';
import { ProductsCarousel } from 'src/components/products';
import { Notify } from 'quasar';

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const paramId = computed(() => route.params['id']);
const relatedProducts = computed(() =>
  productsStore.list
    .filter(
      (item) =>
        String(item.id) !== paramId.value &&
        item.category_id === product.value?.category_id
    )
    .slice(0, 4)
);
const product = ref<Product>();
const category = ref<Category>();
const quantity = ref(1);

function setCurrentProduct() {
  const findProduct = productsStore.list.find(
    (item) => String(item.id) === paramId.value
  );
  if (!findProduct) {
    router.push('/');
  }
  product.value = findProduct;
  if (findProduct?.category_id) {
    setProductCategory(findProduct?.category_id);
  }
}

function setProductCategory(id: string | number) {
  const findCategory = categoriesStore.list.find(
    (item) => String(item.id) === String(id)
  );
  if (!findCategory) return;
  category.value = findCategory;
}

function addToCart() {
  if (!product.value) return;

  cartStore.addItem(product.value, quantity.value);
  Notify.create({
    message: 'Item has been added to your cart.',
    color: 'positive',
    icon: 'shopping_cart',
    position: 'bottom-right',
    progress: true,
    group: false,
  });
}

function validateQuantity(v: number) {
  const units = product.value?.units || 1;
  quantity.value = v < 1 ? 1 : v > units ? units : v;
}
watch(
  () => route.fullPath,
  () => {
    setCurrentProduct();
  }
);

onMounted(() => {
  setCurrentProduct();
});
</script>

<template>
  <main
    class="tw-max-w-screen-xl tw-mx-auto tw-grid md:tw-grid-cols-12 tw-gap-5 tw-pt-4 tw-pb-12"
  >
    <section class="md:tw-col-span-9">
      <nav class="tw-col-span-12 tw-py-5 md:tw-text-[20px] tw-pl-2">
        <q-breadcrumbs class="tw-font-anton">
          <q-breadcrumbs-el label="Products" icon="phishing" to="/products" />
          <q-breadcrumbs-el :label="product?.name || 'Page'" />
        </q-breadcrumbs>
      </nav>

      <div class="tw-px-3" v-if="product">
        <products-carousel :images="product?.images || []" />

        <q-card class="tw-mt-10 tw-border tw-relative md:tw-px-3" flat>
          <q-card-section class="tw-pb-0">
            <h1 class="tw-text-[20px] tw-text-primary tw-font-bold">
              {{ product?.name }}
            </h1>

            <q-badge
              class="tw-uppercase tw-py-3 tw-px-5 md:tw-text-[20px] tw-absolute -tw-top-7 md:-tw-right-5"
            >
              {{ category?.name }}
            </q-badge>
          </q-card-section>

          <q-card-section>
            <div class="tw-font-bold">Description:</div>
            <p class="tw-max-w-[600px] tw-mt-2 tw-leading-[150%]">
              {{ product.description }}
            </p>
          </q-card-section>

          <q-card-section>
            <q-chip
              v-for="tag of product.tags"
              :key="tag"
              text-color="white"
              icon="tag"
              color="primary"
              outline
            >
              <span class="tw-capitalize">
                {{ tag }}
              </span>
            </q-chip>
          </q-card-section>
        </q-card>

        <q-card class="tw-border tw-mt-8 md:tw-px-3 tw-py-5" flat>
          <q-card-section>
            <h1 class="tw-text-[20px] md:tw-text-[32px] tw-font-anton">
              Buy Now
            </h1>
          </q-card-section>

          <q-card-section
            class="tw-flex tw-flex-col tw-gap-4 md:tw-flex-row md:tw-items-center tw-justify-between"
          >
            <div class="tw-w-full">
              Price per Unit/Order
              <p
                class="tw-bg-slate-100 tw-font-anton tw-min-w-[150px] tw-border tw-p-3 tw-font-normal tw-text-[16px] md:tw-text-[24px] tw-mt-2"
              >
                ₱{{ product.price }}
              </p>
            </div>

            <div class="tw-w-full">
              Weight per Unit/Order
              <p
                class="tw-bg-slate-100 tw-font-anton tw-min-w-[150px] tw-border tw-p-3 tw-font-normal tw-text-[16px] md:tw-text-[24px] tw-mt-2"
              >
                {{ product.weight }}lb
              </p>
            </div>

            <div class="tw-w-full">
              Available Unit/Order
              <p
                class="tw-bg-slate-100 tw-font-anton tw-min-w-[150px] tw-border tw-p-3 tw-font-normal tw-text-[16px] md:tw-text-[24px] tw-mt-2"
              >
                {{ product.units }} Left
              </p>
            </div>
          </q-card-section>

          <q-separator class="tw-my-4" />

          <q-card-section
            class="flex tw-flex-col sm:tw-flex-row tw-gap-3 md:tw-gap-4"
          >
            <q-input
              v-model="quantity"
              type="number"
              filled
              label="Quantity"
              class="md:tw-text-[18px]"
              style="max-width: 200px"
              min="1"
              :max="product.units"
              @change="validateQuantity"
            />
            <q-btn
              unelevated
              color="primary"
              icon="add_shopping_cart"
              @click="addToCart()"
              label="Add to Cart"
              padding="16px 24px"
            />
          </q-card-section>
        </q-card>

        <q-separator class="tw-my-8" />

        <div>
          <h1 class="tw-mb-2 tw-uppercase">{{ category?.name }}</h1>
          <p class="tw-leading-[125%]">{{ category?.description }}</p>
        </div>
      </div>
    </section>

    <aside class="md:tw-col-span-3 tw-justify-items-center tw-pt-4">
      <h1
        class="tw-pl-3 tw-font-anton tw-max-w-[400px] tw-font-normal tw-text-[20px] md:tw-text-[22px] tw-text-center md:tw-text-left tw-mx-auto tw-mb-8 tw-capitalize"
      >
        related Products
      </h1>
      <div
        class="tw-max-w-[400px] tw-flex tw-flex-col tw-gap-6 tw-mx-auto tw-px-1"
      >
        <template v-for="other of relatedProducts" :key="other.id">
          <card-product
            :product="other"
            :view-redirect="'/products/' + other.id"
          />
        </template>
      </div>
    </aside>
  </main>
</template>
