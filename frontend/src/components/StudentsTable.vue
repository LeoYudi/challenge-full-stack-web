<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Nome</th>
        <th class="text-left">Email</th>
        <th class="text-left">RA</th>
        <th class="text-left">CPF</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="student in students" :key="student.ra">
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.ra }}</td>
        <td>{{ student.cpf }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

interface Student {
  id: string;
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

defineProps<{ students: Student[] }>();
</script>
