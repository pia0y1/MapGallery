<template>
  <van-form class="login-form" @submit="onSubmit" label-width="5em">
    <van-cell-group inset>
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名" />
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" autocomplete="off" />
      <van-button block size="small" plain>注册</van-button>
      <van-button block size="small" color="#2ce991" native-type="submit">登录</van-button>
    </van-cell-group>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { showFailToast } from 'vant';
import { useUserStore } from "../store"
import 'vant/es/toast/style';

const username = ref('');
const password = ref('');
const user = useUserStore();

const onSubmit = () => {
  if (username.value === "12345" && password.value === "12345") {
    showFailToast('登录成功')
    /**
     * 几种修改state的方式
     * 1. user.isLogin = true
     * 2. user.$patch({ username: username.value, isLogin = true })
     * 3. user.$patch((state) => { state.username: username.value, state.isLogin = true })
     * 4. user.$state = { username: username.value, isLogin = true }
     * 5. user.setLoginState(username.value)
     */
    user.setLoginState(username.value)
    setTimeout(() => {
      router.push("/homePage/map")
    }, 800)
  } else {
    showFailToast('登录失败');
  }
};
</script>

<style scoped>
.login-form {
  position: relative;
  width: 300px;
  margin: auto;
  top: 200px;
}
</style>