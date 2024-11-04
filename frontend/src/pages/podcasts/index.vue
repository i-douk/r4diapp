<script setup lang='ts'>

usePageStore().pageData.title = 'Podcasts'

const podcastsLoader = usePodcastsStore()
const {podcasts} = storeToRefs(podcastsLoader)
const { getPodcasts} = podcastsLoader
await getPodcasts()

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
                     <RouterLink :to="{ name:'/podcasts/[id]', params: { id: podcast.id }}">See podcast</RouterLink>
                </Button>
              </CardFooter>
             </Card>  
     </div>
</template>