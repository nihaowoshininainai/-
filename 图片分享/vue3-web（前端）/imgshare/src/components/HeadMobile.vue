<template>
  <header class="mobile-header">
    <div class="mobile-header-inner">
      <router-link to="/" class="mobile-logo">
        <span class="logo-icon">🖼</span>
        <span class="logo-text">ImgShare</span>
      </router-link>

      <div class="mobile-actions">
        <template v-if="auth.isLoggedIn">
          <router-link to="/upload" class="mobile-icon-btn">
            <el-icon :size="20"><Upload /></el-icon>
          </router-link>
        </template>
        <el-popover placement="bottom-end" :width="200" trigger="click">
          <template #reference>
            <span class="mobile-icon-btn">
              <el-icon :size="20"><Search /></el-icon>
            </span>
          </template>
          <el-input
            v-model="keyword"
            placeholder="搜索图片..."
            clearable
            @keyup.enter="doSearch"
            @clear="doSearch"
          />
        </el-popover>
        <template v-if="auth.isLoggedIn">
          <el-popover placement="bottom-end" :width="180" trigger="click">
            <template #reference>
              <span class="mobile-icon-btn">
                <el-avatar :size="28" icon="UserFilled" />
              </span>
            </template>
            <div class="mobile-menu">
              <div class="mobile-menu-item" @click="$router.push('/my/images')">我的上传</div>
              <div class="mobile-menu-item" @click="$router.push('/my/likes')">我的点赞</div>
              <div class="mobile-menu-item logout" @click="handleLogout">退出登录</div>
            </div>
          </el-popover>
        </template>
        <template v-else>
          <router-link to="/login" class="mobile-login-btn">登录</router-link>
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
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid var(--pixiv-border);
}

.mobile-header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 4px;
}

.logo-icon {
  font-size: 22px;
}

.logo-text {
  font-size: 16px;
  font-weight: 700;
  color: var(--pixiv-blue);
}

.mobile-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile-icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: var(--pixiv-text-secondary);
  transition: background 0.2s;
}

.mobile-icon-btn:hover {
  background: var(--pixiv-hover);
}

.mobile-login-btn {
  padding: 5px 14px;
  border-radius: 16px;
  font-size: 13px;
  color: #fff;
  background: var(--pixiv-blue);
}

.mobile-menu {
  padding: 4px 0;
}

.mobile-menu-item {
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.mobile-menu-item:hover {
  background: var(--pixiv-hover);
}

.mobile-menu-item.logout {
  color: #e74c3c;
  border-top: 1px solid var(--pixiv-border);
  margin-top: 4px;
  padding-top: 10px;
}
</style>