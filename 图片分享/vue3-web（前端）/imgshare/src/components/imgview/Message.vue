<script setup lang="ts">
import { Img } from '@/pojo/Img';
import imgApi from '@/api/img'

const props = defineProps < {
    img:Img
}>()

const flag = ref(false)
const url = `/likeOrNot?uid=${props.img.user.uid}&&iid=${props.img.iid}`
imgApi.getImgMessage(url).then((value) => {
    console.log(value.data.date);
    flag.value = value.data.date
})

const addLike = () => {
    const url = `/addLike?uid=${props.img.user.uid}&&iid=${props.img.iid}`
    imgApi.addLike(url).then((value) => {
        console.log(value)
        const { code, message, date } = value.data
        if (code === 1) {
            ElMessage.success(message)
            flag.value = true
        }
    })
}

</script>
<template>
    <el-row>
        <el-col :span="5">
            <el-text tag="b" size="large">
                作者：<el-link :href="'/uid/'+`${img.user.uid}`">
                    <el-text tag="b" size="large">{{ img.user.uname }}</el-text>
                </el-link>
            </el-text>
        </el-col>
        <el-col :span="5">
            <el-text tag="b" size="large">
                {{ img.iname }}
            </el-text>
        </el-col>
        <el-col :span="5">
            <el-text tag="b" size="large">
                浏览量：{{ img.pageview }}
            </el-text>
        </el-col>
        <el-col :span="5">
            <el-text size="large">
                {{ img.uploaddate }}
            </el-text>
        </el-col>
        <el-col :span="4" class="content22">
            <svg v-show="!flag" @click="addLike" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                <path fill="currentColor"
                    d="M178 40c-20.65 0-38.73 8.88-50 23.89C116.73 48.88 98.65 40 78 40a62.07 62.07 0 0 0-62 62c0 70 103.79 126.66 108.21 129a8 8 0 0 0 7.58 0C136.21 228.66 240 172 240 102a62.07 62.07 0 0 0-62-62m-50 174.8c-18.26-10.64-96-59.11-96-112.8a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8" />
            </svg>
            <svg v-show="flag" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#e11d48" d="M240 98a57.63 57.63 0 0 1-17 41l-89.3 90.62a8 8 0 0 1-11.4 0L33 139a58 58 0 0 1 82-82.1l13 12.15l13.09-12.19A58 58 0 0 1 240 98"/></svg>
        </el-col>
    </el-row>
</template>
<style lang="less" scoped>
.el-row {
    text-align: center;
    justify-content: space-around;
    .el-col {
        svg {
            font-size: 21px;
        }
    }
}
</style>