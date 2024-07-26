<script setup lang="ts">
import ImgApi from '@/api/img'
import { useImgStore } from '@/stores/img';

const order = ref('uploaddate')

const count = ref(0)

const pageSize = ref(18)

const page = ref(1)

const span = ref(4)

const widowWidth = window.innerWidth

console.log(widowWidth);


if (widowWidth < 1300) {
    span.value = 8
}

const getCount = async () => {
    const { code, message, date } = (await ImgApi.getCount()).data
    count.value = date
    console.log(count.value);
    
    
}

onBeforeMount(() => {
    getCount()
    useImgStore().getImgs(order.value,pageSize.value,page.value)
})

const changeOrder = (e: any) => {
    console.log(e.target.innerText);
    if (e.target.innerText === '按日期')
        order.value = 'uploaddate'
    else
        order.value = 'pageview'
    useImgStore().getImgs(order.value,pageSize.value,page.value)
}

console.log(page.value);

const changePage = () => {
    useImgStore().getImgs(order.value,pageSize.value,page.value)
}

</script>
<template>
    <el-row style="text-align: center;">
            <el-col :span="span">
                <el-link @click="changeOrder">按日期</el-link>
            </el-col>
            <el-col :span="span">
                <el-link @click="changeOrder">按热度</el-link>
            </el-col>
        </el-row>
    <div class="content">
        <el-row :gutter="20">
        <el-col v-for="item in useImgStore().imgs" :span="span">
            <router-link :to="`/img/${item.iid}`"><el-col :style="`background-image: url(${item.isrc});`"></el-col></router-link>
        </el-col>
    </el-row>
    </div>
    <el-pagination background layout="prev, pager, next" :total="count" :page-size="pageSize" v-model:current-page="page"  @current-change="changePage" />
</template>

<style lang="less" scoped>
    .content{
        width: 70%;
        margin: 40px auto;
        .el-row{
        .el-col{
            overflow: hidden;
            .el-col {
                background-size: cover;
                background-position: center ;
                padding-top: 100%;
                margin:10px auto;
                border-radius: 10px;
            }
        }
    }
    }
    .el-pagination{
        margin-top: 5rem;
        justify-content: center;
    }
    @media screen and (max-width:1300px) {
        .content{
            width: 90%;
        }
    }
</style>
