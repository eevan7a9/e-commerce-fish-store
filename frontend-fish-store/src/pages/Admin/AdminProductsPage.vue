<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useProductsStore } from 'src/stores/products';
import {
  ProductsList,
  ProductsFilter,
  ProductsSort,
} from 'src/components/products';
import {
  DialogProductCreate,
  DialogProductEditView,
} from 'src/components/dialogs';
import { CardProduct } from 'src/components/cards';
import { Product } from 'src/shared/interface/product';

const propductsStore = useProductsStore();

const loading = computed(() => propductsStore.loading);
const dialogCreate = ref(false);

const selectedProduct = ref<Product | undefined>();
const dialogEditView = ref(false);

function showProduct(e: Product) {
  selectedProduct.value = e;
  dialogEditView.value = !dialogEditView.value;
}
</script>

<template>
  <q-page
    class="tw-max-w-screen-xl tw-mx-auto tw-px-2 sm:tw-px-3 tw-pb-[200px]"
  >
    <dialog-product-edit-view
      :product="selectedProduct"
      v-model="dialogEditView"
      v-if="selectedProduct"
    />

    <section class="tw-pt-4 md:tw-pt-8">
      <h1 class="tw-text-[20px] md:tw-text-[32px] tw-font-anton">
        Products Overview
      </h1>
      <p class="tw-pt-3 md:tw-text-[18px] tw-leading-normal">
        Manage your full product lineup in one place. Review product
        information, stock levels, and make updates as needed.
      </p>
    </section>

    <q-inner-loading
      :showing="loading"
      label="Please wait..."
      color="primary"
      label-class="tw-text-primary"
      label-style="font-size: 1.1em"
      class="tw-pt-5"
      v-if="loading"
    />

    <section
      class="tw-relative tw-mt-8 md:tw-mt-16 tw-flex tw-flex-col-reverse md:tw-flex-row md:tw-justify-between"
      v-else
    >
      <div class="tw-w-full">
        <products-list :is-admin="true">
          <template #default="{ product }">
            <card-product
              :product="product"
              is-admin
              @view-product="showProduct(product)"
              class="tw-max-w-[350px]"
            />
          </template>
        </products-list>
      </div>
      <div
        class="tw-max-h-[800px] md:tw-sticky md:tw-top-[50px] tw-max-w-full md:tw-max-w-[320px] tw-mb-8"
      >
        <products-sort class="tw-w-full sm:tw-max-w-[320px]" />
        <q-separator class="tw-my-6" />
        <products-filter class="" />
      </div>
    </section>

    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <dialog-product-create persistent v-model="dialogCreate" />

      <q-btn
        fab
        color="primary"
        round
        push
        glossy
        :padding="$q.screen.gt.sm ? '30px' : '20px'"
        @click="dialogCreate = !dialogCreate"
      >
        <q-icon name="mdi-archive-plus" size="32px" />
        <q-tooltip class="md:tw-text-[14px] bg-positive">
          Click to open the form and create a new product.
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>
