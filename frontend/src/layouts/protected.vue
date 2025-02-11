<template>
  <v-snackbar v-model="snackbarStore.show">
    {{ snackbarStore.textAlert }}

    <template #actions>
      <v-btn icon="mdi-close-thick" @click="snackbarStore.closeMessage" />
    </template>
  </v-snackbar>
  <v-main>
    <v-app-bar>
      <div class="pa-3 w-100 h-100">
        <v-img :src="Logo" />
      </div>
    </v-app-bar>

    <v-navigation-drawer style="box-sizing: border-box">
      <v-list-item class="bg-grey-darken-2">
        <v-list-item-title class="text-h5">Módulo Acadêmico</v-list-item-title>
      </v-list-item>
      <v-list-item
        to="/students"
        link
        active-class="bg-grey-lighten-2"
        title="Alunos"
      />
      <v-list-item link title="Usuários" />
    </v-navigation-drawer>

    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import Logo from "@/assets/grupo-a.png";
import { useSnackbarStore } from "@/stores/snackbar";

const snackbarStore = useSnackbarStore();
</script>
