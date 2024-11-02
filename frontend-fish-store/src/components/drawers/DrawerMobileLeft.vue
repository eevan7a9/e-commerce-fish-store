<script setup lang="ts">
import { useLogout } from 'src/shared/composables/useLogout';
import { MenuItem } from 'src/shared/interface/menu';
import { useAuthStore } from 'src/stores/auth';
import { computed } from 'vue';

defineOptions({
  name: 'DrawerMobileLeft',
});

const auth = useAuthStore();
const { logout } = useLogout();

const props = defineProps<{ menuList: MenuItem[] }>();
const model = defineModel({ required: true, type: Boolean });
const isLogin = computed<boolean>(() => auth.authenticated);
</script>

<template>
  <q-drawer
    v-model="model"
    :width="200"
    :breakpoint="500"
    overlay
    bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-scroll-area class="fit tw-pt-3">
      <div class="tw-flex tw-items-end tw-pr-3">
        <q-btn
          padding="4px"
          @click="model = !model"
          flat
          icon="close"
          class="tw-mr-0 tw-ml-auto"
        />
      </div>

      <q-list>
        <template v-for="menu in props.menuList" :key="menu.route">
          <q-item clickable :to="menu.route" exact v-ripple v-if="menu.show">
            <q-item-section avatar v-if="menu.icon">
              <q-icon :name="menu.icon" />
            </q-item-section>
            <q-item-section class="tw-uppercase">
              {{ menu.label }}
            </q-item-section>
          </q-item>
        </template>

        <q-item clickable @click="logout()" v-if="isLogin" v-ripple>
          <q-item-section class="tw-uppercase">
            {{ $t('menu.signout') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
