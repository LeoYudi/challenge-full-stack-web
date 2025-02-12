<template>
  <PageTitle title="Cadastro de Aluno" />

  <div class="pa-6">
    <v-container>
      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="form.name"
              label="Nome"
              :rules="[required]"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.email"
              label="E-mail"
              :rules="[required, emailValidation]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="form.ra"
              label="RA"
              :disabled="!!query.id"
              :rules="[required]"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.cpf"
              label="CPF"
              :disabled="!!query.id"
              :rules="[required, cpfValidation]"
            />
          </v-col>
        </v-row>

        <div class="d-flex justify-end ga-5">
          <v-btn color="error" @click="handleCancel">Cancelar</v-btn>
          <v-btn type="submit" color="success">Salvar</v-btn>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useSnackbarStore } from "@/stores/snackbar";

import { required, emailValidation, cpfValidation } from "@/utils/validations";

import { api } from "@/services/axios";
import { AxiosError } from "axios";

const router = useRouter();
const authStore = useAuthStore();
const snackbarStore = useSnackbarStore();

const route = useRoute();
const query = route.query;

const form = ref({
  name: "",
  email: "",
  ra: "",
  cpf: "",
});

watchEffect(async () => {
  if (query.id) {
    try {
      const response = await api.get(`/student/${query.id}`);
      form.value = {
        name: response.data.student.name,
        email: response.data.student.email,
        ra: response.data.student.ra,
        cpf: response.data.student.cpf,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          authStore.resetStorage();
          return router.push("/login");
        }

        if (error.status === 404)
          return snackbarStore.alertMessage("Aluno não encontrado");
      }

      snackbarStore.alertMessage("Algo deu errado, tente de novo mais tarde");
    }
  }
});

const submitForm = async () => {
  try {
    let response;

    if (query.id)
      response = await api.patch(`/student/${query.id}`, form.value);
    else response = await api.post("/student/create", form.value);

    snackbarStore.alertMessage(
      `Estudante "${response.data.student.name}" salvo`
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        authStore.resetStorage();
        return router.push("/login");
      }

      if (error.status === 404)
        return snackbarStore.alertMessage("Aluno não encontrado");
    }

    snackbarStore.alertMessage("Algo deu errado, tente de novo mais tarde");
  }
};

const handleCancel = () => {
  router.push("/students");
};
</script>
