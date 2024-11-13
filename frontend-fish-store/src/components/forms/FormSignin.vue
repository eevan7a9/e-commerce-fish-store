<script lang="ts" setup>
import { LoadingBar, Notify } from 'quasar';
import { requiredField, validEmail } from 'src/shared/utils/form-rules';
import { useAuthStore } from 'src/stores/auth';
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

async function signin() {
  LoadingBar.start();
  submitted.value = true;

  let res =
    process.env.ENABLE_STATIC_MODE === 'true'
      ? await authStore.signinMockUser()
      : await authStore.signin(email.value, password.value);

  if (res?.success) {
    notify.create({
      color: 'positive',
      message: res?.message || 'Sign in successful',
      timeout: 3000,
    });
  } else {
    notify.create({
      color: 'negative',
      message: res?.message || 'Sign in failed',
      timeout: 3000,
    });
  }
  router.push('/account');
  LoadingBar.stop();
}
</script>

<template>
  <q-form @submit="signin" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      :dense="$q.screen.lt.md"
      type="email"
      v-model="email"
      name="useremail"
      label="Your email *"
      hint="Enter your email address (e.g., name@example.com)"
      :rules="[requiredField, validEmail]"
    />

    <q-input
      v-model="password"
      filled
      :dense="$q.screen.lt.md"
      name="userpassword"
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
