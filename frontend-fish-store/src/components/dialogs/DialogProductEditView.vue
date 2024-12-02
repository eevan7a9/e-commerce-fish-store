<script lang="ts" setup>
import { FormProductDetails } from 'src/components/forms';
import { Product } from 'src/shared/interface/product';
import { watch, reactive, onMounted } from 'vue';
import { useProductsStore } from 'src/stores/products';
import { useAuthStore } from 'src/stores/auth';
import { ProductsCarousel } from 'src/components/products';
import { Loading, Notify } from 'quasar';
import { FormProductCreate } from 'src/shared/interface/form';
import { useTagsStore } from 'src/stores/tags';

defineOptions({
  name: 'DialogProductEditView',
});

const products = useProductsStore();
const auth = useAuthStore();
const tags = useTagsStore();

const props = defineProps<{ persistent?: boolean; product: Product }>();
const model = defineModel({ type: Boolean });

let tempOriginal: FormProductCreate = {} as FormProductCreate;
const form = reactive<FormProductCreate>({} as FormProductCreate);

function setFormValue() {
  Object.assign(form, {
    name: props.product.name,
    price: props.product.price,
    weight: props.product.weight,
    units: props.product.units,
    description: props.product.description,
    tag_id: getTagsId(props.product.tags),
    images: props.product.images,
    category_id: props.product.category_id,
  });
  Object.assign(tempOriginal, form);
}

function getUpdatedFields(
  updated: Partial<FormProductCreate>,
  original: FormProductCreate
): Partial<Product> | void {
  const updatedFields: Partial<FormProductCreate> = {};

  for (const key in updated) {
    const field = key as keyof FormProductCreate;

    if (updated[field] !== original[field]) {
      updatedFields[field] = updated[field] as never;
    }
  }
  return Object.keys(updatedFields).length ? updatedFields : undefined;
}

function getTagsId(items: string[]): (string | number | undefined)[] {
  return items.map((item) => tags.list.find((tag) => tag.name === item)?.id);
}

async function update() {
  const newForm = getUpdatedFields(form, tempOriginal);

  if (!newForm) {
    return Notify.create({
      message: 'No changes detected',
      color: 'negative',
      timeout: 5000,
    });
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

  const res = await products.updateProduct(
    form,
    props.product.id,
    auth.userToken
  );

  Loading.hide();

  Notify.create({
    color: res?.success ? 'positive' : 'negative',
    message: res?.message || 'Order has been canceled',
    timeout: 6000,
  });

  model.value = false;
}

watch(model, (val) => {
  if (val) setFormValue();
});

onMounted(() => setFormValue());
</script>

<template>
  <q-dialog
    :persistent="props.persistent"
    v-model="model"
    :full-width="$q.screen.lt.md"
  >
    <q-card class="md:tw-min-w-[900px]">
      <q-card-section
        class="tw-bg-primary tw-text-white tw-flex tw-justify-between"
      >
        <div class="text-h6">Product Details</div>
        <q-btn icon="mdi-close" v-close-popup flat />
      </q-card-section>

      <q-card-section v-if="form.images">
        <products-carousel :images="form.images" />
      </q-card-section>

      <q-card-section class="tw-pt-3 md:tw-pt-8 md:tw-px-8 tw-relative">
        <form-product-details
          v-model="form"
          :ok-btn="{
            label: 'Update',
            color: 'primary',
            icon: 'mdi-archive-edit',
          }"
          @submit="update"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
