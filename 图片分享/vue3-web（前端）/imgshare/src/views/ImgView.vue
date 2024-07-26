<script setup lang="ts">
import Comment from '@/components/imgview/Comment.vue';
import Message from '@/components/imgview/Message.vue';
import { Img } from '@/pojo/Img';
import { useUserStore } from '@/stores/user';

const iid = useRoute().params.iid
const img = ref<Img>(new Img())
useUserStore().user.img.forEach((element) => {
    if (Number(iid) === element.iid)
        img.value = element

})

</script>
<template>
    <el-row class="content">
        <el-col class="img">
            <el-image :src="img.isrc" fit="scale-down" />
        </el-col>
        <el-col>
           <Message :img="img"></Message> 
        </el-col>
        <el-col>
            <Comment :img="img"></Comment>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.content {
    width: 50%;
    margin: 0 auto;
    .img {
        background-color: gainsboro;
        .el-image {
            width: 100%;
            height: 30rem;
        }
    }
}
</style>