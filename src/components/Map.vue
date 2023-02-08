<template>
  <div class="bmap" id="container"></div>
  <div></div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
// import { ref } from 'vue'
export default {
  name: 'BmapDemo',
  mounted() {
    const store = useStore()
    var map = new window.BMap.Map('container')
    var point = new window.BMap.Point(
      store.state.record.longitude,//这里本人项目中可以有相关store数据，建议从自己项目出发进行修改
      store.state.record.latitude
    )
    map.centerAndZoom(point, 18)
    map.enableScrollWheelZoom(true)
    var label = new window.BMap.Label('疲劳地点', {
      position: point, // 设置标注的地理位置
      offset: new window.BMap.Size(0, 0) // 设置标注的偏移量
    })
    // 添加标签
    map.addOverlay(label) // 将标注添加到地图中
    label.setStyle({
      fontSize: '32px',
      color: 'red'
    })

    var marker = new window.BMap.Marker(point) // 创建标注
    map.addOverlay(marker) // 将标注添加到地图中
    var scaleCtrl = new window.BMap.ScaleControl() // 添加比例尺控件
    map.addControl(scaleCtrl)
    var zoomCtrl = new window.BMap.ZoomControl() // 添加缩放控件
    map.addControl(zoomCtrl)
    var cityCtrl = new window.BMap.CityListControl() // 添加城市列表控件
    map.addControl(cityCtrl)
  },
  setup() {
    // const store = useStore()
    // let latitude = ref('')
    // let longitude = ref('')
    // console.log(store.state.record.latitude)
    // latitude.value = store.state.record.latitude
    // longitude.value = store.state.record.longitude
    // return {
    //   latitude,
    //   longitude
    // }
  }
}
</script>

<style scoped>
.bmap {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style>