<template>
  <v-snackbar v-model="snackbarStore.show">
    {{ snackbarStore.textAlert }}

    <template #actions>
      <v-btn icon="mdi-close-thick" @click="snackbarStore.closeMessage" />
    </template>
  </v-snackbar>
  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from "@/stores/snackbar";

const snackbarStore = useSnackbarStore();
</script>
