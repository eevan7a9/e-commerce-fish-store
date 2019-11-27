<template>
  <div>
    <section class="row align-items-center m-5">
      <div class="h-400 col-12 text-center text-dark">
        <h2 class="font-weight-light featured-header text-inner-shadow-violet">Featured Products</h2>
      </div>
    </section>
    <div class="row mt-5">
       <!-- products items -->
        <div class="col-md-4" v-for="(product, index) in products.slice(0,3)" :key="product.id">
          <div class="card mb-4 box-shadow">
            <img class="card-img-top" :src="product.image_location ? product.image_location : 'https://via.placeholder.com/250'" @error="imgError(index)" alt="Card image cap" />
            <div class="card-body">
              <h4>{{ product.name }}</h4>
              <p class="card-text description">{{ product.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <!-- <button
                    type="button"
                    class="btn btn-sm btn-outline-success p-3"
                  >${{ product.price }} | A piece</button>-->
                  <ModalAddToCart :product="product" />
                </div>
                <p class="text-secondary font-weight-bold">lb {{ product.weight }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- products items end -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalAddToCart from "./ModalAddToCart";
export default {
  name: "FeaturedProducts",
  components: {
    ModalAddToCart
  },
  computed: mapGetters(["products"]),
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Staatliches&display=swap");
img {
  width: 100%;
  height: 300px;
}
.featured-header {
  font-family: "Staatliches", cursive;
}
.description {
  height: 120px;
  overflow-y: scroll;
}
</style>