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
      <q-icon name="mdi-facebook" color="accent" />
    </q-btn>

    <q-btn
      href="https://github.com/eevan7a9"
      color="white"
      glossy
      target="_blank"
      round
      :size="$q.screen.gt.sm ? 'lg' : 'md'"
    >
      <q-icon name="mdi-instagram" color="accent" />
    </q-btn>

    <q-btn
      href="https://github.com/eevan7a9"
      color="white"
      glossy
      target="_blank"
      round
      :size="$q.screen.gt.sm ? 'lg' : 'md'"
    >
      <q-icon name="mdi-twitter" color="accent" />
    </q-btn>

    <q-btn
      href="https://github.com/eevan7a9"
      color="white"
      glossy
      target="_blank"
      round
      :size="$q.screen.gt.sm ? 'lg' : 'md'"
    >
      <q-icon name="mdi-linkedin" color="accent" />
    </q-btn>
  </div>
</template>
