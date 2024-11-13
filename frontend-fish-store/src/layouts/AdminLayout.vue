<script setup lang="ts">
import { ref } from 'vue';
import { DrawerAdminLeft } from 'src/components/drawers';
import { NavbarAdmin } from 'src/components/navbars';
defineOptions({
  name: 'MainLayout',
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <navbar-admin @toggle-left-drawer="toggleLeftDrawer()" />
    </q-header>

    <drawer-admin-left v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
