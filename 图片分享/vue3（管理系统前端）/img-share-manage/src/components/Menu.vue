<template>
  <el-menu
    :default-active="activeMenu"
    class="side-menu"
    :collapse="isCollapse"
    router
  >
    <el-menu-item index="/dashboard">
      <el-icon><DataAnalysis /></el-icon>
      <template #title>数据仪表盘</template>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon><User /></el-icon>
      <template #title>用户管理</template>
    </el-menu-item>
    <el-menu-item index="/image">
      <el-icon><Picture /></el-icon>
      <template #title>图片管理</template>
    </el-menu-item>
    <el-menu-item index="/comment">
      <el-icon><ChatDotRound /></el-icon>
      <template #title>评论管理</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = computed(() => route.path)
const isCollapse = false
</script>

<style lang="less" scoped>
.side-menu {
  height: 100%;
  border-right: none;
  background-color: #304156;

  .el-menu-item {
    color: #bfcbd9;
    &:hover {
      background-color: #263445 !important;
      color: #409eff;
    }
    &.is-active {
      background-color: #263445 !important;
      color: #409eff;
      border-right: 3px solid #409eff;
    }
  }
}
</style>
