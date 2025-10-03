import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: 'dashboard' },
    { path: '/dashboard', name: 'dashboard', component: () => import('@/views/DashboardPage.vue') },
    { path: '/login', name: 'login', component: () => import('@/views/LoginPage.vue') },
    { path: '/register', name: 'register', component: () => import('@/views/RegisterPage.vue') },
  ],
})

export default router
