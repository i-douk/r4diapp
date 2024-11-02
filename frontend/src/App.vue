<script setup lang="ts">
import { ref, onMounted } from 'vue';
import usersService from '@/services/usersService';

// Define a reactive variable for storing the users list
const users = ref([]);

// Fetch users data on component mount
const fetchUsers = async () => {
  try {
    const response = await usersService.getUsers();
    users.value = response.data;
    console.log(response)
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Fetch data when component is mounted
onMounted(fetchUsers);
</script>

<template>
   <main>
    <RouterView />
   </main>
</template>
