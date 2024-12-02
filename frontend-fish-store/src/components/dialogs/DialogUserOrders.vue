<script lang="ts" setup>
import { User, UserDetails } from 'src/shared/interface/user';
import { useAuthStore } from 'src/stores/auth';
import { useUsersStore } from 'src/stores/users';
import { computed, ref, watch } from 'vue';
import { ExpansionUserOrder } from 'src/components/expansion-item';
import { Notify } from 'quasar';
import { generateMockUserDetails, mockRequest } from 'src/shared/utils/mock';

defineOptions({
  name: 'DialogUserOrders',
});

const model = defineModel({
  type: Boolean,
});

const props = withDefaults(defineProps<{ title?: string; user: User }>(), {
  title: 'User Orders',
});

const auth = useAuthStore();
const usersStore = useUsersStore();

const needrefresh = ref(true);
const loading = ref(true);
const userDetails = ref<UserDetails | null>();
const userOrders = computed(() =>
  userDetails.value ? userDetails.value.orders : []
);

async function getUserDetails() {
  loading.value = true;
  const res = await (process.env.ENABLE_STATIC_MODE === 'true'
    ? mockRequest(generateMockUserDetails({ ...props.user }))
    : usersStore.getUserById(props.user.id, auth.userToken));

  if (res && res?.success) {
    console.log(res);
    userDetails.value = res.data;
  } else {
    model.value = false;
    Notify.create({
      message: 'Something went wrong with the Server, try again later.',
      color: 'negative',
      timeout: 5000,
    });
  }

  console.log('getUserDetails()()()', res);
  needrefresh.value = false;
  loading.value = false;
}

watch(
  () => props.user,
  () => {
    needrefresh.value = true;
  },
  { deep: true }
);

function enableRefresh() {
  needrefresh.value = true;
  model.value = false;
  userDetails.value = null;
}
</script>

<template>
  <q-dialog
    v-model="model"
    :maximized="$q.screen.lt.sm"
    @show="needrefresh && getUserDetails()"
  >
    <q-card style="width: 100vw; max-width: 800px">
      <q-card-section
        class="tw-border-b tw-flex tw-items-center tw-justify-between tw-bg-primary tw-text-white"
      >
        <h1 class="sm:tw-text-[18px] tw-font-semibold">
          {{ props.title }}
        </h1>

        <q-btn
          v-close-popup
          icon="close"
          size="12px"
          padding="4px"
          round
          color="light"
          flat
        />
      </q-card-section>

      <q-card-section
        class="tw-h-[300px] tw-flex tw-justify-center tw-items-center"
        v-if="loading"
      >
        <div>
          <q-spinner-gears size="50px" color="primary" class="tw-mb-3" />
          Loading...
        </div>
      </q-card-section>

      <q-card-section
        class="tw-px-0 sm:tw-px-3"
        v-if="!loading && userOrders.length"
      >
        <q-scroll-area
          class="tw-h-screen tw-max-h-[80dvh] sm:tw-max-h-[500px] md:tw-max-h-[50dvh]"
        >
          <q-list separator>
            <template v-for="(order, i) of userOrders" :key="order.id">
              <expansion-user-order
                :order="order"
                :default-opened="i === 0"
                @updated-payments="enableRefresh"
                @updated-status="enableRefresh"
              />
            </template>
          </q-list>
        </q-scroll-area>
      </q-card-section>

      <q-card-section
        class="tw-flex tw-flex-col tw-items-center tw-py-12"
        v-if="!loading && !userOrders.length"
      >
        <h1
          class="tw-text-[16px] sm:tw-text-[20px] tw-leading-relaxed tw-font-normal tw-mb-8"
        >
          No orders found for this user.
        </h1>

        <q-img
          src="~assets/image-svg/empty-box.svg"
          class="tw-my-[24px] tw-max-w-[300px] animate-float"
          width="100%"
          height="100%"
        />
        <div>
          <q-btn
            :label="$t('orders.startShopping')"
            padding="8px 32px"
            unelevated
            to="/products"
            color="primary"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="tw-px-4 tw-pb-4" :align="'right'">
        <q-btn
          v-close-popup
          label="OK"
          class="tw-w-[100px]"
          padding="8px"
          color="primary"
          unelevated
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
