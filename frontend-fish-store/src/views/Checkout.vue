<template>
  <div class="container d-flex flex-column justify-content-center align-items-center pt-5 pb-5">
    <div class="w-100 col-md-9">
      <b-card header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h6 class="mb-0">Checkout Order</h6>
        </template>
        <h4>My shopping cart :</h4>
        <!-- shopping cart starts -->
        <CartContentTable />
        <!-- shopping cart ends -->
        <hr />
        <div class="d-flex justify-content-around">
          <div class="form-group">
            <label for="quantity">Total Quantity</label>
            <input
              type="text"
              class="form-control bg-light font-weight-bold text-success"
              v-model="total_quantity"
              id="quantity"
              readonly
            />
            <small class="form-text text-muted">Total number of fish</small>
          </div>
          <div class="form-group">
            <label for="price">Total Price $</label>
            <input
              type="text"
              class="form-control bg-light font-weight-bold text-success"
              v-model="total_price"
              id="price"
              readonly
            />
            <small class="form-text text-muted">Total cost</small>
          </div>
          <div class="form-group">
            <label for="price">Total Weight (lb)</label>
            <input
              type="text"
              class="form-control bg-light font-weight-bold text-success"
              v-model="total_weight"
              id="weight"
              readonly
            />
            <small class="form-text text-muted">Total weight</small>
          </div>
        </div>
        <h2>Pay with ?</h2>
        <div class="row d-flex justify-content-around">
          <div class="">
            <router-link :to="{name:'checkout_stripe'}">
              <h4>Stripe</h4>
            </router-link>
          </div>
          <div>
            <h4>Cash on Delivery</h4>
          </div>
        </div>
        <template v-slot:footer>
          <em></em>
        </template>
      </b-card>
    </div>
  </div>
</template>

<script>
import CartContentTable from "../components/CartContentTable";
import { mapGetters } from "vuex";
export default {
  name: "checkout",
  components: {
    CartContentTable,
  },
  data() {
    return {
      total_quantity: 0,
      total_price: 0,
      total_weight: 0,
    };
  },
  computed: mapGetters(["cart"]),
  watch: {
    cart(val){
      if(val.length > 0){
        this.getTotalAll(val);
      }else{
        this.total_quantity = 0;
        this.total_price = 0;
        this.total_weight = 0;
      }
    }
  },
  methods: {
    getTotalQuantity(cart) {
      this.total_quantity = cart
        .map(item => item.quantity)
        .reduce((a, b) => parseInt(a) + parseInt(b));
    },
    getTotalPrice(cart) {
      this.total_price = cart
        .map(item => item.price)
        .reduce((a, b) => parseFloat(a) + parseFloat(b));
    },
    getTotalWeight(cart){
      this.total_weight = cart
        .map(item => item.weight)
        .reduce((a, b) => parseFloat(a) + parseFloat(b));
    },
    getTotalAll(cart){
      this.getTotalQuantity(cart);
      this.getTotalPrice(cart);
      this.getTotalWeight(cart);
    }
  },
  created() {
    if (this.cart.length > 0) {
      this.getTotalAll(this.cart);
    }
  }
};
</script>

<style scoped>
</style>