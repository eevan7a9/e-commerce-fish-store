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
