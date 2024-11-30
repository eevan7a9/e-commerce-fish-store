<script setup lang="ts">
import { Dialog } from 'quasar';
import { User } from 'src/shared/interface/user';
import { computed } from 'vue';

defineOptions({
  name: 'DialogCustomerDetails',
});

const dialog = defineModel({
  type: Boolean,
  default: false,
});

const props = defineProps<{ user: User }>();
const emits = defineEmits<{ viewOrders: [] }>();

const userTableData = computed(() => {
  if (!props.user) {
    return [];
  }
  return Object.keys(props.user)
    .filter((key) => key !== 'profile_img')
    .map((key) => ({
      key,
      value: props.user[key as keyof typeof props.user],
    }));
});

function suspendAccount() {
  Dialog.create({
    title: 'Disable Account',
    message:
      "Disabling this account will restrict the user's access and functionality.",
    cancel: {
      label: 'Cancel',
      color: 'primary',
      outline: true,
    },
    ok: {
      label: 'Suspend Account',
      color: 'negative',
      unelevated: true,
    },
  });
}
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card style="max-width: 1200px" v-if="props.user">
      <q-card-section
        class="tw-border-b tw-flex tw-items-center tw-justify-between"
      >
        <h1 class="sm:tw-text-[18px] tw-font-semibold">User Details</h1>

        <q-btn
          @click="dialog = false"
          icon="close"
          size="12px"
          padding="4px"
          round
          color="dark"
          flat
        />
      </q-card-section>

      <q-card-section
        class="tw-flex tw-flex-col-reverse lg:tw-flex-row tw-gap-3"
      >
        <div>
          <template v-for="(item, i) of userTableData" :key="i">
            <div class="tw-flex tw-py-3 tw-gap-3 tw-border">
              <div class="tw-text-right tw-min-w-[150px] tw-capitalize">
                {{ item.key.split('_').join(' ') }}
              </div>

              <div class="tw-border-l tw-px-3 tw-capitalize">
                {{ item.value }}
              </div>
            </div>
          </template>
        </div>

        <div class="tw-border tw-min-w-[300px]">
          <div class="tw-flex tw-justify-center tw-py-3">
            <q-avatar size="200px">
              <img src="~assets/avatar.png" class="tw-w-full tw-h-[200px]" />
            </q-avatar>
          </div>

          <div class="tw-px-3 tw-flex tw-flex-col tw-gap-3">
            <q-btn
              label="View Orders"
              color="primary"
              icon="mdi-shopping"
              push
              glossy
              square
              class="tw-w-full"
              @click="emits('viewOrders')"
            >
              <q-badge color="white" class="tw-ml-2 text-accent tw-font-bold">
                {{ props.user.orders_made }}
              </q-badge>
            </q-btn>
            <q-btn
              label="Suspend Account"
              color="negative"
              outline
              icon="mdi-cancel"
              class="tw-w-full"
              @click="suspendAccount()"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="tw-flex tw-justify-end">
        <q-btn
          v-close-popup
          label="OK"
          class="tw-w-[100px]"
          color="primary"
          unelevated
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
