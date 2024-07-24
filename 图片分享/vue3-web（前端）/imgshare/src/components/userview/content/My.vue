<script setup lang="ts">
import { useUserStore } from '@/stores/user';
</script>

<template>
                <el-table :data="useUserStore().user.img" :border=true style="width: 80%;margin: 0 auto;height: 500px;">
                <el-table-column prop="iname" label="图片名" align="center" />
                <el-table-column prop="pageview" label="浏览量" align="center" />
                <el-table-column prop="uploaddate" label="上传时间" align="center" />
                <el-table-column prop="isrc" label="图片路径" align="center" />
                <el-table-column fixed="right" label="操作" align='center'>
                    <template #default>
                        <el-button link type="primary" size="small" @click="">
                            删除
                        </el-button>
                        <el-button link type="primary" size="small">查看图片</el-button>
                    </template>
                </el-table-column>
            </el-table>
</template>