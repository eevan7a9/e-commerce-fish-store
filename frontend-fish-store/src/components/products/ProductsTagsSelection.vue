<script setup lang="ts">
import { useTagsStore } from 'src/stores/tags';
import { computed, onMounted } from 'vue';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const model = defineModel<string[]>({
  default: [],
});

const tagsStore = useTagsStore();

const props = defineProps<{ enableAnimation?: boolean }>();

const tags = computed(() => tagsStore.list);

function selectTags(name: string) {
  if (model.value.includes(name)) {
    model.value = [...model.value.filter((item) => item !== name)];
    return;
  }
  model.value.push(name);
}

onMounted(() => {
  if (props.enableAnimation) {
    gsap.from('[gsap="products-filter-tag"]', {
      y: -300,
      x: 300,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'sine.inOut',
    });
  }
});
</script>

<template>
  <div gsap="products-filter-tags-container">
    <h1
      class="tw-py-3 tw-text-[18px] tw-font-semibold tw-relative tw-capitalize"
    >
      {{ $t('products.tags') }}:
      <small>{{ $t('products.selected') }}({{ model.length }})</small>
      <q-btn
        icon="restart_alt"
        class="tw-ml-3 tw-absolute -tw-translate-y-2"
        round
        padding="4px"
        unelevated
        color="primary"
        aria-label="reset-filter-tags"
        @click="model = []"
        v-if="model.length"
      />
    </h1>
    <q-chip
      v-for="tag of tags"
      :key="tag.name"
      :selected="model.includes(tag.name)"
      @click="selectTags(tag.name)"
      :outline="model.includes(tag.name)"
      color="primary"
      text-color="white"
      icon="tag"
      gsap="products-filter-tag"
    >
      <span class="tw-capitalize">
        {{ tag.name }}
      </span>
    </q-chip>
  </div>
</template>
