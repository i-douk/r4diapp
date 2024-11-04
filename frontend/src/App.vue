<script setup lang="ts">

const errorStore = useErrorStore()
const {activeError} = storeToRefs(useErrorStore())

onErrorCaptured((error)=> {
    errorStore.setError({error})
})

</script>

<template>
  <AdminLayout>

    <AppErrorPage v-if="activeError"/>
    <RouterView v-else v-slot="{Component , route}">
        <Suspense v-if="Component" :timeout="0"> 
          <Component :is="Component" :key="route.name"/>
           <template #fallback>
             <span> 
              ..................
              <Icon icon="svg-spinners:bars-rotate-fade" />
             </span>
           </template>
        </Suspense>
      </RouterView>
  </AdminLayout>
</template>