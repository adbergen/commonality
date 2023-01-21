import { defineStore } from 'pinia';
import { $publicApi, $api } from '@/boot/axios';
import { Notify } from 'quasar';
import User from '@/types/User';
import ApiError from '@/types/ApiError';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: '',
    serverFallback: 'http://localhost:1337/api',
    returnUrl: '',
  }),
  persist: true,
  getters: {
    apiServer: (state) =>
      process.env.API_BASE ? process.env.API_BASE : state.serverFallback,
    authHeaders: (state) => {
      return { Authorization: `Bearer ${state.token}` };
    },
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role?.name,
    fullName: (state) => `${state.user?.firstName} ${state.user?.lastName}`,
  },
  actions: {
    async signup(user: User) {
      try {
        const res = await $publicApi.post('/auth/local/register', {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          password: user.password,
        });
        if (res) {
          this.user = res.data.user;
          this.token = res.data.jwt;
          localStorage.setItem('jwt', res.data.jwt);
          this.onLoginSuccess();
        }
      } catch (error) {
        this.onLoginError(error as ApiError);
      }
    },
    async login(user: User) {
      try {
        const res = await $publicApi.post('/auth/local', {
          identifier: user.email,
          password: user.password,
        });
        if (res) {
          this.user = res.data.user;
          this.token = res.data.jwt;
          localStorage.setItem('jwt', res.data.jwt);
          this.onLoginSuccess();
        }
      } catch (error) {
        this.onLoginError(error as ApiError);
      }
    },
    async logout() {
      localStorage.clear();
      this.user = null;
      this.token = '';
      this.router.push({ path: '/' });
    },
    async onLoginSuccess() {
      Notify.create({
        type: 'positive',
        message: 'Login successful!',
      });
      this.fetchCurrentUser();
    },
    async onLoginError(error: ApiError) {
      Notify.create({
        type: 'negative',
        message: 'Unsuccessful login: ' + error?.response.data.error.message,
      });
    },
    async fetchCurrentUser() {
      try {
        const res = await $api.get('/users/me');
        if (res) {
          this.user = { ...this.user, ...res.data };
          this.router.push({ name: 'UserFeed', params: { id: this.user?.id } });
        }
      } catch (error) {
        this.onLoginError(error as ApiError);
      }
    },
  },
});
