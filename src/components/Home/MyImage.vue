<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <!-- <h2>{{ item }}</h2> -->
    <van-divider content-position="left" :style="{ color: '#111', borderColor: '#2ce991' }">文字</van-divider>
    <van-grid square :gutter="10" clickable>
      <van-grid-item v-for="value in 5" :key="value" icon="photo-o" text="文字" />
    </van-grid>
    <van-back-top class="custom" />
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "axios"
import myFS from "../../utils"
import { useUserStore } from "../../store";

const list = ref([]);
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
      list.value.push(<never>(list.value.length + 1));
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


// onMounted(() => {
//   axios.get(`../../../public/imageInfo/${user.username}.json`)
//     .then(res => console.log(res.data.allImgs))
// })


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
</style>