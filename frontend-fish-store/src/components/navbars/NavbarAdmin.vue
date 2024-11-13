<script lang="ts" setup>
const emits = defineEmits<{ toggleLeftDrawer: [] }>();
</script>

<template>
  <q-toolbar class="tw-py-3">
    <q-btn
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      @click="emits('toggleLeftDrawer')"
    />

    <q-toolbar-title> Admin Dashboard </q-toolbar-title>
  </q-toolbar>
</template>
