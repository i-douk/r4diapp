<script setup lang='ts'>
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database/types'


usePageStore().pageData.title = 'Podcasts'

const podcasts = ref< Tables<'podcasts'>[] | null >(null)

const getPodcasts = async () => {
    const { data , error } = await supabase.from('podcasts').select()
    if (error) console.log(error)
    podcasts.value = data
}

getPodcasts()


</script>

<template>
        <h1>Podcasts</h1>
        <RouterLink to="/">go back home</RouterLink>
        <ul>
                <li v-for="podcast in podcasts" :key="podcast.id">{{ podcast.name }}</li>
        </ul>
</template>