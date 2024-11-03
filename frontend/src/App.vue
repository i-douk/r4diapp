<script setup lang="ts">
</script>

<template>
  <AdminLayout>
    <RouterView v-slot="{Component , route}">
        <Suspense v-if="Component" :timeout="0"> 
          <Component :is="Component" :key="route.name"/>
           <template #fallback>
             <span> 
              ..................
              <!-- <Icon icon="svg-spinners:bars-rotate-fade" /> -->
             </span>
           </template>
        </Suspense>
      </RouterView>
  </AdminLayout>
</template>