import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from "./router/index.js";
import "./global.css"
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
