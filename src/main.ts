import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style.css'
import { DefaultApi, Configuration } from '../sdk'

const config = new Configuration({ basePath: 'http://127.0.0.1:8000' })

export const api = new DefaultApi(config)

const app = createApp(App)

app.use(router)

app.mount('#app')
