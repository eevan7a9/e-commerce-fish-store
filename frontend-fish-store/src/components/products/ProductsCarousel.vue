<script lang="ts" setup>
import { ref } from 'vue';

const slide = ref(1);
const fullscreen = ref(false);

const props = defineProps<{ images: string[] }>();
</script>

<template>
  <q-carousel
    control-type="regular"
    control-color="primary"
    swipeable
    height="450px"
    keep-alive
    animated
    arrows
    navigation
    v-model="slide"
    v-model:fullscreen="fullscreen"
    infinite
  >
    <template v-slot:navigation-icon="{ active, index, onClick }">
      <q-btn
        v-if="active"
        class="tw-bg-white tw-bg-opacity-75"
        color="accent"
        flat
        dense
        @click="onClick"
      >
        <q-img height="50px" width="50px" :src="props?.images![index]" />
      </q-btn>
      <q-btn
        v-else
        class="tw-bg-white tw-bg-opacity-25"
        color="primary"
        flat
        dense
        @click="onClick"
      >
        <q-img height="50px" width="50px" :src="props?.images![index]"
      /></q-btn>
    </template>

    <template v-for="(img, i) of props.images" :key="img">
      <q-carousel-slide :name="i" class="tw-bg-black tw-p-0">
        <q-img
          :src="img"
          class="tw-w-full tw-h-full"
          fit="contain"
          :draggable="false"
        />
      </q-carousel-slide>
    </template>

    <template v-slot:control>
      <q-carousel-control position="bottom-right" :offset="[18, 18]">
        <q-btn
          push
          round
          dense
          color="white"
          text-color="primary"
          :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="fullscreen = !fullscreen"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>
