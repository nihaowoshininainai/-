<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Api from '../api/Api';
import { User } from '../interface/User';

const table = ref<User[]>([])

onMounted(async () => {
    const { code, message, data } = (await Api.getUser()).data
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
        const { code, message, data } = (await Api.searchUser(search.value)).data
        if (code === 1) {
            console.log(data);

            table.value = data
            ElMessage.success(message)
        } else {
            ElMessage.error(message)
        }
    }
}

const handleDelete = (_index:number,row:User) => {
    Api.delUser(row.uid).then((e) => {
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
    用户管理页
    <el-table :data="table" style="width: 100%">
        <el-table-column label="Id" prop="uid" />
        <el-table-column label="Name" prop="uname" />
        <el-table-column label="Pwd" prop="pwd" />
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
<style lang="less" scoped></style>