<script setup lang='ts'>
import { podcastsWithPodcastersQuery, type PodcastsWithPodcastersQuery } from '@/utils/supaQueries';

usePageStore().pageData.title = 'Podcasts'

const podcasts = ref< PodcastsWithPodcastersQuery | null >(null)


const getPodcasts = async () => {
    const { data , error } = await podcastsWithPodcastersQuery
    if (error) console.log(error)
    podcasts.value = data
}

getPodcasts()

</script>

<template>
     <RouterLink to="/podcasts">go back to podcasts</RouterLink>
     <div class="grid grid-cols-3 gap-4">
             <Card v-for="podcast in podcasts">
                <CardHeader>
                  <CardTitle>{{ podcast.name }}</CardTitle>
                     <CardDescription>{{ podcast.followcount }} subscriptions</CardDescription>
                </CardHeader>
                 <CardContent> was posted by <b>{{ podcast.podcasters? podcast.podcasters.name : '' }}</b></CardContent>
               <CardFooter>
                <Button>
                     <RouterLink :to="{ name:'/podcasters/[id]', params: { id: podcast.id }}">See podcast</RouterLink>
                </Button>
              </CardFooter>
             </Card>  
     </div>
</template>