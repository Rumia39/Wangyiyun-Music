import { createApp } from 'vue'
import App from './App.vue'
import getVant from './plugins'
import router from './router'
import store from './store'

//引入组件样式
import 'vant/lib/index.css';
import axios from 'axios'

const app=createApp(App)


getVant(app)
app.use(store)
app.use(router).mount('#app')
