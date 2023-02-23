<template>
  <van-form class="login-form" label-width="5em" @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请输入用户名' }]" />
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" autocomplete="off"
        :rules="[{ required: true, message: '请输入密码' }]" />
    </van-cell-group>
    <van-button block size="small" color="#2ce991" native-type="submit" class="login-btn">登录</van-button>
    <div class="register-text">
      没有账号？
      <router-link to="/register"><a class="to-register">点击注册</a></router-link>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from "axios"
import cryptPwd from '../utils/pwd'
import router from '../router'
import { showSuccessToast, showFailToast } from 'vant'
import { useUserStore } from "../store"
import 'vant/es/toast/style'

const username = ref('')
const password = ref('')
const user = useUserStore()
let userList: Array<User> = []

interface User {
  username: string
  hashPassword: string
}

onMounted(() => {
  axios.get("http://xxx.xxx.xxx.xxx:3000/getUsersList").then(res => {
    userList = res.data
  })
})

// 登录
const onSubmit = () => {
  /**
   * 几种修改state的方式
   * 1. user.isLogin = true
   * 2. user.$patch({ username: username.value, isLogin = true })
   * 3. user.$patch((state) => { state.username: username.value, state.isLogin = true })
   * 4. user.$state = { username: username.value, isLogin = true }
   * 5. user.setLoginState(username.value)
   */
  if (userList.some(u => username.value === u.username && cryptPwd.checkPwd(password.value, u.hashPassword))) {
    user.setLoginState(username.value)
    showSuccessToast({ message: "登录成功", duration: 1000 })
    router.push("/homePage/map")
  } else {
    showFailToast("登录失败")
  }
}
</script>

<style scoped>
.login-form {
  position: relative;
  width: 300px;
  margin: auto;
  top: 200px;
}

.login-btn {
  width: 268px;
  margin: 16px auto 0;
}

.register-text {
  width: 268px;
  margin: 16px auto 0;
  text-align: center;
}

.to-register {
  color: #2ce991;
}
</style>
