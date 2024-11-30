import { defineStore } from 'pinia';
import { api, staticData } from 'src/boot/axios';
import { RequestResponse } from 'src/shared/interface/api';
import { Category } from 'src/shared/interface/category';

interface categoriesState {
  categories: Category[];
  loading: boolean;
}

export const useCategoriesStore = defineStore('categories', {
  state(): categoriesState {
    return {
      categories: [],
      loading: false,
    };
  },

  getters: {
    list(): Category[] {
      return this.categories;
    },
  },

  actions: {
    setCategories(categories: Category[]): void {
      this.categories = categories;
    },

    async fetchCategories(): Promise<RequestResponse | void> {
      try {
        this.loading = true;
        const { data } = await api.get<RequestResponse<Category[]>>(
          '/categories'
        );
        if (data.status === 200 && data.data) {
          return this.setCategories(data.data);
        }
        console.warn('Unexpected response', data);
        return { success: data.status === 200, message: data.message };
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * PROTOTYPING & MOCKING DATA
     */
    async fetchJsonCategories(): Promise<RequestResponse | void> {
      this.loading = true;
      const { data } = await staticData.get('/categories.json');
      this.setCategories(data);
      this.loading = false;
      return { success: true };
    },
  },
});
