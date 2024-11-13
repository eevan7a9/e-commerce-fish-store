import { defineStore } from 'pinia';
import { SessionStorage } from 'quasar';
import { api } from 'src/boot/axios';
import { ApiResponse, RequestStatus } from 'src/shared/interface/api';
import { User } from 'src/shared/interface/auth';
import { headerOpts } from 'src/shared/utils/requests';
import { createMockRequest } from 'src/shared/utils/mock';

// TEST IMPORTS
import userTestData from 'src/assets/data/user';
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
    ): Promise<RequestStatus | undefined> {
      try {
        const { data } = await api.post<
          ApiResponse<{ user: User; token: string; expires: string }>
        >('/login', {
          email,
          password,
        });
        if (data.status === 200 && data.data) {
          const { token, user, expires } = data.data;
          this.setUser(user);
          this.setToken(token);
          this.setExpires(expires);
          return { success: true, message: data.message };
        }
        return { success: false, message: data.message };
      } catch (err) {
        console.error('Error User sign in', err);
        return { success: false, message: 'Failed User sign in' };
      }
    },

    async register(form: FormRegister): Promise<RequestStatus | void> {
      try {
        const { data } = await api.post<ApiResponse<User>>('/register', form, {
          headers: headerOpts(),
        });
        if (data.status === 201) {
          return { success: true, message: data.message };
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
          return { success: false, message: error.response?.data?.message };
        }
      }
    },

    async signout(): Promise<RequestStatus | void> {
      try {
        const { data } = await api.post<ApiResponse>(
          '/logout',
          {},
          { headers: headerOpts({ token: this.userToken }) }
        );
        if (data.status === 200) {
          this.clearState();
          return { success: true, message: data.message };
        }
      } catch (error) {
        // console.error(error);
        this.clearState();
        if (error instanceof AxiosError) {
          return { success: false, message: error.response?.data?.message };
        }
      }
    },

    /**
     * PROTOTYPING & MOCKING SIGN IN DATA
     */
    async signinMockUser(): Promise<RequestStatus> {
      const { token, user, expires } = await createMockRequest<{
        user: User;
        token: string;
        expires: string;
      }>({
        user: userTestData,
        token: 'secret',
        // expires: new Date(Date.now() + 2 * 60 * 1000).toUTCString() 2 min,
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000).toUTCString(),
      });
      this.setUser(user);
      this.setToken(token);
      this.setExpires(expires);
      return { success: true, message: 'You have signed in successfully.' };
    },
    /**
     * PROTOTYPING & MOCKING SIGNOUT DATA
     */
    async signoutMockUser(
      success = true,
      message = 'You have been signed out.'
    ): Promise<RequestStatus> {
      this.clearState();
      return await createMockRequest({ success, message }, 2000);
    },
  },
});
