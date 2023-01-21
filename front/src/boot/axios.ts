import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '@/stores/auth';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const removeTrailingSlash = (str: string) => str.replace(/\/$/, '');

let $api: AxiosInstance;
let $publicApi: AxiosInstance;

export default boot(({ app }) => {
  const authStore = useAuthStore();
  const baseURL =
    removeTrailingSlash(authStore.apiServer) || 'http://localhost:1337/api';
  $api = axios.create();
  $api.interceptors.request.use((config) => {
    return {
      ...config,
      baseURL,
      headers: Object.assign({}, authStore.authHeaders, config.headers),
    };
  });
  $publicApi = axios.create({
    baseURL,
  });
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = $api;
  app.config.globalProperties.$publicApi = $publicApi;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, $api, $publicApi };
