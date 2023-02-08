<template>
  <div id="container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  props: { },
  setup(props, { emit }) {
    const BMap = (window as any).BMap

    onMounted(() => {
      var map = new BMap.Map('container')
      // var point = new BMap.Point(props.longitude, props.latitude)
        var point = new BMap.Point(116.46, 39.92)
      //   console.log(point)

      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom(true)
      map.addEventListener('click', function (e: any) {
        //   let a = JSON.parse(e)
        console.log('点击的经纬度：' + e.point.lng + ',' + e.point.lat) //
        emit('update:longitude', e.point.lng)
        emit('update:latitude', e.point.lat)
      })
    })
  },
})
</script>

<style>
#container {
  width: 100%;
  height: 900px;
}
</style>