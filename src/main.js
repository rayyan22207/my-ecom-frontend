import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import 'flowbite'

import { createPinia } from 'pinia'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
