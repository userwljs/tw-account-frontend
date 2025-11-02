import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style.css'
import { DefaultApi, Configuration } from '../sdk'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { useDark } from '@vueuse/core'

useDark()

const config = new Configuration({ basePath: '/api' })

export const api = new DefaultApi(config)

const app = createApp(App)

app.use(router)

app.mount('#app')
