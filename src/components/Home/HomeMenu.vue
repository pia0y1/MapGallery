<template>
  <div class="home-view">
    <!-- <router-view /> -->
    <div class="view" v-show="pageIndex == 0">
      <BMap />
    </div>
    <div class="view" v-show="pageIndex == 1">
      <MyImage />
    </div>
    <div class="view" v-show="pageIndex == 2">
      <MyInfo />
    </div>
  </div>
  <van-tabbar active-color="#2ce991" route class="tabBar">
    <van-tabbar-item @click="pageIndex = 0" to="/homePage/bMap" icon="location-o">地图</van-tabbar-item>
    <van-tabbar-item @click="pageIndex = 1" to="/homePage/myImage" icon="photo-o">照片</van-tabbar-item>
    <van-tabbar-item @click="pageIndex = 2" to="/homePage/myInfo" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import BMap from './BMap.vue'
import MyImage from './MyImage.vue';
import MyInfo from './MyInfo.vue';
import { ref, onUpdated } from 'vue';
let pageIndex = ref(0);

// onUpdated(()=>{
//   console.log(pageIndex.value);
// })
</script>

<style>
.home-view {
  height: 92%;
}

.view {
  height: 100%;
}

.tabBar {
  height: 8%;
}
</style>