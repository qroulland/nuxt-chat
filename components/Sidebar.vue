<template>
  <div class="sidebar">
    <div class="sidebar-title">
      Utilisateurs ({{ users_connected.length + 1 }})
    </div>
    <div class="users-wrapper">
      <div class="user-container">
        <Avatar :image="`https://robohash.org/${pseudo}`" shape="circle" />
        <InputText
          v-if="state.editing"
          placeholder="DenisMaurice14"
          v-model="pseudo"
        />
        <span v-else>{{ pseudo }} (Me)</span>
        <Button
          :icon="state.editing ? 'pi pi-check' : 'pi pi-pencil'"
          rounded
          outlined
          @click="state.editing = !state.editing"
        />
      </div>
      <div v-for="user in users_connected" class="user-container">
        <Avatar :image="`https://robohash.org/${user}`" shape="circle" />
        <span v-text="user" />
        <Button
          icon="pi pi-times"
          severity="danger"
          rounded
          outlined
          @click="kickUser(user)"
        />
      </div>
    </div>
    <div class="sidebar-footer">
      <Button icon="pi pi-arrow-left" label="Back" @click="$router.push('/')" />
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app.js";
import { storeToRefs } from "pinia";

const appStore = useAppStore();

const { pseudo, users_connected } = storeToRefs(appStore);

const state = reactive({
  editing: false,
})

function kickUser(user) {
  const index = users_connected.value.findIndex((elt) => elt === user);

  users_connected.value.splice(index, 1);
}
</script>
