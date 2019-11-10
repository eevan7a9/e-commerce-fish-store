<template>
  <div class="bg-success nav-wrapper">
    <b-navbar toggleable="lg" type="dark" variant="success" class="container text-uppercase w-100">
      <b-navbar-brand href="#">FishStore</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" class="text-light font-weight-bolder">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/catalog" class="text-light font-weight-bolder">Catalog</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>-->

          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>-->
          <b-nav-item class="text-light font-weight-bolder" v-if="!token">
            <router-link to="/register" class="text-light font-weight-bolder">Register</router-link>
          </b-nav-item>
          <b-nav-item class="text-light font-weight-bolder" v-if="!token">
            <router-link to="/login" class="text-light font-weight-bolder">Login</router-link>
          </b-nav-item>

          <b-nav-item class="text-light font-weight-bolder" v-if="token">
            <router-link to="/application" class="text-light font-weight-bolder">Application</router-link>
          </b-nav-item>
          <b-nav-item-dropdown right v-if="token">
            <template v-slot:button-content>
              <span class="text-light font-weight-bolder">{{ user.email }}</span>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="out">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["token", "user"])
  },
  methods: {
    ...mapActions(["logout"]),
    out() {
      this.logout().then(() => this.$router.push({ name: "login" }));
    }
  },
  created() {
    console.log(this.token);
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  letter-spacing: 1px;
}
a:hover {
  text-decoration: none;
}
.nav-wrapper {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
}
.navbar {
  width: 100%;
}
</style>