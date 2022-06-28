import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from '@/store/store'

const Vue = createApp(App)
Vue.use(router)
Vue.use(vuex)
Vue.mount('#app')
