import App from './App.vue'
import { createApp } from 'vue'
import router from "./router"
import { Lazyload } from 'vant';
import { Uploader } from 'vant';
import { useUserStore } from "./store"
import { createPinia } from "pinia"
import piniaPluginPersist from "pinia-plugin-persist"

// import "default-passive-events"

import './style.css'
import 'vant/es/toast/style';
import 'vant/es/image-preview/style';

const app = createApp(App)

const store = createPinia()
store.use(piniaPluginPersist)

app.use(router)
app.use(store)
app.use(Lazyload)
app.use(Uploader)

const user = useUserStore()
router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/") {
    next();
  }
  else {
    if (user.isLogin) {
      next();
    } else {
      alert("请登录后再试")
      next('/login');
    }
  }
})

app.mount('#app')
