<script setup lang="ts">
import { useUserStore } from '@/stores/user';
useUserStore().getImgs()
const flag = ref(false)
const span = ref(12)
const content = ref('作品')
const change = (e: any) => {
    console.log(e.target.innerText)
    content.value = e.target.innerText
    if ('作品' === content.value)
        useUserStore().getImgs()
    else if ('喜欢的作品' === content.value)
        useUserStore().getLikeImg()

}

console.log(useRoute().params);
if (Number(useRoute().params.uid) === useUserStore().user.uid) {
    flag.value = true
    span.value = 8
    
}


</script>

<template>
    <div class="di"></div>
    <el-row style="margin: 10px;">
        <el-col :span="span"><el-link @click="change">作品</el-link></el-col>
        <el-col :span="span"><el-link @click="change">喜欢的作品</el-link></el-col>
        <el-col :span="span" v-if="flag"><el-link @click="change">上传</el-link></el-col>
    </el-row>
    <el-row>
        <el-col v-if="'作品' === content">
            <My :flag="flag"></My>
        </el-col>
        <el-col v-if="'喜欢的作品' === content">
            <Like :flag="flag"></Like>
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