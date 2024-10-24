<script setup lang="tsx">
defineOptions({
  name: 'HomeSearchField',
});

function submit() {
  console.log('Searching...');
}
</script>

<template>
  <div
    class="tw-bg-slate-100 tw-p-3 tw-rounded-full tw-bg-opacity-75 tw-h-[70px] tw-w-full tw-max-w-[800px] tw-mx-auto tw-flex tw-items-center"
  >
    <input
      placeholder="Search..."
      @keydown.enter="submit()"
      class="tw-border tw-py-2 tw-pl-5 tw-text-[16px] lg:tw-text-[20px] tw-w-full tw-h-full tw-rounded-tl-full tw-rounded-bl-full"
    />
    <button
      v-ripple
      class="tw-bg-primary tw-relative tw-h-full tw-px-3 tw-rounded-tr-full tw-rounded-br-full"
    >
      <q-icon name="search" color="white" class="" size="30px" />
    </button>
  </div>
</template>
