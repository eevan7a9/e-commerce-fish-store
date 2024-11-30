<script setup lang="ts">
import { Notify } from 'quasar';
import { Order, OrderItem } from 'src/shared/interface/order';
import { useAuthStore } from 'src/stores/auth';
import { useOrdersStore } from 'src/stores/orders';
import { computed, ref } from 'vue';
import { ExpansionOrderProduct } from 'src/components/expansion-item';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'DialogOrderProducts',
});

const dialog = defineModel({
  default: false,
});

const props = defineProps<{ order: Order }>();

const router = useRouter();
const auth = useAuthStore();
const ordersStore = useOrdersStore();

const totalPrice = computed(() =>
  list.value
    .reduce((prev, curr) => prev + curr.price * curr.quantity, 0)
    .toFixed(2)
);
const totalWeight = computed(() =>
  list.value
    .reduce(
      (prev, curr) => prev + Number(curr.product.weight) * curr.quantity,
      0
    )
    .toFixed(2)
);

const list = ref<OrderItem[]>([]);
const loading = ref(true);

async function getItems(): Promise<void> {
  loading.value = true;
  const res = await ordersStore.getOrderProducts(
    props.order.id,
    auth.userToken
  );

  if (res && res.success && res.data) {
    list.value = res.data;
    loading.value = false;
  } else {
    Notify.create({
      message: 'Something went wrong, try again later.',
      color: 'negative',
    });
    setTimeout(() => (dialog.value = false), 3000);
  }
}

function redirectToProduct(id: string | number) {
  if (auth.isAdmin) {
    router.push({ path: '/admin/products', query: { id } });
  } else {
    router.push('/products/' + id);
  }
}
</script>

<template>
  <q-dialog
    v-model="dialog"
    :maximized="$q.screen.lt.sm"
    transition-show="slide-up"
    transition-hide="slide-down"
    @show="getItems()"
  >
    <q-card class="tw-w-[800px]">
      <q-card-section
        class="tw-border-b tw-flex tw-items-center tw-justify-between"
      >
        <h1>
          <span class="tw-font-semibold tw-text-[16px]">
            Products Purchased
          </span>
        </h1>

        <q-btn
          @click="dialog = false"
          icon="close"
          size="12px"
          padding="4px"
          round
          color="dark"
          flat
        />
      </q-card-section>

      <q-card-section class="tw-p-0" v-if="!loading">
        <q-list separator>
          <template v-for="(item, i) of list" :key="i">
            <expansion-order-product
              @view-product="redirectToProduct"
              :default-opened="i === 0"
              :item="item"
            />
          </template>
        </q-list>

        <q-separator />

        <div class="tw-text-right tw-py-3">
          <div class="tw-text-[14px] tw-mb-2">
            Total Weight:
            <span class="tw-font-bold tw-px-3 tw-mx-1 tw-text-[16px]">
              {{ totalWeight }}lb
            </span>
          </div>
          <div class="tw-text-[16px]">
            Total Price:
            <span class="tw-font-bold tw-px-3 tw-mx-1 tw-text-[20px]">
              ₱{{ totalPrice }}
            </span>
          </div>
        </div>
      </q-card-section>

      <q-card-section
        class="tw-h-[300px] tw-flex tw-justify-center tw-items-center"
        v-else
      >
        <div>
          <q-spinner-gears size="50px" color="primary" class="tw-mb-3" />
          Loading...
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section
        class="tw-flex tw-flex-col-reverse sm:tw-flex-row tw-gap-3 tw-justify-end"
      >
        <q-btn color="primary" unelevated v-close-popup> OK </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
