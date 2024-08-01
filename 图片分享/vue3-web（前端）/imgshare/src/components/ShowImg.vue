<script setup lang="ts">
import { Img } from '@/pojo/Img';

defineProps<{
    img: Img[],
    span: number
}>()
</script>
<template>
    <div class="content">
        <el-row :gutter="20">
            <el-col v-for="item in img" :span="span">
                <router-link :to="`/img/${item.iid}`"><el-col
                        :style="`background-image: url(${item.isrc}!300x300);`"></el-col></router-link>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="less" scoped>
.content {
    width: 70%;
    margin: 40px auto;

    .el-row {
        .el-col {
            overflow: hidden;

            .el-col {
                background-size: cover;
                background-position: center;
                padding-top: 100%;
                margin: 10px auto;
                border-radius: 10px;
            }
        }
    }
}
</style>