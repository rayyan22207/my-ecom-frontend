import { createRouter, createWebHistory } from 'vue-router'

import Landing from '../pages/LandingPage.vue'

const routes = [
  { path: '/', name: 'Landing', component: Landing },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
