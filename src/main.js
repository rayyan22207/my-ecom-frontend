// import { createApp } from 'vue'
// import App from './App.vue'
// import './assets/main.css'
// import 'flowbite'

// import { createPinia } from 'pinia'
// import router from './router'

// createApp(App).use(createPinia()).use(router).mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import './assets/main.css'

createApp(App)
  .use(router)
  .use(MotionPlugin)   // 👈 enables v-motion
  .mount('#app')
