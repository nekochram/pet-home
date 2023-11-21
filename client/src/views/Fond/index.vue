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
              <van-dropdown-item v-model="type" :options="optionType" />
              <van-dropdown-item v-model="sort" :options="optionSort" />
            </van-dropdown-menu>
          </div>
        </van-sticky>

        <div class="content" v-if="petFondList.length !== 0 && refreshPage">
          <div class="item" v-for="item in petFondList" :key="item.petid">
            <PetCardVue :petItem="item" :petCollect="false" @open="sheetOpen" />
          </div>
        </div>

        <div class="content_sheleton" v-else-if="!refreshPage">
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
import SkeletonVue from "@/views/Home/components/Skeleton.vue"
import { ref } from "vue";
import { getImageUrl } from "@/utils/tool";
const loading = ref(false)
const refreshPage = ref(false)
const petFondList = ref([])
const show = ref(false)
const onRefresh = () => {

}
const type = ref('all')
const sort = ref('time')
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
  { text: '时间排序', value: 'time' },
  { text: '喜爱排序', value: 'fond' },
]
const actions = [
  {
    name: '取消喜爱',
  },
]
const onClose = () => {

}
const onSelect = () => {

}
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
