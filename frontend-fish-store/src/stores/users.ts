import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { RequestResponse } from 'src/shared/interface/api';
import { User, UserDetails } from 'src/shared/interface/user';
import { headerOpts } from 'src/shared/utils/requests';

interface UserState {
  users: User[];
  loading: boolean;
}

export const useUsersStore = defineStore('users', {
  state: (): UserState => {
    return {
      users: [],
      loading: false,
    };
  },
  getters: {
    list(): User[] {
      return this.users;
    },
  },
  actions: {
    setUsers(users: User[]) {
      this.users = users;
    },

    setLoading(loading: boolean) {
      this.loading = loading;
    },

    async fetchUsers(token: string): Promise<RequestResponse | void> {
      try {
        this.setLoading(true);
        const { data } = await api.get<RequestResponse<User[]>>('/users', {
          headers: headerOpts({ token }),
        });
        if (data.data) this.setUsers(data.data);

        return {
          success: data.status === 200,
          message: data.message,
        };
      } catch (error) {
        if (error instanceof AxiosError) {
          const data = error.response?.data;
          return { success: false, message: data.data };
        }
      } finally {
        this.setLoading(false);
      }
    },

    async getUserById(
      id: string | number,
      token: string
    ): Promise<RequestResponse<UserDetails> | void> {
      try {
        const { data } = await api.get<RequestResponse<UserDetails>>(
          '/user/' + id,
          {
            headers: headerOpts({ token }),
          }
        );
        return {
          success: data.status === 200,
          message: data.message,
          data: data.data,
        };
      } catch (err) {
        console.error('Error getting user by ID', err);
        if (err instanceof AxiosError) {
          return { success: false, message: err.response?.data?.message };
        }
      }
    },
  },
});
