<template>
  <van-button class="btnLogout" square block color="linear-gradient(to right, #ff6034, #ee0a24)"
    @click="logout">退出登录</van-button>
</template>

<script setup lang="ts">
import router from '../../router';
import { useUserStore } from '../../store'
const user = useUserStore()

const logout = () => {
  user.$reset()
  router.push("/login")
}
</script>

<style>
.btnLogout {
  position: absolute;
  bottom: 15%;
}
</style>