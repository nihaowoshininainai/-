<script setup lang="ts">
import type { Img } from '@/pojo/Img';
import { useImgStore } from '@/stores/img';
import { useUserStore } from '@/stores/user';
const toImg = (index: number, img: Img) => {
    window.open(img.isrc)
}
const delLike = (index:number,img:Img) => {
    useUserStore().delLike(img.iid)
}
const props = defineProps < {
    flag: boolean,
    uid:number
}>()
</script>

<template>
    <el-table :data="(flag)?useUserStore().user.likeImgs:useImgStore().likeImgs" :border=true
                style="width: 80%;margin: 0 auto;height: 500px;">
                <el-table-column prop="iname" label="图片名" align="center" />
                <el-table-column prop="pageview" label="浏览量" align="center" />
                <el-table-column prop="uploaddate" label="上传时间" align="center" />
                <el-table-column prop="isrc" label="图片路径" align="center" />
                <el-table-column fixed="right" label="操作" align='center'>
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="delLike(scope.$index, scope.row)" v-if="flag" >
                            移除
                        </el-button>
                        <el-button link type="primary" size="small" @click="toImg(scope.$index, scope.row)">查看图片</el-button>
                    </template>
                </el-table-column>
            </el-table>
</template>