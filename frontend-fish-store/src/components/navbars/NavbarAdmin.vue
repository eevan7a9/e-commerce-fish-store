<script lang="ts" setup>
const emits = defineEmits<{ toggleLeftDrawer: [] }>();
</script>

<template>
  <q-toolbar class="tw-py-3 tw-shadow-none">
    <q-btn
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      @click="emits('toggleLeftDrawer')"
    />

    <q-toolbar-title class="tw-font-anton tw-text-[28px]">
      Admin Dashboard
    </q-toolbar-title>

    <q-btn icon="mdi-bell" flat>
      <q-menu max-width="200px" class="tw-w-full">
        <div class="tw-h-[100px] tw-flex tw-justify-center tw-items-center">
          <h1>No Notification</h1>
        </div>
      </q-menu>
    </q-btn>
  </q-toolbar>
</template>
