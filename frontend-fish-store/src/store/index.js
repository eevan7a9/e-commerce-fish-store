import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import auth from './modules/auth';
import product from "./modules/products";
import order from "./modules/orders";
import cart from "./modules/cart";
import loader from "./modules/loader";

Vue.use(Vuex)

axios.defaults.baseURL = "http://onlinestorefish.rf.gd/public/api/v1/";
// axios.defaults.baseURL = "http://localhost:8000/public/api/v1/";

export default new Vuex.Store({
  modules: {
    auth,
    product,
    order,
    cart,
    loader,
  }
})
