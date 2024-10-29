<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'MenuSort',
});

const model = defineModel<string>({ default: 'latest' });
const sortOptions = ref(['latest', 'price', 'name']);
</script>

<template>
  <q-btn :label="`sort by: ${model}`" color="primary" unelevated icon="sort">
    <q-menu>
      <q-list separator style="min-width: 200px">
        <q-item
          v-for="option of sortOptions"
          :key="option"
          clickable
          @click="model = option"
          v-close-popup
        >
          <q-item-section class="tw-capitalize">{{ option }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
