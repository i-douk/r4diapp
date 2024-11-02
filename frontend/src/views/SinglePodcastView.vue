<script setup lang='ts'>
 import { useRoute } from 'vue-router'
 const route = useRoute()
</script>

<template>
        <h1>Podcast {{route.params?.id}}</h1>
        <RouterLink to="/">go back home</RouterLink>
</template>