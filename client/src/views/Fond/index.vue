<template>
  <div class="page">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="header">
        <p class="title">喜爱</p>
        <van-icon name="search" />
      </div>

      <div class="content_wrap">
        <van-sticky>
          <div class="tool_wrap">
            <van-dropdown-menu active-color="#f8b158">
              <van-dropdown-item v-model="type" :options="optionType" @change="changeType" />
              <van-dropdown-item v-model="sort" :options="optionSort" @change="changeSort" />
            </van-dropdown-menu>
          </div>
        </van-sticky>

        <div class="content" v-if="petFondList.length !== 0 && !refreshPage">
          <div class="item" v-for="item in petFondList" :key="item.petid">
            <PetCardVue :petItem="item" :petCollect="false" @open="sheetOpen" />
          </div>
        </div>

        <div class="content_sheleton" v-else-if="refreshPage">
          <SkeletonVue />
        </div>

        <van-empty class="custom-image" :image="getImageUrl('assets/imgs/page/empty.png')" description="没有什么也没有汪"
          v-else-if="petFondList.length == 0" />
      </div>

    </van-pull-refresh>

    <van-action-sheet :show="show" :actions="actions" @cancel="onClose" @select="onSelect" cancel-text="取消" />
  </div>
</template>

<script setup>
import PetCardVue from "@/components/PetCard/index.vue"
import SkeletonVue from "@/views/Home/components/Skeleton.vue"
import { onMounted, ref } from "vue";
import { getImageUrl } from "@/utils/tool";
import { userStore } from "@/store/user"
import { showConfirmDialog } from "vant";
const uStore = userStore()
const loading = ref(false)
const refreshPage = ref(false)
let petFondList = ref([])//筛选后进行展示的宠物
let allFondPet = []//全部关注的宠物
const show = ref(false)
let actionPetId = ''
const type = ref('all')
const sort = ref('fond')
const optionType = [
  { text: '全部', value: 'all' },
  { text: '类别：犬', value: '犬' },
  { text: '类别：猫', value: '猫' },
  { text: '类别：鸟', value: '鸟' },
  { text: '类别：兔', value: '兔' },
  { text: '类别：鼠', value: '鼠' },
  { text: '类别：鱼', value: '鱼' },
]
const optionSort = [
  { text: '喜爱排序', value: 'fond' },
  { text: '时间排序', value: 'time' },
]
const actions = [
  {
    action: "uncheck",
    name: '取消喜爱',
  },
]
const onRefresh = () => {
  refreshPage.value = true
  getPetList()
}
const onClose = () => {
  show.value = false;
}
const onSelect = (value) => {
  if (value.action === 'uncheck') {
    showConfirmDialog({
      message: "确定取消关注该宠物吗？",
    }).then(() => {
      uStore.setUserCollect(actionPetId);
      state.show = false;
      getPetList()
    }).catch(() => {
      state.show = false;
    });
  }
}
const sheetOpen = (params) => {
  show.value = params.type
  actionPetId = params.petid
}

//切换显示类型
const changeType = value => {
  setPetFondList()
}

//切换排序方式
const changeSort = value => {
  if (value == "time") {
    petFondList.value.sort((a, b) => b.ctime - a.ctime);
  } else {
    setPetFondList()
  }
}

const getPetList = () => {
  uStore.getFondInfoSync().then(res => {
    allFondPet = res.data
    setPetFondList();
    refreshPage.value = false
  });
}

//根据类型切换显示的宠物
const setPetFondList = () => {
  const unSortList = type.value === 'all' ? [].concat(allFondPet) : allFondPet.filter(value => value.petcategory === type.value);
  petFondList.value = sort.value == "time" ? unSortList.sort((a, b) => b.ctime - a.ctime) : unSortList
}

onMounted(() => {
  getPetList()
})

</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: calc(100% - 50px);
  background-color: @primary;

  .header {
    width: 100%;
    height: 60px;
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    font-size: 0.5rem;
    color: @color-text-header;
  }

  .content_wrap {
    width: 100%;
    min-height: calc(100vh - 110px);
    background-color: #fff;
    border-radius: 32px 32px 0 0;
    overflow: hidden;
    border-top: 4px solid #683931;

    .tool_wrap {
      margin-bottom: 15px;

      :deep(.van-dropdown-menu__title) {
        color: @card-color;
      }
    }

    .content {
      width: 100%;
      overflow: scroll;
      display: grid;
      grid-template-columns: 50% 50%;
      justify-items: center;
      margin-bottom: 60px;

      .item {
        width: 91%;
        margin-bottom: 20px;
      }
    }

    .content_sheleton {
      width: 100%;
      height: calc(100vh - 158px);
    }
  }
}

:deep(.van-empty__image) {
  opacity: 0.3;
}

:deep(.van-pull-refresh__head) {
  color: #fff;
}

:deep(.van-loading) {
  &>span {
    color: #fff;
  }
}
</style>
