<script setup lang="ts">
import { Loading, Notify } from 'quasar';
import {
  minLength,
  passwordsMatch,
  passwordStrong,
  requiredField,
  validEmail,
} from 'src/shared/utils/form-rules';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'FormRegister',
});

const router = useRouter();

const isPasswordHidden = ref(true);
const isConfirmHidden = ref(true);

const submitted = ref(false);
const accept = ref(false);

const initialForm = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};
const form = reactive({ ...initialForm });

function onSubmit() {
  submitted.value = true;
  Loading.show();

  setTimeout(() => {
    console.table(form);

    Loading.hide();

    Notify.create({
      color: 'positive',
      iconColor: 'white',
      message: 'Registration successful! Welcome aboard.',
      icon: 'check',
      timeout: 5000,
    });

    router.push('/auth');
  }, 1000);
}

function onReset() {
  console.log('onReset()');
  Object.assign(form, initialForm);
}
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      :dense="$q.screen.lt.md"
      v-model="form.name"
      label="Your name *"
      hint="Name and surname"
      :rules="[minLength(4)]"
    />

    <q-input
      filled
      :dense="$q.screen.lt.md"
      type="email"
      v-model="form.email"
      label="Your email *"
      hint="Enter your email address (e.g., name@example.com)"
      :rules="[requiredField, validEmail]"
    />

    <q-input
      v-model="form.password"
      filled
      :dense="$q.screen.lt.md"
      label="Password"
      :type="isPasswordHidden ? 'password' : 'text'"
      hint="Enter your account password"
      :rules="[requiredField, minLength(8), passwordStrong]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPasswordHidden ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPasswordHidden = !isPasswordHidden"
        />
      </template>
    </q-input>

    <q-input
      v-model="form.passwordConfirm"
      filled
      :dense="$q.screen.lt.md"
      label="Confirm Password"
      :type="isConfirmHidden ? 'password' : 'text'"
      hint="Re-enter your password to confirm."
      :rules="[(val) => passwordsMatch(form.password, val)]"
    >
      <template v-slot:append>
        <q-icon
          :name="isConfirmHidden ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isConfirmHidden = !isConfirmHidden"
        />
      </template>
    </q-input>

    <q-toggle v-model="accept">
      I accept the
      <a
        @click.stop
        href="https://github.com/eevan7a9/e-commerce-fish-store"
        target="_blank"
        rel="noopener noreferrer"
        class="tw-underline"
      >
        license and terms
      </a>
    </q-toggle>

    <div class="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-end">
      <q-btn
        :label="$t('button.submit')"
        :size="$q.screen.gt.md ? 'lg' : 'md'"
        unelevated
        type="submit"
        color="primary"
        :disable="submitted"
      />
      <q-btn
        :label="$t('button.reset')"
        :size="$q.screen.gt.md ? 'lg' : 'md'"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm"
        :disable="submitted"
      />
    </div>
  </q-form>
</template>
