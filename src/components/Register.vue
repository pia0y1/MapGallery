<template>
  <van-form class="register-form" label-width="5em" @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请输入用户名' }]" />
      <van-field v-model="password1" type="password" name="password" label="密码" placeholder="密码" autocomplete="off"
        :rules="[{ required: true, message: '请输入密码' }]" />
      <van-field v-model="password2" type="password" name="password" label="确认密码" placeholder="再次输入密码" autocomplete="off"
        :rules="[{ required: true, message: '请输入二次密码' }]" />
    </van-cell-group>
    <van-button block size="small" color="#2ce991" native-type="submit" class="register-btn"
      :disabled=isDisabled>注册</van-button>
    <div class="register-text">
      <router-link to="/login"><a class="to-register">返回登录界面</a></router-link>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue"
import { showSuccessToast, showFailToast } from 'vant';

interface User {
  username: string
  hashPassword: string
}

const username = ref('');
const password1 = ref('');
const password2 = ref('');
const isDisabled = ref(false)

let userList: Array<User> = []

onMounted(() => {
  getAllUserInfo()
})

const getAllUserInfo = () => {
  axios.get("http://xxx.xxx.xxx.xxx:3000/getUsersList").then(res => {
    userList = res.data
  })
}

const onSubmit = () => {
  isDisabled.value = true
  setTimeout(() => {
    isDisabled.value = false
  }, 3000)
  if (password2.value != password1.value) {
    showFailToast("两次密码输入不一致，请重新输入")
    password1.value = ""
    password2.value = ""
  } else {
    axios.post("http://xxx.xxx.xxx.xxx:3000/register", {
      username: username.value, password: password1.value
    }, {
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      if (res.data === "注册成功") showSuccessToast(res.data)
      else showFailToast(res.data)
    })
  }
}

</script>

<style scoped>
.register-form {
  position: relative;
  width: 300px;
  margin: auto;
  top: 200px;
}

.register-btn {
  width: 268px;
  margin: 16px auto 0;
}

.register-text {
  width: 268px;
  margin: 16px auto 0;
  text-align: center;
}

.to-register {
  width: 268px;
  margin: 16px auto 0;
  text-align: center;
  color: #2ce991;
}
</style>