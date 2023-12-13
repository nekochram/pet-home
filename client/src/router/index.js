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
  {
    path: '/petSpace',
    name: 'petSpace',
    component: () => import('@/views/PetSpace/index.vue'),
    meta: {
      type: 'petSpace',
      keepAlive: false
    }
  },
  {
    path: '/addPet',
    name: 'addPet',
    component: () => import('@/views/addPet/index.vue'),
    meta: {
      type: 'page',
      keepAlive: false
    }
  },
  {
    path: '/myPet',
    name: 'myPet',
    component: () => import('@/views/myPet/index.vue'),
    meta: {
      type: 'page',
      keepAlive: false
    }
  },
  {
    path: '/editUserInfo',
    name: 'editUserInfo',
    component: () => import('@/views/editUserInfo/index.vue'),
    meta: {
      type: 'page',
      keepAlive: false
    }
  },
  {
    path: '/userSpace',
    name: 'userSpace',
    component: () => import('@/views/userSpace/index.vue'),
    meta: {
      type: 'userSpace',
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