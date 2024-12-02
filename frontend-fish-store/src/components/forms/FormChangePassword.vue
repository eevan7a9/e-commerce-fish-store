<script lang="ts" setup>
import { FormChangePassword } from 'src/shared/interface/form';
import {
  minLength,
  passwordsMatch,
  passwordStrong,
  requiredField,
} from 'src/shared/utils/form-rules';
import { reactive, ref } from 'vue';

defineOptions({
  name: 'FormChangePassword',
});

const isCurrentHidden = ref(true);
const isPasswordHidden = ref(true);
const isConfirmHidden = ref(true);

const initialForm = {
  password_current: '',
  password: '',
  password_confirmation: '',
};
const form = reactive<FormChangePassword>({ ...initialForm });

function submit() {
  console.log(form);
}
</script>

<template>
  <q-form @submit="submit">
    <q-card flat bordered class="tw-w-full tw-max-w-[800px] tw-bg-white">
      <q-card-section
        class="tw-bg-primary tw-text-white tw-flex tw-items-center tw-justify-between"
      >
        <h1 class="tw-text-[24px] tw-font-anton tw-py-1">Change Password</h1>

        <q-icon name="mdi-lock-reset" size="32px" />
      </q-card-section>

      <q-card-section
        class="md:tw-pb-8 tw-flex tw-flex-col tw-gap-8 md:tw-px-12"
      >
        <div>
          <p class="tw-leading-normal md:tw-text-[16px] tw-font-light">
            Ensure your account remains safe by updating your password
            regularly. Enter your current password and create a new, secure
            password.
          </p>
        </div>
        <q-input
          v-model="form.password_current"
          filled
          :dense="$q.screen.lt.md"
          label="Current Password"
          :type="isCurrentHidden ? 'password' : 'text'"
          hint="Enter your current password to confirm."
          :rules="[requiredField]"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isCurrentHidden ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isCurrentHidden = !isCurrentHidden"
            />
          </template>
        </q-input>

        <div>
          <h1 class="tw-text-[16px] md:tw-text-[20px] tw-font-semibold tw-mb-2">
            New Password
          </h1>
          <p class="tw-leading-normal md:tw-text-[16px] tw-font-light">
            Please choose a strong password. It should include at least 8
            characters, a mix of uppercase and lowercase letters, numbers, and
            special characters.
          </p>
        </div>

        <q-input
          v-model="form.password"
          filled
          :dense="$q.screen.lt.md"
          label="Password"
          :type="isPasswordHidden ? 'password' : 'text'"
          hint="Enter your new account password"
          :rules="[
            requiredField,
            minLength(8),
            passwordStrong,
            (v) =>
              v !== form.password_current ||
              'Your new password must be different from the current one.',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-lock-plus" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPasswordHidden ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPasswordHidden = !isPasswordHidden"
            />
          </template>
        </q-input>

        <q-input
          v-model="form.password_confirmation"
          filled
          :dense="$q.screen.lt.md"
          label="Confirm Password"
          :type="isConfirmHidden ? 'password' : 'text'"
          hint="Re-enter your new password to confirm."
          :rules="[(val) => passwordsMatch(form.password, val)]"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-lock-open-check" />
          </template>

          <template v-slot:append>
            <q-icon
              :name="isConfirmHidden ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isConfirmHidden = !isConfirmHidden"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section align="end" class="md:tw-px-12 tw-border">
        <q-btn
          class="tw-font-semibold md:tw-text-[18px] tw-w-full md:tw-w-auto"
          label="save"
          color="primary"
          unelevated
          type="submit"
          padding="8px 42px"
        />
      </q-card-section>
    </q-card>
  </q-form>
</template>
