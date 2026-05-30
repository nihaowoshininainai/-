<script setup lang="ts">

</script>

<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <div class="header-left">
        <el-icon><Monitor /></el-icon>
        <span>图片分享网站管理系统</span>
      </div>
    </el-header>
    <el-container class="main-container">
      <el-aside width="200px" class="layout-aside">
        <Menu />
      </el-aside>
      <el-main class="layout-main">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.layout-container {
  height: 100vh;
  overflow: hidden;
}
.layout-header {
  display: flex;
  align-items: center;
  background: #263445;
  color: #fff;
  padding: 0 20px;
  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: bold;
    .el-icon {
      font-size: 22px;
    }
  }
}
.main-container {
  overflow: hidden;
}
.layout-aside {
  background-color: #304156;
  overflow-y: auto;
}
.layout-main {
  background: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
