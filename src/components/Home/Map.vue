<template>
  <div id="map" />
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue"
import { useUserStore } from "../../store"
import dateFilter from "../../utils/date"

const user = useUserStore()
let jsonData = ref<any>([]) // json文件里的原始数据
let imagesList = ref<any>([]) // json文件数据展开得到的所有照片信息
let myMap = ref()

const BMapGL = (window as any).BMapGL
onMounted(() => {
  var map = new BMapGL.Map("map")          // 创建地图实例
  var point = new BMapGL.Point(105.40385, 36.34488)  // 创建点坐标
  map.centerAndZoom(point, 5)                 // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true)     //开启鼠标滚轮缩放
  map.addControl(new BMapGL.ScaleControl()) // 添加比例尺控件
  map.addControl(new BMapGL.ZoomControl()) // 添加缩放控件
  map.addControl(new BMapGL.CityListControl()) // 添加城市列表控件
  map.addControl(new BMapGL.LocationControl()) // 添加定位控件
  map.addControl(new BMapGL.MapTypeControl()) // 添加地图类型控件

  myMap.value = map
  setImagesMarker()
})

const setImagesMarker = () => {
  axios.get("http://60.205.206.45:3000/getUserImagesInfo", {
    params: { username: user.username }
  }).then(res => {
    jsonData.value = res.data
    for (let i in jsonData.value) {
      for (let j in jsonData.value[i].imgs) {
        let img = jsonData.value[i].imgs[j]
        img.fn = concatImagePath(user.username, img.fn)
        imagesList.value.push(img)
      }
    }
  }).then(() => {
    for (let i = 0; i < imagesList.value.length; i++) {
      const c = imagesList.value[i].sc
      const arr = c.split(",")
      const cx = Number(arr[0])
      const cy = Number(arr[1])

      const point = new BMapGL.Point(cx, cy)
      // 使用缩略图
      const myIcon = new BMapGL.Icon(`${imagesList.value[i].fn.replace("sceneryImage", "thumbnail")}`, new BMapGL.Size(50, 50), {
        anchor: new BMapGL.Size(0, 50)
      })
      const marker = new BMapGL.Marker(point, { icon: myIcon })

      const opts = {
        width: 200,
        height: 150,
        title: imagesList.value[i].t
      }
      const infoWindow = new BMapGL.InfoWindow(`
        拍摄者：${imagesList.value[i].per}<br/>
        日期：${dateFilter.getTimeWithoutSpace(imagesList.value[i].sd)}<br/>
        时间：${dateFilter.getTimeWithoutSpace(imagesList.value[i].st)}<br/>
        地点：${imagesList.value[i].sl}<br/>
        坐标：${imagesList.value[i].sc}
      `, opts)
      marker.addEventListener("click", function () {
        myMap.value.openInfoWindow(infoWindow, point); //开启信息窗口
      });

      myMap.value.addOverlay(marker)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 拼接图片路径
const concatImagePath = (username: string, fileName: string): string => {
  return "http://60.205.206.45:3000/image/sceneryImage/".concat(username).concat("/").concat(fileName)
}
</script>

<style scoped="scoped">
#map {
  width: 100%;
  height: 100%
}
</style>