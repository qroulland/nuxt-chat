<template>
  <Card class="card-message">
    <template #title>
      <div class="user-container">
        <Avatar :image="`https://robohash.org/${author_name}`" shape="circle" />
        {{ author_name }}
      </div>
    </template>
    <template #content>
      <p v-text="content" />
    </template>
    <template #footer>
      {{ formated_date }}
    </template>
  </Card>
</template>

<script setup>
const formated_date = computed(() => {
  const date = new Date(props.created_at);

  return `${date.getHours() < 10 ? "0" : ""}${date.getHours()}h${
    date.getMinutes() < 10 ? "0" : ""
  }${date.getMinutes()} - ${date.toLocaleDateString("fr")}`;
});

const props = defineProps({
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
