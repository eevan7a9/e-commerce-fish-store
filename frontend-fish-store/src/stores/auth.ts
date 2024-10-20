import { defineStore } from 'pinia';
import { SessionStorage } from 'quasar';
import { User } from 'src/shared/interface/auth';

interface AuthState {
  user: User | null;
  token: string;
}

export const useAuthStore = defineStore('auth', {
  state(): AuthState {
    return {
      user: null,
      token: '',
    };
  },

  getters: {
    userInfo: function (state): User | null {
      return state.user;
    },
    userToken: function (state): string {
      return state.token;
    },
  },

  actions: {
    loadUser() {
      this.user = SessionStorage.getItem('user');
      this.token = SessionStorage.getItem('token') || '';
      if (!this.user || !this.token) {
        this.clearState();
      }
    },
    clearState() {
      SessionStorage.remove('user');
      SessionStorage.remove('token');
      this.user = null;
      this.token = '';
    },
    setUser(user: User) {
      console.log('setUser');

      SessionStorage.setItem('user', user);
      this.user = user;
    },
    setToken(token: string) {
      SessionStorage.setItem('token', token);
      this.token = token;
    },
  },
});
