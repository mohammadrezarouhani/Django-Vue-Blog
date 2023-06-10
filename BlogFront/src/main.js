import './assets/main.css'
import routers from './routers'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App);
const pinia =createPinia()

app.use (pinia)
app.use(routers)
app.mount('#app')
