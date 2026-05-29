<template>
  <div class="page-container">
    <h2 class="page-title">上传图片</h2>

    <div class="upload-card">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="图片名称" prop="iname">
          <el-input
            v-model="form.iname"
            placeholder="为你的图片取个名字..."
            size="large"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="选择图片" prop="file">
          <el-upload
            ref="uploadRef"
            class="upload-area"
            drag
            :auto-upload="false"
            :limit="1"
            :on-change="handleFileChange"
            :on-remove="handleFileRemove"
            :file-list="fileList"
            accept="image/*"
          >
            <div v-if="!previewUrl" class="upload-placeholder">
              <el-icon :size="48" class="upload-icon"><UploadFilled /></el-icon>
              <div class="upload-text">
                <p>将图片拖到此处，或<em>点击上传</em></p>
                <p class="upload-hint">支持 JPG、PNG、GIF、WebP 格式</p>
              </div>
            </div>
            <div v-else class="preview-wrapper">
              <img :src="previewUrl" alt="预览" class="preview-image" />
              <div class="preview-mask">
                <span>点击或拖拽更换图片</span>
              </div>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="uploading"
            :disabled="!form.file"
            class="upload-btn"
            @click="handleUpload"
          >
            <el-icon><Upload /></el-icon>
            上传图片
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { uploadFile } from '@/utils/api'
import type { FormInstance, FormRules, UploadInstance, UploadFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const router = useRouter()
const formRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()
const uploading = ref(false)
const previewUrl = ref('')
const fileList = ref<UploadFile[]>([])

const form = reactive({
  iname: '',
  file: null as File | null
})

const rules: FormRules = {
  iname: [{ required: true, message: '请输入图片名称', trigger: 'blur' }],
  file: [{ required: true, message: '请选择图片', trigger: 'change' }]
}

function handleFileChange(uploadFile: UploadFile) {
  const file = uploadFile.raw
  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    ElMessage.error('仅支持 JPG、PNG、GIF、WebP 格式')
    fileList.value = []
    return
  }

  form.file = file
  previewUrl.value = URL.createObjectURL(file)
  fileList.value = [uploadFile]
}

function handleFileRemove() {
  form.file = null
  previewUrl.value = ''
  fileList.value = []
}

async function handleUpload() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid || !form.file) return
    uploading.value = true
    try {
      const fd = new FormData()
      fd.append('file', form.file)
      fd.append('iname', form.iname)
      await uploadFile('/addImg', fd)
      ElMessage.success('上传成功')
      router.push('/')
    } catch {
      // 错误已处理
    } finally {
      uploading.value = false
    }
  })
}
</script>

<style scoped>
.upload-card {
  max-width: 640px;
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: var(--pixiv-shadow);
}

.upload-area {
  width: 100%;
}

.upload-area :deep(.el-upload-dragger) {
  border-radius: 12px;
  border: 2px dashed #d0d5dd;
  transition: all 0.2s;
  min-height: 240px;
}

.upload-area :deep(.el-upload-dragger:hover) {
  border-color: var(--pixiv-blue);
  background: var(--pixiv-hover);
}

.upload-placeholder {
  padding: 40px 20px;
}

.upload-icon {
  color: #c0c4cc;
  margin-bottom: 12px;
}

.upload-text p {
  font-size: 15px;
  color: var(--pixiv-text-secondary);
}

.upload-text em {
  color: var(--pixiv-blue);
  font-style: normal;
  cursor: pointer;
}

.upload-hint {
  font-size: 12px !important;
  margin-top: 6px;
}

.preview-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f5f5f5;
}

.preview-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: #fff;
  font-size: 14px;
}

.preview-wrapper:hover .preview-mask {
  opacity: 1;
}

.upload-btn {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
}

@media screen and (max-width: 640px) {
  .upload-card {
    padding: 20px;
  }
}
</style>