import { defineStore } from 'pinia';
import { Category } from 'src/shared/interface/category';

interface categoriesState {
  categories: Category[];
}

export const useCategoriesStore = defineStore('categories', {
  state(): categoriesState {
    return {
      categories: [],
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
  },
});
