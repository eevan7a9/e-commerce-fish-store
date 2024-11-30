<script setup lang="ts">
import { FormProfile, FormChangePassword } from 'src/components/forms';
import { TableOrders } from 'src/components/tables';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrdersStore } from 'src/stores/orders';
import { useAuthStore } from 'src/stores/auth';
import { Loading } from 'quasar';
import { generateMockOrders, mockRequest } from 'src/shared/utils/mock';
import { useI18n } from 'vue-i18n';
import { ProfileCartContent } from 'src/components/profile';
import { ProductsLatestSlide } from 'src/components/products';

defineOptions({
  name: 'ProfilePage',
});

const { t } = useI18n();

const tabList = [
  { label: t('menu.orders'), value: 'orders' },
  { label: t('menu.profile'), value: 'profile' },
  { label: 'Change password', value: 'change-password' },
];

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const orders = useOrdersStore();

const activeTab = ref('orders');

function changeTab(tab: string) {
  router.push({
    path: '',
    query: {
      tab,
    },
  });
  activeTab.value = tab;
}

onMounted(async () => {
  Loading.show({
    message: 'Fetching Data...',
    spinnerColor: 'primary',
  });
  if (process.env.ENABLE_STATIC_MODE === 'true') {
    await mockRequest(
      generateMockOrders(10, {
        user_id: auth.userInfo?.id,
        name: auth.userInfo?.name,
        email: auth.userInfo?.email,
      }),
      {
        before: () => orders.setLoading(true),
        after: () => orders.setLoading(false),
      },
      orders.setOrders
    );
  } else {
    console.log('Fetching data from server...');
    await orders.fetchOrders(auth.userToken);
  }
  Loading.hide();
  const { tab } = route.query;
  if (tab !== 'orders' && tab !== 'profile') {
    return;
  }
  activeTab.value = tab;
});
</script>

<template>
  <nav
    class="tw-max-w-screen-xl tw-mx-auto tw-w-full md:tw-text-[20px] tw-mt-8 tw-pl-3 md:tw-px-6"
  >
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Account" icon="mdi-account" to="/account" />
      <q-breadcrumbs-el
        class="tw-font-semibold tw-capitalize"
        :label="activeTab || 'Page'"
      />
    </q-breadcrumbs>
  </nav>

  <main
    class="tw-max-w-screen-2xl tw-w-full tw-relative tw-mx-auto tw-grid tw-items-start md:tw-grid-cols-12"
  >
    <aside
      class="md:tw-col-span-4 xl:tw-col-span-3 tw-px-3 md:tw-px-6 tw-mt-4 tw-pb-8"
    >
      <q-card class="tw-border tw-rounded-md" flat>
        <q-card-section class="tw-py-1 tw-px-0">
          <q-list separator class="tw-bg-white">
            <template v-for="tab of tabList" :key="tab.label">
              <q-item
                class="tw-pl-8"
                clickable
                @click="changeTab(tab.value)"
                v-ripple
              >
                <q-item-section
                  class="tw-text-[14px] md:tw-py-1 md:tw-text-[16px] tw-font-light tw-capitalize"
                >
                  {{ tab.label }}
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-card-section>
      </q-card>

      <profile-cart-content />
    </aside>

    <section
      class="tw-overflow-auto md:tw-col-span-8 xl:tw-col-span-9 tw-relative tw-pb-8 md:tw-pb-12 tw-px-3 tw-mt-4"
    >
      <template v-if="activeTab === 'profile'">
        <form-profile />
      </template>

      <template v-if="activeTab === 'orders'">
        <table-orders />
      </template>

      <template v-if="activeTab === 'change-password'">
        <form-change-password />
      </template>

      <div class="tw-relative tw-mt-8 md:tw-mt-14 tw-pb-[200px]">
        <products-latest-slide />
      </div>
    </section>
  </main>
</template>
