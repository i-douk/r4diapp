<script setup lang='ts'>
import { podcastersWithPodcastsQuery, type PodcastersWithPodcastsQuery } from '@/utils/supaQueries';

usePageStore().pageData.title = 'Podcasters'

const podcasters = ref<PodcastersWithPodcastsQuery | null >(null)
const getPodcasters = async () => {
    const { data , error } = await podcastersWithPodcastsQuery
    if (error) console.log(error)
    podcasters.value = data
}
getPodcasters()

</script>

<template>
        <RouterLink to="/podcasters">go back to podcasters</RouterLink>
        <div class="grid grid-cols-3 gap-4">
          <Card v-for="podcaster in podcasters">
           <CardHeader>
             <CardTitle>{{ podcaster.name }}</CardTitle>
                <CardDescription>{{ podcaster.subscriptioncount }} subscriptions</CardDescription>
            </CardHeader>
              <CardContent> has posted <b>{{ podcaster.podcasts[0]? podcaster.podcasts[0].name : 'nothing yet' }}</b></CardContent>
              <CardFooter>
           <Button>
                <RouterLink :to="{ name:'/podcasters/[id]', params: { id: podcaster.id }}">See podcaster</RouterLink>
           </Button>
         </CardFooter>
        </Card>
        </div>       
</template>