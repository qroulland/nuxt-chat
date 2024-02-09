<template>
  <div class="typing-zone">
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-comments"></i>
      </InputGroupAddon>
      <Textarea
        type="text"
        rows="1"
        v-model="state.new_message_content"
        @keypress.enter.prevent="
          sendMessage(state.new_message_content, pseudo, $route.params.id)
        "
      />
      <Button
        icon="pi pi-check"
        label="send"
        @click="
          sendMessage(state.new_message_content, pseudo, $route.params.id)
        "
      />
    </InputGroup>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app.js";
import { storeToRefs } from "pinia";

const emits = defineEmits(["new"]);

const appStore = useAppStore();

const { pseudo } = storeToRefs(appStore);

const state = reactive({
  new_message_content: null,
});

async function sendMessage(content, author_name, channel_id) {
  const resp = await $fetch("/api/messages", {
    method: "POST",
    body: {
      content,
      author_name,
      channel_id,
    },
  });

  emits("new", resp);

  state.new_message_content = null;
}
</script>
