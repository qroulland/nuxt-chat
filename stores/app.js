import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const pseudo = ref(Math.random().toString(36).substr(2, 6));

  const channel = ref(null);

  return {
    channel,
    pseudo,
  };
});
