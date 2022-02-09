import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vants  from '@/utils/vant'
import directives from '@/directives'

import 'lib-flexible/flexible'
import 'vant/lib/index.css' // 全局引入样式

const app = createApp(App) // 创建实例

app.use(router)
app.use(store)
app.use(vants)
app.use(directives)

app.mount('#app')
