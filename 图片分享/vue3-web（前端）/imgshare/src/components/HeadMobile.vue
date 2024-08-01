<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { Search } from '@element-plus/icons-vue'
const user = useUserStore().user
</script>
<template>
    <el-menu :router=true class="el-menu-demo" mode="horizontal">
        <el-sub-menu index="1">
            <template #title>菜单</template>
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/login" v-if="user.uid == -1">登录</el-menu-item>
            <el-menu-item index="/register" v-if="user.uid == -1">注册</el-menu-item>
            <el-menu-item :index="'/uid/' + user.uid">用户</el-menu-item>
        </el-sub-menu>
        <el-input :prefix-icon="Search" style="width: 9rem;height: 50%;margin: auto 0;"></el-input>
    </el-menu>
</template>