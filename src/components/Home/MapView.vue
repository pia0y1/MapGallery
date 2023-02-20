<template>
  <div id="map-view"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const emit = defineEmits<{ (event: 'markerPoint', value: string): void }>()

onMounted(() => {
  const BMapGL = (window as any).BMapGL
  var map = new BMapGL.Map("map-view");          // 创建地图实例
  var point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标
  map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件

  let marker = new BMapGL.Marker(point)
  var label = new BMapGL.Label(`经度116.404, 纬度39.915`, { offset: new BMapGL.Size(20, -25) }) // 实例化标签
  marker.setLabel(label) // 在点上添加标签
  map.addOverlay(marker)

  map.addEventListener('click', (e: any) => {
    map.removeOverlay(marker)

    const x: number = e.latlng.lng
    const y: number = e.latlng.lat

    const p = new BMapGL.Point(x, y)
    marker = new BMapGL.Marker(p)
    var label = new BMapGL.Label(`经度${x.toFixed(5)}, 纬度${y.toFixed(5)}`, { offset: new BMapGL.Size(20, -25) }) // 实例化标签
    marker.setLabel(label) // 在点上添加标签
    map.addOverlay(marker)

    emit("markerPoint", `${x.toFixed(5).toString()},${y.toFixed(5).toString()}`)
  });
})
</script>

<style>
#map-view {
  width: 100%;
  height: 100%;
}
</style>