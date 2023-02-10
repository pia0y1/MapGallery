<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item">
        <h2>{{ item }}</h2>
        <!-- <van-cell v-for="item in list" :key="item" :title="item"> -->
        <van-grid square :gutter="10" clickable>
          <van-grid-item v-for="value in 5" :key="value" icon="photo-o" text="文字" />
        </van-grid>
      </van-cell>
      <van-back-top class="custom" />
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { ref } from "vue"
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

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

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
interface Photo {
  fileName: string // 文件名
  photographer: string // 拍摄者
  shootingTime: string // 拍摄时间
  shootingLocation: string // 拍摄地
  shootingCoordinate: string // 拍摄坐标
}
class myPhoto implements Photo {
  fileName: string;
  photographer: string;
  shootingTime: string;
  shootingLocation: string;
  shootingCoordinate: string;
  constructor(fileName: string, photographer: string, shootingTime: string, shootingLocation: string, shootingCoordinate: string) {
    this.fileName = fileName
    this.photographer = photographer
    this.shootingTime = shootingTime
    this.shootingLocation = shootingLocation
    this.shootingCoordinate = shootingCoordinate
  }
  addPhoto() { }
}
</script>

<style>
h2 {
  margin: 0;
  padding-left: 20px;
  text-align: left;
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

</style>