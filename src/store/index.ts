import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      isLogin: false,
      username: ""
    }
  },
  getters: {},
  actions: {
    setLoginSuccess(username: string) {
      this.isLogin = true
      this.username = username
    }
  }
})