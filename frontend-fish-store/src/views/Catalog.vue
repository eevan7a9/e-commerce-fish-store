<template>
  <main class="container mb-5">
    <div>
      <section class="row align-items-center m-5">
        <div class="h-400 col-12 text-center text-dark">
          <h2 class="font-weight-light featured-header text-inner-shadow-violet">Products</h2>
        </div>
      </section>
      <div class="row mt-5">
        <!-- products items -->
        <div class="col-md-4" v-for="(product, index) in products" :key="product.id"
        data-aos="fade-up"
        data-aos-offset="50"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        >
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
  </main>
</template>
<script>
import { mapGetters } from "vuex";
import ModalAddToCart from "../components/ModalAddToCart";
export default {
  components: {
    ModalAddToCart
  },
  computed: mapGetters(["user", "token", "products"]),
  methods: {
    showModal(modal_ref) {
      this.$refs[`${modal_ref}`].show();
    },
    imgError(index){
      this.products[index].image_location = "";
    }
  }
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