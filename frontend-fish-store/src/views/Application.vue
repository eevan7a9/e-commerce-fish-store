<template>
  <div class="container wrapper pt-5">
    <div class="sidebar pr-2">
      <b-list-group>
        <!-- Application Section Starts -->
        <b-list-group-item
          v-b-toggle.collapse-3
          class="pointer font-weight-bolder text-dark"
        >Application</b-list-group-item>
        <b-collapse visible id="collapse-3" class="pl-3 bg-success">
          <b-list-group>
            <b-list-group-item>
              <router-link :to="{name:'application.orders'}" class="text-secondary">
                <router-link :to="{name:'application.info'}" class="text-secondary">App Status</router-link>
              </router-link>
            </b-list-group-item>
            <b-list-group-item class="text-secondary">Layout</b-list-group-item>
          </b-list-group>
        </b-collapse>
        <!-- Application Ends -->
        <!-- Products Section Starts-->
        <b-list-group-item
          v-b-toggle.collapse-1
          class="pointer font-weight-bolder text-dark"
        >Products</b-list-group-item>
        <b-collapse visible id="collapse-1" class="pl-3 bg-success">
          <b-list-group>
            <b-list-group-item>
              <router-link :to="{name:'application.products'}" class="text-secondary">Data Table</router-link>
            </b-list-group-item>

            <b-list-group-item class="text-secondary">
              <router-link
                :to="{name:'application.products.add'}"
                class="text-secondary"
              >Add Products</router-link>
            </b-list-group-item>
          </b-list-group>
        </b-collapse>
        <!-- Products End -->
        <!-- Orders Section Starts -->
        <b-list-group-item v-b-toggle.collapse-2 class="pointer font-weight-bolder text-dark">Orders</b-list-group-item>
        <b-collapse visible id="collapse-2" class="pl-3 bg-success">
          <b-list-group>
            <b-list-group-item>
              <router-link :to="{name:'application.orders'}" class="text-secondary">Data Table</router-link>
            </b-list-group-item>
            <b-list-group-item class="text-secondary">Add Order</b-list-group-item>
          </b-list-group>
        </b-collapse>
        <!-- Orders End -->
      </b-list-group>
    </div>
    <div class="main">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Application"
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
}
.sidebar {
  /* background: rebeccapurple; */
  width: 300px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>