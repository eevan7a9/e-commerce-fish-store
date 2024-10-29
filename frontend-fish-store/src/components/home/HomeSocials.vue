<script setup lang="ts">
defineOptions({
  name: 'HomeSocials',
});
</script>

<template>
  <div class="tw-flex tw-gap-x-2 md:tw-gap-x-6">
    <q-btn
      href="https://github.com/eevan7a9"
      target="_blank"
      color="white"
      glossy
      round
      :size="$q.screen.gt.sm ? 'lg' : 'md'"
    >
      <q-icon name="mdi-facebook" color="primary" />
    </q-btn>

    <q-btn
      href="https://github.com/eevan7a9"
      color="white"
      glossy
      target="_blank"
      round
      :size="$q.screen.gt.sm ? 'lg' : 'md'"
    >
      <q-icon name="mdi-instagram" color="primary" />
    </q-btn>

    <q-btn
      href="https://github.com/eevan7a9"
      color="white"
      glossy
      target="_blank"
      round
      :size="$q.screen.gt.sm ? 'lg' : 'md'"
    >
      <q-icon name="mdi-twitter" color="primary" />
    </q-btn>

    <q-btn
      href="https://github.com/eevan7a9"
      color="white"
      glossy
      target="_blank"
      round
      :size="$q.screen.gt.sm ? 'lg' : 'md'"
    >
      <q-icon name="mdi-linkedin" color="primary" />
    </q-btn>
  </div>
</template>
