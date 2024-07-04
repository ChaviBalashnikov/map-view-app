import {
    createApp
} from 'vue'
import './style.css'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify'
import router from './core/router'
import i18n from './plugins/i18n'

createApp(App).use(vuetify).use(router).use(i18n).mount('#app')