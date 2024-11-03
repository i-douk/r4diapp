<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { h, ref } from 'vue';
import type { Tables } from '../../../database/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { RouterLink } from 'vue-router';

const subscriptions = ref<Tables<'subscriptions'>[] | null>(null);
const users = ref<Tables<'users'>[] | null>(null);
const podcasters = ref<Tables<'podcasters'>[] | null>(null);

interface SubscriptionsData {
    user_id: number;
    user_name: string;
    podcaster_id: number;
    podcaster_name: string;
    stipend: number;
    paid: boolean;
}

const subscriptinsDataToshow = ref<SubscriptionsData[] | null>(null);

(async () => {
    const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select();
    if (subscriptionsError) console.error(subscriptionsError);
    subscriptions.value = subscriptionsData;

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
})();

const columns: ColumnDef<SubscriptionsData>[] = [
    {
        accessorKey: 'user_name',
        header: () => h('div', { class: 'text-left' }, 'User Name'),
        cell: ({ row }) => h(RouterLink, { to: `/users/${row.original.user_id }` , class: 'text-left font-medium' }, () => row.getValue('user_name')),
    },
    {
        accessorKey: 'podcaster_name',
        header: () => h('div', { class: 'text-left' }, 'Podcaster Name'),
        cell: ({ row }) => h(RouterLink, { to: `/podcasters/${row.original.podcaster_id }` ,  class: 'text-left font-medium' },() => row.getValue('podcaster_name')),
    },
    {
        accessorKey: 'stipend',
        header: () => h('div', { class: 'text-center' }, 'Stipend'),
        cell: ({ row }) => {
            const stipend = row.getValue('stipend');
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(Number(stipend));
            return h('div', { class: 'text-center font-medium' }, formatted);
        },
    },
    {
        accessorKey: 'paid',
        header: () => h('div', { class: 'text-center' }, 'Paid'),
        cell: ({ row }) => h('div', { class: 'text-center' }, row.getValue('paid') ? 'Yes' : 'No'),
    },
];
</script>

<template>
    <DataTable :columns="columns" :data="subscriptinsDataToshow" />
</template>
