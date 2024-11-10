<script setup lang="ts">
import AppErrorPage from '@/components/AppError/AppErrorPage.vue'
</script>
useErrorstore().setError({ error : 'Page not found' , customCode: 404 })
<template>
  <AppErrorPage />
</template>
