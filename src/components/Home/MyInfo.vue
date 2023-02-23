<template>
  <div class="welcome-info">
    欢迎用户：{{ user.username }}
  </div>
  <van-button class="change-my-pwd" square block color="#2ce991" @click="showChangeMyPwd = true">修改密码</van-button>
  <div class="bug-report">
    <van-notice-bar wrapable :scrollable="false" text="因浏览器原生定位失效，sdk辅助定位偏差过大，所以暂不支持定位服务~😶‍🌫️" />
    <van-divider content-position="left" :style="{ color: '#111', borderColor: '#2ce991' }">
    </van-divider>
    <van-notice-bar wrapable :scrollable="false" text="图片左下角所指即为该照片绑定坐标" />
    <van-divider content-position="left" :style="{ color: '#111', borderColor: '#2ce991' }">
    </van-divider>
    <van-notice-bar wrapable :scrollable="false" text="上传或删除图片后需手动刷新浏览器，地图上的标记才能生效" />
    <van-button class="btnLogout" square block color="linear-gradient(to right, #ff6034, #ee0a24)" @click="logout"
      to="/login">退出登录</van-button>
  </div>

  <Transition name="changeMyPwd-mask">
    <div class="mask" v-show="showChangeMyPwd">
      <div class="mask-popup">
        <van-form @submit="onSubmit">
          <van-cell-group class="changeMyPwd-form-cell-group">
            <van-field v-model="password1" type="password" name="password" label="新密码" placeholder="输入新密码"
              autocomplete="off" :rules="[{ required: true, message: '请输入新密码' }]" />
            <van-field v-model="password2" type="password" name="password" label="确认密码" placeholder="再次输入密码"
              autocomplete="off" :rules="[{ required: true, message: '请输入二次密码' }]" />
          </van-cell-group>
          <van-button class="mask-popup-btn" square block size="normal" color="#2ce991"
            native-type="submit">确认</van-button>
        </van-form>
        <van-button class="mask-popup-btn" square block size="normal" color="#ff6034"
          @click="showChangeMyPwd = false">取消</van-button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import axios from "axios";
import { showFailToast, showSuccessToast } from "vant";
import { ref } from "vue"
import { useUserStore } from '../../store'

const user = useUserStore()
const showChangeMyPwd = ref(false) // 修改密码
const password1 = ref("")
const password2 = ref("")

const onSubmit = () => {
  if (password2.value === password1.value) {
    axios.post("http://xxx.xxx.xxx.xxx:3000/changeMyPwd", {
      username: user.username, password: password1.value
    }, {
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      showSuccessToast(res.data)
      showChangeMyPwd.value = false
    })
  } else {
    showFailToast("两次输入密码不一致")
    password2.value = ""
  }
}

const logout = () => {
  user.$reset()
}


</script>

<style scoped>
.welcome-info {
  font-size: 2rem;
}

.change-my-pwd {
  margin-top: 8%;
}

.bug-report {
  margin-top: 20%;
}

.btnLogout {
  position: absolute;
  bottom: 8%;
}

.changeMyPwd-mask-enter-active,
.changeMyPwd-mask-leave-active {
  transition: opacity 0.5s ease;
}

.changeMyPwd-mask-enter-from,
.changeMyPwd-mask-leave-to {
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
  top: 30%;
  width: 80%;
  margin: auto;
}

.changeMyPwd-form-cell-group {
  border-radius: var(--van-cell-group-inset-radius);
  overflow: hidden;
}

.mask-popup-btn {
  margin-top: 6px;
  width: 100%;
  border: 0;
  border-radius: var(--van-cell-group-inset-radius);
}
</style>