<script setup lang="ts">
import { useUserStore } from '@/stores/user';


</script>
<template>
    <el-empty v-if="useUserStore().user.uid === -1" description="未登录不能进入此页面哦" />
    <el-row v-if="useUserStore().user.uid != -1">
        <el-col :span="24">
            <UserHead></UserHead>
        </el-col>
        <el-col :span="24">
            <UserContent></UserContent>
        </el-col>
    </el-row>
</template>