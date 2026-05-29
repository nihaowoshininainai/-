<template>
  <div class="page-container">
    <div v-if="loading" class="loading-wrapper">
      <el-skeleton :rows="5" animated />
    </div>

    <template v-else-if="image">
      <div class="detail-layout">
        <div class="detail-main">
          <div class="image-viewer">
            <img :src="'/' + image.isrc" :alt="image.iname" class="main-image" />
          </div>

          <div class="image-actions">
            <div class="action-left">
              <el-button
                :type="liked ? 'danger' : 'default'"
                :icon="liked ? StarFilled : Star"
                round
                @click="toggleLike"
              >
                {{ liked ? '已点赞' : '点赞' }}
              </el-button>
            </div>
            <div class="action-right">
              <span class="stat-item">
                <el-icon><View /></el-icon>
                {{ image.pageview }} 次浏览
              </span>
            </div>
          </div>

          <div class="comment-section">
            <h3 class="section-title">
              评论
              <span class="comment-count">({{ comments.length }})</span>
            </h3>

            <div v-if="auth.isLoggedIn" class="comment-input-wrapper">
              <el-input
                v-model="commentContent"
                type="textarea"
                :rows="2"
                placeholder="发表你的评论..."
                maxlength="500"
                show-word-limit
              />
              <el-button
                type="primary"
                :loading="submittingComment"
                :disabled="!commentContent.trim()"
                class="comment-submit-btn"
                @click="submitComment"
              >
                发表评论
              </el-button>
            </div>
            <div v-else class="comment-login-hint">
              <router-link to="/login">登录</router-link>后即可发表评论
            </div>

            <div v-if="comments.length === 0" class="no-comments">
              暂无评论，快来发表第一条评论吧
            </div>

            <div v-else class="comment-list">
              <div v-for="comment in comments" :key="comment.cid" class="comment-item">
                <div class="comment-avatar">
                  <el-avatar :size="36" icon="UserFilled" />
                </div>
                <div class="comment-body">
                  <div class="comment-header">
                    <span class="comment-author">{{ comment.user.uname }}</span>
                    <span class="comment-time">{{ comment.commdate }}</span>
                  </div>
                  <p class="comment-content">{{ comment.content }}</p>
                  <div class="comment-actions">
                    <span
                      :class="['comment-like', { liked: likedComments.includes(comment.cid) }]"
                      @click="toggleCommentLike(comment.cid)"
                    >
                      <el-icon :size="14">
                        <CaretTop v-if="likedComments.includes(comment.cid)" />
                        <CaretTop v-else />
                      </el-icon>
                      {{ comment.clicklike }}
                    </span>
                    <span
                      v-if="comment.user.uid === auth.user?.uid"
                      class="comment-delete"
                      @click="deleteComment(comment.cid)"
                    >
                      删除
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-sidebar">
          <div class="sidebar-card">
            <h2 class="image-title">{{ image.iname }}</h2>
            <div class="image-meta">
              <div class="meta-item">
                <el-icon><User /></el-icon>
                <span>{{ image.user.uname }}</span>
              </div>
              <div class="meta-item">
                <el-icon><Calendar /></el-icon>
                <span>{{ image.uploaddate }}</span>
              </div>
              <div class="meta-item">
                <el-icon><View /></el-icon>
                <span>{{ image.pageview }} 次浏览</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { get, post } from '@/utils/api'
import { useAuthStore } from '@/stores/auth'
import type { ImageItem, CommentItem } from '@/types/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Star, StarFilled, CaretTop } from '@element-plus/icons-vue'

const route = useRoute()
const auth = useAuthStore()

const image = ref<ImageItem | null>(null)
const comments = ref<CommentItem[]>([])
const likedComments = ref<number[]>([])
const liked = ref(false)
const loading = ref(false)
const commentContent = ref('')
const submittingComment = ref(false)

