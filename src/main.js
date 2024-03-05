import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from "@/routes";
import piniaPluginPersitedstate from "pinia-plugin-persistedstate";
import {createPinia} from "pinia/dist/pinia";
const pinia = createPinia();
pinia.use(piniaPluginPersitedstate)
createApp(App).use(pinia).use(router).use(require('moment')).mount('#app')
