<script setup lang="ts">
import { FormProfile } from 'src/components/forms';
import { TableOrders } from 'src/components/tables';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrdersStore } from 'src/stores/orders';
import { useAuthStore } from 'src/stores/auth';
import { Loading } from 'quasar';

defineOptions({
  name: 'ProfilePage',
});

const tabList = [
  { label: 'Orders', value: 'orders' },
  { label: 'Profile', value: 'profile' },
  { label: 'Change password', value: 'change password' },
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
    console.log('Loading mock data...');
    await orders.loadMockOrders();
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
    class="tw-max-w-screen-xl tw-w-full tw-relative tw-mx-auto tw-grid tw-items-start md:tw-grid-cols-12"
  >
    <aside class="md:tw-col-span-3 tw-px-3 md:tw-px-6 tw-mt-4">
      <q-card class="tw-border tw-rounded-md" flat>
        <q-card-section class="tw-py-2 tw-px-0">
          <q-list separator class="tw-bg-white">
            <template v-for="tab of tabList" :key="tab.label">
              <q-item
                class="tw-pl-8"
                clickable
                @click="changeTab(tab.value)"
                v-ripple
              >
                <q-item-section class="tw-text-[14px]">
                  {{ tab.label }}
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-card-section>
      </q-card>
    </aside>

    <section
      class="md:tw-col-span-9 tw-relative tw-pb-8 md:tw-pb-12 tw-px-3 tw-mt-4"
    >
      <div v-if="activeTab === 'profile'">
        <form-profile />
      </div>

      <div v-if="activeTab === 'orders'">
        <table-orders />
      </div>
    </section>
  </main>
</template>
