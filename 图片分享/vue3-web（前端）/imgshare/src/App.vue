<template>
  <div class="common-layout">
    <el-container>
      <el-header class="web">
        <Head></Head>
      </el-header>
      <el-header class="mobile">
        <HeadMobile></HeadMobile>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Head from '@/components/Head.vue'
import HeadMobile from '@/components/HeadMobile.vue'
</script>

<style scoped>
.el-header {
  position: relative;
  top: 0;
}

.mobile {
  display: none;
}

.el-main {
  --el-main-padding: 0;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}

@media screen and (max-width: 900px) {
  .web {
    display: none;
  }

  .mobile {
    display: block;
  }

  .el-main {
    margin-top: 50px;
    min-height: calc(100vh - 50px);
  }
}
</style>