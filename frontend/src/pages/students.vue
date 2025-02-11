<template>
  <div class="d-flex mb-5">
    <v-btn>Cadastrar Aluno</v-btn>
  </div>

  <div>
    <StudentsTable :students="students" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useSnackbarStore } from "@/stores/snackbar";

import { api } from "@/services/axios";

const router = useRouter();
const authStore = useAuthStore();
const snackbarStore = useSnackbarStore();

const page = ref(1);
const perPage = ref(10);
const students = ref([]);

watchEffect(async () => {
  try {
    const response = await api.get(
      `/student?page=${page.value}&perPage=${perPage.value}`
    );

    students.value = response.data.students;
  } catch (error) {
    if (error.status === 401) {
      authStore.resetStorage();
      return router.push("/login");
    }

    snackbarStore.alertMessage("Algo deu errado, tente de novo mais tarde");
  }
});
</script>
