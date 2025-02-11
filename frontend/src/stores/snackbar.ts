import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    textAlert: "",
    show: false,
  }),

  actions: {
    alertMessage(text: string) {
      this.textAlert = text;
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, 5000);
    },

    closeMessage() {
      this.show = false;
    },
  },
});
