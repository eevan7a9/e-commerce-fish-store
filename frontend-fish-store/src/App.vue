<template>
  <div id="app">
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view class="view" v-if="!appLoader" />
    </transition>
    <!-- application Loader -->
    <AppLoader  class="vh-100"   v-if="appLoader" />
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import AppLoader from "./components/AppLoader";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Navbar,
    AppLoader
  },
  computed: mapGetters(["user", "token", "appLoader"]),
  methods: {
    ...mapActions(["getProducts", "getUser" ,"toggleLoader"])
  },
  created() {
    this.toggleLoader(); // we load app loader
    this.getProducts().then(() => {
      if (this.token) {
        this.getUser().then(() => this.toggleLoader()); // disable app loader
      }else{
        setTimeout(() => {
          this.toggleLoader(); // disable app loader 
        },1000)
      }
    });
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
  min-height: 100%;
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
