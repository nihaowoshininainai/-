<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Api from '../api/Api';
import { Img } from '../interface/Img';

const table = ref<Img[]>([])

onMounted(async () => {
    const { code, message, data } = (await Api.getImg()).data
    if (code === 1) {
        console.log(data);

        table.value = data
        ElMessage.success(message)
    } else {
        ElMessage.error(message)
    }
})

const search = ref('')

const searchU = async () => {
    if (search.value === '')
        ElMessage.warning('为输入关键词，无法搜索')
    else {
        const { code, message, data } = (await Api.searchImg(search.value)).data
        if (code === 1) {
            console.log(data);

            table.value = data
            ElMessage.success(message)
        } else {
            ElMessage.error(message)
        }
    }
}

const handleDelete = (_index:number,row:Img) => {
    Api.delImg(row.iid).then((e) => {
        const { code, message } = e.data
        if (code === 1) {
            ElMessage.success(message)
            location.reload()
        } else {
            ElMessage.warning(message)
        }
    })
}
const reset = () => {
    location.reload()
}
</script>
<template>
    管理图片页
    <el-table :data="table" style="width: 100%">
        <el-table-column label="id" prop="iid" />
        <el-table-column label="name" prop="iname" />
        <el-table-column label="src" prop="isrc" />
        <el-table-column label="uploaddate" prop="uploaddate" />
        <el-table-column label="pageview" prop="pageview" />
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" @keydown.enter="searchU" />
                <el-button @click="reset">重置</el-button>
            </template>
            <template #default="scope">
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    Delete
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<style lang="less" scoped>

</style>