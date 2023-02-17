<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div v-for="(rows, i) in list" :key="i">
      <van-divider content-position="left" :style="{ color: '#111', borderColor: '#2ce991' }">
        {{ dateFilter.getTimeWithoutSpace(rows.sd, "zh-CNYYYYMMDD") }}
      </van-divider>
      <van-grid square :border="false" :gutter="4" clickable>
        <van-grid-item v-for="(img, j) in rows.imgs" :key="j" @click="showImage(concatImagePath(user.username, img.fn))">
          <van-image width="100%" height="100%" fit="cover" lazy-load :src="concatImagePath(user.username, img.fn)">
            <template v-slot:loading><van-loading type="spinner" size="20" /></template>
          </van-image>
        </van-grid-item>
      </van-grid>
    </div>
    <van-button @click="show = true" class="btnUpload" square block color="linear-gradient(to right, #59EF94, #66FF99)">
      上传图片
    </van-button>
  </van-pull-refresh>

  <van-back-top class="custom" />

  <Transition name="upload-mask">
    <div class="mask" v-show="show">
      <div class="mask-popup">
        <UploadImage />
        <van-button class="mask-popup-btn" square block size="normal" color="#ff6034"
          @click="show = false">取消</van-button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import UploadImage from "./UploadImage.vue"

import { ref, onMounted } from "vue"
import axios from "axios"
import { showImagePreview, showToast } from 'vant';
import { useUserStore } from "../../store"
import dateFilter from "../../utils/date";

let list = ref<any>([])
let images = ref<any>([])
const user = useUserStore()
const loading = ref(false);
const show = ref(false)

// 组件挂载完毕自动获取用户名json文件
onMounted(() => {
  axios.get(`../../../public/imageInfo/${user.username}.json`).then(res => {
    list.value = res.data.allImgs
    // 获取json文件中的图片信息并储存到数组images中
    for (let i in list.value) {
      for (let j in list.value[i].imgs) {
        let img = list.value[i].imgs[j]
        images.value.push(<never>concatImagePath(user.username, img.fn))
      }
    }
  })
})

const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功');
    loading.value = false;
  }, 1000);
};

// 拼接图片路径
const concatImagePath = (username: string, fileName: string): string => {
  return "../../../public/image/sceneryImage/".concat(username).concat("/").concat(fileName)
}

const showImage = (filePath: string) => {
  const startIndex = images.value.indexOf(filePath)
  showImagePreview({
    images: images.value,
    closeable: true,
    startPosition: startIndex,
    maxZoom: 10
    // showIndicators:true
  })
}
</script>

<style>
.van-pull-refresh {
  overflow: visible;
}

.btnUpload {
  margin-top: 40px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.upload-mask-enter-active,
.upload-mask-leave-active {
  transition: opacity 0.5s ease;
}

.upload-mask-enter-from,
.upload-mask-leave-to {
  opacity: 0;
}

.mask {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
  z-index: 1;
}

.mask-popup {
  position: relative;
  top: 8%;
  width: 80%;
  margin: auto;
}

.mask-popup-btn {
  margin-top: 6px;
  width: 100%;
  border: 0;
  border-radius: var(--van-cell-group-inset-radius);
}

</style>