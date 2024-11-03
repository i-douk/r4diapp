<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from 'database/types';

const route = useRoute();

const podcaster = ref<Tables<'podcasters'> | null>(null);

const getPodcaster = async () => {
    const { data, error } = await supabase
        .from('podcasters')
        .select('*') // Select all columns or specify specific ones, e.g., 'id, name'
        .eq('id', route.params?.id); 
    if (error) {
        console.error(error);
    } else {
        // we expect only one result because ids are unique
        podcaster.value = data ? data[0] : null; 
    }
};

getPodcaster()
</script>

<template>
    <h1>Single Podcaster Page : {{ podcaster?.name }}</h1>
    <div>{{ podcaster?.username }}</div>
    <RouterLink to="/">Go back home</RouterLink>
</template>
