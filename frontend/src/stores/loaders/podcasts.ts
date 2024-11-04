import { podcastsWithPodcastersQuery, type PodcastsWithPodcastersQuery } from "@/utils/supaQueries"
import { useMemoize } from "@vueuse/core"


export const usePodcastsStore = defineStore('podcasts-store' , () => {
    const podcasts = ref< PodcastsWithPodcastersQuery | null >(null)
    const loadPodcasts = useMemoize (async (key:string) => await podcastsWithPodcastersQuery)

    if(podcasts.value?.length) return

    const validateCache = () =>{
        
        if(podcasts.value?.length) {
            podcastsWithPodcastersQuery.then(({data}) =>{
              if(JSON.stringify(podcasts.value) === JSON.stringify(data)) {
                console.log('Cached and fresh Data matched')
                return
              } else {
                console.log('Something was added')
                //deletes cached Data
                loadPodcasts.delete('podcasts')
              }
            })
        }
    }

    const getPodcasts = async () => {

    const { data , error, status } = await loadPodcasts('podcasts')

    if (error) useErrorStore().setError({error , customCode: status})
    podcasts.value = data
    validateCache()
}
    return {
       podcasts,
       getPodcasts
    }
})