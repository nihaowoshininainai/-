<script setup lang="ts">
import imgApi from '@/api/img'
import global from '@/globalVariable/global';
import { Img } from '@/pojo/Img';
import router from '@/router';

const props = defineProps<{
    iname: string,
    order: string,
    page:string
}>()

watch(props, () => {
    getCount()
    getSearch()
})

const count = ref(0)

const pageSize = ref(18)

const page = ref(Number(props.page))

const span = ref(4)

const imgs = ref<Img[]>([])

const widowWidth = window.innerWidth

console.log(widowWidth);


if (widowWidth < 1300) {
    span.value = 8
}

const getCount = async () => {
    const { code, message, date } = (await imgApi.getCount(props.iname)).data
    count.value = date
    console.log(count.value);


}

const getSearch = async () => {
    const { code, message, date } = (await imgApi.getSearch(props.order, pageSize.value, page.value, props.iname)).data
    imgs.value = date
    console.log(imgs.value)
    imgs.value.forEach(element => {
        element.isrc = element.isrc.replace(global.original, global.host)
    });
}

onMounted(() => {
    getCount()
    getSearch()
})

const changeOrder = (e: any) => {
    console.log(e.target.innerText);
    if (e.target.innerText === '按日期')
        router.push(`/search/${props.iname}/uploaddate/${page.value}`)
    else
        router.push(`/search/${props.iname}/pageview/${page.value}`)
}

const changePage = () => {
    router.push(`/search/${props.iname}/${props.order}/${page.value}`)
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
    <ShowImg :img="imgs" :span="span"></ShowImg>
    <el-pagination background layout="prev, pager, next" :total="count" :page-size="pageSize"
        v-model:current-page="page" @current-change="changePage" />
</template>
<style lang="less" scoped>
.el-pagination {
    margin-top: 5rem;
    justify-content: center;
}

@media screen and (max-width:1300px) {
    .content {
        width: 90%;
    }
}
</style>