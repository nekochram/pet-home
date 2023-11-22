import { defineStore } from "pinia";
import { login,setFondCollect,getFondCollect } from "@/api";

const defaultState = {
  userInfo: {
    // 我的信息
    id: "",
    name: "",
    sign: "",
    userImg: "",
  },
  isLogin: false, // 记录登录状态
  socket: [], // websocket实例
  chatInfo: {
    // 聊天对象的信息
    id: "",
    name: "",
    userImg: "",
    islogin: false,
    listId: "",
  },
  chatList: [], // 聊天对象列表
  unreadObj: {
    // 未读消息总数
    num: 0,
  },
  chatMessageList: [], // 聊天对象记录
  userPet: [], // 用户的宠物信息
  userCollect: [], // 用户收藏的宠物信息
  exitPetIndex: 0, // 被修改宠物的index

  pageStack: [], // 全局页面栈
};

export const userStore = defineStore("user", {
  state: () => defaultState,
  actions: {
    //用户登录
    loginByUserNameSync(username, password) {
      return new Promise((resolve, reject) => {
        login({ username, password }).then((res) => {
          const { token, ...userInfo } = res.data;
          this.userInfo = userInfo;
          localStorage.setItem("token", res.data.token);
          resolve(res);
        }).catch(error=>{
          console.log(error)
          reject(error)
        });
      })
    },
    // 全局页面栈操作
    pageStackPush(item) { this.pageStack.push(item) },
    pageStackShift() { this.pageStack.shift() },
    getPageStack() { return this.pageStack },
    //用户信息操作
    getUnreadSum() { return this.unreadObj},
    getUserName(){ return this.userInfo.name; },
    getUserImg(){ return this.userInfo.userImg; },
    getUserSign(){ return this.userInfo.sign; },
    getChatList() { return this.chatList; },
    //关注/取关宠物
    setFondCollectStatus(id){
      return new Promise((resolve, reject) => {
        setFondCollect({ id }).then((res) => {
          resolve(res);
        }).catch(error=>{
          console.log(error)
          reject(error)
        });
      })
    },
    //查询宠物关注状态
    queryCollectStatus(id){
      return new Promise((resolve, reject) => {
        getFondCollect({ id }).then((res) => {
          resolve(res);
        }).catch(error=>{
          console.log(error)
          reject(error)
        });
      })
    }
  },
  persist: {
    // 开启数据缓存
    enabled: true,
  },
});
