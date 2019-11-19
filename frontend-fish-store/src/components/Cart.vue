<template>
  <b-nav-item-dropdown no-caret>
    <template v-slot:button-content>
      <span class="cart">
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
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <transition name="bounce" mode="out-in">
          <span class="cart-number" :key="cart.length">
            <div>{{ cart.length }}</div>
          </span>
        </transition>
      </span>
    </template>
    <b-dropdown-item :to="{name:'checkout'}">
      <span class="font-weight-bold">Checkout</span>
    </b-dropdown-item>
    <b-dropdown-item href="#" @click="$bvModal.show('my-modal')">View Content</b-dropdown-item>

    <!-- Modal starts -->
    <b-modal id="my-modal" size="lg" title="Shopping cart content" ok-only>
      <CartContentTable />
    </b-modal>
    <!-- The modal ends-->
  </b-nav-item-dropdown>
</template>

<script>
import CartContentTable from "./CartContentTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Cart",
  components: {
    CartContentTable
  },
  computed: mapGetters(["cart"]),
  methods: {
    ...mapActions(["deleteCartItem"])
  },
  created() {
    const cart = JSON.parse(localStorage.getItem("cart_shopping"));
    // represents how long the cart is stored
    const cart_stored = localStorage.getItem("cart_stored");

    if (cart != null && cart_stored == null) {
      // we check if there is no cart_stored and clear/remove all items in cart
      this.deleteCartItem();
    } else if (cart && cart_stored) {
      const current_time = new Date().getTime();
      // we get the time difference
      const time_diff = (current_time - cart_stored) / 1000;
      if (7200 < time_diff) {
        // if the the time the cart is stored excceeds 2hrs
        // we clear the cart
        this.deleteCartItem();
      }
    }
  }
};
</script>

<style scoped>
svg {
  width: 26px;
  height: 26px;
}
.cart {
  color: aliceblue;
  display: flex;
}
.cart .cart-number {
  display: flex;
  justify-content: center;
  margin-left: 4px;
  width: 25px;
  height: 25px;
  background: aliceblue;
  color: green;
  font-weight: 900;
  border-radius: 100%;
}
.cart-number a {
  padding: 4px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>