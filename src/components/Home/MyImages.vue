<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <van-empty v-show="isEmpty" description="您的相册空空如也~" />
    <div v-for="(rows, i) in jsonData" :key="i">
      <van-divider content-position="left" :style="{ color: '#111', borderColor: '#2ce991' }">
        {{ dateFilter.getTimeWithoutSpace(rows.sd, "zh-CNYYYYMMDD") }}
      </van-divider>
      <van-grid square :border="false" :gutter="4" clickable>
        <van-grid-item v-for="(img, j) in rows.imgs" :key="j" @click="showImage(concatImagePath(user.username, img.fn))">
          <van-image width="100%" height="100%" fit="cover" lazy-load :src="concatImagePath(user.username, img.fn)">
            <template v-slot:loading><van-loading type="spinner" size="20" /></template>
          </van-image>
          <div v-if="showCheckbox"><input type="checkbox" v-model="checked" /></div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-pull-refresh>
  <van-button @click="show = true" class="btnUpload" square block color="linear-gradient(to right, #59EF94, #66FF99)">
    上传图片
  </van-button>

  <van-back-top class="custom" />

  <Transition name="upload-mask">
    <div class="mask" v-show="show">
      <div class="mask-popup">
        <UploadImage @show-upload-mask="s => show = s" />
        <van-button class="mask-popup-btn" square block size="normal" color="#ff6034"
          @click="show = false">取消</van-button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import UploadImage from "./UploadImage.vue"
import axios from "axios"
import { showImagePreview, showToast } from 'vant';
import { useUserStore } from "../../store"
import dateFilter from "../../utils/date";

const isEmpty = ref(false)
let jsonData = ref<any>([]) // json文件里的原始数据
let imagesList = ref<any>([]) // json文件数据展开得到的所有照片信息
const user = useUserStore()
const loading = ref(false);
const show = ref(false)

const showCheckbox=ref(false)
const checked = ref(false)


// 组件挂载完毕自动获取用户名json文件
onMounted(() => {
  getImages()
})

const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功');
    loading.value = false;
    getImages()
  }, 1000);
};

// 拼接图片路径
const concatImagePath = (username: string, fileName: string): string => {
  return "/image/sceneryImage/".concat(username).concat("/").concat(fileName)
}

const showImage = (filePath: string) => {
  const startIndex = imagesList.value.indexOf(filePath)
  showImagePreview({
    images: imagesList.value,
    closeable: true,
    // showIndex: false,
    startPosition: startIndex,
    maxZoom: 10
  })
}

const getImages = () => {
  axios.get(`/imageInfo/${user.username}.json`).then(res => {
    jsonData.value = res.data
    // console.log(jsonData.value)
    if (jsonData.value.length == 0) {
      isEmpty.value = true
    }
    // 获取json文件中的图片信息并储存到数组imagesList中
    for (let i in jsonData.value) {
      for (let j in jsonData.value[i].imgs) {
        let img = jsonData.value[i].imgs[j]
        imagesList.value.push(<never>concatImagePath(user.username, img.fn))
      }
    }
  }).catch(err => {
    console.log(err)
    isEmpty.value = true
  })
}

</script>

<style>
.van-pull-refresh {
  overflow: visible;
  padding-bottom: 50%;
}

.btnUpload {
  position: fixed;
  bottom: 8%;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.custom {
  bottom: 15%;
  width: 60px;
  height: 60px;
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
  top: 4%;
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