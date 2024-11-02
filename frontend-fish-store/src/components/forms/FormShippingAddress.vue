<script setup lang="ts">
import { FormShippingAddress } from 'src/shared/interface/form';
import { requiredField } from 'src/shared/utils/form-rules';

defineOptions({
  name: 'FormShippingAddress',
});

const form = defineModel<FormShippingAddress>({
  required: true,
});

const emits = defineEmits<{ done: [value: FormShippingAddress] }>();

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
          Shipping Address
        </h1>
        <p class="tw-mt-3 tw-leading-[150%]">
          Provide the address where you'd like your order delivered. Ensure all
          details are accurate to avoid any delays in receiving your items.
        </p>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="tw-flex tw-flex-col tw-gap-y-4">
          <q-input
            filled
            dense
            type="text"
            v-model="form.shipping_address_line1"
            label="shipping address line 1 *"
            hint="Street address, P.O. box, company name, c/o"
            autogrow
            :rules="[requiredField]"
          />
          <q-input
            filled
            dense
            type="text"
            v-model="form.shipping_address_line2"
            label="shipping address line 2 (optional)"
            hint="Apartment, suite, unit, building, floor, etc."
            autogrow
          />
          <q-input
            filled
            dense
            type="text"
            v-model="form.shipping_city"
            label="City *"
            hint="City"
            :rules="[requiredField]"
          />
          <q-input
            filled
            dense
            type="text"
            v-model="form.shipping_country"
            label="Country *"
            hint="Enter your Country"
            :rules="[requiredField]"
          />
          <q-input
            filled
            dense
            type="text"
            v-model="form.shipping_state"
            label="State *"
            hint="State/Province/Region"
            :rules="[requiredField]"
          />
          <q-input
            filled
            dense
            type="text"
            v-model="form.shipping_zip_code"
            label="Your Zip Code *"
            hint="ZIP or Postal Code"
            :rules="[requiredField]"
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
