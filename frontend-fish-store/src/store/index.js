import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import auth from './modules/auth';
import product from "./modules/products";
import order from "./modules/orders";

Vue.use(Vuex)

axios.defaults.baseURL = "http://localhost:8000/public/api/v1/";

export default new Vuex.Store({
  modules: {
    auth,
    product,
    order
  }
})
