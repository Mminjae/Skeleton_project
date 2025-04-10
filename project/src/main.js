<<<<<<< HEAD
import './assets/main.css'
=======
import './assets/css/main.css'
>>>>>>> 9aa4115306a7a0ff126984e760f8e2d0f1c75013
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
