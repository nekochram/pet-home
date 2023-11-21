import axios from 'axios'
import {showToast} from 'vant'
import config from './config'
import router from '@/router'

const req=axios.create({
    ...config
})
// post请求头
req.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截器
req.interceptors.request.use(conf=>{
    // 带上 token 给后端
    conf.headers['Authorization'] = localStorage.getItem('token') || '';
    return conf
},error=>{
    return Promise.reject(error)
})

//响应拦截器
req.interceptors.response.use(response=>{
    let data=response.data
    if(data.code==200){
      return Promise.resolve(data)
    }else{
      return Promise.reject(data)
    }
},error=>{
  if(error?.response?.status){
    switch (error.response.status) {
      case 401:
        let redirect=router.currentRoute.value.fullPath
        showToast({
          type:'fail',
          message:'登陆过期',
          forbidClick:true
        })
        setTimeout(()=>{
          router.replace({
            path:'/login',
            query:{redirect}
          })
        },1000)
        break;
      case 404:
        showToast({
          type:'fail',
          message:'网络请求不存在',
          forbidClick:true
        })
      default:
        showToast({
          type:'fail',
          message:error.response.data.message||'出错啦',
          forbidClick:true
        })
        break;
    }
  }
  return Promise.reject(error.response)
})

export default req