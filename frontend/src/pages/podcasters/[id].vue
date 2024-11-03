<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from 'database/types';

const route = useRoute('/podcasters/[id]');


const podcaster = ref<Tables<'podcasters'> | null>(null);

const podcasterQuery = supabase
        .from('podcasters')
        .select('*')
        .eq('id', route.params?.id); 

const getPodcaster = async () => {
    const { data, error } = await podcasterQuery
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
    <h1>Single Podcaster Page for : {{ podcaster?.name }}</h1>
    <div>{{ podcaster?.username }}</div>
    <RouterLink to="/">Go back home</RouterLink>
</template>
