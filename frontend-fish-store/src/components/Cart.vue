<template>
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
    <span class="cart-number">
      <a>23</a>
    </span>
  </span>
</template>

<script>
export default {
  name: "Cart"
};
</script>

<style scoped>
svg {
  width: 26px;
  height: 26px;
}
.cart {
  color: aliceblue;
}
.cart .cart-number {
  margin-left: 4px;
  width: 10px;
  background: aliceblue;
  color: green;
  font-weight: 900;
  border-radius: 100%;
}
.cart-number a {
  padding: 4px;
}
</style>