import { podcastsWithPodcastersQuery, type PodcastsWithPodcastersQuery } from "@/utils/supaQueries"

export const usePodcastsStore = defineStore('podcasts-store' , () => {
    const podcasts = ref< PodcastsWithPodcastersQuery | null >(null)
    if(podcasts.value?.length) return
    const getPodcasts = async () => {
    const { data , error, status } = await podcastsWithPodcastersQuery
    if (error) useErrorStore().setError({error , customCode: status})
    podcasts.value = data
}
    return {
       podcasts,
       getPodcasts
    }
})