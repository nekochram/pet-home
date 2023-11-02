import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      type: "page",
      keepAlive: false,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      type: 'view',
      keepAlive: true
    }
  },
  {
    path: '/fond',
    name: 'fond',
    component: () => import('@/views/Fond/index.vue'),
    meta: {
      type: 'view',
      keepAlive: false
    }
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import('@/views/Comment/index.vue'),
    meta: {
      type: 'view',
      keepAlive: false
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/index.vue'),
    meta: {
      type: 'view',
      keepAlive: false
    }
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