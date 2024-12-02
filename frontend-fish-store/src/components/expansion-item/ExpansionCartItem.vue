<script lang="ts" setup>
import { Notify } from 'quasar';
import { CartItem } from 'src/shared/interface/cart';
import { useCartStore } from 'src/stores/cart';

defineOptions({
  name: 'ExpansionCartItem',
});

const props = defineProps<{
  item: CartItem;
}>();

const cart = useCartStore();

function removeItem(id: string | number) {
  cart.reduceItemCount(id, 1);
  Notify.create({
    message: 'Item has been removed from your cart.',
    color: 'info',
    // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    icon: 'mdi-cart-minus',
    position: 'bottom-right',
    progress: true,
    group: false,
  });
}
</script>

<template>
  <q-expansion-item
    :key="props.item.product.id"
    icon="mdi-fish"
    :label="props.item.product.name"
    :caption="props.item.product.category_name"
    group="cart-items"
  >
    <template v-slot:header>
      <q-item-section side>
        <q-badge class="tw-px-2 tw-py-1 md:tw-text-[16px]">
          {{ props.item.quantity }}
        </q-badge>
      </q-item-section>

      <q-item-section class="sm:tw-text-[16px]">
        <small class="tw-text-dark tw-capitalize">
          {{ props.item.product.category_name }}
        </small>

        <div
          class="tw-overflow-x-hidden ellipsis tw-max-w-[110px] sm:tw-max-w-full tw-text-primary"
        >
          {{ props.item.product.name }}
        </div>
      </q-item-section>

      <q-item-section side>
        <span class="tw-font-bold text-dark">
          ₱{{
            (Number(props.item.product.price) * props.item.quantity).toFixed(2)
          }}
        </span>
      </q-item-section>
    </template>

    <q-card class="tw-border-t">
      <q-card-section class="tw-px-0 sm:tw-px-3">
        <div class="tw-px-2 tw-mb-3 tw-font-semibold" v-if="$q.screen.lt.sm">
          {{ props.item.product.name }}
        </div>

        <div class="tw-p-2 tw-bg-slate-100 tw-font-light">
          {{ props.item.product.description }}
        </div>

        <div
          class="tw-mt-2 tw-flex tw-flex-col tw-px-3 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between"
        >
          <div class="tw-flex tw-flex-col">
            <div>Price: ₱{{ props.item.product.price }}</div>
            <div class="tw-mt-1">
              Weight: {{ props.item.product.weight }} lb
            </div>
          </div>

          <div class="tw-mt-2 md:tw-mt-0 tw-flex tw-flex-col">
            <q-btn
              outline
              color="primary"
              dense
              padding="4px 16px"
              class="tw-text-[13px] tw-leading-snug"
              :to="'/products/' + props.item.product.id"
            >
              View Product
            </q-btn>

            <q-btn
              flat
              color="negative"
              dense
              padding="2px"
              class="tw-text-[13px] tw-leading-snug tw-mt-2"
              @click.stop="removeItem(props.item.product.id)"
            >
              <q-icon
                name="mdi-numeric-negative-1"
                v-if="props.item.quantity > 1"
              />
              Remove
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
