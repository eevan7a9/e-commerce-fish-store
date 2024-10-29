<script lang="ts" setup>
import { Product } from 'src/shared/interface/product';
import { useProductsStore } from 'src/stores/products';
import { CardProduct } from 'src/components/cards';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategoriesStore } from 'src/stores/categories';
import { Category } from 'src/shared/interface/category';

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const route = useRoute();
const router = useRouter();

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
const slide = ref(1);
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

onMounted(() => {
  setCurrentProduct();
});
</script>

<template>
  <main
    class="tw-max-w-screen-xl tw-mx-auto tw-grid md:tw-grid-cols-12 tw-gap-5 tw-py-12"
  >
    <section class="md:tw-col-span-9">
      <nav class="tw-col-span-12 tw-py-4 md:tw-text-[20px]">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Products" icon="phishing" to="/products" />
          <q-breadcrumbs-el
            class="tw-font-bold"
            :label="product?.name || 'Page'"
          />
        </q-breadcrumbs>
      </nav>

      <div class="tw-px-3" v-if="product">
        <q-carousel swipeable animated v-model="slide" thumbnails infinite>
          <q-carousel-slide
            :name="1"
            img-src="https://cdn.quasar.dev/img/mountains.jpg"
          />
          <q-carousel-slide
            :name="2"
            img-src="https://cdn.quasar.dev/img/parallax1.jpg"
          />
          <q-carousel-slide
            :name="3"
            img-src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-carousel-slide
            :name="4"
            img-src="https://cdn.quasar.dev/img/quasar.jpg"
          />
        </q-carousel>

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
            <p class="tw-max-w-[600px] tw-mt-2">{{ product.description }}</p>
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
            <h1 class="tw-text-[20px] tw-font-bold">Buy Now</h1>
          </q-card-section>

          <q-card-section
            class="tw-flex tw-flex-col tw-gap-4 md:tw-flex-row md:tw-items-center tw-justify-between"
          >
            <div class="tw-font-bold">
              Price per Unit/Order
              <p
                class="tw-bg-slate-100 tw-min-w-[150px] tw-max-w-[200px] tw-border tw-p-3 tw-font-normal tw-text-[16px] md:tw-text-[24px] tw-mt-2"
              >
                ₱{{ product.price }}
              </p>
            </div>

            <div class="tw-font-bold">
              Weight per Unit/Order
              <p
                class="tw-bg-slate-100 tw-min-w-[150px] tw-max-w-[200px] tw-border tw-p-3 tw-font-normal tw-text-[16px] md:tw-text-[24px] tw-mt-2"
              >
                {{ product.weight }}lb
              </p>
            </div>

            <div class="tw-font-bold">
              Available Unit/Order
              <p
                class="tw-bg-slate-100 tw-min-w-[150px] tw-max-w-[200px] tw-border tw-p-3 tw-font-normal tw-text-[16px] md:tw-text-[24px] tw-mt-2"
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
              style="max-width: 200px"
              :max="product.units"
            />
            <q-btn
              unelevated
              color="primary"
              icon="add_shopping_cart"
              label="Add to Cart"
              padding="16px 24px"
            />
          </q-card-section>
        </q-card>

        <q-separator class="tw-my-8" />

        <div>
          <h1 class="tw-mb-2 tw-uppercase">{{ category?.name }}</h1>
          <p>{{ category?.description }}</p>
        </div>
      </div>
    </section>

    <aside class="md:tw-col-span-3 tw-justify-items-center tw-pt-4">
      <h1
        class="tw-pl-3 tw-max-w-[400px] tw-font-bold tw-text-[20px] md:tw-text-[22px] tw-text-center md:tw-text-left tw-mx-auto tw-mb-8 tw-capitalize"
      >
        related Products
      </h1>
      <div
        class="tw-max-w-[400px] tw-flex tw-flex-col tw-gap-6 tw-mx-auto tw-px-3"
      >
        <template v-for="other of relatedProducts" :key="other.id">
          <card-product :product="other" />
        </template>
      </div>
    </aside>
  </main>
</template>
