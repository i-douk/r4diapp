<script setup lang='ts'>
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database/types'

usePageStore().pageData.title = 'Podcasters'

const podcasters = ref< Tables<'podcasters'>[] | null >(null)
const getPodcasters = async () => {
    const { data , error } = await supabase.from('podcasters').select()
    if (error) console.log(error)
    podcasters.value = data
}

getPodcasters()


</script>

<template>
        <h1>Podcasters</h1>
        <RouterLink to="/">go back home</RouterLink>
        <ul>
                <li v-for="podcaster in podcasters" :key="podcaster.id">
                        {{ podcaster.name }}
                </li>
        </ul>
</template>