import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token") || "";

    return {
      user: user ? JSON.parse(user) : "",
      token,
    };
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    saveAuthStorage(
      userData: { id: string; login: string },
      authToken: string
    ) {
      this.user = userData;
      this.token = authToken;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", authToken);
    },

    resetStorage() {
      this.user = "";
      this.token = "";

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
