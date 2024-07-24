<script setup lang="ts">
import { useUserStore } from '@/stores/user'
</script>

<template>
    <el-row>
        <el-col :span="24">
            <h1>欢迎用户{{ useUserStore().user.uname }}到此网站！</h1>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
    .el-row{
        background-image: url(http://47.98.148.6:8094/%E9%81%BA%E5%85%89%E3%81%AE%E5%91%BC%E3%81%B3%E5%A3%B0-92968709.png);
        background-position: center center;
        .el-col{
            h1{
                text-align: center;
                line-height: 20rem;
            }
        }
    }
</style>