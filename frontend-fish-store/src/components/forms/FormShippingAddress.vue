<script setup lang="ts">
import { useCountries } from 'src/shared/composables/useCountries';
import { FormShippingAddress } from 'src/shared/interface/form';
import { requiredField } from 'src/shared/utils/form-rules';

defineOptions({
  name: 'FormShippingAddress',
});

const countries = useCountries();
const countryOpts = countries.list();

const form = defineModel<FormShippingAddress>({
  required: true,
});
const emits = defineEmits<{ done: [value: FormShippingAddress] }>();

function save() {
  // console.log('continue');
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
            v-model="form.line1"
            label="shipping address line 1 *"
            name="address"
            hint="Street address, P.O. box, company name, c/o"
            autogrow
            :rules="[requiredField]"
          />
          <q-input
            filled
            dense
            type="text"
            v-model="form.line2"
            label="shipping address line 2 (optional)"
            name="address-line-2"
            hint="Apartment, suite, unit, building, floor, etc."
            autogrow
          />
          <q-input
            filled
            dense
            type="text"
            v-model="form.city"
            label="City *"
            name="city"
            hint="City"
            :rules="[requiredField]"
          />
          <q-select
            filled
            dense
            option-value="value"
            v-model="form.country"
            :options="countryOpts"
            hint="Enter your Country"
            label="Country"
            :rules="[requiredField]"
            emit-value
            map-options
          />
          <q-input
            filled
            dense
            type="text"
            v-model="form.state"
            label="State *"
            hint="State/Province/Region"
            :rules="[requiredField]"
          />
          <q-input
            filled
            dense
            type="text"
            v-model="form.postal_code"
            label="Your Zip Code *"
            name="zip-code"
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
