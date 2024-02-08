<template>
  <div id="app-layout">
    <NuxtLoadingIndicator
      color="var(--primary-color)"
      :height="2"
    />
    <main :id="route.name">
      <slot />
    </main>
  </div>
</template>

<script setup>
const route = useRoute();
</script>
