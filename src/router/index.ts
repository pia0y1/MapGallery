import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue")
  }, {
    path: "/bMap",
    name: "BMap",
    component: () => import("../components/BMap.vue")
  }]
});


