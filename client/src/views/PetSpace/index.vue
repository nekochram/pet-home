<template>
  <div class="page">
    <div class="page_head">
      <div @click="back(router)">
        <i class="iconfont icon-zuojiantou-"></i>
      </div>
      <div @click.stop="cardColl(petInfo.petid)" class="floatBox">
        <i class="iconfont icon-aixin_shixin iconColl2" v-if="collect"></i>
        <i class="iconfont icon-aixin_shixin iconColl1" v-else></i>
      </div>
    </div>

    <div class="pet_wrap" ref="petWrap">
      <van-image width="100%" height="11rem" fit="cover" :src="petInfo.petimg" show-loading />
    </div>

    <div class="content_wrap" ref="tabsHeaderRef" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">

      <div class="name_wrap">
        <div class="name_content">
          <span class="name">{{ petInfo.petname }}</span>
          <span class="age">（{{ petInfo.petage }}岁）</span>
        </div>
        <div class="icon_wrap">
          <i class="iconfont icon-weizhi"></i>
          <span class="location">北京</span>
        </div>
      </div>

      <div class="info_wrap">
        <div class="info_item">
          <span class="info_data">{{ petInfo.petsex === '1' ? '雄' : '雌' }}</span>
          <span class="info_name">性别</span>
        </div>
        <div class="info_item">
          <span class="info_data">{{ petInfo.petcolor }}</span>
          <span class="info_name">颜色</span>
        </div>
        <div class="info_item">
          <span class="info_data">{{ petInfo.petbreed }}</span>
          <span class="info_name">品种</span>
        </div>
        <div class="info_item">
          <span class="info_data">{{ petInfo.petweight }}kg</span>
          <span class="info_name">重量</span>
        </div>
      </div>

      <div class="host_wrap">
        <div class="host_img">
          <van-image width="1.4rem" height="1.4rem" fit="cover"
            :src="userInfo.userimg?getImageUrl('assets/imgs/user_photo/' + userInfo.userimg + '.png'):''" />
        </div>
        <div class="host_name">
          <span class="first">Owner by.</span>
          <span class="name">{{ userInfo.username }}</span>
        </div>

        <div class="host_session" @click="toRelatedPage('userSpace', router, 0, queryInfo)" v-if="!selfPet">
          <i class="iconfont icon-wode"></i>
        </div>
        <div class="host_session" @click="toChatPage">
          <i class="iconfont icon-008duihuakuang-6"></i>
        </div>
      </div>

      <div class="sign_wrap">
        {{ petInfo.petmessage }}
      </div>

    </div>
  </div>
</template>

