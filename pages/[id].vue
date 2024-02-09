<template>
  <div class="container">
    <Sidebar />
    <div class="main-wrapper">
      <div class="header">
        <Button icon="pi pi-arrow-left" @click="$router.push('/')" />
        <h1 v-text="channel.name" />
      </div>
      <div class="content-wrapper">
        <div class="messages-wrapper">
          <Message v-for="elt in state.messages" :key="elt._id" v-bind="elt" />
        </div>
      </div>
      <TypingZone @new="(e) => state.messages.unshift(e)" />
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app.js";
import { storeToRefs } from "pinia";

definePageMeta({
  middleware: defineNuxtRouteMiddleware(async (to, from) => {
    const appStore = useAppStore();

    const { channel } = storeToRefs(appStore);

    const channelData = await useFetch(`/api/channels/${to.params.id}`, {
      method: "GET",
    });

    if (channelData.error.value) {
      return navigateTo("/", { redirectCode: 301 });
    }

    channel.value = channelData.data.value;
  }),
});

const appStore = useAppStore();

const { channel } = storeToRefs(appStore);

const route = useRoute();

const state = reactive({
  messages: [],
});

await getChannelMessages();

async function getChannelMessages() {
  state.messages = await $fetch(`/api/messages/${route.params.id}`, {
    method: "GET",
  });

  state.messages = state.messages.reverse();
}
</script>
