<script setup>
import BottomBar from "@/components/BottomBar/index.vue"
import { useRoute } from "vue-router";
const route=useRoute()
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
    <BottomBar v-if="route.meta.type==='view'"></BottomBar>
  </router-view>
</template>

<style lang="less" scoped>

</style>