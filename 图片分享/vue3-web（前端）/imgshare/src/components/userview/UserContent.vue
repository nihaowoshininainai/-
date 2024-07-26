<script setup lang="ts">
import { useUserStore } from '@/stores/user';
useUserStore().getImgs()

const content = ref('作品')
const change = (e: any) => {
    console.log(e.target.innerText)
    content.value = e.target.innerText
    if ('作品' === content.value)
        useUserStore().getImgs()
    else if ('喜欢的作品' === content.value)
        useUserStore().getLikeImg()

}

</script>

<template>
    <div class="di"></div>
    <el-row style="margin: 10px;">
        <el-col :span="8"><el-link @click="change">作品</el-link></el-col>
        <el-col :span="8"><el-link @click="change">喜欢的作品</el-link></el-col>
        <el-col :span="8"><el-link @click="change">上传</el-link></el-col>
    </el-row>
    <el-row>
        <el-col v-if="'作品' === content">
            <My></My>
        </el-col>
        <el-col v-if="'喜欢的作品' === content">
            <Like></Like>
        </el-col>
        <el-col v-if="'上传' === content" style="margin-top: 40px;">
            <Upload></Upload>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.el-row {
    text-align: center;
}
</style>