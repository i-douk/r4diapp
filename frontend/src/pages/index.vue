<script setup lang="ts">
usePageStore().pageData.title = 'HomePage'
</script>

<template>
  <div>
    <RouterLink :to="{ name: '/podcasts/[id]', params: { id: 1 } }"
      >Go to podcast 1</RouterLink
    >
  </div>
</template>
