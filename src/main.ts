import App from './App.vue'
import { createApp } from 'vue'
import router from "./router"
import { Lazyload } from 'vant';
import { Uploader } from 'vant';
import { createPinia } from "pinia"
import { useUserStore } from "./store"
import piniaPluginPersist from "pinia-plugin-persist"
// import 'default-passive-events' // 解决控制台警告 [Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
import './style.css'

const app = createApp(App)

const store = createPinia()
store.use(piniaPluginPersist)

app.use(router)
app.use(store)
app.use(Lazyload)
app.use(Uploader);

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
