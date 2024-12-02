<script lang="ts" setup>
import { ProductCategory } from 'src/shared/enums/product';

import {
  weightFormat,
  priceFormat,
  minLength,
  requiredField,
  requireMinimumItems,
} from 'src/shared/utils/form-rules';
import { ProductsCategorySelection } from 'src/components/products';
import { onMounted, ref, watch } from 'vue';
import { useCategoriesStore } from 'src/stores/categories';
import { useTagsStore } from 'src/stores/tags';
import { FormProductCreate } from 'src/shared/interface/form';

defineOptions({
  name: 'FormProductDetails',
});

const categories = useCategoriesStore();
const tags = useTagsStore();

const props = withDefaults(
  defineProps<{
    okBtn?: {
      color: string;
      label: string;
      icon: string;
    };
  }>(),
  {
    okBtn: () => ({
      icon: 'mdi-archive-plus',
      label: 'create',
      color: 'positive',
    }),
  }
);

const emits = defineEmits<{
  submit: [val: FormProductCreate | undefined];
  cancel: [];
}>();

const model = defineModel<FormProductCreate>({
  required: true,
});

const selectedCategory = ref<ProductCategory>();

function setCategoryId(name: string) {
  const found = categories.list?.find((item) => item.name === name);
  if (found) model.value.category_id = found.id;
}

watch(selectedCategory, (val) => val && setCategoryId(val));

async function onSubmit() {
  if (selectedCategory.value) {
    setCategoryId(selectedCategory.value);
  }
  emits('submit', model.value);
}

onMounted(() => {
  selectedCategory.value =
    categories.list.find((item) => item.id === model?.value.category_id)
      ?.name || ProductCategory.Culinary;
});
</script>

<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      filled
      :dense="$q.screen.lt.md"
      v-model="model.name"
      label="Product Name *"
      hint="Enter the name of the product as it will appear to customers."
      :rules="[minLength(4)]"
    />

    <q-input
      filled
      :dense="$q.screen.lt.md"
      v-model="model.price"
      label="Price *"
      class="tw-mt-5"
      hint="Selling price for the product."
      :rules="[requiredField, priceFormat]"
      :maxlength="8"
    >
      <template v-slot:prepend>
        <q-avatar> ₱ </q-avatar>
      </template>
    </q-input>

    <div class="tw-flex tw-gap-x-2">
      <q-input
        filled
        :dense="$q.screen.lt.md"
        v-model="model.weight"
        label="Weight *"
        type="number"
        hint="Weight for shipping calculations."
        :rules="[requiredField, weightFormat]"
        :maxlength="3"
      >
        <template v-slot:prepend>
          <q-avatar> lb </q-avatar>
        </template>
      </q-input>
      <q-input
        filled
        :dense="$q.screen.lt.md"
        v-model="model.units"
        label="Available Units *"
        type="number"
        hint="Quantity of this product."
        :rules="[requiredField]"
        :maxlength="3"
      />
    </div>

    <q-input
      filled
      :dense="$q.screen.lt.md"
      type="textarea"
      v-model="model.description"
      label="Product Description *"
      class="tw-mt-8"
      hint="Provide a detailed description of the product to inform customers."
      :rules="[minLength(30)]"
    />

    <q-separator />

    <div>
      <products-category-selection v-model="selectedCategory" no-reset />
    </div>

    <q-separator />

    <q-select
      filled
      v-model="model.tag_id"
      multiple
      :dense="$q.screen.lt.md"
      :options="tags.list"
      use-chips
      color="primary"
      option-label="name"
      option-value="id"
      emit-value
      map-options
      label="Product Tags"
      :rules="[requireMinimumItems(2)]"
      hint="Make the product easier to find and categorize."
    />

    <q-separator class="tw-mt-5" />

    <div
      class="bg-white tw-flex tw-items-center tw-flex-col-reverse md:tw-flex-row md:tw-justify-end tw-gap-3"
    >
      <q-btn
        flat
        label="cancel"
        color="dark"
        padding="8px 26px"
        class="tw-w-full md:tw-w-auto md:tw-text-[18px] tw-capitalize"
        @click="emits('cancel')"
      />

      <q-btn
        unelevated
        :color="props.okBtn?.color"
        :icon="props.okBtn?.icon"
        type="submit"
        :label="props.okBtn?.label"
        padding="8px 26px"
        push
        class="tw-w-full md:tw-w-auto md:tw-text-[18px] tw-capitalize"
      />
    </div>
  </q-form>
</template>
