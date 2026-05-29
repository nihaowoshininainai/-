<template>
  <div class="page-container">
    <h2 class="page-title">我的上传</h2>

    <div v-if="loading" class="skeleton-grid">
      <el-skeleton v-for="n in 4" :key="n" animated>
        <template #template>
          <div class="skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-text"></div>
          </div>
        </template>
      </el-skeleton>
    </div>

    <div v-else-if="images.length === 0" class="empty-state">
      <el-empty description="你还没有上传过图片">
        <el-button type="primary" @click="$router.push('/upload')">去上传</el-button>
      </el-empty>
    </div>

    <div v-else class="image-grid">
      <ImageCard v-for="img in images" :key="img.iid" :image="img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { get } from '@/utils/api'
import type { MyImageItem } from '@/types/api'
import ImageCard from '@/components/ImageCard.vue'

const images = ref<MyImageItem[]>([])
const loading = ref(false)

async function fetchImages() {
  loading.value = true
  try {
    const res = await get<MyImageItem[]>('/getUserImg')
    images.value = res.date || []
  } catch {
    images.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchImages()
})
</script>

<style scoped>
.skeleton-grid,
.image-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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

.empty-state {
  padding: 80px 0;
}

@media screen and (max-width: 1024px) {
  .skeleton-grid,
  .image-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .skeleton-grid,
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media screen and (max-width: 480px) {
  .skeleton-grid,
  .image-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>