import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./router/router-guard"
import VueStripeCheckout from 'vue-stripe-checkout';

Vue.use(VueStripeCheckout, {
  publishableKey: 'pk_test_7nkOweBBNAxRdKMS2449Desn00zmvCOyAJ'
});

Vue.use(BootstrapVue);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
