import { createRouter, createWebHistory } from "vue-router";
const routes = [
//   {
//     path: "/",
//     redirect: "/home",
//   },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      type: "page",
      keepAlive: false,
    },
  },
];
const router=createRouter({
    history:createWebHistory(),
    routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
    if(!localStorage.getItem('token')&&to.name!='login'){
        return next({name:'login'})
    }
    next()
})

export default router