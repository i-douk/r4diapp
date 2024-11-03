<script setup lang="ts" >
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '../../../database/types';
import type { SubscriptionsData } from '@/utils/tableColumns/subscriptionsColumn';
import  { columns } from '@/utils/tableColumns/subscriptionsColumn';

const subscriptions = ref<Tables<'subscriptions'>[] | null>(null);
const users = ref<Tables<'users'>[] | null>(null);
const podcasters = ref<Tables<'podcasters'>[] | null>(null);

usePageStore().pageData.title = 'Subscriptions'

const subscriptinsDataToshow = ref<SubscriptionsData[] | null>(null);

const getSubscriptions = async () => {
    const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select();
    if (subscriptionsError) console.error(subscriptionsError);
    subscriptions.value = subscriptionsData;
    console.log(subscriptionsData)

    // Extract unique user_ids and podcaster_ids from subscriptions
    const userIds = [...new Set(subscriptionsData?.map(sub => sub.user_id))];
    const podcasterIds = [...new Set(subscriptionsData?.map(sub => sub.podcaster_id))];

    // Fetch users
    const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select()
        .in('id', userIds);
    if (usersError) console.error(usersError);
    users.value = usersData;

    // Fetch podcasters
    const { data: podcastersData, error: podcastersError } = await supabase
        .from('podcasters')
        .select()
        .in('id', podcasterIds);
    if (podcastersError) console.error(podcastersError);
    podcasters.value = podcastersData;

    // Populate subscriptinsDataToshow with user and podcaster names, stipend, and paid status
    subscriptinsDataToshow.value = subscriptionsData?.map(sub => {
        const user = usersData?.find(u => u.id === sub.user_id);
        const podcaster = podcastersData?.find(p => p.id === sub.podcaster_id);
        return {
            user_name: user?.name || 'Unknown',
            podcaster_name: podcaster?.name || 'Unknown',
            stipend: Number(sub.stipend),
            paid: sub.paid,
            user_id: sub.user_id,
            podcaster_id: sub.podcaster_id
        };
    }) || [];
}

await getSubscriptions()


</script>

<template>
    <DataTable :columns="columns" :data="subscriptinsDataToshow" />
</template>
