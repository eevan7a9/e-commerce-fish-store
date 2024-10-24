import { defineStore } from 'pinia';
import tags from 'src/assets/test-data/tags';

import { Tag } from 'src/shared/interface/tags';
interface tagsState {
  tags: Tag[];
}

export const usetagsStore = defineStore('tags', {
  state(): tagsState {
    return {
      tags: tags,
    };
  },

  getters: {
    list: function (state) {
      return state.tags;
    },
  },

  actions: {
    settags(tags: []) {
      this.tags = tags;
    },
  },
});