async function fetchDetail() {
  const iid = Number(route.params.iid)
  loading.value = true
  try {
    const [imgRes, commentRes] = await Promise.all([
      get<ImageItem[]>('/search', { order: 'uploaddate', count: 1, page: 1, iname: '' }),
      get<CommentItem[]>('/getComment', { iid }),
      get<number>('/addPageView', { iid })
    ])

    const allImages = imgRes.date
    image.value = allImages.find((img: ImageItem) => img.iid === iid) || null
    comments.value = commentRes.date || []

    if (auth.isLoggedIn) {
      const [likeRes, clickRes] = await Promise.all([
        get<boolean>('/likeOrNot', { iid }),
        get<number[]>('/getClickComments')
      ])
      liked.value = likeRes.date
      likedComments.value = clickRes.date || []
    }
  } catch {
    ElMessage.error('加载图片详情失败')
  } finally {
    loading.value = false
  }
}

async function toggleLike() {
  if (!auth.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  try {
    if (liked.value) {
      await get('/delLike', { iid: Number(route.params.iid) })
      liked.value = false
      ElMessage.success('已取消点赞')
    } else {
      await get('/addLike', { iid: Number(route.params.iid) })
      liked.value = true
      ElMessage.success('已点赞')
    }
  } catch {
    // 错误已处理
  }
}

async function submitComment() {
  if (!commentContent.value.trim()) return
  submittingComment.value = true
  try {
    await post('/addComment', {
      img: { iid: Number(route.params.iid) },
      content: commentContent.value.trim()
    })
    ElMessage.success('评论发表成功')
    commentContent.value = ''
    const res = await get<CommentItem[]>('/getComment', { iid: Number(route.params.iid) })
    comments.value = res.date || []
  } catch {
    // 错误已处理
  } finally {
    submittingComment.value = false
  }
}

async function toggleCommentLike(cid: number) {
  if (!auth.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  try {
    if (likedComments.value.includes(cid)) {
      await get('/delClick', { cid })
      likedComments.value = likedComments.value.filter((id: number) => id !== cid)
    } else {
      await get('/clickLike', { cid })
      likedComments.value.push(cid)
    }
    const res = await get<CommentItem[]>('/getComment', { iid: Number(route.params.iid) })
    comments.value = res.date || []
  } catch {
    // 错误已处理
  }
}

async function deleteComment(cid: number) {
  try {
    await ElMessageBox.confirm('确定要删除这条评论吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await post('/delComment', { cid })
    ElMessage.success('评论已删除')
    comments.value = comments.value.filter((c) => c.cid !== cid)
  } catch {
    // 取消或错误
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
.loading-wrapper {
  padding: 40px 0;
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
}

.detail-main {
  min-width: 0;
}

.image-viewer {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--pixiv-shadow);
}

.main-image {
  width: 100%;
  display: block;
}

.image-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding: 0 4px;
}

.action-left {
  display: flex;
  gap: 10px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--pixiv-text-secondary);
}

.comment-section {
  margin-top: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.comment-count {
  font-size: 14px;
  color: var(--pixiv-text-secondary);
  font-weight: 400;
}

.comment-input-wrapper {
  margin-bottom: 20px;
}

.comment-input-wrapper :deep(.el-textarea__inner) {
  border-radius: 8px;
}

.comment-submit-btn {
  margin-top: 10px;
  border-radius: 20px;
}

.comment-login-hint {
  text-align: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 14px;
  color: var(--pixiv-text-secondary);
}

.comment-login-hint a {
  color: var(--pixiv-blue);
}

.no-comments {
  text-align: center;
  padding: 40px;
  color: var(--pixiv-text-secondary);
  font-size: 14px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.comment-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.comment-body {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.comment-author {
  font-size: 14px;
  font-weight: 600;
  color: var(--pixiv-text);
}

.comment-time {
  font-size: 12px;
  color: var(--pixiv-text-secondary);
}

.comment-content {
  font-size: 14px;
  color: var(--pixiv-text);
  line-height: 1.6;
  word-break: break-word;
}

.comment-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}

.comment-like {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  color: var(--pixiv-text-secondary);
  cursor: pointer;
  transition: color 0.2s;
}

.comment-like.liked {
  color: var(--pixiv-blue);
}

.comment-delete {
  font-size: 12px;
  color: #e74c3c;
  cursor: pointer;
}

.comment-delete:hover {
  text-decoration: underline;
}

.detail-sidebar {
  position: sticky;
  top: 80px;
  align-self: start;
}

.sidebar-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--pixiv-shadow);
}

.image-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  word-break: break-word;
}

.image-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--pixiv-text-secondary);
}

@media screen and (max-width: 900px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-sidebar {
    position: static;
    order: -1;
  }
}
</style>