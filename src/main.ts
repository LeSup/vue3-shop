import './assets/styles/index.css'
import 'vant/lib/index.css'

import 'lib-flexible/flexible'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
  .use(router)
  .mount('#app')
