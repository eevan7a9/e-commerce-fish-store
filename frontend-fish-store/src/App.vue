<template>
  <div id="app">
    {{user}} / {{ token }}
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view class="view" />
    </transition>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Navbar
  },
  computed: mapGetters(["user", "token"]),
  methods: {
    ...mapActions(["getProducts", "getUser"])
  },
  created() {
    this.getProducts();
    if (this.token) {
      this.getUser();
    }
  }
};
</script>
<style>
@import url("./assets/css/custom.css");
body,
html {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
