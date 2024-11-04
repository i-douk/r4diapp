import { supabase } from "@/lib/supabaseClient";
import type { QueryData } from "@supabase/supabase-js";
export const podcastersWithPodcastsQuery = supabase.from('podcasters')
    .select(`
      *,
       podcasts (
       id,
       name,
       urls
       )
    `)
export type PodcastersWithPodcastsQuery = QueryData<typeof podcastersWithPodcastsQuery>

export const podcastsWithPodcastersQuery = supabase.from('podcasts')
.select(`
    *,
     podcasters (
     id,
     name
     )
  `)

  export type PodcastsWithPodcastersQuery = QueryData<typeof podcastsWithPodcastersQuery>

  export const podcastQuery = (id: string) => supabase.from('podcasts')
      .select('*')
      .eq('id', Number(id))
      .single()


  export type PodcastQuery = QueryData<ReturnType<typeof podcastQuery>>