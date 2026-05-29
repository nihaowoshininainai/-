<template>
  <div class="register-page">
    <div class="register-card">
      <div class="card-header">
        <h1>创建账户</h1>
        <p>加入 ImgShare，分享你的精彩图片</p>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="handleRegister">
        <el-form-item label="用户名" prop="uname">
          <el-input
            v-model="form.uname"
            placeholder="请输入用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model="form.pwd"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input
            v-model="form.confirmPwd"
            type="password"
            placeholder="请再次输入密码"
            :prefix-icon="Lock"
            size="large"
            show-password
            @keyup.enter="handleRegister"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="submit-btn"
            @click="handleRegister"
          >
            注 册
          </el-button>
        </el-form-item>
      </el-form>

      <div class="card-footer">
        已有账户？<router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const router = useRouter()
const auth = useAuthStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  uname: '',
  pwd: '',
  confirmPwd: ''
})

const validateConfirmPwd = (_rule: unknown, value: string, callback: (error?: Error) => void) => {
  if (value !== form.pwd) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules: FormRules = {
  uname: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在2-20个字符之间', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, message: '密码至少4个字符', trigger: 'blur' }
  ],
  confirmPwd: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateConfirmPwd, trigger: 'blur' }
  ]
}

async function handleRegister() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      await auth.register(form.uname, form.pwd)
      ElMessage.success('注册成功，请登录')
      router.push('/login')
    } catch {
      // 错误已在拦截器中处理
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.register-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: var(--pixiv-shadow);
}

.card-header {
  text-align: center;
  margin-bottom: 32px;
}

.card-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: var(--pixiv-text);
  margin-bottom: 8px;
}

.card-header p {
  font-size: 14px;
  color: var(--pixiv-text-secondary);
}

.submit-btn {
  width: 100%;
  height: 44px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
}

.card-footer {
  text-align: center;
  font-size: 14px;
  color: var(--pixiv-text-secondary);
  margin-top: 20px;
}

.card-footer a {
  color: var(--pixiv-blue);
  font-weight: 500;
}

.card-footer a:hover {
  text-decoration: underline;
}
</style>