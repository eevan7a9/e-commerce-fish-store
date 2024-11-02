<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { useNavMenu } from 'src/shared/composables/useNavMenu';
import { MenuItem } from 'src/shared/interface/menu';
import { computed, ref } from 'vue';

const $q = useQuasar();
const navMenu = useNavMenu();
const appName = ref(process.env.VUE_APP_NAME);
const mobileView = computed(() => $q.screen.lt.md);
const menuList = computed<MenuItem[]>(() => navMenu.publicMenuList.value);
</script>

<template>
  <q-toolbar class="tw-max-w-screen-2xl tw-mx-auto">
    <q-toolbar-title class="tw-max-w-[200px]">
      <router-link to="/">
        <q-avatar class="tw-w-[60px] tw-h-[60px]">
          <q-img src="~assets/koi-logo.webp" height="50px" width="50px" />
        </q-avatar>
        <span class="tw-font-anton tw-ml-2">{{ appName }} </span>
      </router-link>
    </q-toolbar-title>

    <ul
      class="tw-mr-auto tw-ml-0 tw-flex tw-items-center tw-text-[16px] tw-font-light tw-gap-x-5"
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
    </ul>

    <ul class="tw-flex tw-items-center tw-mr-0 tw-ml-auto">
      <li class="tw-px-3">
        <slot name="menu-profile"></slot>
      </li>

      <li>
        <slot name="menu-cart"></slot>
      </li>

      <li>
        <slot name="mobile-toggle"></slot>
      </li>
    </ul>
  </q-toolbar>
</template>
