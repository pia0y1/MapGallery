<template>
  <div id="map-view"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

onMounted(() => {
  setTimeout(() => {
    const BMapGL = (window as any).BMapGL
    var map = new BMapGL.Map("map-view");          // 创建地图实例
    var point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件

    map.addEventListener('click', (e: any) => {
      const x1 = e.latlng.lng
      const y1 = e.latlng.lat
      const p1 = [x1, y1]
      console.log(`点击的经纬度${p1}`)

      // 坐标转换

      const point = new BMapGL.Point(p1[0], p1[1])
      const marker = new BMapGL.Marker(point)
      map.addOverlay(marker)
    });
  },1)
})
</script>

<style>
#map-view {
  width: 100%;
  height: 100%;
}
</style>