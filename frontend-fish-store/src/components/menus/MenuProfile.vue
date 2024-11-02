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
const username = computed(() => auth.userInfo?.name);
const profileImg = computed(() => auth.userInfo?.profile_img);
</script>

<template>
  <q-btn color="light" flat>
    <q-icon class="tw-mr-2">
      <q-avatar size="32px" v-if="isAuth">
        <img :src="profileImg" />
      </q-avatar>

      <q-avatar
        size="32px"
        color="grey-4"
        text-color="primary"
        icon="person"
        v-else
      />
    </q-icon>

    <span class="gt-xs tw-ml-2" v-if="isAuth">{{ $t('menu.account') }}</span>
    <span class="gt-xs tw-ml-2" v-else>Customer</span>

    <q-menu max-width="400px">
      <div class="tw-px-2 md:tw-px-3 tw-py-4 tw-flex tw-flex-col">
        <q-separator vertical inset class="q-mx-lg" />

        <section class="column tw-w-[150px] tw-items-center tw-justify-center">
          <q-avatar size="72px" v-if="isAuth">
            <img :src="profileImg" />
          </q-avatar>

          <q-avatar
            size="72px"
            color="teal"
            text-color="white"
            icon="person"
            v-else
          />

          <router-link
            class="tw-w-full tw-py-3 hover:tw-underline"
            to="/account"
            v-close-popup
          >
            <div class="tw-overflow-hidden tw-text-center ellipsis">
              {{ isAuth ? username : 'Customer' }}
            </div>
          </router-link>

          <template v-if="isAuth">
            <q-btn
              color="positive"
              label="profile"
              to="/account"
              size="sm"
              class="tw-mb-2 tw-w-full"
              unelevated
              v-close-popup
            />

            <q-btn
              color="negative"
              @click="logout()"
              label="Logout"
              size="sm"
              unelevated
              class="tw-w-full"
              v-close-popup
            />
          </template>
          <template v-else>
            <q-btn
              color="positive"
              :label="$t('auth.signup')"
              to="/auth/register"
              size="sm"
              unelevated
              class="tw-mb-2 tw-w-full"
              v-close-popup
            />

            <q-btn
              color="primary"
              to="/auth"
              :label="$t('auth.signin')"
              class="tw-w-full"
              unelevated
              size="sm"
              v-close-popup
            />
          </template>
        </section>

        <section class="column tw-w-[150px] tw-mt-4">
          <div class="tw-flex tw-flex-col tw-items-center">
            {{ $t('myLanguage') }}:
            <menu-language
              color="info"
              class="tw-w-full tw-mt-2 tw-font-normal tw-text-[12px]"
              padding="2px 12px"
            />
          </div>
        </section>
      </div>
    </q-menu>
  </q-btn>
</template>
