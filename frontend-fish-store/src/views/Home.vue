<template>
  <div class="home">
    <!-- Cover Image Here -->
    <ShowcaseImage />
    <div class="container">
      <!-- Featured Products Here -->
      <FeaturedProducts />
      <section class="start-shopping">
        <router-link :to="{name:'catalog'}">
          <h5 class="py-3 text-uppercase font-weight-bolder">Start Shopping</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevrons-right violet"
          >
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        </router-link>
      </section>
      <!-- Featured Article Here -->
      <FeaturedArticle />
      <!-- Featured Carousel Here -->
      <Carousel class="my-5" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ShowcaseImage from "../components/ShowcaseImage";
import Carousel from "../components/Carousel";
import FeaturedProducts from "../components/FeaturedProducts";
import FeaturedArticle from "../components/FeaturedArticle";
import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    ShowcaseImage,
    FeaturedProducts,
    FeaturedArticle,
    Carousel
  },
  computed: mapGetters(["user"])
};
</script>
<style scoped>
.start-shopping {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.start-shopping a {
  width: 300px;
  display: flex;
  justify-content: flex-end;
  text-decoration: none;
  color: #413f3f;
  cursor: pointer;
}
</style>
