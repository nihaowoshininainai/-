<script setup lang="ts">

</script>
<template>
    <el-row>
        <el-col :span="4">
            网站名
        </el-col>
        <el-col :span="4">
            图标
        </el-col>
        <el-col :span="4">
            <router-link to="/home"><el-link :underline="false">首页</el-link></router-link>
        </el-col>
        <el-col :span="4">
            <router-link to="login"><el-link :underline="false">登陆</el-link></router-link>
        </el-col>
        <el-col :span="4">
            <router-link to="/register"><el-link :underline="false">注册</el-link></router-link>
        </el-col>
        <el-col :span="4">
            <router-link to="/user"><el-link :underline="false">用户</el-link></router-link>
        </el-col>
    </el-row>
</template>
<style scoped>
    .el-col {
    height: 60px;
    line-height: 60px;
    text-align: center;
}
.el-row{
    background-color: #fafafa;
}
</style>