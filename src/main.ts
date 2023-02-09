import App from './App.vue'
import router from "./router"
import { createApp } from 'vue'
import { createPinia } from "pinia"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem("isLogin");
  // 注销
  if (to.path == "/logout") {
    // 清空
    sessionStorage.clear();
    // 跳转到登录页面
    next({ path: "/login" });
  } else if (to.path == "/login") {
    // 判断是否为空，不为空，跳转至首页
    if (isLogin != null) {
      next({ path: "/bMap" });
    }
  } else if (isLogin == null) {
    next({ path: "/login" });
  }
  next();
})

app.mount('#app')
