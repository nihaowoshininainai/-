<script setup lang="ts">
const style = {
  height: window.innerHeight-60 + 'px',
}
</script>
<template>
    <div>
        <el-menu :style="style" >
            <RouterLink to="/home">
                <el-menu-item>
                    <span>首页</span>
                </el-menu-item>
            </RouterLink>
            <el-sub-menu index="2">
                <template #title>
                    <span>用户</span>
                </template>
                <RouterLink to="/user">
                    <el-menu-item index="2-1">
                        用户管理
                    </el-menu-item>
                </RouterLink>
                <el-menu-item index="2-2">
                    查看违规用户
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <span>图片</span>
                </template>
                <RouterLink to="/img">
                    <el-menu-item index="3-1">
                        图片管理
                    </el-menu-item>
                </RouterLink>
                <el-menu-item index="3-2">
                    查看违规图片
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
                <template #title>
                    <span>评论</span>
                </template>
                <RouterLink to="/comment">
                    <el-menu-item index="4-1">
                        评论管理
                    </el-menu-item>
                </RouterLink>
                <el-menu-item index="4-2">
                    查看违规评论
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
        <el-image src="http://47.98.148.6:8094/1/杂志封面1722566277836.png" />
    </div>
</template>
<style lang="less" scoped>
div{
    position: relative;
    .el-image{
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
    }
}
</style>