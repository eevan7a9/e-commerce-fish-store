<script setup lang="ts">
import { useLogout } from 'src/shared/composables/useLogout';
import { useAuthStore } from 'src/stores/auth';
import { computed } from 'vue';

defineOptions({
  name: 'MenuProfile',
});

const { logout } = useLogout();
const auth = useAuthStore();
const isAuth = computed(() => !!(auth.userToken && auth.userInfo));
</script>

<template>
  <q-btn color="light" icon="person" label="Account" flat>
    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-[24px] q-mb-md tw-min-w-[60px]">My Cart</div>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
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
