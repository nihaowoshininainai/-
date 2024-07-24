<script setup lang="ts">
import { useUserStore } from '@/stores/user';


</script>
<template>
    <el-empty v-if="useUserStore().user.uid===-1" description="description" />
    <el-row v-if="useUserStore().user.uid!=-1">
        <el-col :span="24">
            <UserHead></UserHead>
        </el-col>
        <el-col :span="24">
            <UserContent></UserContent>
        </el-col>
    </el-row>
</template>