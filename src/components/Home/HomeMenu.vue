<template>
  <!-- <div class="headImage">
    <van-image round width="5rem" height="5rem" fit="cover"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
  </div> -->
  <div id="homeView">
    <!-- <router-view /> -->
    <BMap v-show="pageIndex == 0"/>
    <MyImage v-show="pageIndex == 1"/>
    <MyInfo v-show="pageIndex == 2"/>
  </div>
  <van-tabbar active-color="#2ce991" route id="tabBar">
    <van-tabbar-item @click="pageIndex = 0" to="/homePage/bMap" icon="location-o">地图</van-tabbar-item>
    <van-tabbar-item @click="pageIndex = 1" to="/homePage/myImage" icon="photo-o">照片</van-tabbar-item>
    <van-tabbar-item @click="pageIndex = 2" to="/homePage/myInfo" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import BMap from './BMap.vue'
import MyImage from './MyImage.vue';
import MyInfo from './MyInfo.vue';
import { ref,onUpdated } from 'vue';
let pageIndex = ref(0);

// onUpdated(()=>{
//   console.log(pageIndex.value);
// })
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
  height: 92%;
}

#tabBar {
  height: 8%;
}
</style>