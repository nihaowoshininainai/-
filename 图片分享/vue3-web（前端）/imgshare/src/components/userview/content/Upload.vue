<script setup lang="ts">
import { genFileId, type UploadInstance, type UploadProps, type UploadRawFile } from 'element-plus';

const uploadRef = ref<UploadInstance>()

const img = ref({
    iname: ''
})

const uploadHeaders = computed(() => {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
})

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawfile) => {
    if (rawfile.type != 'image/jpeg' && rawfile.type != 'image/png') {
        ElMessage.error("只允许jpg或png格式的图片")
        return false
    }
    return true
}

const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value!.handleStart(file)
}

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
    <el-upload ref="uploadRef" class="upload-demo" action="/api/addImg" :headers="uploadHeaders" :auto-upload="false"
        :data="img" style="width: 50%;
                margin: 40px auto;" list-type="picture" :on-error="upError" :on-success="success"
        :before-upload="beforeAvatarUpload" :limit="1" :on-exceed="handleExceed">
        <template #trigger>
            <el-button type="primary">选择图片</el-button>
        </template>

        <el-button class="ml-3" type="success" @click="submitUpload" :disabled="img.iname === ''">
            上传
        </el-button>

        <template #tip>
            <div class="el-upload__tip">
                只支持jpg与png格式
            </div>
        </template>
    </el-upload>
</template>