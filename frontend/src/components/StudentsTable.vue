<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Nome</th>
        <th class="text-left">Email</th>
        <th class="text-left">RA</th>
        <th class="text-left">CPF</th>
        <th class="text-center">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="student in students" :key="student.ra">
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.ra }}</td>
        <td>{{ student.cpf }}</td>
        <td class="text-center">
          <v-btn
            variant="text"
            size="small"
            icon="mdi-pencil"
            @click="
              () => {
                onEdit(student.id);
              }
            "
          />
          <v-btn
            variant="text"
            size="small"
            color="error"
            icon="mdi-delete"
            @click="
              () => {
                onDelete(student.id);
              }
            "
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
interface Student {
  id: string;
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

defineProps<{
  students: Student[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}>();
</script>
