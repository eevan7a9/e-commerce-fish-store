import { defineStore } from 'pinia';
import { api, staticData } from 'src/boot/axios';
import { ApiResponse, RequestStatus } from 'src/shared/interface/api';
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

    async fetchCategories(): Promise<RequestStatus | void> {
      try {
        this.loading = true;
        const { data } = await api.get<ApiResponse<Category[]>>('/categories');
        if (data.status === 200 && data.data) {
          this.setCategories(data.data);
          return { success: true };
        }
        console.warn('Unexpected response', data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * PROTOTYPING & MOCKING DATA
     */
    async loadMockCategories(): Promise<RequestStatus | void> {
      this.loading = true;
      const { data } = await staticData.get('/categories.json');
      this.setCategories(data);
      this.loading = false;
      return { success: true };
    },
  },
});
