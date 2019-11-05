<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      class="carousel"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide img-blank img-alt="Blank image">
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            src="https://cdn.pixabay.com/photo/2016/11/29/09/43/koi-fish-1868779_960_720.jpg"
            alt="image slot"
          />
        </template>
        <h2>Slide First</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-blank img-alt="Blank image">
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            src="https://cdn.pixabay.com/photo/2017/08/20/17/14/koi-2662451_960_720.jpg"
            alt="image slot"
          />
        </template>
        <h2>Slide Second</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide img-blank img-alt="Blank image">
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            src="https://cdn.pixabay.com/photo/2014/07/07/07/20/koi-fish-386049_960_720.jpg"
            alt="image slot"
          />
        </template>
        <h2>Slide Third</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide img-blank img-alt="Blank image">
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            src="https://cdn.pixabay.com/photo/2019/10/02/19/58/japan-4521847_960_720.jpg"
            alt="image slot"
          />
        </template>
        <h2>Slide Fourth</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    }
  }
};
</script>
<style scoped>
img {
  object-fit: cover;
  height: 600px;
  width: 100%;
}
.carousel h2 {
  text-shadow: -1px 0 #000000, 0 1px #050504, 0.5px 0 #3a261c, 0 -1px #24201b;
  background: #24201b38;
  padding: 20px 0;
}
</style>