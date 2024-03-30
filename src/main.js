import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from "@/routes";
import piniaPluginPersitedstate from "pinia-plugin-persistedstate";
import {createPinia} from "pinia/dist/pinia";
import vueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import {LoadingPlugin} from "vue-loading-overlay"
import 'vue-loading-overlay/dist/css/index.css'
const pinia = createPinia();
    pinia.use(piniaPluginPersitedstate)
    createApp(App)
    .component('vueDatePicker',vueDatePicker)
    .use(LoadingPlugin)
    .use(pinia)
    .use(router)
    .use(require('moment'))
    .mount('#app')