<script setup>
import { toRelatedPage, back } from '@/router/tools';
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { userStore } from '@/store/user';
import { getImageUrl } from '@/utils/tool';
import { petSpaceById } from '@/api';
const router = useRouter()
const route = useRoute()
const uStore = userStore()
const petWrap = ref(null)
const tabsHeaderRef = ref(null)
const { petid, hostid } = route.query
const collect = ref(false)
let petInfo = reactive({})
let userInfo = reactive({})
let chetInfo = reactive({})
let queryInfo = reactive({ userId: '' })
const selfPet = ref(true)//是否是自己的宠物
const position = reactive({
  startY: "",
  endY: "",
})
const cardColl = (id) => {
  uStore.setFondCollectStatus(id).then(res => {
    collect.value = res.data
  })
}
const toChatPage = () => {
  toRelatedPage('chatPage', router, 500, chetInfo);
}
const touchstart = event => {
  position.startY = event.touches[0].pageY;
}
const touchmove = event => {
  position.endY = event.touches[0].pageY;
}
const touchend = () => {
  let {startY,endY}=position
  if(endY - startY > 0){
    //头图缩小并聚焦，下方信息栏向下移动
    tabsHeaderRef.value.style.height="calc(100% - 10rem)"
    petWrap.value.style.filter="blur(0rem)"
    petWrap.value.style.transform="scale(1)"
  }else{
    //头图放大并模糊，下方信息栏向上移动
    tabsHeaderRef.value.style.height="calc(100% - 5rem)"
    petWrap.value.style.filter="blur(.1rem)"
    petWrap.value.style.transform="scale(1.2)"
  }
}
const getPageInfo = () => {
  petSpaceById({ petid, hostid }).then(res => {
    petInfo = Object.assign(petInfo, res.data.petInfo)
    userInfo = Object.assign(userInfo, res.data.userInfo)
    queryInfo.userId = res.data.userInfo.id;
    chetInfo = Object.assign(userInfo, {
      chatId: res.data.userInfo.id,
      chatName: res.data.userInfo.username,
      chatImg: res.data.userInfo.userimg
    })
    selfPet.value = uStore.getUserName() === res.data.userInfo.username
    const chatList = uStore.getChatList();
    chetInfo.listId = '';
    chatList.forEach(item => {
      if (item.userId == chetInfo.chatId) {
        chetInfo.listId = item.id;
      }
    });
  })
}
const queryCollectStatus = (id) => {
  uStore.queryCollectStatus(id).then(res => {
    collect.value = res.data;
  })
}
onMounted(() => {
  queryCollectStatus(petid)
  getPageInfo()
})
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: @primary;
  overflow: hidden;

  .page_head {
    width: 100%;
    height: 1.6rem;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.5rem;
    color: @color-text-header;
    position: absolute;
    z-index: 100;

    i {
      color: #5e5b5b;
      font-size: 0.6rem;
      background-color: #fff;
      padding: 0.2rem;
      border-radius: 0.3rem;
    }

    .floatBox {
      .iconColl1 {
        // font-size: 0.5rem;
        color: #d8d8d8;
      }

      .iconColl2 {
        // font-size: 0.5rem;
        color: #ff6969;
      }

      i {
        padding: 0.19rem 0.23rem 0.21rem 0.2rem;
      }
    }
  }

  .pet_wrap {
    width: 100%;
    height: 11rem;
    transition: all 0.2s ease-in;
  }

  .content_wrap::before {
    content: '';
    width: 1.5rem;
    height: 2px;
    border-radius: 2px;
    background-color: @primary;
    position: absolute;
    top: .2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .content_wrap {
    width: 100%;
    height: calc(100% - 10rem);
    border-radius: 32px 32px 0 0;
    padding: 40px 20px;
    box-sizing: border-box;
    background-color: @primary-bg;
    border-top: 4px solid #683931;
    position: absolute;
    bottom: 0;
    transition: all 0.2s ease-in-out;

    &>div {
      width: 100%;
      margin-bottom: .6rem;
    }

    .name_wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name_content {
        display: flex;
        align-items: center;

        .name {
          max-width: 5rem;
          .line-clamp1();
          color: #5e5b5b;
          font-size: .6rem;
          font-weight: 800;
        }

        .age {
          color: @card-color;
          font-size: .4rem;
        }

      }

      .icon_wrap {
        display: flex;
        align-items: center;

        &>i {
          color: @primary;
          font-size: .6rem;
          font-weight: 800;
          line-height: .9rem;
        }

        .location {
          font-size: .35rem;
          color: @card-color;
        }
      }
    }

    .info_wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info_item {
        width: 2.0rem;
        padding: 0.3rem;
        box-sizing: border-box;
        border: 1px solid #8d9f5e41;
        border-radius: .3rem;
        text-align: center;

        &>span {
          display: block;
          line-height: .5rem;
        }

        .info_data {
          .line-clamp1();
          font-size: .4rem;
          color: @primary;
        }

        .info_name {
          font-size: .3rem;
          color: @card-color;
          transform: scale(.9);
        }
      }
    }

    .host_wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .host_img {
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        overflow: hidden;
      }

      .host_name {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        transform-origin: 0%;
        transform: scale(.8);
        margin-left: 10px;

        .first {
          font-size: .3rem;
          line-height: .4rem;
          color: @card-color;
        }

        .name {
          .line-clamp1();
          font-size: .5rem;
          font-weight: 600;
          line-height: .7rem;
          color: #5e5b5b;
        }
      }

      .host_session {
        width: 1rem;
        height: 1rem;
        background-color: @primary;
        border-radius: 50%;
        // padding: 0.2rem;
        text-align: center;
        margin-left: .3rem;

        &>i {
          color: #fff;
          font-size: .6rem;
          font-weight: 800;
          line-height: 1rem;
        }
      }
    }

    .sign_wrap {
      color: @card-color;
      font-size: .35rem;
      line-height: .56rem;
    }
  }
}
</style>
