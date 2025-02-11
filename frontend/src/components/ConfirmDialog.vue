<template>
  <v-dialog
    width="auto"
    :model-value="show"
    @update:model-value="handleDialogClose"
  >
    <v-card
      max-width="400"
      prepend-icon="mdi-delete"
      :text="text"
      :title="title"
    >
      <template #actions>
        <div class="w-100 d-flex justify-space-evenly">
          <v-btn variant="flat" color="grey-lighten-2" @click="onClose">
            Não
          </v-btn>
          <v-btn variant="flat" color="error" @click="onConfirm">Sim</v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps<{
  show: boolean;
  title: string;
  text: string;
  onClose: () => void;
  onConfirm: () => void;
}>();

const handleDialogClose = (newValue: boolean) => {
  if (!newValue) {
    props.onClose();
  }
};
</script>
