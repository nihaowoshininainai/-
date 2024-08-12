<script setup lang="ts">


</script>

<template>
  <el-container>
    <el-header>
      图片分享网站管理系统
    </el-header>
    <el-container>
      <el-aside>
      <Menu></Menu>
    </el-aside>
    <el-main>
      <RouterView></RouterView>
    </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.el-header{
  border: 1px solid black;
}
</style>
