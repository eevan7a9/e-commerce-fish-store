import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { api, staticData } from 'src/boot/axios';
import { RequestResponse } from 'src/shared/interface/api';
import { Product } from 'src/shared/interface/product';
import { headerOpts } from 'src/shared/utils/requests';

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

    async fetchProducts(): Promise<RequestResponse | void> {
      try {
        this.loading = true;
        const { data } = await api.get<RequestResponse<Product[]>>('/products');
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

    async deleteProduct(
      id: string | number,
      token: string
    ): Promise<RequestResponse | void> {
      try {
        this.loading = true;
        const { data } = await api.delete<RequestResponse>('/products/' + id, {
          headers: headerOpts({ token }),
        });

        if (data.status === 200 && data.data) {
          this.products = this.products.filter((prod) => prod.id !== id);
          return { success: true, message: data.message };
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        if (err instanceof AxiosError) {
          return { success: false, message: err.response?.data.message };
        }
      } finally {
        this.loading = false;
      }
    },

    async createProduct(
      form: Partial<Product>,
      token: string
    ): Promise<RequestResponse | void> {
      try {
        this.loading = true;
        const { data } = await api.post<RequestResponse<Product>>(
          '/products/',
          form,
          {
            headers: headerOpts({ token }),
          }
        );

        if (data.status === 200 && data.data) {
          this.products.unshift(data.data);
          return { success: true, message: data.message };
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        if (err instanceof AxiosError) {
          return { success: false, message: err.response?.data.message };
        }
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(
      form: Partial<Product>,
      id: string | number,
      token: string
    ): Promise<RequestResponse | void> {
      try {
        this.loading = true;
        const { data } = await api.patch<RequestResponse<Product>>(
          '/products/' + id,
          form,
          {
            headers: headerOpts({ token }),
          }
        );
        console.log('updateProduct', data);
        if (data.status === 200 && data.data) {
          const findProduct = this.products.find((prod) => prod.id === id);
          if (findProduct) {
            Object.assign(findProduct, data.data);
          }
          return { success: true, message: data.message };
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        if (err instanceof AxiosError) {
          return { success: false, message: err.response?.data.message };
        }
      } finally {
        this.loading = false;
      }
    },

    /**
     * PROTOTYPING & MOCKING DATA
     */
    async fetchJsonProducts() {
      this.loading = true;
      const { data } = await staticData.get('/products.json');
      this.setProducts(data);
      this.loading = false;
    },
  },
});
