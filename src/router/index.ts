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
    path: "/homePage",
    name: "HomePage",
    component: () => import("../components/Home/HomePage.vue"),
    children: [{
      path: "bMap",
      name: "BMap",
      component: () => import("../components/Home/BMap.vue")
    }, {
      path: "myImage",
      name: "MyImage",
      component: () => import("../components/Home/MyImage.vue")
    }, {
      path: "myInfo",
      name: "MyInfo",
      component: () => import("../components/Home/MyInfo.vue")
    }]
  }]
});


