<script setup lang="ts">
import { supabase } from './lib/supabaseClient'

const errorStore = useErrorStore()
const { activeError } = storeToRefs(useErrorStore())

onErrorCaptured(error => {
  errorStore.setError({ error })
})

onMounted(() => {
  useAuthStore().trackAuthChanges()
})
</script>

<template>
  <AdminLayout>
    <AppErrorPage v-if="activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name" />
        <template #fallback>
      
            <Icon icon="svg-spinners:bars-rotate-fade" />
   
        </template>
      </Suspense>
    </RouterView>
  </AdminLayout>
</template>
