<template>
  <div class="login-form">
    <form action @submit.prevent="submit">
      <h2 class="text-center text-uppercase">Log in</h2>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          v-model="current_user.email"
          placeholder="Email"
          required="required"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="current_user.password"
          placeholder="Password"
          required="required"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn-custom-violet btn-block">Continue</button>
      </div>
      <!-- <div class="clearfix">
        <label class="pull-left checkbox-inline">
          <input type="checkbox" /> Remember me
        </label>
        <a href="#" class="pull-right">Forgot Password?</a>
      </div>-->
    </form>
    <p class="text-center">

      <router-link :to="{name:'register'}">Create an Account</router-link>
    </p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      current_user: {
        email: "",
        password: ""
      }
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["loginUser", "toggleLoader"]),
    submit() {
      this.toggleLoader();
      this.loginUser(this.current_user).then((res) => {
        if (res.status == 200) {
          if(this.user.role === 'admin'){
            this.$router.push({ name: "application.info" });
          }else{
            this.$router.push({ name: "home" });
          }
          this.toggleLoader();
        }else if (res.status == 401) {
          alert("Invalid Credentials");
          this.current_user.email = "";
          this.current_user.password = "";
          this.toggleLoader();
        }
      }).catch(err => {
        alert(err)
        this.toggleLoader();
      });
    }
  }
};
</script>
<style scoped>
.login-form {
  width: 500px;
  margin: 50px auto;
}
.login-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control,
.btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}
</style>