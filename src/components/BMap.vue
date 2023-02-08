<template>
  <div id="container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
export default defineComponent({
  setup() {
    const BMap = (window as any).BMap
    onMounted(() => {
      var map = new BMap.Map("container", { coordsType: 5 })
      // var point = new BMap.Point(props.longitude, props.latitude)
      var point = new BMap.Point(116.404, 39.915)
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom(true)
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.MapTypeControl());
    })
  },
})
</script>

<style>
#container {
  height: 800px;
}
</style>