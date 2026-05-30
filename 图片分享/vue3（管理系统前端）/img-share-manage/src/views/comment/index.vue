<template>
  <div class="comment-manage">
    <el-card shadow="hover" class="mb-16">
      <template #header>
        <div class="card-header">
          <span>评论列表</span>
          <div class="header-right">
            <el-input
              v-model="imgSearchKey"
              placeholder="按图片ID查询"
              clearable
              style="width: 180px; margin-right: 12px;"
              @clear="fetchByImg"
              @keyup.enter="fetchByImg"
            >
              <template #append>
                <el-button :icon="Picture" @click="fetchByImg" />
              </template>
            </el-input>
            <el-input
              v-model="userSearchKey"
              placeholder="按用户ID查询"
              clearable
              style="width: 180px; margin-right: 12px;"
              @clear="fetchByUser"
              @keyup.enter="fetchByUser"
            >
              <template #append>
                <el-button :icon="User" @click="fetchByUser" />
              </template>
            </el-input>
            <el-button type="primary" @click="resetToAll">显示全部</el-button>
          </div>
        </div>
      </template>

      <el-table :data="commentList" v-loading="loading" stripe border>
        <el-table-column prop="cid" label="ID" width="70" align="center" />
        <el-table-column label="评论者" width="120">
          <template #default="{ row }">{{ row.user?.uname }}</template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容" min-width="200" show-overflow-tooltip />
        <el-table-column label="所属图片" width="140">
          <template #default="{ row }">{{ row.img?.iname }}</template>
        </el-table-column>
        <el-table-column prop="commdate" label="评论时间" width="170" />
        <el-table-column prop="clicklike" label="点赞数" width="90" align="center">
          <template #default="{ row }">
            <el-tag size="small" type="success">{{ row.clicklike }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default="{ row }">
            <el-popconfirm title="确定删除该评论？" @confirm="handleDelete(row.cid, row.content)">
              <template #reference>
                <el-button type="danger" link size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrap" v-if="mode === 'all'">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          @size-change="fetchList"
          @current-change="fetchList"
        />
      </div>
    </el-card>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header"><span>评论统计概览</span></div>
          </template>
          <div v-loading="statLoading" v-if="statistics">
            <el-descriptions :column="1" border>
              <el-descriptions-item label="总评论数">
                <el-tag type="primary" size="large">{{ statistics.totalComments }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="今日新增">
                <el-tag type="success" size="large">{{ statistics.todayComments }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="平均点赞">
                <el-tag type="warning" size="large">{{ statistics.averageLikes }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header"><span>热门评论 TOP10</span></div>
          </template>
          <el-table :data="statistics?.topHotComments ?? []" stripe size="small" v-loading="statLoading">
            <el-table-column type="index" label="#" width="45" align="center" />
            <el-table-column prop="content" label="内容" show-overflow-tooltip />
            <el-table-column prop="clicklike" label="点赞" width="70" align="center">
              <template #default="{ row }">
                <el-tag type="danger" size="small">{{ row.clicklike }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="commenter" label="评论者" width="90" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Picture, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {
  getCommentList,
  getCommentByImg,
  getCommentByUser,
  getCommentStatistics,
  deleteComment
} from '@/api/comment'

const loading = ref(false)
const commentList = ref<any[]>([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const mode = ref<'all' | 'byImg' | 'byUser'>('all')

const imgSearchKey = ref('')
const userSearchKey = ref('')

const statLoading = ref(false)
const statistics = ref<any>(null)

async function fetchList() {
  loading.value = true
  mode.value = 'all'
  try {
    const res = await getCommentList(page.value, pageSize.value)
    commentList.value = res.list
    total.value = res.total
  } finally {
    loading.value = false
  }
}

async function fetchByImg() {
  if (!imgSearchKey.value.trim()) return
  loading.value = true
  mode.value = 'byImg'
  try {
    const iid = Number(imgSearchKey.value.trim())
    commentList.value = await getCommentByImg(iid)
    total.value = commentList.value.length
  } finally {
    loading.value = false
  }
}

async function fetchByUser() {
  if (!userSearchKey.value.trim()) return
  loading.value = true
  mode.value = 'byUser'
  try {
    const uid = Number(userSearchKey.value.trim())
    commentList.value = await getCommentByUser(uid)
    total.value = commentList.value.length
  } finally {
    loading.value = false
  }
}

function resetToAll() {
  imgSearchKey.value = ''
  userSearchKey.value = ''
  fetchList()
}

async function handleDelete(cid: number, content: string) {
  await deleteComment(cid)
  ElMessage.success(`已删除评论：${content.slice(0, 15)}...`)
  if (mode.value === 'all') {
    fetchList()
  } else if (mode.value === 'byImg') {
    fetchByImg()
  } else {
    fetchByUser()
  }
}

async function fetchStatistics() {
  statLoading.value = true
  try {
    statistics.value = await getCommentStatistics()
  } finally {
    statLoading.value = false
  }
}

onMounted(() => {
  fetchList()
  fetchStatistics()
})
</script>

<style lang="less" scoped>
.comment-manage {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 15px;
    .header-right {
      display: flex;
      align-items: center;
    }
  }
  .pagination-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
  .mb-16 { margin-bottom: 16px; }
}
</style>
