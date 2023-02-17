<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

onMounted(() => {
  const BMapGL = (window as any).BMapGL

  var map = new BMapGL.Map("map")          // 创建地图实例
  var point = new BMapGL.Point(116.404, 39.915)  // 创建点坐标
  map.centerAndZoom(point, 15)                 // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true)     //开启鼠标滚轮缩放
  map.addControl(new BMapGL.ScaleControl()) // 添加比例尺控件
  map.addControl(new BMapGL.ZoomControl()) // 添加缩放控件
  map.addControl(new BMapGL.CityListControl()) // 添加城市列表控件
  map.addControl(new BMapGL.LocationControl()) // 添加定位控件
  map.addControl(new BMapGL.MapTypeControl()) // 添加地图类型控件


  // var geolocation = new BMapGL.Geolocation()
  // // 开启SDK辅助定位
  // geolocation.enableSDKLocation()
  // geolocation.getCurrentPosition((r: any) => {
  //   if (geolocation.getStatus() == 0) { // window.BMAP_STATUS_SUCCESS=0
  //     var mk = new BMapGL.Marker(r.point) // 红色定位标志
  //     map.addOverlay(mk) // 添加到地图上
  //     map.panTo(r.point) // 以该点为中心移动地图
  //     alert('您的位置：' + r.point.lng + ',' + r.point.lat)

  //     //GPS坐标
  //     let x = r.point.lng
  //     let y = r.point.lat
  //     var ggPoint = new BMapGL.Point(x, y) // 获取到的定位坐标（未转换）
  //     //添加gps marker和label
  //     var markergg = new BMapGL.Marker(ggPoint) // 往地图上添加点标注
  //     map.addOverlay(markergg) //添加GPS marker
  //     var labelgg = new BMapGL.Label("未转换的GPS坐标（错误）", { offset: new BMapGL.Size(20, -10) })
  //     markergg.setLabel(labelgg) //添加GPS labe
  //     setTimeout(function () {
  //       var convertor = new BMapGL.Convertor() // 开始转换
  //       var pointArr = [] // 用于储存未转换的坐标
  //       pointArr.push(ggPoint) // 存入
  //       convertor.translate(pointArr, 1, 5, (data: any) => { // 开始转换
  //         if (data.status === 0) { // 判断转换状态
  //           var marker = new BMapGL.Marker(data.points[0]) // 获取转换后坐标数组的第一个制作红色定位标志
  //           map.addOverlay(marker) // 添加到地图上
  //           var label = new BMapGL.Label("转换后的百度坐标（正确）", { offset: new BMapGL.Size(20, -10) })
  //           marker.setLabel(label) //添加百度label
  //           map.setCenter(data.points[0])
  //         }
  //       }) // 开始转换
  //     }, 1000)
  //   }
  //   else {
  //     alert('failed' + geolocation.getStatus())
  //   }
  // })
})
</script>

<style scoped="scoped">
#map {
  width: 100%;
  height: 100%
}
</style>