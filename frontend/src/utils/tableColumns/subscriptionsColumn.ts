import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

export interface SubscriptionsData {
  user_id: number
  user_name: string
  podcaster_id: number
  podcaster_name: string
  stipend: number
  paid: boolean
}

export const columns: ColumnDef<SubscriptionsData>[] = [
  {
    accessorKey: 'user_name',
    header: () => h('div', { class: 'text-left' }, 'User Name'),
    cell: ({ row }) =>
      h(
        RouterLink,
        {
          to: `/users/${row.original.user_id}`,
          class: 'text-left font-medium',
        },
        () => row.getValue('user_name'),
      ),
  },
  {
    accessorKey: 'podcaster_name',
    header: () => h('div', { class: 'text-left' }, 'Podcaster Name'),
    cell: ({ row }) =>
      h(
        RouterLink,
        {
          to: `/podcasters/${row.original.podcaster_id}`,
          class: 'text-left font-medium',
        },
        () => row.getValue('podcaster_name'),
      ),
  },
  {
    accessorKey: 'stipend',
    header: () => h('div', { class: 'text-center' }, 'Stipend'),
    cell: ({ row }) => {
      const stipend = row.getValue('stipend')
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(Number(stipend))
      return h('div', { class: 'text-center font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'paid',
    header: () => h('div', { class: 'text-center' }, 'Paid'),
    cell: ({ row }) =>
      h('div', { class: 'text-center' }, row.getValue('paid') ? 'Yes' : 'No'),
  },
]
