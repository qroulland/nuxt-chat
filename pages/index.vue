<template>
  <div class="container">
    <h1>Welcome {{ pseudo }} 👋🏻</h1>
    <h3>Create a channel</h3>
    <div class="input-group">
      <InputText
        type="text"
        placeholder="Channel name"
        v-model="state.channel_name"
      />
      <Button
        :disabled="!state.channel_name"
        @click="createChannel(state.channel_name)"
      >
        Create my channel!
      </Button>
    </div>
    <p v-if="state.error" v-text="state.error" />
    <template v-if="state.channels.length">
      <Divider />
      <h3>Choose a channel</h3>
      <div v-for="channel in state.channels" :key="channel.id">
        <RouterLink :to="{ name: 'id', params: { id: channel.id } }">{{
          channel.name
        }}</RouterLink>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app.js";
import { storeToRefs } from "pinia";

const appStore = useAppStore();

const { channel, pseudo } = storeToRefs(appStore);

const router = useRouter();

const state = reactive({
  user_name: null,
  channel_name: null,
  channels: [],
  error: null,
});

state.channels = await $fetch(`/api/channels`, {
  method: "GET",
});

async function createChannel(name) {
  channel.value = await $fetch("/api/channels", {
    method: "POST",
    body: {
      name,
    },
  }).catch((err) => {
    state.error = err.data.message;
  });

  router.push({ name: "id", params: { id: channel.value.id } });
}
</script>

<style lang="css" scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;

  button {
    justify-content: center;
  }
}
</style>
