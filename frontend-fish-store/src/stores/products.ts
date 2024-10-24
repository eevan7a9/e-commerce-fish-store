import { defineStore } from 'pinia';
import { Product } from 'src/shared/interface/product';
import testProducts from 'src/assets/test-data/products';

interface ProductsState {
  products: Product[];
}

export const useProductsStore = defineStore('products', {
  state(): ProductsState {
    return {
      products: testProducts,
    };
  },

  getters: {
    list: function (state) {
      return state.products;
    },
  },

  actions: {
    setProducts(products: Product[]) {
      this.products = products;
    },
  },
});
