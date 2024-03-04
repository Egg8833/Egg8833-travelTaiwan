import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createHead} from '@vueuse/head'
import './style.css'
import App from './App.vue'
import router from './router' // Import Vue Router
import 'virtual:uno.css'
import '@csstools/normalize.css'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router) // Use Vue Router
app.use(head)

app.mount('#app')
