<template>
  <van-skeleton>
    <template #template>
      <div :style="{ display: 'flex', width: '100%' }">
        <van-skeleton-image />
        <div :style="{ flex: 1, marginLeft: '16px' }">
          <van-skeleton-paragraph row-width="60%" />
          <van-skeleton-paragraph />
          <van-skeleton-paragraph />
          <van-skeleton-paragraph />
        </div>
      </div>
    </template>
  </van-skeleton>
  <van-notice-bar
  wrapable
  :scrollable="false"
  text="因浏览器原生定位失效，sdk辅助定位偏差过大，所以暂不支持定位服务，敬请谅解~😶‍🌫️"
/>
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
  bottom: 8%;
}
</style>