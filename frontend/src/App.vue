<template>
  <v-app>
    <component :is="Layout">
      <router-view />
    </component>
  </v-app>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import PublicLayout from "@/layouts/public.vue";
import ProtectedLayout from "@/layouts/protected.vue";

const route = useRoute();

const Layout = computed(() =>
  route.name?.includes("login") ? PublicLayout : ProtectedLayout
);
</script>
