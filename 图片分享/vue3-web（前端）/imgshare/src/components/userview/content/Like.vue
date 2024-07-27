<script setup lang="ts">
import type { Img } from '@/pojo/Img';
defineProps < {
    flag: boolean,
    imgs: Img[]
}>()
</script>

<template>
    <el-table :data="(imgs[0]===null)?[]:imgs" :border=true
                style="width: 80%;margin: 0 auto;height: 500px;">
                <el-table-column prop="iname" label="图片名" align="center" />
                <el-table-column prop="pageview" label="浏览量" align="center" />
                <el-table-column prop="uploaddate" label="上传时间" align="center" />
                <el-table-column prop="isrc" label="图片路径" align="center" />
                <el-table-column fixed="right" label="操作" align='center'>
                    <template #default>
                        <el-button link type="primary" size="small" @click="" v-if="flag" >
                            移除
                        </el-button>
                        <el-button link type="primary" size="small">查看图片</el-button>
                    </template>
                </el-table-column>
            </el-table>
</template>