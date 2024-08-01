<script setup lang="ts">
import { User } from '@/pojo/User';
import { useImgStore } from '@/stores/img';
import { useUserStore } from '@/stores/user'
const uid = useRoute().params.uid
console.log(useRoute().params.uid);

const flag = ref((Number(uid) === useUserStore().user.uid))
const user = ref<User>(new User())
if (!flag) {
    useImgStore().imgs.forEach((element) => {
        if (element.user.uid === Number(uid))
            user.value = element.user
    })
}
</script>

<template>
    <el-row>
        <el-col v-if="flag">
            <h1>欢迎用户{{ useUserStore().user.uname }}到此网站！</h1>
        </el-col>
        <el-col v-if="!flag">
            <h1>用户{{ user.uname }}的主页！</h1>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.el-row {
    background-image: url(http://47.98.148.6:8094/%E9%81%BA%E5%85%89%E3%81%AE%E5%91%BC%E3%81%B3%E5%A3%B0-92968709.png);
    background-position: center center;

    .el-col {
        h1 {
            text-align: center;
            line-height: 20rem;
        }
    }
}
</style>