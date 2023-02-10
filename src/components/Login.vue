<template>
  <van-form @submit="onSubmit" label-width="5em">
    <van-cell-group inset>
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名" />
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" autocomplete="off" />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
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
    // const script = document.createElement('script')
    // script.src = "https://api.map.baidu.com/api?v=3.0&ak=jbgDtTAOZnma2xgz61HKD2kP7KwIc2kG"
    // document.head.appendChild(script)
    setTimeout(() => {
      router.push("/homePage/bMap")
    }, 800)
  } else {
    showFailToast('登录失败');
  }
};
</script>

<style scoped>
form {
  position: fixed;
  margin-top: 40%;
  margin-left: 50%;
  transform: translate(-50%, 0);
}
</style>