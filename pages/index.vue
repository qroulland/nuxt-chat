<template>
  <div class="container">
    <h1>Welcome {{ pseudo }} 👋🏻</h1>
    <h3>Create a channel</h3>
    <div class="input-group">
      <InputText
        type="text"
        placeholder="Channel name"
        v-model="data.channel_name"
      />
      <Button :disabled="!data.channel_name" @click="createChannel(data.channel_name)">
        Create my channel!
      </Button>
    </div>
    <p v-if="data.error" v-text="data.error" />
    <Divider />
    <h3>Choose a channel</h3>
    <div v-for="channel in data.channels" :key="channel.id">
      <RouterLink :to="{ name: 'id', params: { id: channel.id } }">{{
        channel.name
      }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app.js";
import { storeToRefs } from "pinia";

const appStore = useAppStore();

const { channel, pseudo } = storeToRefs(appStore);

const router = useRouter();

const data = reactive({
  user_name: null,
  channel_name: null,
  channels: [],
  error: null,
});

data.channels = await $fetch(`/api/channels`, {
  method: "GET",
});

async function createChannel(name) {
  channel.value = await $fetch("/api/channels", {
    method: "POST",
    body: {
      name,
    },
  }).catch((err) => {
    data.error = err.data.message;
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
