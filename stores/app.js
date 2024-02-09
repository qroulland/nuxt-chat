import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const pseudo = ref(Math.random().toString(36).substr(2, 12));

  const channel = ref(null);

  const users_connected = ref(["Tommy", "Laureen", "Pam"]);

  return {
    channel,
    pseudo,
    users_connected,
  };
});
