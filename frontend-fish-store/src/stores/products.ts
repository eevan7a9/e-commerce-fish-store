import { defineStore } from 'pinia';
import { Product } from 'src/shared/interface/product';

interface ProductsState {
  products: Product[];
}

export const useProductsStore = defineStore('products', {
  state(): ProductsState {
    return {
      products: [],
    };
  },

  getters: {
    list(): Product[] {
      return this.products;
    },
  },

  actions: {
    setProducts(products: Product[]): void {
      this.products = products;
    },
  },
});
