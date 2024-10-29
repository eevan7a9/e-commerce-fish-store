<script setup lang="ts">
import { useLogout } from 'src/shared/composables/useLogout';
import { useAuthStore } from 'src/stores/auth';
import { computed } from 'vue';
import { MenuLanguage } from 'src/components/menus';
defineOptions({
  name: 'MenuProfile',
});

const { logout } = useLogout();
const auth = useAuthStore();
const isAuth = computed(() => !!(auth.userToken && auth.userInfo));
</script>

<template>
  <q-btn color="light" icon="person" flat>
    <span class="gt-xs tw-ml-2">{{ $t('menu.account') }}</span>
    <q-menu max-width="400px" class="tw-w-[360px]">
      <div class="row no-wrap q-pa-md">
        <div class="column tw-w-[150px]">
          <div class="tw-flex tw-flex-col tw-items-start">
            {{ $t('myLanguage') }}:
            <menu-language
              outline
              color="dark"
              class="tw-w-full tw-mt-2 tw-font-normal"
              padding="0 12px"
            />
          </div>

          <q-separator class="tw-my-3" />

          <q-btn
            outline
            color="primary"
            class="tw-font-normal"
            padding="2px 12px"
          >
            My Purchase
          </q-btn>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column tw-w-[150px] tw-items-center tw-justify-center">
          <q-avatar size="72px" v-if="isAuth">
            <img src="https://avatars.githubusercontent.com/u/44322334?v=4" />
          </q-avatar>
          <q-avatar
            size="72px"
            color="teal"
            text-color="white"
            icon="person"
            v-else
          />

          <div class="text-subtitle1 q-mt-md q-mb-xs">
            {{ isAuth ? 'Eevan7a9' : 'Customer' }}
          </div>

          <template v-if="isAuth">
            <q-btn
              color="positive"
              label="profile"
              to="/profile"
              size="sm"
              class="tw-mb-2"
              v-close-popup
            />

            <q-btn
              color="negative"
              @click="logout()"
              label="Logout"
              push
              size="sm"
              v-close-popup
            />
          </template>
          <template v-else>
            <q-btn
              color="positive"
              label="Register"
              to="/register"
              size="sm"
              class="tw-mb-2 tw-w-full"
              v-close-popup
            />

            <q-btn
              color="primary"
              to="/signin"
              label="Signin"
              class="tw-w-full"
              push
              size="sm"
              v-close-popup
            />
          </template>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>
