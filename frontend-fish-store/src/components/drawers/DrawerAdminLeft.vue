<script lang="ts" setup>
import { useLogout } from 'src/shared/composables/useLogout';
import { MenuItem } from 'src/shared/interface/menu';

const logout = useLogout();
const model = defineModel<boolean>();
const props = defineProps<{ menuList: (MenuItem | { separator: true })[] }>();
</script>

<template>
  <q-drawer v-model="model" show-if-above bordered>
    <q-list class="tw-h-full tw-bg-[#230a43] tw-text-white">
      <q-item-label header> Essential Links </q-item-label>

      <template v-for="(item, i) of props.menuList" :key="i">
        <q-item
          clickable
          :to="item.route"
          exact-active-class="text-accent"
          v-if="!item.separator"
        >
          <q-item-section class="tw-min-w-0" avatar>
            <q-icon :name="item.icon" color="white" size="32px" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="tw-text-[16px] tw-text-white tw-capitalize">
              {{ item.label }}
            </q-item-label>
            <q-item-label caption class="tw-text-slate-400" v-if="item.caption">
              {{ item.caption }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator color="accent" class="tw-my-4" v-else />
      </template>

      <q-item
        clickable
        @click="logout.logout()"
        class="tw-bottom-5 tw-top-auto tw-absolute tw-w-full tw-border-t tw-border-accent tw-pt-4"
      >
        <q-item-section avatar>
          <q-icon name="mdi-exit-to-app" size="28px" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="tw-text-[16px]">Logout</q-item-label>
          <q-item-label caption class="tw-text-slate-400">
            End Your Current Session
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
