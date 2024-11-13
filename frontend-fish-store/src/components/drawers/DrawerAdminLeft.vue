<script lang="ts" setup>
import { useLogout } from 'src/shared/composables/useLogout';

const logout = useLogout();
const model = defineModel<boolean>();
</script>

<template>
  <q-drawer v-model="model" show-if-above bordered>
    <q-list class="tw-h-full">
      <q-item-label header> Essential Links </q-item-label>

      <q-item>
        <q-item-label>Content</q-item-label>
      </q-item>

      <q-item
        clickable
        @click="logout.logout()"
        class="tw-bottom-5 tw-top-auto tw-absolute tw-w-full tw-border-t tw-pt-4"
      >
        <q-item-section avatar>
          <q-icon name="mdi-exit-to-app" size="28px" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="tw-text-[16px]">Logout</q-item-label>
          <q-item-label caption> End Your Current Session </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
