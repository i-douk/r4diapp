import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  await authStore.getSession()
  const isAuthPage = !['/login', '/register'].includes(to.path)
  // !['/login' , '/register'].includes(to.path) is equivalen to to.path !== '/login' && to.path !== '/register'
  if (!authStore.user && to.path !== '/login' && to.path !== '/register') {
    return {
      name: '/login',
    }
  }
  if (authStore.user && !isAuthPage) {
    return {
      name: '/',
    }
  }
})

export default router
