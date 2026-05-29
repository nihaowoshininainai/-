<template>
  <header class="pixiv-header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <span class="logo-icon">🖼</span>
        <span class="logo-text">ImgShare</span>
      </router-link>

      <div class="search-box">
        <el-input
          v-model="keyword"
          placeholder="搜索图片..."
          :prefix-icon="Search"
          size="default"
          clearable
          @keyup.enter="doSearch"
          @clear="doSearch"
        />
      </div>

      <nav class="nav-links">
        <router-link to="/" class="nav-link">
          <el-icon><PictureFilled /></el-icon>
          <span>发现</span>
        </router-link>
        <template v-if="auth.isLoggedIn">
          <router-link to="/upload" class="nav-link">
            <el-icon><Upload /></el-icon>
            <span>上传</span>
          </router-link>
        </template>
      </nav>

      <div class="user-area">
        <template v-if="auth.isLoggedIn">
          <el-dropdown trigger="click" popper-class="user-dropdown">
            <span class="user-trigger">
              <el-avatar :size="32" icon="UserFilled" />
              <span class="username">{{ auth.username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push('/my/images')">
                  <el-icon><PictureRounded /></el-icon>我的上传
                </el-dropdown-item>
                <el-dropdown-item @click="$router.push('/my/likes')">
                  <el-icon><Star /></el-icon>我的点赞
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <router-link to="/login" class="btn-login">登录</router-link>
          <router-link to="/register" class="btn-register">注册</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Search } from '@element-plus/icons-vue'

const router = useRouter()
const auth = useAuthStore()
const keyword = ref('')

function doSearch() {
  if (keyword.value.trim()) {
    router.push({ path: '/', query: { keyword: keyword.value.trim() } })
  } else {
    router.push({ path: '/' })
  }
}

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.pixiv-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid var(--pixiv-border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--pixiv-blue);
  letter-spacing: -0.5px;
}

.search-box {
  flex: 1;
  max-width: 480px;
}

.search-box :deep(.el-input__wrapper) {
  border-radius: 24px;
  background: #f2f4f7;
  border: none;
  box-shadow: none;
  transition: background 0.2s;
}

.search-box :deep(.el-input__wrapper:hover) {
  background: #e8ecf1;
}

.search-box :deep(.el-input__wrapper.is-focus) {
  background: #fff;
  box-shadow: 0 0 0 1px var(--pixiv-blue) inset;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 14px;
  color: var(--pixiv-text-secondary);
  transition: all 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--pixiv-blue);
  background: var(--pixiv-hover);
}

.user-area {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 20px;
  transition: background 0.2s;
}

.user-trigger:hover {
  background: var(--pixiv-hover);
}

.username {
  font-size: 14px;
  color: var(--pixiv-text);
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-login,
.btn-register {
  padding: 7px 18px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-login {
  color: var(--pixiv-blue);
  border: 1px solid var(--pixiv-blue);
}

.btn-login:hover {
  background: var(--pixiv-hover);
}

.btn-register {
  color: #fff;
  background: var(--pixiv-blue);
}

.btn-register:hover {
  background: #1a7abf;
}
</style>