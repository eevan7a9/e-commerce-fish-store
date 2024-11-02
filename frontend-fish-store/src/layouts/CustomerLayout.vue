<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useNavMenu } from 'src/shared/composables/useNavMenu';
import { DrawerMobileLeft } from 'src/components/drawers';
import {
  MenuLanguage,
  MenuCart,
  MenuProfile,
} from 'src/components/menus/index';
import { NavbarCustomer } from 'src/components/navbars';
import { MenuItem } from 'src/shared/interface/menu';
import { useRoute } from 'vue-router';

const $q = useQuasar();
const navMenu = useNavMenu();
const route = useRoute();

const appName = ref(process.env.VUE_APP_NAME);
const sidebar = ref(false);

const showCart = computed(() => !route.fullPath.includes('/checkout'));

const mobileView = computed(() => $q.screen.lt.md);
const menuList = computed<MenuItem[]>(() =>
  navMenu.menuList.value.map((menu) => {
    switch (menu.route) {
      case '/auth':
        menu.show = mobileView.value;
        return menu;
      case '/auth/register':
        menu.show = mobileView.value;
        return menu;
      case '/account':
        menu.show = mobileView.value;
        return menu;
      default:
        return menu;
    }
  })
);
</script>

<template>
  <q-layout view="lHh lpR lff">
    <q-header bordered reveal class="bg-primary text-white">
      <navbar-customer>
        <template #menu-profile>
          <menu-profile padding="2px 4px" />
        </template>

        <template v-if="showCart" #menu-cart>
          |
          <menu-cart flat size="20px" padding="4px" class="tw-ml-3" />
        </template>

        <template #mobile-toggle>
          <q-btn
            class="tw-mr-0 tw-ml-auto"
            flat
            @click="sidebar = !sidebar"
            v-if="mobileView"
          >
            <q-icon name="menu"></q-icon>
          </q-btn>
        </template>
      </navbar-customer>
    </q-header>

    <q-page-container class="tw-flex tw-flex-col tw-min-h-screen">
      <router-view />
    </q-page-container>

    <drawer-mobile-left v-model="sidebar" :menu-list="menuList" />

    <q-footer bordered class="tw-bg-slate-200 text-dark tw-min-h-[150px]">
      <q-toolbar class="tw-pt-3 tw-max-w-screen-2xl tw-mx-auto">
        <q-toolbar-title class="tw-flex tw-items-center">
          <q-avatar>
            <q-img src="~assets/koi-logo.webp" />
          </q-avatar>

          <span class="tw-text-gray-900 tw-font-anton tw-ml-2">
            {{ appName }}
          </span>
          <menu-language class="tw-ml-auto tw-mr-0" flat />
        </q-toolbar-title>
      </q-toolbar>
      <div
        class="tw-max-w-screen-2xl tw-mx-auto tw-pb-3 sm:tw-text-[16px] tw-flex tw-flex-col tw-items-center"
      >
        <h1 class="tw-py-5">
          By using this site you accept the
          <router-link to="/" class="tw-underline">terms of use.</router-link>
        </h1>
        <a
          href="https://github.com/eevan7a9/e-commerce-fish-store"
          target="_blank"
          class="tw-text-[12px] tw-underline tw-text-primary tw-text-center"
        >
          <div class="gt-xs">
            https://github.com/eevan7a9/e-commerce-fish-store
          </div>

          <q-icon name="mdi-github" class="tw-mx-auto" size="34px"
        /></a>
      </div>
    </q-footer>
  </q-layout>
</template>
