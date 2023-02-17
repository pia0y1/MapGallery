<template>
  <van-form @submit="onSubmit">
    <van-cell-group class="upload-form-cell-group">
      <van-field name="uploader" label="照片">
        <template #input>
          <van-uploader v-model="file" :max-count="1" :after-read="afterRead" />
        </template>
      </van-field>
      <van-field v-model="t" name="t" label="标题" placeholder="请输入标题" :rules="[{ required: true, message: '输入照片标题' }]" />
      <van-field v-model="sl" is-link readonly name="sl" label="城市" placeholder="点击选择城市" @click="showArea = !showArea" />
      <van-field v-model="sc" is-link readonly name="sc" label="位置" placeholder="点击地图选择位置"
        @click="showMap = !showMap" />
    </van-cell-group>
    <div class="map-view-container" v-if="showMap">
      <MapView />
    </div>
    <van-button class="mask-popup-btn" square block size="normal" color="#2ce991" native-type="submit">上传</van-button>
  </van-form>

  <!-- 地区选择框 -->
  <van-popup v-model:show="showArea" position="bottom" teleport=".view">
    <van-area :area-list="areaList" @confirm="onConfirmLocation" @cancel="showArea = false" />
  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUpdate, onUpdated } from "vue"
import MapView from "./MapView.vue";
import { areaList } from '@vant/area-data';
import { useUserStore } from "../../store"
import dateFilter from "../../utils/date"

const user = useUserStore()

const file = ref() // 文件选择器获取的原始文件对象
const lmd = ref() // lastModifiedDate该文件最后被修改的时间（年月日时分秒）

/**
 * json文件里共有8项数据
 * t       手动输入
 * fn      自动获取，不可修改，不可查看
 * per     自动获取，可修改
 * sd      自动获取，不可修改，不可查看
 * st      自动获取，不可修改，不可查看
 * sdt     上两项合并,不可修改，不可查看
 * sl      手动选择
 * sc      手动选择
 */
class Image {
  t: string
  fn: string
  per: string
  sd: string
  st: string
  sdt: string
  sl: string
  sc: string

  constructor(t: string, fn: string, per: string, sd: string, st: string, sdt: string, sl: string, sc: string) {
    this.t = t
    this.fn = fn
    this.per = per
    this.sd = sd
    this.st = st
    this.sdt = sdt
    this.sl = sl
    this.sc = sc
  }
}

const t = ref() // title标题
const fn = ref() // filename文件名.后缀名
const per = ref() // photographer拍摄者账号
const sd = ref() // shooting date拍摄年月日
const st = ref() // shooting time拍摄时分秒
const sdt = ref() // shooting date time拍摄年月日时分秒
const sl = ref() // shooting location拍摄地
const sc = ref() // shooting coordinate拍摄地坐标

const showArea = ref(false)
const showMap = ref(false)

const onSubmit = (values: any) => {
  console.log('submit', values);
};
const afterRead = (file: any) => { // 选择照片完成后触发的函数
  fn.value = file.file.name
  per.value = user.username
  lmd.value = file.file.lastModifiedDate
  const afterFormat = dateFilter.getTimeWithoutSpace(lmd.value, "YYYYMMDDHHmmss")
  sd.value = afterFormat?.slice(0, 8)
  st.value = afterFormat?.slice(8, 14)
  sdt.value = afterFormat
};
const onConfirmLocation = ({ selectedOptions }: any) => {
  showArea.value = false;
  sl.value = selectedOptions.map((item: any) => item.text).join('/');
}
</script>

<style>
.map-view-container {
  width: 100%;
  height: 320px;
  position: relative;
  border-radius: var(--van-cell-group-inset-radius);
  overflow: hidden;
}

.upload-form-cell-group {
  border-radius: var(--van-cell-group-inset-radius);
  overflow: hidden;
}
</style>