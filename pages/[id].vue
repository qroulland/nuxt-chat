<template>
  <div class="container">
    <div class="sidebar">
      <div class="sidebar-title">
        Utilisateurs ({{ channel.users_connected + 1 }})
      </div>
      <div class="users-wrapper">
        <div class="user-container">
          <Avatar :image="`https://robohash.org/${author_name}`" shape="circle" />
          <InputText
            v-if="data.editing"
            placeholder="DenisMaurice14"
            v-model="pseudo"
          />
          <span v-else>{{ pseudo }} (Me)</span>
          <Button
            :icon="data.editing ? 'pi pi-check' : 'pi pi-pencil'"
            rounded
            outlined
            @click="data.editing = !data.editing"
          />
        </div>
        <div v-for="user in channel.users_connected" class="user-container">
          <Avatar image="https://robohash.org/1" shape="circle" />
          <span v-text="user" />
          <Button icon="pi pi-times" severity="danger" rounded outlined />
        </div>
      </div>
      <div class="sidebar-footer">
        <Button
          icon="pi pi-arrow-left"
          label="Back"
          @click="$router.push('/')"
        />
      </div>
    </div>
    <div class="main-wrapper">
      <div class="header">
        <Button
          icon="pi pi-arrow-left"
          @click="$router.push('/')"
        />
        <h1 v-text="channel.name" />
      </div>
      <div class="content-wrapper">
        <div class="messages-wrapper">
          <Message v-for="elt in data.messages" :key="elt._id" v-bind="elt" />
        </div>
      </div>
      <div class="footer">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-comments"></i>
          </InputGroupAddon>
          <Textarea
            type="text"
            rows="1"
            v-model="data.new_message_content"
            @keypress.enter.prevent="
              sendMessage(data.new_message_content, pseudo, $route.params.id)
            "
          />
          <Button
            icon="pi pi-check"
            label="send"
            @click="
              sendMessage(data.new_message_content, pseudo, $route.params.id)
            "
          />
        </InputGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app.js";
import { storeToRefs } from "pinia";

const appStore = useAppStore();

const { channel, pseudo } = storeToRefs(appStore);

definePageMeta({
  middleware: defineNuxtRouteMiddleware(async (to, from) => {
    const appStore = useAppStore();

    const { channel } = storeToRefs(appStore);

    const resp = await useFetch(`/api/channels/${to.params.id}`, {
      method: "GET",
    });

    channel.value = resp.data.value;

    if (resp.error.value) {
      return navigateTo("/", { redirectCode: 301 });
    }
  }),
});

const route = useRoute();

const data = reactive({
  new_message_content: null,
  messages: [],
  error: null,
});

await getChannelMessages();

async function sendMessage(content, author_name, channel_id) {
  const resp = await $fetch("/api/messages", {
    method: "POST",
    body: {
      content,
      author_name,
      channel_id,
    },
  }).catch((err) => {
    data.error = err.data.message;
  });

  data.messages.unshift(resp);

  data.new_message_content = null;
}

async function getChannelMessages() {
  try {
    data.messages = await $fetch(`/api/messages/${route.params.id}`, {
      method: "GET",
    });

    data.messages = data.messages.reverse();
  } catch (err) {
    data.error = err.data.message;
  }
}

onBeforeUnmount(() => {
  channel.value = null;
});
</script>
