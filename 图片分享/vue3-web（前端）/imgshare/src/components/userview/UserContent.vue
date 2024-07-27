<script setup lang="ts">
import { Img } from '@/pojo/Img';
import { useImgStore } from '@/stores/img';
import { useUserStore } from '@/stores/user';
const imgs = ref<Img[]>([])
const uid = Number(useRoute().params.uid)
const flag = ref(uid === useUserStore().user.uid)
const span = ref(12)
const content = ref('作品')

console.log(uid);
if (flag.value) {
    span.value = 8
    useUserStore().getImgs()
    imgs.value = useUserStore().user.img

}
else {
    useImgStore().getUserImgs(uid)
    imgs.value = useImgStore().userImgs
    
}

const change = (e: any) => {
    console.log(e.target.innerText)
    content.value = e.target.innerText
    if ('作品' === content.value) {
        if (flag.value) {
            useUserStore().getImgs()
            imgs.value = useUserStore().user.img
        } else {
            imgs.value = useImgStore().userImgs
        }
    }
    else if ('喜欢的作品' === content.value) {
        if (flag.value) {
            useUserStore().getLikeImg()
            imgs.value = useUserStore().user.likeImgs
        } else {
            useImgStore().getLikeImgs(uid)
            imgs.value = useImgStore().likeImgs
        }
    }

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
            <My :flag="flag" :imgs="imgs"></My>
        </el-col>
        <el-col v-if="'喜欢的作品' === content">
            <Like :flag="flag" :imgs="imgs"></Like>
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