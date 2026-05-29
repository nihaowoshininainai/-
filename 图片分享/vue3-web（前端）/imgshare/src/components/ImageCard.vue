<template>
  <router-link :to="`/detail/${image.iid}`" class="image-card">
    <div class="card-image-wrapper">
      <img :src="imageSrc" :alt="image.iname" loading="lazy" @error="handleImgError" />
      <div class="card-overlay">
        <div class="overlay-info">
          <span class="overlay-title">{{ image.iname }}</span>
          <span v-if="!hideAuthor" class="overlay-author">by {{ displayName }}</span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <span class="card-title" :title="image.iname">{{ image.iname }}</span>
      <div class="card-meta">
        <span v-if="!hideAuthor" class="card-author">
          <el-icon :size="12"><User /></el-icon>
          {{ displayName }}
        </span>
        <span class="card-views">
          <el-icon :size="12"><View /></el-icon>
          {{ image.pageview }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ImageItem, MyImageItem } from '@/types/api'

const props = defineProps<{
  image: ImageItem | MyImageItem
  authorName?: string
  hideAuthor?: boolean
}>()

const imgFailed = ref(false)

const displayName = computed(() => {
  if (props.authorName) return props.authorName
  return 'user' in props.image && props.image.user?.uname ? props.image.user.uname : '未知'
})

const imageSrc = computed(() => {
  if (imgFailed.value) return ''
  return '/' + props.image.isrc
})

function handleImgError() {
  imgFailed.value = true
}
</script>

<style scoped>
.image-card {
  display: block;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: var(--pixiv-shadow);
  transition: all 0.3s ease;
  cursor: pointer;
}

.image-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--pixiv-shadow-hover);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 75%;
  overflow: hidden;
  background: #f0f0f0;
}

.card-image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-card:hover .card-image-wrapper img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 12px 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover .card-overlay {
  opacity: 1;
}

.overlay-title {
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.overlay-author {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  margin-top: 2px;
}

.card-footer {
  padding: 10px 12px;
}

.card-title {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--pixiv-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--pixiv-text-secondary);
}

.card-author,
.card-views {
  display: flex;
  align-items: center;
  gap: 2px;
}
</style>