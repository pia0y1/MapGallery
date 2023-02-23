<template>
  <van-form @submit="onSubmit">
    <van-cell-group class="upload-form-cell-group">
      <van-field name="uploader" label="照片" :rules="[{ required: true, message: '输选择照片' }]">
        <template #input>
          <van-uploader v-model="file" :max-count="1" :after-read="afterRead" />
        </template>
      </van-field>
      <van-field v-model="t" name="t" label="标题" placeholder="请输入标题" :rules="[{ required: true, message: '输入照片标题' }]" />
      <van-field v-model="sl" is-link readonly name="sl" label="城市" placeholder="点击选择城市"
        @click="showArea = !showArea, showMap = false" :rules="[{ required: true, message: '请选择城市' }]" />
      <van-field v-model="sc" is-link readonly name="sc" label="位置" placeholder="点击地图选择位置"
        @click="showMap = !showMap, showArea = false" :rules="[{ required: true, message: '请选择位置' }]" />
    </van-cell-group>
    <Transition name="map-view">
      <div class="map-view-container" v-if="showMap">
        <MapView @marker-point="p => sc = p" />
      </div>
    </Transition>
    <van-button class="mask-popup-btn" square block size="normal" color="#2ce991" native-type="submit">上传</van-button>
  </van-form>

  <!-- 地区选择框 -->
  <Transition name="area-popup">
    <div class="area-popup" v-show="showArea">
      <van-area :area-list="areaList" @confirm="onConfirmLocation" @cancel="showArea = false" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MapView from "./MapView.vue";
import axios from "axios";
import { showFailToast, showSuccessToast } from "vant";
import { areaList } from '@vant/area-data';
import { useUserStore } from "../../store"
import dateFilter from "../../utils/date"

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
interface ImageType {
  t: string
  fn: string
  per: string
  sd: string
  st: string
  sdt: string
  sl: string
  sc: string
}

const emit = defineEmits<{ (event: "showUploadMask", value: boolean): void }>()
const user = useUserStore()

const showArea = ref(false)
const showMap = ref(false)

const file = ref() // 文件选择器获取的原始文件对象
const lmd = ref() // lastModifiedDate该文件最后被修改的时间（YYYYMMDDHHmmss）

const t = ref() // title标题
const fn = ref() // filename文件名.后缀名
const per = ref() // photographer拍摄者账号
const sd = ref() // shooting date拍摄 YYYYMMDD
const st = ref() // shooting time拍摄 HHmmss
const sdt = ref() // shooting date time拍摄 YYYYMMDDHHmmss
const sl = ref() // shooting location拍摄地
const sc = ref() // shooting coordinate拍摄地坐标

const onSubmit = () => { // 上传按钮上传操作
  // console.log(t.value,fn.value,per.value,sd.value,st.value,sdt.value,sl.value,sc.value) // correct
  const formData = new FormData()
  let suffix = fn.value.substring(fn.value.lastIndexOf("."))

  // 此处顺序：字符类型数据必须放在文件类型数据之前
  formData.append("username", user.username)
  formData.append("imgInfo", JSON.stringify({
    "t": t.value,
    "fn": sdt.value.concat(suffix), // 使用 sdt.后缀名 作为文件名
    "per": per.value,
    "sd": sd.value,
    "st": st.value,
    "sdt": sdt.value,
    "sl": sl.value,
    "sc": sc.value
  }))
  formData.append("image", file.value[0].file, sdt.value.concat(suffix))

  axios.post("http://60.205.206.45:3000/upload", formData)
    .then(response => {
      showSuccessToast(response.data)
      setTimeout(() => {
        emit("showUploadMask", false)
      }, 800)
    }).catch(error => {
      showFailToast(error)
    })
}

const afterRead = (f: any) => { // 选择照片完成后自动赋值
  fn.value = f.file.name
  per.value = user.username
  lmd.value = f.file.lastModifiedDate
  const afterFormat = dateFilter.getTimeWithoutSpace(lmd.value, "YYYYMMDDHHmmss")
  sd.value = afterFormat?.slice(0, 8)
  st.value = afterFormat?.slice(8, 14)
  sdt.value = afterFormat
}
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

.map-view-enter-from,
.map-view-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.map-view-enter-active {
  transition: all 0.3s ease-out;
}

.map-view-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.upload-form-cell-group {
  border-radius: var(--van-cell-group-inset-radius);
  overflow: hidden;
}

.area-popup {
  position: fixed;
  bottom: 8%;
  width: 100%;
  left: 0;
  transition: all 1s;
}

.area-popup-enter-from,
.area-popup-leave-to {
  transform: translateY(320px);
  /* opacity: 0; */
}

.area-popup-enter-active {
  transition: all 0.3s ease-out;
}

.area-popup-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>