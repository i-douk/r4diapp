<script setup lang="ts">
import { podcastQuery, type PodcastQuery } from '@/utils/supaQueries'

const route = useRoute('/podcasts/[id]')
const podcast = ref<PodcastQuery | null>(null)

watch(
  () => podcast.value?.name,
  () => {
    usePageStore().pageData.title = `Podcast : ${podcast.value?.name || ''}`
  },
)

const routeId = route.params.id

const getPodcast = async () => {
  const { data, error, status } = await podcastQuery(routeId)
  if (error) useErrorStore().setError({ error, customCode: status })
  podcast.value = data
}

await getPodcast()

// Computed property to calculate the time difference
const timeSinceUpdated = computed(() => {
  if (!podcast.value?.updated_at) return ''

  const updatedAt = new Date(podcast.value.updated_at)
  const now = new Date()
  const diffInSeconds = (now.getTime() - updatedAt.getTime()) / 1000

  const days = Math.floor(diffInSeconds / (60 * 60 * 24))
  if (days > 0) return `${days} days ago`

  const hours = Math.floor(diffInSeconds / (60 * 60))
  if (hours > 0) return `${hours} hours ago`

  const minutes = Math.floor(diffInSeconds / 60)
  return `${minutes} minutes ago`
})
</script>

<template>
  <Table>
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> Lorem ipsum dolor sit amet. </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ podcast?.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Followers </TableHead>
      <TableCell>{{ podcast?.followcount }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Followers </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="n in 5"
            :key="n"
          >
            <RouterLink
              class="w-full h-full flex items-center justify-center"
              to=""
            >
              <AvatarImage src="" alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section
    v-if="podcast"
    class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow"
  >
    <div class="flex-1">
      <h2>Episodes</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Transcribed </TableHead>
              <TableHead> Last Updated </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <!-- this is supposed to hold the episodes , keep hard coded now-->
            <TableRow v-for="n in 5" :key="n">
              <TableCell> {{ podcast?.name }} </TableCell>
              <TableCell> {{ podcast?.transcribed ? 'Yes' : 'No' }} </TableCell>
              <TableCell> {{ timeSinceUpdated }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>External Links</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Platform </TableHead>
              <TableHead> Synched </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> No </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </section>
</template>

<style>
th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
