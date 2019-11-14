<template>
  <div class="container d-flex flex-column justify-content-center align-items-center pt-5">
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
        </div>
        <h4>Order Form :</h4>
        <PaymentForm />
        <template v-slot:footer>
          <em></em>
        </template>
      </b-card>
    </div>
  </div>
</template>

<script>
import CartContentTable from "../components/CartContentTable";
import PaymentForm from '../components/PaymentForm';
import { mapGetters } from "vuex";
export default {
  name: "checkout",
  components: {
    CartContentTable,
    PaymentForm
  },
  data() {
    return {
      total_quantity: 0,
      total_price: 300
    };
  },
  computed: mapGetters(["cart"]),
  methods: {
    getTotalQuantity: cart => {
      return cart
        .map(item => item.quantity)
        .reduce((a, b) => parseInt(a) + parseInt(b));
    },
    getTotalPrice: cart => {
      return cart
        .map(item => item.price)
        .reduce((a, b) => parseFloat(a) + parseFloat(b));
    }
  },
  created() {
    this.total_quantity = this.getTotalQuantity(this.cart);
    this.total_price = "$" + this.getTotalPrice(this.cart);
  }
};
</script>

<style scoped>
</style>