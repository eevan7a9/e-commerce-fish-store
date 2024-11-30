<script setup lang="ts">
import { OrderItem } from 'src/shared/interface/order';
import { useCategoriesStore } from 'src/stores/categories';

defineOptions({
  name: 'ExpansionOrderProduct',
});

const emits = defineEmits<{ viewProduct: [val: number | string] }>();
const categoriesStore = useCategoriesStore();
const props = defineProps<{ item: OrderItem }>();

function getCategoryName(id: string | number): string | void {
  return categoriesStore.list.find((category) => category.id === id)?.name;
}
</script>

<template>
  <q-expansion-item
    icon="mdi-fish"
    :label="'item.product.name'"
    :caption="'item.product.category_name'"
  >
    <template v-slot:header>
      <q-item-section side>
        <q-badge class="tw-p-2 tw-text-[14px] tw-font-semibold">
          {{ props.item.quantity }}
        </q-badge>
      </q-item-section>

      <q-item-section class="tw-text-[16px]">
        <small class="tw-text-dark tw-capitalize">
          {{ getCategoryName(props.item.product.category_id) }}
        </small>
        <div class="tw-overflow-x-hidden ellipsis tw-w-full tw-text-primary">
          {{ props.item.product.name }}
        </div>
      </q-item-section>

      <q-item-section side>
        <span class="tw-font-bold text-dark">
          ₱{{ props.item.price * props.item.quantity }}
        </span>
        <div>{{ props.item.product.weight || '0.00' }} lb</div>
      </q-item-section>
    </template>

    <q-card class="tw-border-t">
      <q-card-section class="tw-px-0 sm:tw-px-3">
        <div class="tw-px-2 tw-mb-3 tw-font-semibold" v-if="$q.screen.lt.sm">
          {{ props.item.product.name }}
        </div>

        <div class="tw-p-2 tw-bg-slate-100">
          {{ props.item.product.description }}
        </div>

        <div
          class="tw-mt-2 tw-flex tw-flex-col tw-px-3 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between"
        >
          <div class="">
            Unit/Order:
            <span class="tw-font-semibold"
              >₱{{ props.item.product.price }}</span
            >
          </div>
          <q-btn
            unelevated
            glossy
            color="primary"
            dense
            icon="mdi-fish"
            padding="4px 24px"
            class="tw-text-[14px]"
            v-close-popup
            @click="emits('viewProduct', item.product.id)"
          >
            View Product
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
