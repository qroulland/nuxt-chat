<template>
  <Card class="card-message">
    <template #title>{{ author_name }}</template>
    <template #content>
      <p v-text="content" />
    </template>
    <template #footer>
      {{ created_at }}
    </template>
  </Card>
</template>

<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
});
</script>
