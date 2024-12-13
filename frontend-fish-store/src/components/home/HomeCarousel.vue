<script setup lang="tsx">
import { QCarousel } from 'quasar';
import { ref } from 'vue';

defineOptions({
  name: 'HomeCarousel',
});

const slide = ref('first');
const slidesList = ref([
  {
    imgSrc: 'sunset-fishing_ENeY4TPEe.webp',
    name: 'first',
    title: 'ethical fishing',
    subTitle: 'Sustainable, Responsible, and the welfare of marine ecosystems.',
  },
  {
    imgSrc: 'aqua-organism_ah76g_lb1.webp',
    name: 'second',
    title: 'Organic Aquaculture',
    subTitle: 'Avoid synthetic chemicals, pesticides, and antibiotics.',
  },
  {
    imgSrc: 'majestic-marine_KwuULseRZ.webp',
    name: 'third',
    title: 'Majestic Marine Beauties',
    subTitle: 'Graceful and vibrant aquatic wonders',
  },
]);
</script>

<template>
  <section
    class="tw-max-w-screen-2xl tw-mx-auto tw-grid tw-grid-cols-1 tw-grid-rows-2 md:tw-grid-rows-1 md:tw-grid-cols-5 tw-h-[800px] md:tw-h-[450px]"
  >
    <q-carousel
      ref="homeCarousel"
      class="tw-col-span-3 tw-h-full"
      navigation
      animated
      infinite
      keep-alive
      v-model="slide"
    >
      <template v-slot:navigation-icon="{ active, onClick }">
        <q-btn
          v-if="active"
          class="tw-bg-primary tw-bg-opacity-50"
          round
          icon="mdi-image"
          color="white"
          flat
          dense
          aria-label="home-carousel-active-navigator"
          @click="onClick"
          size="sm"
        >
        </q-btn>
        <q-btn
          v-else
          class="tw-bg-white tw-bg-opacity-25"
          round
          icon="mdi-circle"
          color="white"
          flat
          dense
          aria-label="home-carousel-inactive-navigator"
          @click="onClick"
          size="sm"
        >
        </q-btn>
      </template>

      <template v-for="item of slidesList" :key="item.name">
        <q-carousel-slide
          :name="item.name"
          :img-src="`https://ik.imagekit.io/wr5lnrww0q8/fishstore/carousel/${item.imgSrc}`"
        >
          <div
            class="tw-bg-black tw-bg-opacity-15 sm:tw-bg-opacity-65 tw-w-full tw-absolute tw-top-0 tw-left-0 tw-flex tw-flex-col tw-items-center"
          >
            <div
              class="tw-font-anton tw-text-[40px] tw-text-white tw-py-2 tw-capitalize"
            >
              {{ item.title }}
            </div>
            <div class="tw-text-[18px] tw-text-white tw-px-3 tw-pb-3">
              {{ item.subTitle }}
            </div>
          </div>
        </q-carousel-slide>
      </template>
    </q-carousel>

    <div class="tw-col-span-2 tw-h-full tw-grid tw-grid-rows-2">
      <div class="tw-bg-secondary tw-h-full baites-bg tw-pl-3 tw-pt-2">
        <div
          class="baites-section-heading sm:tw-w-[400px] tw-font-anton tw-text-white tw-text-[28px] sm:tw-text-[40px] tw-leading-snug"
        >
          Eco-Friendly Precision: Catch More, Harm Less
        </div>
        <q-icon size="50px" color="white" name="phishing" />
      </div>
      <div class="tw-bg-orange-400 tw-h-full tw-overflow-hidden food-bg">
        <div
          class="tw-w-full tw-relative tw-z-10 tw-flex tw-justify-end tw-pt-3 tw-pl-3 tw-pr-6"
        >
          <span
            class="food-section-heading tw-w-[370px] tw-font-anton tw-text-white tw-text-[28px] sm:tw-text-[40px] tw-leading-snug"
          >
            Deliciously Nutritious: A Rich Source of Healthy Protein
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.food-section-heading {
  color: white;
  text-shadow: 2px 2px 0 rgb(175, 98, 9), -2px 2px 0 black, 2px -2px 0 black,
    -2px -2px 0 black; /* Adds a shadow to all sides */
}
.baites-section-heading {
  color: white;
  text-shadow: 2px 2px 0 $secondary, -2px 2px 0 black, 2px -2px 0 black,
    -2px -2px 0 black; /* Adds a shadow to all sides */
}
.baites-bg {
  background-image: url('/images/fishing-tool.webp');
  background-position: right;
  background-repeat: no-repeat;
  background-size: contain;
}
.food-bg {
  background-image: url('/images/salmon-food.webp');
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
