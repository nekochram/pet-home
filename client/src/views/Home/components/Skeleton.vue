<template>
  <div class="content">
      <van-skeleton avatar avatar-size="4.2rem" row="2" v-for="item in 6" :key="item"/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.content{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    overflow: hidden;
}
:deep(.van-skeleton) {
    flex-direction: column;
    margin-bottom: 20px;
}
:deep(.van-skeleton__avatar) {
    border-radius: .2rem .2rem .6rem .2rem; 
}
</style>