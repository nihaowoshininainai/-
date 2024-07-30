<script setup lang="ts">
import { Commentt } from '@/pojo/Commentt';
import { Img } from '@/pojo/Img';
import { useUserStore } from '@/stores/user';
import commentApi from '@/api/comment'
import type { User } from '@/pojo/User';
const props = defineProps<{
    img: Img
}>()

const textarea = ref('')
const comment = ref<Commentt[]>([])
const clickComment = ref<number[]>([])

const getComments = () => {
    commentApi.getComment(props.img).then((value) => {
        console.log(value);
        comment.value = value.data.date.reverse()
    })
}
const getClickLike = () => {
    commentApi.getClickLike(useUserStore().user).then((value) => {
        console.log(value)
        clickComment.value = value.data.date
        console.log(clickComment.value)
    })
}
const getDate = () => {
    Promise.all([getClickLike(), getComments()])
}
onMounted(getDate)
const addComment = () => {
    commentApi.addComment(props.img, useUserStore().user, textarea.value).then((value) => {
        console.log(value);
        const { code, message, date } = value.data
        if (code === 1) {
            ElMessage.success(message)
            textarea.value = ''
            getComments()
        }

    })
}
const clicklike = (user: User, comment: Commentt) => {
    commentApi.clickLike(user, comment).then((value) => {
        console.log(value);
        const { code, message, date } = value.data
        if (code === 1) {
            ElMessage.success(message)
            getDate()
        }
    })
}
</script>
<template>
    <el-row>
        <el-col :span="18"> <el-input v-model="textarea" :rows="2" type="textarea" placeholder="来一条友好的评论吧" /></el-col>
        <el-col :span="6" style="display: flex;"><el-button type="primary" class="button"
                @click="addComment">发送</el-button></el-col>
    </el-row>
    <el-divider />
    <el-row>
        <el-empty v-if="comment.length === 0" description="无评论" style="margin: 0 auto;"></el-empty>
        <el-col v-for="item in comment"><el-card>
                <template #header>
                    <el-link :href="'/uid/' + `${item.user?.uid}`">
                        <el-text>
                            {{ item.user?.uname }}
                        </el-text>
                    </el-link>
                </template>
                {{ item.content }}
                <template #footer>
                    <el-row>
                        <el-col :span="20">{{ item.commdate }}</el-col>
                        <el-col :span="4"><svg @click="clicklike(useUserStore().user, item)"
                                v-if="!(clickComment.indexOf(item.cid) != -1)" xmlns="http://www.w3.org/2000/svg"
                                width="1em" height="1em" viewBox="0 0 256 256">
                                <path fill="#333333"
                                    d="M232.49 81.44A22 22 0 0 0 216 74h-58V56a38 38 0 0 0-38-38a6 6 0 0 0-5.37 3.32L76.29 98H32a14 14 0 0 0-14 14v88a14 14 0 0 0 14 14h172a22 22 0 0 0 21.83-19.27l12-96a22 22 0 0 0-5.34-17.29M30 200v-88a2 2 0 0 1 2-2h42v92H32a2 2 0 0 1-2-2M225.92 97.24l-12 96A10 10 0 0 1 204 202H86v-96.58l37.58-75.17A26 26 0 0 1 146 56v24a6 6 0 0 0 6 6h64a10 10 0 0 1 9.92 11.24" />
                            </svg>
                            <svg v-if="clickComment.indexOf(item.cid) != -1" xmlns="http://www.w3.org/2000/svg"
                                width="1em" height="1em" viewBox="0 0 32 32">
                                <path fill="#e11d48"
                                    d="M2 16h5v14H2zm21 14H9V15.197l3.042-4.563l.845-5.917A2.01 2.01 0 0 1 14.868 3H15a3.003 3.003 0 0 1 3 3v6h8a4.005 4.005 0 0 1 4 4v7a7.01 7.01 0 0 1-7 7" />
                            </svg>
                            {{ item.clicklike }}</el-col>
                    </el-row>
                </template>
            </el-card></el-col>
    </el-row>
</template>

<style lang="less" scoped>
.el-row {
    margin: 1rem;
}

.button {
    display: block;
    margin: 0 auto;
    align-self: last baseline;
}

.el-card {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
</style>