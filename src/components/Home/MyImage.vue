<template>
  <div v-for="(rows, i) in list" :key="i">
    <van-divider content-position="left" :style="{ color: '#111', borderColor: '#2ce991' }">
      {{ rows.sd }}
    </van-divider>
    <van-grid square :border="false" :gutter="4" clickable>
      <van-grid-item v-for="(img, j) in rows.imgs" :key="j"
        @click="v3ImgPreviewFn(concatImagePath(user.username, img.fn))">
        <van-image width="100%" height="100%" fit="cover" lazy-load :src="concatImagePath(user.username, img.fn)">
          <template v-slot:loading><van-loading type="spinner" size="20" /></template>
        </van-image>
      </van-grid-item>
    </van-grid>
  </div>
  <van-back-top class="custom" />

  <van-uploader>
    <van-button block size="small" color="#2ce991" icon="plus">上传图片</van-button>
  </van-uploader>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "axios"
import { useUserStore } from "../../store"
import { v3ImgPreviewFn } from 'v3-img-preview'

let list = ref<any>([])
const user = useUserStore()

// 拼接图片路径
const concatImagePath = (username: string, fileName: string): string => {
  return "../../../public/image/sceneryImage/".concat(username).concat("/").concat(fileName)
}

// 组件挂载完毕自动获取用户名json文件
onMounted(() => {
  axios.get(`../../../public/imageInfo/${user.username}.json`).then(res => {
    // console.log(res.data.allImgs)
    list.value = res.data.allImgs
    // 获取json文件中的图片信息并储存到数组images中
    // for (let i in list) {
    //   for (let j in list[i].imgs) {
    //     let img = list[i].imgs[j]
    //     // console.log(img.fn)
    //     images.value.push(<never>concatImagePath(user.username, img.fn))
    //   }
    // }
    // console.log(list.value);
  })
})
</script>

<style>
h2 {
  margin: 0;
  padding-left: 40px;
  text-align: left;
  font: italic 1.2em "Fira Sans", serif;
  color: #111;
}

.custom {
  width: 80px;
  height: 80px;
  font-size: 14px;
  text-align: center;
  right: 15vw;
  bottom: 10vh;
  z-index: 5;
}

.van-cell {
  padding: 0;
}

.van-pull-refresh {
  overflow: visible;
}
</style>