<template>
  <div class="w-100 h-100 d-flex justify-center align-center">
    <v-card class="w-33 pa-8">
      <v-text-field v-model="login" label="Login" />
      <v-text-field v-model="password" label="Senha" type="password" />

      <div class="w-100 d-flex justify-end">
        <v-btn @click="handleLogin">Entrar</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { AxiosError } from "axios";
import { useRouter } from "vue-router";

import { api } from "@/services/axios";

import { useAuthStore } from "@/stores/auth";
import { useSnackbarStore } from "@/stores/snackbar";

export default {
  beforeRouteEnter(to, from, next) {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated) next("/students");
    else next();
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const snackbarStore = useSnackbarStore();

    const login = ref("");
    const password = ref("");

    const handleLogin = async () => {
      try {
        const response = await api.post("/user/signin", {
          login: login.value,
          password: password.value,
        });

        authStore.saveAuthStorage(response.data.user, response.data.token);

        return router.push("/students");
      } catch (error) {
        if (error instanceof AxiosError)
          if (error.status === 400)
            return snackbarStore.alertMessage("Login ou senha inválidos");

        return snackbarStore.alertMessage(
          "Algo deu errado, tente de novo mais tarde"
        );
      }
    };

    return { login, password, handleLogin };
  },
};
</script>
