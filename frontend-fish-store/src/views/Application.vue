<template>
  <div class="container wrapper pt-5">
    <div class="sidebar pr-2">
      <b-list-group>
        <b-list-group-item>
          <router-link
            :to="{name:'application.info'}"
            class="text-secondary font-weight-bold"
          >Application</router-link>
        </b-list-group-item>
        <b-list-group-item>
          <router-link
            :to="{name:'application.products'}"
            class="text-secondary font-weight-bold"
          >Products</router-link>
        </b-list-group-item>
        <b-list-group-item>
          <router-link
            :to="{name:'application.orders'}"
            class="text-secondary font-weight-bold"
          >Orders</router-link>
        </b-list-group-item>
      </b-list-group>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Application"
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
}
.sidebar {
  /* background: rebeccapurple; */
  width: 300px;
}
</style>