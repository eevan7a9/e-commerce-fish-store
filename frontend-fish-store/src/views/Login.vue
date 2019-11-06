<template>
  <div class="login-form">
    <form action @submit.prevent="submit">
      <h2 class="text-center">Log in</h2>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          v-model="user.email"
          placeholder="Email"
          required="required"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="user.password"
          placeholder="Password"
          required="required"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-success btn-block">Log in</button>
      </div>
      <!-- <div class="clearfix">
        <label class="pull-left checkbox-inline">
          <input type="checkbox" /> Remember me
        </label>
        <a href="#" class="pull-right">Forgot Password?</a>
      </div>-->
    </form>
    <p class="text-center">
      <a href="#">Create an Account</a>
    </p>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    submit() {
      this.loginUser(this.user).then(() => this.$router.push({ name: "home" }));
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