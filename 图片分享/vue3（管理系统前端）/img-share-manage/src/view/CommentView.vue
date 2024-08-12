<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Api from '../api/Api';
import { Comment } from '../interface/Comment';

const table = ref<Comment[]>([])

onMounted(async () => {
    const { code, message, data } = (await Api.getComment()).data
    if (code === 1) {
        console.log(data);

        table.value = data
        ElMessage.success(message)
    } else {
        ElMessage.error(message)
    }
})

const handleDelete = (_index:number,row:Comment) => {
    Api.delComment(row.cid).then((e) => {
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
    管理评论页
    <el-table :data="table" style="width: 100%">
        <el-table-column label="id" prop="cid" />
        <el-table-column label="content" prop="content" />
        <el-table-column label="clicklike" prop="clicklike" />
        <el-table-column label="commdate" prop="commdate" />
        <el-table-column align="right">
            <template #header>
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
<style lang='less' scoped>

</style>