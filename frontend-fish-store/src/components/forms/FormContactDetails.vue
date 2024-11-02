<script setup lang="ts">
import {
  requiredField,
  validEmail,
  validPhone,
} from 'src/shared/utils/form-rules';

defineOptions({
  name: 'FormShippingAddress',
});

interface ContactForm {
  email: string;
  phone: string;
}

const form = defineModel<ContactForm>({
  required: true,
});

const emits = defineEmits<{ done: [value: ContactForm] }>();

function save() {
  console.log('continue');
  emits('done', form.value);
}
</script>

<template>
  <q-form @submit.prevent="save()">
    <q-card flat>
      <q-card-section>
        <h1 class="tw-text-[18px] md:tw-text-[24px] tw-font-anton">
          Contact Details
        </h1>
        <p class="tw-mt-3">
          Fill in your contact information for order updates and delivery
          coordination.
        </p>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="tw-flex tw-flex-col tw-gap-y-4">
          <q-input
            filled
            dense
            type="email"
            v-model="form.email"
            label="Your email *"
            hint="Enter your email address (e.g., name@example.com)"
            :rules="[requiredField, validEmail]"
          />
          <q-input
            filled
            dense
            type="text"
            v-model="form.phone"
            label="Phone or Tel Number"
            autogrow
            mask="+####-####-####-####"
            hint="Enter your phone number: +#### - #### - ####"
            :rules="[requiredField, validPhone]"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="tw-flex tw-justify-end">
        <q-btn
          type="submit"
          label="Continue"
          color="primary"
          unelevated
          padding="8px 24px"
        />
      </q-card-section>
    </q-card>
  </q-form>
</template>
