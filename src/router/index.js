import { createRouter, createWebHistory } from 'vue-router'

// simple pages
// import Home from '../pages/Home.vue'
// import Shop from '../pages/Shop.vue'
// import Cart from '../pages/Cart.vue'

const routes = [
//   { path: '/', name: 'Home', component: Home },
//   { path: '/shop', name: 'Shop', component: Shop },
//   { path: '/cart', name: 'Cart', component: Cart },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
