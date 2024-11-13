import { defineStore } from 'pinia';
import { api, staticData } from 'src/boot/axios';
import { ApiResponse, RequestStatus } from 'src/shared/interface/api';
import { Product } from 'src/shared/interface/product';

interface ProductsState {
  products: Product[];
  loading: boolean;
}

export const useProductsStore = defineStore('products', {
  state(): ProductsState {
    return {
      loading: false,
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

    async fetchProducts(): Promise<RequestStatus | void> {
      try {
        this.loading = true;
        const { data } = await api.get<ApiResponse<Product[]>>('/products');
        if (data.status === 200 && data.data) {
          this.setProducts(data.data);
          return { success: true };
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * PROTOTYPING & MOCKING DATA
     */
    async loadMockProducts() {
      this.loading = true;
      const { data } = await staticData.get('/products.json');
      this.setProducts(data);
      this.loading = false;
    },
  },
});
