<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import type { UploadInstance } from 'element-plus';

const uploadRef = ref<UploadInstance>()

const img = ref({
    iname: '',
    uid: useUserStore().user.uid
})

const submitUpload = () => {
    uploadRef.value!.submit()
}

const success = () => {
    ElMessage.success('提交成功')
    location.reload()
}

const upError = () => {
    ElMessage.error('上传失败')
}
</script>
<template>
    <span>图片名：</span>
            <el-input v-model="img.iname" style="width: 20%;"></el-input>
            <el-upload ref="uploadRef" class="upload-demo" action="/api/addImg" :auto-upload="false" :data="img" style="width: 50%;
                margin: 40px auto;" list-type="picture"
                :on-error="upError"
                :on-success="success">
                <template #trigger>
                    <el-button type="primary">选择文件</el-button>
                </template>

                <el-button class="ml-3" type="success" @click="submitUpload" :disabled="img.iname === ''">
                    上传
                </el-button>

                <template #tip>
                    <div class="el-upload__tip">
                        请不要多图片上传，目前只支持单图片上传
                    </div>
                </template>
            </el-upload>
</template>