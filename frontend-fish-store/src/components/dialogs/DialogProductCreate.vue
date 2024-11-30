<script lang="ts" setup>
import { Loading, Notify } from 'quasar';
import { FormProductDetails } from 'src/components/forms';
import { FormProductCreate } from 'src/shared/interface/form';
import { Product } from 'src/shared/interface/product';
import { useAuthStore } from 'src/stores/auth';
import { useProductsStore } from 'src/stores/products';
import { reactive, watch } from 'vue';

defineOptions({
  name: 'DialogProductCreate',
});

const productsStore = useProductsStore();
const auth = useAuthStore();

const model = defineModel({ type: Boolean });
const props = defineProps<{ persistent?: boolean }>();

const initCreateFormValue = {
  name: '',
  weight: 0,
  price: 0,
  units: 0,
  description: '',
  category_id: '',
  images: [],
  tag_id: [],
};
const createForm = reactive<FormProductCreate>({ ...initCreateFormValue });

async function createSubmitted(form?: Partial<Product>) {
  if (!form) {
    return console.error('create form is empty');
  }
  if (process.env.ENABLE_STATIC_MODE === 'true') {
    model.value = false;
    return Notify.create({
      message: process.env.RISTRICTED_NOTIFY_MESSAGE,
      timeout: 8000,
      color: 'negative',
    });
  }

  Loading.show({
    message: 'Creating New Product, please wait...',
    messageColor: 'white',
    spinnerColor: 'white',
  });

  const res = await productsStore.createProduct(form, auth.userToken);

  Loading.hide();

  Notify.create({
    color: res?.success ? 'positive' : 'negative',
    message: res?.message || 'Order has been canceled',
    timeout: 6000,
  });

  model.value = false;
}

watch(model, () => {
  Object.assign(createForm, initCreateFormValue);
});
</script>

<template>
  <q-dialog
    :persistent="props.persistent"
    v-model="model"
    :full-width="$q.screen.lt.md"
  >
    <q-card class="tw-w-full tw-max-w-[1200px]">
      <q-card-section
        class="tw-bg-primary tw-text-white tw-flex tw-justify-between"
      >
        <div class="text-h6">Create New Product</div>
        <q-btn icon="mdi-close" v-close-popup flat />
      </q-card-section>

      <q-card-section class="tw-pt-3 md:tw-pt-8 md:tw-px-8">
        <form-product-details
          v-model="createForm"
          @cancel="model = false"
          @submit="createSubmitted"
          v-if="createForm"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
