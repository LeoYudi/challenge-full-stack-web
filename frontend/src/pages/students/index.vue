<template>
  <PageTitle title="Consulta de Alunos" />

  <div class="d-flex mb-5">
    <v-btn @click="handleCreate">Cadastrar Aluno</v-btn>
  </div>

  <div>
    <StudentsTable :students="students" :onDelete="handleDelete" />
  </div>

  <ConfirmDialog
    :show="showDialog"
    title="Deletar aluno"
    text="Tem certeza que deseja deletar este aluno?"
    :onClose="handleClose"
    :onConfirm="handleConfirm"
  />
</template>

<script lang="ts" setup>
import { AxiosError } from "axios";
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

const showDialog = ref(false);
const selectedStudent = ref("");

watchEffect(async () => {
  try {
    const response = await api.get(
      `/student?page=${page.value}&perPage=${perPage.value}`
    );

    students.value = response.data.students;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        authStore.resetStorage();
        return router.push("/login");
      }
    }

    snackbarStore.alertMessage("Algo deu errado, tente de novo mais tarde");
  }
});

const handleCreate = () => {
  router.push("/students/save");
};

const handleDelete = async (id: string) => {
  selectedStudent.value = id;
  showDialog.value = true;
};

const handleConfirm = async () => {
  try {
    await api.delete(`/student/${selectedStudent.value}`);

    snackbarStore.alertMessage("Aluno deletado");
    showDialog.value = false;

    const response = await api.get(
      `/student?page=${page.value}&perPage=${perPage.value}`
    );

    students.value = response.data.students;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        authStore.resetStorage();
        return router.push("/login");
      }
    }

    snackbarStore.alertMessage("Algo deu errado, tente de novo mais tarde");
  }
};

const handleClose = () => {
  showDialog.value = false;
  selectedStudent.value = "";
};
</script>
