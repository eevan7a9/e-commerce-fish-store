<template>
  <div class="container vh-100 py-3">
    <div class="row mt-5">
      <div class="col-md-6 mx-auto">
        <div class="card bg-light card-body">
          <h3 class="text-center mb-4">Register</h3>
          <form action @submit.prevent="submit">
            <fieldset>
              <div class="form-group has-error">
                <input
                  class="form-control input-lg"
                  v-model="user.username"
                  placeholder="username"
                  name="name"
                  type="text"
                />
                <small class="text-danger" v-if="error.username.status">{{ error.username.message }}</small>
              </div>
              <div class="form-group has-error">
                <input
                  class="form-control input-lg"
                  v-model="user.email"
                  placeholder="E-mail Address"
                  name="email"
                  type="email"
                />
                <small class="text-danger" v-if="error.email.status">{{ error.email.message }}</small>
              </div>
              <div class="form-group has-success">
                <input
                  class="form-control input-lg"
                  v-model="user.password"
                  placeholder="Password"
                  name="password"
                  value
                  type="password"
                />
                <small class="text-danger" v-if="error.password.status">{{ error.password.message }}</small>
              </div>
              <div class="form-group has-success">
                <input
                  class="form-control input-lg"
                  v-model="user.confirm"
                  placeholder="Confirm Password"
                  name="password"
                  value
                  type="password"
                />
                <small class="text-danger" v-if="error.confirm.status">{{ error.confirm.message }}</small>
              </div>
              <div class="checkbox">
                <label class="small">
                  <input name="terms" type="checkbox" />I have read and agree to the
                  <a href="#">terms of service</a>
                </label>
              </div>
              <input class="btn btn-lg btn-success btn-block" value="Sign Me Up" type="submit" />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "register",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        confirm: ""
      },
      error: {
        username: {
          status: 0,
          message: "Username be atleast 6 characters long"
        },
        email: {
          status: 0,
          message: "Email address required"
        },
        password: {
          status: 0,
          message: "Password must be atleast 6 characters long"
        },
        confirm: {
          status: 0,
          message: "Password is not confirmed"
        }
      }
    };
  },
  methods: {
    ...mapActions(["registerBuyer"]),
    validEmail() {
      let re = /\S+@\S+\.\S+/;
      return re.test(this.user.email);
    },
    validate() {
      this.error.username.status = this.user.username.trim().length < 6 ? 1 : 0;
      this.error.email.status = !this.validEmail() ? 1 : 0;
      this.error.password.status = this.user.password.trim().length < 6 ? 1 : 0;
      this.error.confirm.status =
        this.user.password.trim().length != this.user.confirm.trim().length
          ? 1
          : 0;
    },
    submit() {
      this.validate();
      if (
        !this.error.username.status &&
        !this.error.email.status &&
        !this.error.password.status &&
        !this.error.confirm.status
      ) {
        this.registerBuyer(this.user).then(() => {
          this.$router.push({ name: "home" });
        });
      }
    }
  }
};
</script>

<style scoped>
.vh-100 {
  min-height: 100vh;
}
small {
  letter-spacing: 1px;
}
</style>