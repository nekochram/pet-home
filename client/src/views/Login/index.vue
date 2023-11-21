<template>
  <div class="page">
    <div class="header">
      <p>Hello!</p>
      <p>Good to see you here</p>
    </div>

    <div class="main_wrap">
      <img src="@/assets/icons/login.svg" class="login_icon" />

      <!-- login -->
      <van-form @submit="onSubmit" v-if="state.type === 'login'" class="form">
        <van-cell-group inset>
          <van-field
            v-model="state.username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="state.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            class="login_btn"
            >登录</van-button
          >
          <p class="change_btn" @click="changType('register')">
            没有账号，前往注册
          </p>
        </div>
      </van-form>

      <!-- register -->
      <van-form @submit="onSubmit" v-else class="form">
        <van-cell-group inset>
          <van-field
            v-model="state.username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="state.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="state.verify"
            name="verify"
            label="验证码"
            placeholder="验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #button>
              <VueImageVerifyVue ref="verifyRef" @sendImgCode="getImgCode" />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            class="login_btn"
            >注册</van-button
          >
          <p class="change_btn" @click="changType('login')">
            已有账号，点击注册
          </p>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { register } from "@/api";
import VueImageVerifyVue from "./components/VueImageVerifyVue.vue";
import { reactive, ref } from "vue";
import { userStore } from "@/store/user";
import { showFailToast, showSuccessToast } from "vant";
import { useRouter } from "vue-router";
const router=useRouter()
const uStore=userStore()
const verifyRef = ref(null);
//登录和注册的表单
const state = reactive({
  username: "",
  password: "",
  verify: "", //用户输入的验证码
  imgCode: "", //正确的验证码
  type: "login",
});
console.log(router)
const onSubmit = () => {
  if (state.type == "login") {
    //登录
    uStore.loginByUserNameSync(state.username,state.password).then(res=>{
      showSuccessToast(res.mess)
      if(router.currentRoute.value.query?.redirect){
        router.replace(router.currentRoute.value.query.redirect)
      }else{
        router.replace("/home")
      }
    }).catch(error=>{
      showFailToast(error.message||'登陆失败')
    })
  } else {
    //注册
    if(state.imgCode.toLowerCase()!=state.verify.toLowerCase()){
      showFailToast("验证码错误")
      verifyRef.value?.handleDraw()
      return
    }
    register({
      username: state.username,
      password: state.password,
      userimg: 'user_001',
      usersign: '今日份营业汪 ! ! !'
    }).then(res=>{
      if(res.code==200){
        showSuccessToast(res.mess)
        state.type="login"
      }else{
        return Promise.reject(res.mess)
      }
    }).catch(error=>{
      showFailToast(error.message||'注册失败')
    })
  }
};
// 切换登录注册
const changType = (type) => {
  state.type = type;
};

// 获取子组件传递过来的imgCode
const getImgCode = (val) => {
  state.imgCode = val;
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  background-color: @primary;
  .header {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    font-size: 35px;
    color: #fff;
    p:last-child {
      font-size: 18px;
      margin-top: 10px;
    }
  }
  .main_wrap {
    width: 100%;
    height: calc(100% - 200px);
    position: absolute;
    bottom: 0;
    background-color: #fff;
    border-radius: 47px 47px 0 0;
    border-top: 4px solid #683931;
    .login_icon {
      position: absolute;
      bottom: 100%;
      right: 0;
      transform: translate(-12%, 25%);
    }
    .form {
      margin-top: 1rem;
      .login_btn {
        margin-top: 1rem;
        background-color: @primary;
        border: none;
      }
      .change_btn {
        text-align: center;
        margin: 1rem 0;
        color: @primary;
        font-size: 14px;
      }
    }
  }
}
</style>
