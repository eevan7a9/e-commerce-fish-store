import { defineStore } from 'pinia';
import { SessionStorage } from 'quasar';
import { api } from 'src/boot/axios';
import { RequestResponse } from 'src/shared/interface/api';
import { User } from 'src/shared/interface/user';
import { headerOpts } from 'src/shared/utils/requests';

// TEST IMPORTS
import { FormRegister } from 'src/shared/interface/form';
import { AxiosError } from 'axios';

interface AuthState {
  user: User | null;
  token: string;
  expires_at: string;
}

export const useAuthStore = defineStore('auth', {
  state(): AuthState {
    return {
      user: null,
      token: '',
      expires_at: '',
    };
  },

  getters: {
    userInfo(): User | null {
      return this.user;
    },
    userToken(): string {
      return this.token;
    },
    authenticated(): boolean {
      return !!(this.user && this.token);
    },
    isAdmin(): boolean {
      return !!this.user?.is_admin;
    },
  },

  actions: {
    loadUser(): void {
      this.user = SessionStorage.getItem('user');
      this.token = SessionStorage.getItem('token') || '';
      if (!this.user || !this.token) {
        this.clearState();
      }
    },
    clearState(): void {
      SessionStorage.remove('user');
      SessionStorage.remove('token');
      SessionStorage.remove('expires');
      this.user = null;
      this.token = '';
    },
    setUser(user: User): void {
      SessionStorage.setItem('user', user);
      this.user = user;
    },

    setToken(token: string): void {
      SessionStorage.setItem('token', token);
      this.token = token;
    },

    setExpires(expires: string): void {
      SessionStorage.setItem('expires', expires);
      this.expires_at = expires;
    },

    async signin(
      email: string,
      password: string
    ): Promise<RequestResponse | undefined> {
      try {
        const { data } = await api.post<
          RequestResponse<{ user: User; token: string; expires: string }>
        >('/login', {
          email,
          password,
        });
        if (data?.status === 200 && data.data) {
          const { token, user, expires } = data.data;
          this.setUser(user);
          this.setToken(token);
          this.setExpires(expires);
        }
        return {
          success: data.status === 200,
          message: data.message,
          data,
        };
      } catch (err) {
        console.error('Error User sign in', err);
        return { success: false, message: 'Failed User sign in' };
      }
    },

    async register(form: FormRegister): Promise<RequestResponse | void> {
      try {
        const { data } = await api.post<RequestResponse<User>>(
          '/register',
          form,
          { headers: headerOpts() }
        );
        return {
          success: data.status === 201,
          message: data.message,
          data,
        };
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
          return { success: false, message: error.response?.data?.message };
        }
      }
    },

    async signout(): Promise<RequestResponse | void> {
      try {
        const { data } = await api.post<RequestResponse>(
          '/logout',
          {},
          { headers: headerOpts({ token: this.userToken }) }
        );
        return { success: data.status === 200, message: data.message };
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          return { success: false, message: error.response?.data?.message };
        }
      } finally {
        this.clearState();
      }
    },
  },
});
