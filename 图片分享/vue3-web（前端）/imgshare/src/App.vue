<template>
  <div class="common-layout">
    <el-container>
      <el-header class="web"><Head></Head></el-header>
      <el-header class="mobile"><HeadMobile></HeadMobile></el-header>
      <el-main><RouterView></RouterView></el-main>
    </el-container>
  </div>
</template>


<style scoped>
.el-header{
  position: relative;
  top:0;
}
.mobile{
  display: none;
}
@media screen and (max-width:900px) {
  .web{
    display: none;
  }
  .mobile{
    display: block;
  }
}
</style>
