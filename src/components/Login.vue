<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名" />
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mainStore } from '../store/index'

const store = mainStore();
const username = ref('');
const password = ref('');

const onSubmit = (values: string) => {
  console.log('submit', values);
  if (username.value === "12345" && password.value === "12345") {
    sessionStorage.setItem("isLogin", "true");
    store.setLoginSuccess(username as unknown as string)
  }
};
</script>