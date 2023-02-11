<template>
  <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
    <div v-for="(rows, i) in list" :key="i">
      <van-divider content-position="left" :style="{ color: '#111', borderColor: '#2ce991' }">
        {{ rows.sd }}
      </van-divider>
      <van-grid square :border="false" :gutter="10" clickable>
        <van-grid-item v-for="(img, j) in rows.imgs" :key="j" @click="showImage(user.username, img.fn)">
          <van-image width="100%" height="100%" fit="cover" lazy-load :src="concatImagePath(user.username, img.fn)">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </van-grid-item>
      </van-grid>
    </div>
    <van-back-top class="custom" />
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "axios"
import myFS from "../../utils"
import { useUserStore } from "../../store";
import { showImagePreview } from 'vant';
import { file } from "@babel/types";

let list = ref<any>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const user = useUserStore()

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

// 刷新
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

// 拼接图片路径
const concatImagePath = (username: string, fileName: string): string => {
  return "../../../public/image/sceneryImage/".concat(username).concat("/").concat(fileName)
}

// 图片预览
const showImage = (username: string, fileName: string): void => {
  const image = new Image();
  image.src = concatImagePath(username, fileName);
  image.onload = () => {
    // 创建弹出层
    const previewContainer = document.createElement('div');
    previewContainer.style.position = 'fixed';
    previewContainer.style.top = 0;
    previewContainer.style.bottom = 0;
    previewContainer.style.left = 0;
    previewContainer.style.right = 0;
    previewContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
    previewContainer.style.display = 'flex';
    previewContainer.style.justifyContent = 'center';
    previewContainer.style.alignItems = 'center';
    document.body.appendChild(previewContainer);
    // 在弹出层中添加图片
    const previewImage = document.createElement('img');
    previewImage.src = image.src;
    previewImage.style.maxWidth = '200%';
    previewImage.style.maxHeight = '200%';
    previewContainer.appendChild(previewImage);
    // 点击弹出层，关闭预览
    previewContainer.addEventListener('click', () => {
      document.body.removeChild(previewContainer);
    });
  };
}

// 组件挂载完毕自动获取用户名json文件
onMounted(() => {
  axios.get(`../../../public/imageInfo/${user.username}.json`)
    .then(res => {
      console.log(res.data.allImgs)
      list = res.data.allImgs
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
  z-index: 10;
}

.van-cell {
  padding: 0;
}

.van-pull-refresh {
  overflow: visible;
}
</style>