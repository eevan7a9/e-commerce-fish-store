<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { DrawerAdminLeft } from 'src/components/drawers';
import { NavbarAdmin } from 'src/components/navbars';
import { MenuItem } from 'src/shared/interface/menu';
import { useOrdersStore } from 'src/stores/orders';
import { useAuthStore } from 'src/stores/auth';
import {
  generateMockOrders,
  generateMockRegisteredUsers,
  mockRequest,
} from 'src/shared/utils/mock';
import { useUsersStore } from 'src/stores/users';
import { MenuLanguage } from 'src/components/menus';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'MainLayout',
});

const ordersStore = useOrdersStore();
const auth = useAuthStore();
const usersStore = useUsersStore();
const { t } = useI18n();

const leftDrawerOpen = ref(false);

const menuList = computed<(MenuItem | { separator: true })[]>(() => [
  {
    icon: 'mdi-monitor-dashboard',
    label: t('menu.dashboard'),
    caption: 'Business at a Glance',
    route: '/admin',
  },
  {
    icon: 'mdi-shopping',
    label: t('menu.orders'),
    caption: 'Order Management',
    route: '/admin/orders',
  },
  {
    icon: 'mdi-store',
    label: t('menu.products'),
    caption: 'Inventory Overview',
    route: '/admin/products',
  },
  {
    icon: 'mdi-account-group',
    label: t('menu.customers'),
    caption: 'All Your Shoppers in One Place',
    route: '/admin/customers',
  },
  {
    separator: true,
  },
  {
    icon: 'mdi-shape',
    label: t('products.categories'),
    caption: 'Tags Management',
    route: '/admin/categories',
  },
  {
    icon: 'mdi-tag',
    label: t('products.tags'),
    caption: 'All Your Shoppers in One Place',
    route: '/admin/tags',
  },
]);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const appName = process.env.VUE_APP_NAME;

onMounted(async () => {
  if (process.env.ENABLE_STATIC_MODE === 'true') {
    await mockRequest(
      {
        users: generateMockRegisteredUsers(58),
        orders: generateMockOrders(150),
      },
      {
        before: () => {
          usersStore.setLoading(true);
          ordersStore.setLoading(true);
        },
        after: () => {
          usersStore.setLoading(false);
          ordersStore.setLoading(false);
        },
      },
      (res) => {
        usersStore.setUsers(res.users);
        ordersStore.setOrders(res.orders);
      }
    );
  } else {
    await usersStore.fetchUsers(auth.userToken);
    await ordersStore.fetchOrders(auth.userToken);
  }
});
</script>

<template>
  <q-layout view="hHh Lpr lff">
    <q-header bordered reveal>
      <navbar-admin @toggle-left-drawer="toggleLeftDrawer()" />
    </q-header>

    <drawer-admin-left :menu-list="menuList" v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="tw-bg-slate-200 text-white tw-border-t-4">
      <q-toolbar>
        <q-toolbar-title
          class="tw-text-dark tw-flex tw-items-center tw-gap-3 tw-py-3"
        >
          <q-avatar>
            <q-img src="~assets/koi-logo.webp" />
          </q-avatar>
          <h1 class="tw-font-anton">{{ appName }}</h1>
        </q-toolbar-title>

        <menu-language flat />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
