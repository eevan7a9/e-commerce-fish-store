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
                  @input="validate"
                  class="form-control input-lg"
                  v-model="user.username"
                  placeholder="Username"
                  name="name"
                  type="text"
                  autocomplete="username"
                />
                <small class="text-danger" v-if="error.username.status">{{ error.username.message }}</small>
              </div>
              <div class="form-group has-error">
                <input
                  @input="validate"
                  class="form-control input-lg"
                  v-model="user.email"
                  placeholder="E-mail Address"
                  name="email"
                  type="email"
                  autocomplete="email"
                />
                <small class="text-danger" v-if="error.email.status">{{ error.email.message }}</small>
              </div>
              <div class="form-group has-success">
                <input
                  @input="validate"
                  class="form-control input-lg"
                  v-model="user.password"
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                />
                <small class="text-danger" v-if="error.password.status">{{ error.password.message }}</small>
              </div>
              <div class="form-group has-success">
                <input
                  @input="validate"
                  class="form-control input-lg"
                  v-model="user.confirm"
                  placeholder="Confirm Password"
                  type="password"
                  autocomplete="confirm-password"
                />
                <small class="text-danger" v-if="error.confirm.status">{{ error.confirm.message }}</small>
              </div>
              <div class="checkbox">
                <label class="small">
                  <input name="terms" type="checkbox" v-model="user.accept" /> I have read and agree to the
                  <a href="#">terms of service</a><br>
                  <span class="text-danger" v-if="!user.accept">Required</span>
                </label>
              </div>
              <input class="btn-custom-violet btn-block" value="Sign Me Up" type="submit" />
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
        confirm: "",
        accept:true
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
    ...mapActions(["registerBuyer", "toggleLoader", "getUser"]),
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
      this.toggleLoader();
      this.validate();
      if (
        !this.error.username.status &&
        !this.error.email.status &&
        !this.error.password.status &&
        !this.error.confirm.status && 
        this.user.accept
      ) {
        this.registerBuyer(this.user).then(() => {
          this.$router.push({ name: "home" });
          this.getUser().then(() => {
            this.toggleLoader();
          })
        });
      }else{
        this.toggleLoader();
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