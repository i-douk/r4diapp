<script setup lang="ts">
import {supabase} from '@/lib/supabaseClient';
import usersServer from '@/services/usersService'
console.log(supabase)

const fetchData = async () => {
  try {
    const response = await usersServer.getUsers(); 
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData()
console.log(fetchData()
)

</script>

<template>
   <main>
    <RouterView />
   </main>
</template>
