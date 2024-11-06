<script setup lang="ts">
import { Notify } from 'quasar';
import { User } from 'src/shared/interface/auth';
import { useAuthStore } from 'src/stores/auth';
import { computed, onMounted, reactive, ref } from 'vue';

defineOptions({
  name: 'FormProfile',
});

const authStore = useAuthStore();

const profile = reactive<User>({
  id: '',
  name: '',
  email: '',
  address: '',
  phone: '',
  email_verified_at: false,
  created_at: new Date().toLocaleDateString(),
});

const isEmailVerified = computed(() => profile.email_verified_at);
const image = ref<File>();

function onSubmit() {
  console.log('submit...');

  if (process.env.TEST_MODE) {
    Notify.create({
      message: process.env.RISTRICTED_NOTIFY_MESSAGE,
      timeout: 8000,
      color: 'negative',
    });
    return;
  }
}

function onReset() {
  console.log('reset...');
}

onMounted(() => {
  const user = authStore.userInfo;
  if (user) {
    Object.assign(profile, user);
  }
});
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <q-card flat class="tw-border tw-w-full tw-mx-auto">
      <q-card-section class="tw-pt-8">
        <h1 class="tw-text-[24px] tw-font-anton">Profile</h1>
      </q-card-section>

      <q-separator />

      <q-card-section
        class="tw-flex tw-flex-col-reverse md:tw-flex-row tw-pb-0"
      >
        <div class="tw-flex tw-flex-col tw-gap-y-3 tw-w-full md:tw-pr-3">
          <q-input
            filled
            :dense="$q.screen.lt.sm"
            v-model="profile.name"
            label="Name"
          />
          <q-input
            filled
            :dense="$q.screen.lt.sm"
            v-model="profile.email"
            disable
            label="Email"
          />
          <q-input
            filled
            :dense="$q.screen.lt.sm"
            v-model="profile.address"
            label="Address"
          />
          <q-input
            filled
            :dense="$q.screen.lt.sm"
            v-model="profile.phone"
            label="Phone"
          />
        </div>

        <div
          class="md:tw-w-[450px] md:tw-px-3 tw-flex tw-flex-col tw-justify-center tw-items-center"
        >
          <q-avatar size="200px">
            <img src="~assets/avatar.png" class="tw-w-full tw-h-[200px]" />
          </q-avatar>

          <q-file
            dense
            class="tw-my-4 tw-w-full"
            clear-icon="close"
            clearable
            name="poster_file"
            v-model="image"
            filled
            label="Select Profile image"
          />
        </div>
      </q-card-section>

      <q-card-section class="tw-pt-0">
        <div>
          <q-checkbox
            :disable="true"
            v-model="isEmailVerified"
            label="Is Email verified:"
          />
          <q-btn
            label="Verify Email"
            size="sm"
            color="primary"
            outline
            class="tw-ml-3"
          />
        </div>
        <div class="tw-flex tw-flex-col tw-gap-y-3 tw-mt-2 tw-max-w-[500px]">
          <q-input
            filled
            v-model="profile.created_at"
            disable
            label="Created At"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section
        class="tw-flex tw-gap-3 tw-flex-col-reverse md:tw-flex-row md:tw-justify-end"
      >
        <q-btn
          class="tw-font-bold"
          label="cancel"
          outline
          color="primary"
          type="reset"
          padding="8px 24px"
        />
        <q-btn
          class="tw-font-bold"
          label="save"
          color="primary"
          unelevated
          type="submit"
          padding="8px 32px"
        />
      </q-card-section>
    </q-card>
  </q-form>
</template>
