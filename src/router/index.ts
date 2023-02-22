import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
  history: createWebHistory(),
  routes: [{
    // 路由为空则跳转至登录页
    path: "",
    redirect: "/login"
  }, {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue")
  }, {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue")
  }, {
    path: "/homePage",
    name: "HomePage",
    component: () => import("../components/Home/HomeMenu.vue"),
    children: [{
      path: "map",
      name: "Map",
      component: () => import("../components/Home/Map.vue")
    }, {
      path: "myImages",
      name: "MyImages",
      component: () => import("../components/Home/MyImages.vue")
    }, {
      path: "myInfo",
      name: "MyInfo",
      component: () => import("../components/Home/MyInfo.vue")
    }]
  }, {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../components/NotFound.vue")
  }]
});


