import { createRouter, createWebHistory } from 'vue-router'

import Landing from '../pages/LandingPage.vue'
import Shop from '../pages/Shop.vue'
import About from '../pages/About.vue'
import FAQ from '../pages/FAQ.vue'
import Contact from '../pages/Contact.vue'

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/about', name: 'About', component: About },
  { path: '/faq', component: FAQ }, 
  { path: '/contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
