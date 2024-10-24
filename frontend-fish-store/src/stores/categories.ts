import { defineStore } from 'pinia';
import categories from 'src/assets/test-data/categories';
import { Category } from 'src/shared/interface/category';

interface categoriesState {
  categories: Category[];
}

export const useCategoriesStore = defineStore('categories', {
  state(): categoriesState {
    return {
      categories: categories,
    };
  },

  getters: {
    list: function (state) {
      return state.categories;
    },
  },

  actions: {
    setCategories(categories: []) {
      this.categories = categories;
    },
  },
});
