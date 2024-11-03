<script setup lang="ts">
import { useRoute } from 'vue-router';
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from 'database/types';
import { ref, onMounted } from 'vue';

const route = useRoute();
const podcaster = ref<Tables<'podcasters'> | null>(null);

onMounted(async () => {
    const { data, error } = await supabase
        .from('podcasters')
        .select('*') // Select all columns or specify specific ones, e.g., 'id, name'
        .eq('id', route.params?.id); 
    if (error) {
        console.error(error);
    } else {
        // Assuming we expect only one result
        podcaster.value = data ? data[0] : null; 
    }
});
</script>

<template>
    <h1>Single Podcaster Page : {{ podcaster?.name }}</h1>
    <div>{{ podcaster?.username }}</div>
    <RouterLink to="/">Go back home</RouterLink>
</template>
