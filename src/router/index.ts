import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
  history: createWebHistory(),
  routes: [{
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
      path: "myPhoto",
      name: "MyPhoto",
      component: () => import("../components/Home/MyPhoto.vue")
    }, {
      path: "myInfo",
      name: "MyInfo",
      component: () => import("../components/Home/MyInfo.vue")
    }]
  }]
});


