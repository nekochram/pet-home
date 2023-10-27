import {defineStore} from "pinia"
import { login } from "@/api";

const defaultState = {
  userInfo: {   // 我的信息
      id: '',
      name: '',
      sign: '',
      userImg: '',
  },
  isLogin:false,  // 记录登录状态
  socket: [],  // websocket实例
  chatInfo: {    // 聊天对象的信息
      id: '',
      name: '',
      userImg: '',
      islogin: false,
      listId: ''
  },
  chatList:[],         // 聊天对象列表
  unreadObj: {         // 未读消息总数
      num: 0
  },
  chatMessageList:[],  // 聊天对象记录
  userPet: [],         // 用户的宠物信息
  userCollect: [],     // 用户收藏的宠物信息
  exitPetIndex: 0,     // 被修改宠物的index

  pageStack: [],  // 全局页面栈
};

export const userStore =defineStore(
  'user',
  {
    state:()=>defaultState,
    actions:{
      //用户登录
      loginByUserNameSync(username,password){
        login({username,password}).then(res=>{
          const {token,...userInfo} = res.data;
          this.userInfo = userInfo;
          localStorage.setItem('token', token);
          resolve(res.mess);
        })
      }
    },
    persist: {  // 开启数据缓存
        enabled: true
    }
  }
)