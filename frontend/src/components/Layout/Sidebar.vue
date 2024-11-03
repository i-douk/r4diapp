<script setup lang='ts'>
import SideBarLinks from './SideBarLinks.vue';
import Button from '../ui/button/Button.vue';
const userlinks = [
  {
    title: "Home",
    to:"/",
    icon:"pixelarticons:home"
  },
  {
    title: "Podcasts",
    to:"/podcasts",
    icon:"pixelarticons:headphone"
  },
  {
    title: "Podcasters",
    to:"/podcasters",
    icon:"pixelarticons:radio-tower"
  },
  {
    title: "Subscriptions",
    to:"/subscriptions",
    icon:"pixelarticons:heart"
  },
  {
    title: "followings",
    to:"/followings",
    icon:"pixelarticons:visible"
  },
]

const userAccountLinks = [
  {
     title: "Account",
    to:"/myaccount",
    icon:"pixelarticons:user"
  },
  {
     title: "Settings",
    to:"/settings",
    icon:"pixelarticons:sliders"
  },
  {
     title: "Logout",
    to:"/logout",
    icon:"pixelarticons:logout"
  },
]
</script>

<template>
      <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SideBarLinks :links="userlinks" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SideBarLinks :links="userAccountLinks" />
      </div>
    </nav>
  </aside>
</template>