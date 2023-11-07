<template>
  <div class="page" ref="pageBox">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="search_wrap">
        <div class="search">
          <van-icon name="search" class="search_icon" size="20" />
          <p class="search_text">寻找你喜欢的宠物</p>
        </div>
      </div>

      <div class="header">
        <div class="title">
          <p>Adopt a</p>
          <p>Friend</p>
        </div>
        <div class="header_image">
          <img src="@/assets/icons/home.svg" alt="" />
        </div>
      </div>

      <div class="main_wrap">
        <div class="tab_wrap">
          <p class="title_h1">
            <span class="left">宠物类别</span>
            <span class="right">左滑更多类别</span>
          </p>
          <van-tabs v-model:active="active" background="#fdfdfd" line-width="0px" ref="scroll">
            <van-tab v-for="item in typeMap" :key="item.icon">
              <!-- 宠物种类 -->
              <template #title>
                <div class="icon_wrap" :class="{ 'iconActive': active == item.type }" @click="cutPetData(item.type)">
                  <i class="iconfont" :class="item.icon"></i>
                  <p>{{ item.name }}</p>
                </div>
              </template>
              <!-- 宠物展示 -->
              <p class="title_h1">
                <span class="left">收养宠物</span>
                <span class="right">{{ item.name }}类</span>
              </p>
              <div class="content_wrap" v-if="refreshPage">
                <div class="item" v-for="item in petInfoList[active].petList" :key="item.petid">
                  <PetCardVue :petItem="item" />
                </div>
              </div>

              <div class="content_sheleton" v-else>
                <SkeletonVue />
              </div>
              <!-- 结束 -->
              <van-divider contentPosition="center" v-if="petInfoList[active].end">已经没有更多了</van-divider>
            </van-tab>
          </van-tabs>
        </div>
      </div>
      <!-- </div> -->

      <div class="load" v-show="petLoad">
        <van-loading size="24px" vertical color="#f8b158">加载中...</van-loading>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import PetCardVue from "@/components/PetCard/index.vue"
import SkeletonVue from "./components/Skeleton.vue"
import { typeMap } from '@/assets/icons/icon.js';
import { onMounted, onActivated, onDeactivated, ref } from 'vue';
import { showToast,showFailToast } from "vant";
import { throttle } from "@/utils/tool"
import { toLoadPetInfo } from "@/api";
let rememberScroll = 0 // 当前页面滚动高度
const pageBox = ref(null)
const loading = ref(false);
const active = ref(0)
const refreshPage = ref(true)
const petInfoList = [
  {
    type: '犬',
    petList: [],
    current: 1,
    end: false,
  },
  {
    type: '猫',
    petList: [],
    current: 1,
    end: false,
  },
  {
    type: '鸟',
    petList: [],
    current: 1,
    end: false,
  },
  {
    type: '兔',
    petList: [],
    current: 1,
    end: false,
  },
  {
    type: '鼠',
    petList: [],
    current: 1,
    end: false,
  },
  {
    type: '鱼',
    petList: [],
    current: 1,
    end: false,
  }
]
const limits = 4//每次请求获取的宠物数量
const petLoad = ref(false)
//滚动监听方法
const scrollFn = () => {
  let { scrollTop, clientHeight, scrollHeight } = pageBox.value
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    //触底
    reqPetData(active.value)
  }
}
// 请求宠物数据
const reqPetData = (index) => {
  let { type, current, end } = petInfoList[index]
  if (!end) {
    petLoad.value = true
    toLoadPetInfo({
      current,
      limits,
      type,
    }).then(res => {
      if (res.data.length > 0) {
        petInfoList[index].current = current + 1
        petInfoList[index].petList.push(...res.data)
      }
      if (res.data.length < limits) {
        petInfoList[index].end = true
      }
    }).finally(() => {
      petLoad.value = false
    }).catch(error => {
      showFailToast(error.message || '出错啦')
    })
  }
}
//宠物分类tab点击后
const cutPetData = (index) => {
  if (petInfoList[index].petList.length == 0) {
    reqPetData(index)
  }
}
//下拉刷新
const onRefresh = () => {
  toLoadPetInfo({
    current: 1,
    limits,
    type: petInfoList[active.value].type,
  }).then(res => {
    petInfoList[active.value].current = 2
    petInfoList[active.value].petList = res.data
    if (res.data.length < limits) {
      petInfoList[active.value].end = true
    }
    showToast('刷新成功');
  }).finally(() => {
    loading.value = false;
  }).catch(error => {
    showFailToast(error.message || '出错啦')
  })
};
//挂载后
onMounted(() => {
  pageBox.value.onscroll = throttle(scrollFn, 500)
  reqPetData(active.value)
})
onActivated(() => {
  pageBox.value.scrollTop = rememberScroll;
});

onDeactivated(() => {
  rememberScroll = pageBox.value.scrollTop;
});
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: calc(100% - 50px);
  // padding: 0 20px;
  // box-sizing: border-box;

  // overflow: auto;
  overflow: scroll;

  .header {
    width: 94%;
    border-radius: 0.2rem;
    background-color: @primary;
    display: flex;
    align-items: center;
    margin: 0 .3rem;

    .title {
      flex: 1;
      font-size: .8rem;
      color: @color-text-header;
      text-align: center;

      p:last-child {
        font-size: .8rem;
        margin-top: 10px;
        font-weight: lighter;
      }
    }
  }

  .search_wrap {
    width: 100%;
    height: 35px;
    // padding: 0 10px 20px;
    box-sizing: border-box;
    margin: 0.3rem auto;
    padding: 0 .3rem;

    .search {
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      border-radius: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: @color-text-search;

      .search_icon {
        width: 20px;
        height: 20px;
        margin: 15px;
      }

      .search_text {
        flex: 1;
      }
    }
  }

  .main_wrap {
    width: 100%;
    border-radius: 32px 32px 0 0;
    box-sizing: border-box;
    background-color: @primary-bg;
    margin-bottom: 60px;

    .tab_wrap {
      width: 100%;

      :deep(.van-tab__text) {
        border-radius: 3rem;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
          rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      }

      :deep(.van-tabs__wrap) {
        height: 1.3rem;
      }

      :deep(.van-tabs__nav) {
        margin-left: -0.4rem;
      }

      .icon_wrap {
        width: 1.6rem;
        height: 1rem;
        border-radius: 3.5rem;
        background-color: #fff;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: #9c9b9a;

        .iconfont {
          width: 0.7rem;
          height: 0.7rem;
          color: #fff;
          background-color: #92783170;
          border-radius: 50%;
          font-size: 0.5rem;
          font-weight: 600;
          text-align: center;
          line-height: 0.7rem;
        }
      }

      .iconActive {
        background-color: @primary;
        color: #fff;

        .iconfont {
          color: #fff;
          background-color: #6672499b;
        }
      }

      .title_h1 {
        margin: 0 .3rem;
      }

      .content_wrap {
        width: 100%;
        // display: flex;
        // flex-wrap: wrap;
        overflow: scroll;
        display: grid;
        grid-template-columns: 50% 50%;
        justify-items: center;

        .item {
          width: 91%;
          margin-bottom: 20px;
        }
      }

      .footer_wrap {
        text-align: center;
        color: #9c9b9a;
      }
    }
  }
}

.load {
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #8d9f5eda;
  border-radius: 0.3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  // color: ;
}
</style>