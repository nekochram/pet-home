export default {
    socketUrl: 'http://192.168.4.33:3030',// socket路径
    baseURL: process.env.NODE_ENV=='production'?'http://192.168.4.33:4000':'/api',// 服务器路径
    timeout:1000,
    withCredentials:true
}