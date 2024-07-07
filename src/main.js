import {
    createApp
} from 'vue'
import './style.css'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify'
import router from './core/router'

createApp(App).use(vuetify).use(router).mount('#app')