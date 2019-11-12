<template>
  <div class="container p-5">
    <div class="card w-100 col-md-10 mx-auto">
      <div class="card-body justify-content-center">
        <h3>Cart Content:</h3>
        <CartContentTable />
        <hr />
        <h3>Orders Made</h3>
        <OrdersTable />
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
  computed: mapGetters(["cart"])
};
</script>

<style scoped>
</style>