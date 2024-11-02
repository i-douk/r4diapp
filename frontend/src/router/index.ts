import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { h } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/podcasts',
      name: 'podcasts',
      component: () => import('@/views/PodcastsView.vue')
    },
    {
      path: '/podcasts/:id',
      name: 'single-podcast',
      component: () => import('@/views/SinglePodcastView.vue')
    },
    {
      path: '/:catchAll(.*)*',
      name: 'Not-found',
      component: h('p', { style : 'color:red;'}, '404 Page Not Found' )
    },
    
  ]
})

export default router
