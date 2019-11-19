<template>
  <div class="container p-5">
    <div class="card w-100 mx-auto">
      <div class="card-body justify-content-center">
        <h3>Cart Content :</h3>
        <CartContentTable />
        <div class="d-flex justify-content-between">
          <div v-if="cart.length === 0">
            <router-link :to="{name:'catalog'}" class="violet">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
              <span class="font-weight-bold violet">Start shopping</span>
            </router-link>
          </div>
          <div v-else>
            <router-link :to="{name:'catalog'}" class="text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
              <span class="font-weight-bold">Continue shopping</span>
            </router-link>
          </div>
          <div v-if="cart.length > 0">
            <router-link to="/home" class="text-success">
              <span class="font-weight-bold">Checkout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </router-link>
          </div>
        </div>
        <hr />
        <h3>Orders Made :</h3>
        <OrdersTable />
        <div class="w-100 empty d-flex justify-content-center p-5" v-if="orders.length === 0">
          <h3>Empty :(</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartContentTable from "../components/CartContentTable";
import OrdersTable from "../components/Orders/OrdersTable";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  components: {
    CartContentTable,
    OrdersTable
  },
  computed: mapGetters(["cart", "orders"])
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
</style>