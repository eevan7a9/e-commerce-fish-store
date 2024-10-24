<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useLogout } from 'src/shared/composables/useLogout';
import { computed, ref } from 'vue';
import { useNavMenu } from 'src/shared/composables/useNavMenu';
import { MenuLanguage, MenuProfile } from 'src/components/menus/index';

const $q = useQuasar();

const { logout } = useLogout();
const navMenu = useNavMenu();
const appName = ref(process.env.VUE_APP_NAME);
const sidebar = ref(false);

const mobileView = computed(() => $q.screen.lt.md);
const menuList = computed(() =>
  navMenu.menuList.value.map((menu) => {
    switch (menu.route) {
      case '/signin':
        menu.show = mobileView.value;
        return menu;
      case '/register':
        menu.show = mobileView.value;
        return menu;
      case '/profile':
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
      <q-toolbar class="tw-max-w-screen-2xl tw-mx-auto">
        <q-toolbar-title class="tw-min-w-[200px]">
          <q-avatar class="tw-w-[60px] tw-h-[60px]">
            <q-img src="~assets/koi-logo.webp" height="50px" width="50px" />
          </q-avatar>
          <span class="tw-font-anton tw-ml-2">{{ appName }} </span>
          <menu-language />
        </q-toolbar-title>

        <ul
          class="tw-flex tw-items-center tw-text-[16px] tw-font-light tw-gap-x-5"
          v-if="!mobileView"
        >
          <template v-for="menu of menuList">
            <li class="tw-uppercase" :key="menu.label" v-if="menu.show">
              <router-link
                :key="menu.label"
                exact
                exact-active-class="!tw-text-gray-100 tw-font-bold"
                :to="menu.route || '/'"
              >
                {{ menu.label }}
              </router-link>
            </li>
          </template>

          <li>
            |
            <menu-profile />
          </li>
        </ul>

        <q-btn flat @click="sidebar = !sidebar" v-else>
          <q-icon name="menu"></q-icon>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer
      v-model="sidebar"
      :width="200"
      :breakpoint="500"
      overlay
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      v-if="mobileView"
    >
      <q-scroll-area class="fit tw-pt-3">
        <div class="tw-flex tw-items-end tw-pr-3">
          <q-btn
            padding="4px"
            @click="sidebar = !sidebar"
            flat
            icon="close"
            class="tw-mr-0 tw-ml-auto"
          />
        </div>

        <q-list>
          <template v-for="(menu, index) in menuList" :key="index">
            <q-item clickable :to="menu.route" exact v-ripple v-if="menu.show">
              <q-item-section avatar v-if="menu.icon">
                <q-icon :name="menu.icon" />
              </q-item-section>
              <q-item-section class="tw-uppercase">
                {{ menu.label }}
              </q-item-section>
            </q-item>
          </template>
          <q-item clickable @click="logout()" exact v-ripple>
            <q-item-section class="tw-uppercase">
              {{ $t('menu.signout') }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

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
        class="tw-max-w-screen-2xl tw-mx-auto tw-text-[16px] tw-flex tw-flex-col tw-items-center"
      >
        <h1 class="tw-py-5">
          By using this site you accept the
          <router-link to="/" class="tw-underline">terms of use.</router-link>
        </h1>
        <a
          href="https://github.com/eevan7a9/e-commerce-fish-store"
          class="tw-text-[12px] tw-underline tw-text-primary"
          >https://github.com/eevan7a9/e-commerce-fish-store</a
        >
      </div>
    </q-footer>
  </q-layout>
</template>
