<template>
  <div>
    <button
      type="button"
      class="btn btn-sm btn-outline-success p-3 font-weight-bold"
      @click="showModal(product.id)"
    >${{ product.price }} | A Piece</button>

    <b-modal :ref="product.id" size="lg" centered hide-footer title="Add this product to cart?">
      <div class="d-block text-center">
        <div class="info-container">
          <label>Name</label>
          <h4>{{ product.name }}</h4>
        </div>
        <div class="info-container">
          <label>Description</label>
          <p class="description">{{ product.description }}</p>
        </div>
        <div class="row">
          <div class="info-container col-sm-4">
            <label>Weight</label>
            <h5>{{ product.weight }}</h5>
          </div>
          <div class="info-container col-sm-4">
            <label>Available</label>
            <h5>{{ product.units }}</h5>
          </div>
          <div class="info-container col-sm-4">
            <label>Price</label>
            <h5>${{ product.price }}</h5>
          </div>
        </div>
      </div>
      <hr />
      <b-button class="mt-3" variant="success" block @click="addToCart(product.id)">Add to Cart</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalVerticalCenter",
  props: {
    product: Object
  },
  methods: {
    showModal(modal_ref) {
      this.$refs[`${modal_ref}`].show();
    },
    addToCart(modal_ref) {
      this.$refs[`${modal_ref}`].hide();
    }
    // hideModal(modal_ref) {
    //   this.$refs[`${modal_ref}`].hide();
    // }
  }
};
</script>
<style scoped>
button:hover {
  transition: 1s;
}
.description {
  max-height: 110px;
  overflow-y: scroll;
}
</style>
