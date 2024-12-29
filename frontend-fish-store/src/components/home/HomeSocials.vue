<script setup lang="ts">
defineOptions({
  name: 'HomeSocials',
});
</script>

<template>
  <div class="tw-flex tw-justify-center md:tw-justify-start tw-gap-x-2 md:tw-gap-x-3">
    <q-btn href="https://github.com/eevan7a9" target="_blank" color="accent" aria-label="facebook" round
      :size="$q.screen.gt.sm ? '18px' : 'md'">
      <q-icon name="mdi-facebook" color="white" />
    </q-btn>

    <q-btn href="https://github.com/eevan7a9" color="accent" target="_blank" round aria-label="instagram"
      :size="$q.screen.gt.sm ? '18px' : 'md'">
      <q-icon name="mdi-instagram" color="white" />
    </q-btn>

    <q-btn href="https://github.com/eevan7a9" color="accent" target="_blank" round aria-label="twitter"
      :size="$q.screen.gt.sm ? '18px' : 'md'">
      <q-icon name="mdi-twitter" color="white" />
    </q-btn>

    <q-btn href="https://github.com/eevan7a9" color="accent" target="_blank" aria-label="linkedin" round
      :size="$q.screen.gt.sm ? '18px' : 'md'">
      <q-icon name="mdi-linkedin" color="white" />
    </q-btn>
  </div>
</template>
