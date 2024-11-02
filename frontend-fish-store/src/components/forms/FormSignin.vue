<script lang="ts" setup>
import { LoadingBar, Notify } from 'quasar';
import { requiredField, validEmail } from 'src/shared/utils/form-rules';
import { useAuthStore } from 'src/stores/auth';
import userTestData from 'src/assets/test-data/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'FormSignin',
});

const router = useRouter();
const notify = Notify;

const authStore = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');
const isPasswordHidden = ref(true);

const submitted = ref(false);

function onReset() {
  email.value = '';
  password.value = '';
}

function signin() {
  submitted.value = true;

  LoadingBar.start();
  LoadingBar.increment(80);

  setTimeout(() => {
    LoadingBar.increment();

    authStore.setUser(userTestData);
    authStore.setToken('secret');

    router.push('/account');
    notify.create({
      color: 'positive',
      message: 'You have signed in successfully.',
      timeout: 3000,
    });

    LoadingBar.stop();
  }, 1000);
}
</script>
<template>
  <q-form @submit="signin" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      :dense="$q.screen.lt.md"
      type="email"
      v-model="email"
      label="Your email *"
      hint="Enter your email address (e.g., name@example.com)"
      :rules="[requiredField, validEmail]"
    />

    <q-input
      v-model="password"
      filled
      :dense="$q.screen.lt.md"
      label="Password"
      :type="isPasswordHidden ? 'password' : 'text'"
      hint="Enter your account password"
    >
      <template v-slot:append>
        <q-icon
          :name="isPasswordHidden ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPasswordHidden = !isPasswordHidden"
        />
      </template>
    </q-input>

    <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-end">
      <q-btn
        label="Submit"
        :size="$q.screen.gt.md ? 'lg' : 'md'"
        unelevated
        type="submit"
        color="primary"
      />
      <q-btn
        label="Reset"
        :size="$q.screen.gt.md ? 'lg' : 'md'"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm"
      />
    </div>
  </q-form>
</template>
