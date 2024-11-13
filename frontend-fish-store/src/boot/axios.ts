import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Notify } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import { ApiResponse } from 'src/shared/interface/api';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.SERVER_API_URL });
const staticData = axios.create({ baseURL: process.env.STATIC_DATA_URL });

export default boot(({ app, redirect, router }) => {
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError<ApiResponse>) => {
      // Unauthorized
      if (error.response && error.response.status === 401) {
        console.log('Token expired or invalid, redirecting to login...');
        // Redirect to the login page if it's a 401 Unauthorized error
        Notify.create({
          color: 'negative',
          message:
            error.response?.data?.message || 'Session expired or invalid',
          timeout: 5000,
          spinnerColor: 'primary',
          group: true,
        });

        setTimeout(() => {
          useAuthStore().clearState();
          if (router.currentRoute.value.meta?.requiresAuth) {
            console.log('redirecting...');
            redirect('/auth');
          }
        }, 4000);
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, staticData };
