<script setup lang="ts"></script>

<template>
        <div>
            <h1>Home Page</h1>
            <RouterLink :to="{ name:'/podcasts/[id]', params: { id:1 }}">Go to podcast 1</RouterLink>
        </div>
</template>