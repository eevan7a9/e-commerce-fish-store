import { defineStore } from 'pinia';
import { api, staticData } from 'src/boot/axios';
import { RequestResponse } from 'src/shared/interface/api';
import { Tag } from 'src/shared/interface/tags';

interface tagsState {
  tags: Tag[];
}

export const useTagsStore = defineStore('tags', {
  state(): tagsState {
    return {
      tags: [],
    };
  },

  getters: {
    list(): Tag[] {
      return this.tags;
    },
  },

  actions: {
    setTags(tags: Tag[]) {
      this.tags = tags;
    },

    async fetchTags(): Promise<RequestResponse | void> {
      try {
        const { data } = await api.get<RequestResponse<Tag[]>>('/tags');
        if (data.status === 200 && data.data) {
          this.setTags(data.data);
          return { success: true };
        }
      } catch (err) {
        console.error('Failed to fetch tags:', err);
      }
    },

    /**
     * PROTOTYPING & MOCKING DATA
     */
    async fetchJsonTags(): Promise<RequestResponse | void> {
      const { data } = await staticData.get('/tags.json');
      this.setTags(data);
      return { success: true };
    },
  },
});
