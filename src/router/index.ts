import { createRouter, createWebHistory  } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/newWindow',
    name: 'newWindow',
    component: () => import('@/views/newWindow/index.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})