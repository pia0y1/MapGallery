<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <van-empty v-show="isEmpty" description="您的相册空空如也~" />
    <van-checkbox-group v-model="checked">
      <div v-for="(rows, i) in jsonData" :key="i">
        <div class="images-date">
          {{ dateFilter.getTimeWithoutSpace(rows.sd, "zh-CNYYYYMMDD") }}
        </div>
        <van-grid square :border="false" :gutter="4" clickable>
          <van-grid-item v-for="(img, j) in rows.imgs" :key="j"
            @click="showImage(concatImagePath(user.username, img.fn))">
            <van-image width="100%" height="100%" fit="cover" lazy-load :src="concatImagePath(user.username, img.fn)">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            <van-checkbox @click="handleClickCheckbox" v-show="showCheckBox" :name="`${img.fn}`"
              checked-color="#2ce991" />
          </van-grid-item>
        </van-grid>
      </div>
    </van-checkbox-group>

  </van-pull-refresh>

  <div class="btn-group">
    <button @click="deleteImages()" class="btn-group-delete" square block
      color="linear-gradient(to right, #59EF94, #66FF99)">
      删除
    </button>
    <button @click="show = true" class="btn-group-upload" square block
      color="linear-gradient(to right, #59EF94, #66FF99)">
      上传
    </button>
  </div>

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
import { showConfirmDialog, showImagePreview, showToast } from 'vant';
import { useUserStore } from "../../store"
import dateFilter from "../../utils/date";
import 'vant/es/dialog/style';

const isEmpty = ref(false)
let jsonData = ref<any>([]) // json文件里的原始数据
let imagesList = ref<any>([]) // json文件数据展开得到的所有照片信息
const user = useUserStore()
const loading = ref(false)
const show = ref(false)

const showCheckBox = ref(false)
const checked = ref([])

// 阻止事件冒泡
const handleClickCheckbox = (e: Event) => {
  e.stopPropagation();
}

// 组件挂载完毕自动获取用户名json文件
onMounted(() => {
  getImages()
})

const onRefresh = () => {
  imagesList.value = []
  getImages()
  setTimeout(() => {
    showToast('刷新成功');
    loading.value = false;
  }, 500)
}

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
    if (jsonData.value.length == 0) {
      isEmpty.value = true
    } else {
      isEmpty.value = false
      // 获取json文件中的图片信息并储存到数组imagesList中
      for (let i in jsonData.value) {
        for (let j in jsonData.value[i].imgs) {
          let img = jsonData.value[i].imgs[j]
          imagesList.value.push(<never>concatImagePath(user.username, img.fn))
        }
      }
    }
  }).catch(err => {
    console.log(err)
    isEmpty.value = true
  })
}

/**
 * 要删除的东西有：
 * 1. 原始图片
 * 2. 缩略图
 * 3. json文件对应的图片
 */
const deleteImages = () => {
  if (checked.value.length === 0) showCheckBox.value = !showCheckBox.value
  else {
    showConfirmDialog({
      title: "确认删除？"
    })
      .then(() => {
        // on confirm
        axios.post("http://192.168.31.250:3000/delete", {
          checkedImagesList: checked.value, username: user.username
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        })
      }).catch(() => {
        // on cancel
        checked.value = []
      });
  }
}

</script>

<style>
.van-pull-refresh {
  overflow: visible;
  padding-bottom: 50%;
}

.van-empty {
  padding: 50% 0 0;
}

.images-date {
  line-height: 20px;
  padding-left: 5%;
  font: italic 1em serif;
  margin-top: 10px;
  width: 40%;
}

.van-grid-item__content {
  display: block;
}

.van-checkbox {
  width: 20px;
  position: absolute;
  right: 0;
  top: 100%;
  transform: translateY(-100%);
}

.van-checkbox__icon {
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
}

.btn-group {
  color: #fff;
  width: 100%;
  height: var(--van-button-default-height);
  position: fixed;
  bottom: 8%;
  display: flex;
  flex-flow: row nowrap;
  align-content: flex-end;
}

.btn-group-delete {
  border: none;
  flex-grow: 1;
  background-color: rgb(255, 109, 52);
}

.btn-group-upload {
  border: none;
  flex-grow: 1;
  background-color: #2ce991;
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