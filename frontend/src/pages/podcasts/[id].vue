<script setup lang='ts'>
import { podcastQuery, type PodcastQuery } from '@/utils/supaQueries';

 const route = useRoute('/podcasts/[id]')
 const podcast = ref<PodcastQuery | null >(null)

 const routeId = route.params.id

const getPodcast = async () => {
   const { data, error } = await podcastQuery(routeId)
    if (error) console.error(error)
        podcast.value = data
        console.log(podcast)   
}

 getPodcast()

</script>

<template>
        <h1>Podcast {{podcast?.name}}</h1>
        <RouterLink to="/">go back home</RouterLink>
</template>
