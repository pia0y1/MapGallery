<template>
  <!-- <div class="headImage">
    <van-image round width="5rem" height="5rem" fit="cover"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
  </div> -->
  <div id="homeView">
    <router-view />
  </div>
  <van-tabbar route v-model="active" id="tabBar">
    <van-tabbar-item to="/homePage/bMap" icon="location-o">地图</van-tabbar-item>
    <van-tabbar-item to="/homePage/myPhoto" icon="photo-o">照片</van-tabbar-item>
    <van-tabbar-item to="/homePage/myInfo" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import BMap from './BMap.vue'
import { ref } from 'vue';
const active = ref(0);
</script>

<style>
/* .headImage {
  width: 80px;
  height: 80px;
  background-color: transparent;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1;
} */
#homeView {
  height: 95%;
}

#tabBar {
  height: 5%;
}
</style>