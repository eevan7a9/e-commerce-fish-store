<script setup lang="ts">
import { usetagsStore } from 'src/stores/tags';
import { computed } from 'vue';

const model = defineModel<string[]>({
  default: [],
});

const tagsStore = usetagsStore();

const tags = computed(() => tagsStore.list);

function selectTags(name: string) {
  if (model.value.includes(name)) {
    model.value = [...model.value.filter((item) => item !== name)];
    return;
  }
  model.value.push(name);
}
</script>

<template>
  <div class="">
    <h1 class="tw-py-3 tw-text-[18px] tw-font-bold">
      Tags:
      <small>Selected({{ model.length }})</small>
      <q-btn
        icon="restart_alt"
        class="tw-ml-3"
        round
        padding="4px"
        unelevated
        color="primary"
        @click="model = []"
        v-if="model.length"
      />
    </h1>
    <q-chip
      v-for="tag of tags"
      :key="tag.name"
      :selected="model.includes(tag.name)"
      @click="selectTags(tag.name)"
      :color="model.includes(tag.name) ? 'positive' : 'primary'"
      text-color="white"
      icon="tag"
    >
      <span class="tw-capitalize">
        {{ tag.name }}
      </span>
    </q-chip>
  </div>
</template>
