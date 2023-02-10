import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  // 持久化
  persist: {
    enabled: true,
    strategies: [{
      // 未设置则默认储存在sessionStorage里，可改为localStorage
      storage: localStorage
    }]
  },
  state: () => {
    return {
      username: "",
      isLogin: false
    }
  },
  // computed：修饰一些值
  getters: {},
  // methods：同步异步都能做，提交state
  actions: {
    setLoginState(username: string) {
      this.username = username
      this.isLogin = true
    }
  }
})