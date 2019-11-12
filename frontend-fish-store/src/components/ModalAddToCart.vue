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
            <h5>lb {{ product.weight }}</h5>
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
        <hr />
        <div class="row">
          <div class="col-sm-6">
            <p>Quantity</p>
            <b-input-group prepend="Item">
              <b-form-input
                type="number"
                v-model="order.quantity"
                min="1"
                :max="product.units"
                aria-label="Text input with checkbox"
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="col-sm-6">
            <p>Total Price</p>
            <b-input-group prepend="$" append="Total">
              <b-form-input readonly v-model="order.total_price"></b-form-input>
            </b-input-group>
          </div>
        </div>
      </div>
      <hr />
      <b-button class="mt-3" variant="success" block @click="productToCart(product.id)">Add to Cart</b-button>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ModalAddToCart",
  props: {
    product: Object
  },
  data() {
    return {
      order: {
        quantity: 1,
        total_price: this.product.price
      }
    };
  },
  watch: {
    "order.quantity": function(val) {
      this.order.total_price = val * this.product.price;
    }
  },
  methods: {
    ...mapActions(["addToCart"]),
    showModal(modal_ref) {
      this.$refs[`${modal_ref}`].show();
    },
    productToCart(modal_ref) {
      const add_product = {
        id: this.product.id,
        name: this.product.name,
        price: this.order.total_price,
        quantity: this.order.quantity
      };
      this.addToCart(add_product);
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
