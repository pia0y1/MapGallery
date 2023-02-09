<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"

const BMap = (window as any).BMap
onMounted(() => {
  var map = new BMap.Map("map", { coordsType: 5 })
  // var point = new BMap.Point(props.longitude, props.latitude)
  var point = new BMap.Point(116.404, 39.915)

  map.centerAndZoom(point, 15)
  map.enableScrollWheelZoom(true)
  map.addControl(new BMap.ScaleControl({
    anchor: BMAP_ANCHOR_BOTTOM_LEFT,
    offset: new BMap.Size(100, 10)
  }))
  map.addControl(new BMap.MapTypeControl({
    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
    offset: new BMap.Size(10, 10)
  }))
})
</script>

<style scoped="scoped">
#map {
  height: 100%;
}
</style>