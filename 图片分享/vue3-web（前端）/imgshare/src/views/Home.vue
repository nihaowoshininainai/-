<template>
  <div class="page-container">
    <div class="home-header">
      <h2 class="page-title">
        {{ keyword ? `"${keyword}" 的搜索结果` : '发现图片' }}
      </h2>
      <div class="sort-options">
        <span
          :class="['sort-item', { active: order === 'uploaddate' }]"
          @click="changeOrder('uploaddate')"
        >最新</span>
        <span
          :class="['sort-item', { active: order === 'pageview' }]"
          @click="changeOrder('pageview')"
        >热门</span>
      </div>
    </div>

    <div v-if="loading" class="loading-wrapper">
      <el-skeleton :rows="3" animated />
      <div class="skeleton-grid">
        <el-skeleton v-for="n in 8" :key="n" animated>
          <template #template>
            <div class="skeleton-card">
              <div class="skeleton-img"></div>
              <div class="skeleton-text"></div>
            </div>
          </template>
        </el-skeleton>
      </div>
    </div>

    <template v-else>
      <div v-if="images.length === 0" class="empty-state">
        <el-empty description="暂无图片">
          <template v-if="!keyword">
            <p style="color: #999; margin-top: 8px">快来上传第一张图片吧！</p>
          </template>
        </el-empty>
      </div>

      <div v-else class="image-grid">
        <ImageCard v-for="img in images" :key="img.iid" :image="img" />
      </div>

      <div v-if="total > pageSize" class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next"
          background
          @current-change="fetchImages"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '@/utils/api'
import type { ImageItem, ApiResponse } from '@/types/api'
import ImageCard from '@/components/ImageCard.vue'

const route = useRoute()
const router = useRouter()

const images = ref<ImageItem[]>([])
const loading = ref(false)
const currentPage = ref(1)
const total = ref(0)
const pageSize = 20
const order = ref<'uploaddate' | 'pageview'>('uploaddate')
const keyword = ref('')

function changeOrder(newOrder: 'uploaddate' | 'pageview') {
  order.value = newOrder
  currentPage.value = 1
  fetchImages()
}

async function fetchImages() {
  loading.value = true
  try {
    const [imgRes, countRes] = await Promise.all([
      get<ImageItem[]>('/search', {
        order: order.value,
        count: pageSize,
        page: currentPage.value,
        iname: keyword.value
      }),
      get<number>('/getCount', { iname: keyword.value })
    ])
    images.value = (imgRes as ApiResponse<ImageItem[]>).date
    total.value = (countRes as ApiResponse<number>).date
  } catch {
    images.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

watch(
  () => route.query.keyword,
  (val) => {
    keyword.value = (val as string) || ''
    currentPage.value = 1
    fetchImages()
  }
)

onMounted(() => {
  keyword.value = (route.query.keyword as string) || ''
  fetchImages()
})
</script>

<style scoped>
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.sort-options {
  display: flex;
  gap: 4px;
  background: #f2f4f7;
  border-radius: 20px;
  padding: 3px;
}

.sort-item {
  padding: 6px 16px;
  border-radius: 18px;
  font-size: 14px;
  color: var(--pixiv-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.sort-item.active {
  background: #fff;
  color: var(--pixiv-blue);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.loading-wrapper {
  padding: 20px 0;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.skeleton-card {
  border-radius: 8px;
  overflow: hidden;
}

.skeleton-img {
  width: 100%;
  padding-top: 75%;
  background: #e8e8e8;
  border-radius: 8px;
}

.skeleton-text {
  height: 16px;
  background: #e8e8e8;
  border-radius: 4px;
  margin-top: 8px;
  width: 60%;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding-bottom: 20px;
}

.empty-state {
  padding: 80px 0;
}

@media screen and (max-width: 1024px) {
  .image-grid,
  .skeleton-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .image-grid,
  .skeleton-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media screen and (max-width: 480px) {
  .image-grid,
  .skeleton-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>