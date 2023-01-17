import { defineStore } from "pinia";
import { $publicApi, $api } from "src/boot/axios";
import { Notify } from "quasar";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    serverFallback: "http://localhost:1337",
    returnUrl: null,
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
    async signup({
      firstName,
      lastName,
      username,
      email,
      password,
    }) {
      try {
        const res = await $publicApi.post("/api/auth/local/register", {
          firstName,
          lastName,
          username,
          email,
          password,
        });
        if (res) {
          this.user = res.data.user;
          this.token = res.data.jwt;
          localStorage.setItem("jwt", res.data.jwt);
          this.onLoginSuccess();
        }
      } catch (err) {
        this.onLoginError(err);
      }
    },
    async login({ identifier, password }) {
      try {
        const res = await $publicApi.post("/api/auth/local", {
          identifier,
          password,
        });
        if (res) {
          this.user = res.data.user;
          this.token = res.data.jwt;
          localStorage.setItem("jwt", res.data.jwt);
          this.onLoginSuccess();
        }
      } catch (err) {
        this.onLoginError(err);
      }
    },
    async logout() {
      localStorage.clear();
      this.user = null;
      this.router.push({ path: "/" });
    },
    async onLoginSuccess() {
      Notify.create({
        type: "positive",
        message: "Login successful!",
      });
      this.fetchCurrentUser();
    },
    async onLoginError(err) {
      Notify.create({
        type: "negative",
        message: "Unsuccessful login: " + err?.response.data.error.message,
      });
    },
    async fetchCurrentUser() {
      try {
        const res = await $api.get("/api/users/me");
        if (res) {
          this.user = { ...this.user, ...res.data };
          this.router.push({ name: 'UserFeed', params: { id: this.user.id } });
        }
      } catch (err) {
        this.onLoginError(err);
      }
    },
  },
});
