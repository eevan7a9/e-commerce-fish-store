<script setup lang="ts">
import { computed, ref } from 'vue';
import { useNavMenu } from 'src/shared/composables/useNavMenu';
import { MenuLanguage } from 'src/components/menus/index';
import { DrawerMobileLeft } from 'src/components/drawers';
import { RainStorm } from 'src/components/illustrations';
import { NavbarCustomer } from 'src/components/navbars';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const navMenu = useNavMenu();

const appName = ref(process.env.VUE_APP_NAME);
const sidebar = ref(false);

const mobileView = computed(() => $q.screen.lt.md);
const menuList = computed(() => navMenu.publicMenuList.value);
</script>

<template>
  <q-layout view="lHh lpR lff">
    <q-header bordered reveal class="bg-primary text-white">
      <navbar-customer>
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
      <main class="tw-flex-grow tw-h-full tw-flex">
        <div class="tw-relative tw-flex-grow tw-w-full">
          <div class="tw-z-0 tw-w-full tw-absolute tw-h-[500px]">
            <div class="auth-bg tw-z-0">
              <div class="tw-absolute tw-top-0 tw-w-full tw-min-h-[300px]">
                <RainStorm />
              </div>
            </div>
          </div>

          <section
            class="tw-top-0 tw-w-full tw-px-3 tw-flex tw-items-center tw-justify-center tw-h-full"
          >
            <div class="tw-py-[50px]">
              <router-view />
            </div>
          </section>
        </div>
      </main>
    </q-page-container>

    <drawer-mobile-left v-model="sidebar" :menu-list="menuList" />

    <q-footer bordered class="tw-bg-slate-200 text-dark tw-min-h-[60px]">
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
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
.auth-bg {
  background-image: url('/images/showcase-bg.webp');
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  height: 40vh;
  min-height: 500px;
  position: relative;
  &::before {
    content: '';
    background: rgba(34, 13, 46, 0.548);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  & > * {
    position: relative;
    z-index: 1;
  }
}
</style>
