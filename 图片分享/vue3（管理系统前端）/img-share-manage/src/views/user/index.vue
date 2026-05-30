<template>
  <div class="user-manage">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <el-input
            v-model="searchKey"
            placeholder="搜索用户名"
            clearable
            style="width: 240px"
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #append>
              <el-button :icon="Search" @click="handleSearch" />
            </template>
          </el-input>
        </div>
      </template>

      <el-table :data="userList" v-loading="loading" stripe border>
        <el-table-column prop="uid" label="ID" width="70" align="center" />
        <el-table-column prop="uname" label="用户名" min-width="120">
          <template #default="{ row }">
            <el-link type="primary" @click="showDetail(row.uid)">{{ row.uname }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="imgCount" label="图片数" width="90" align="center" />
        <el-table-column prop="commentCount" label="评论数" width="90" align="center" />
        <el-table-column prop="likeImgCount" label="点赞图片" width="100" align="center" />
        <el-table-column prop="likeCommentCount" label="点赞评论" width="100" align="center" />
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="showDetail(row.uid)">详情</el-button>
            <el-popconfirm title="确定删除该用户？将级联删除所有关联数据！" @confirm="handleDelete(row.uid, row.uname)">
              <template #reference>
                <el-button type="danger" link size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrap">
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

    <el-dialog v-model="detailVisible" :title="'用户详情 - ' + (detailData?.uname ?? '')" width="720px" destroy-on-close>
      <div v-loading="detailLoading" v-if="detailData">
        <el-descriptions :column="2" border class="mb-16">
          <el-descriptions-item label="用户ID">{{ detailData.uid }}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{ detailData.uname }}</el-descriptions-item>
          <el-descriptions-item label="总图片">{{ detailData.statistics?.totalImgs }}</el-descriptions-item>
          <el-descriptions-item label="总评论">{{ detailData.statistics?.totalComments }}</el-descriptions-item>
          <el-descriptions-item label="点赞图片">{{ detailData.statistics?.likedImgs }}</el-descriptions-item>
          <el-descriptions-item label="点赞评论">{{ detailData.statistics?.likedComments }}</el-descriptions-item>
        </el-descriptions>

        <el-divider content-position="left">上传的图片</el-divider>
        <el-table :data="detailData.imgs" size="small" max-height="250" v-if="detailData.imgs?.length">
          <el-table-column prop="iid" label="ID" width="60" />
          <el-table-column prop="iname" label="名称" />
          <el-table-column prop="uploaddate" label="上传日期" width="120" />
          <el-table-column prop="pageview" label="浏览量" width="80" align="center" />
          <el-table-column prop="commentCount" label="评论数" width="80" align="center" />
        </el-table>
        <el-empty v-else description="暂无图片" :image-size="60" />

        <el-divider content-position="left">发表的评论</el-divider>
        <el-table :data="detailData.comments" size="small" max-height="200" v-if="detailData.comments?.length">
          <el-table-column prop="cid" label="ID" width="60" />
          <el-table-column prop="content" label="内容" show-overflow-tooltip />
          <el-table-column prop="commdate" label="时间" width="160" />
          <el-table-column prop="clicklike" label="点赞" width="70" align="center" />
        </el-table>
        <el-empty v-else description="暂无评论" :image-size="60" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getUserList, searchUser, getUserDetail, deleteUser } from '@/api/user'

const loading = ref(false)
const userList = ref<any[]>([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchKey = ref('')

const detailVisible = ref(false)
const detailLoading = ref(false)
const detailData = ref<any>(null)

async function fetchList() {
  loading.value = true
  try {
    const res = await getUserList(page.value, pageSize.value)
    userList.value = res.list
    total.value = res.total
  } finally {
    loading.value = false
  }
}

async function handleSearch() {
  if (!searchKey.value.trim()) {
    fetchList()
    return
  }
  loading.value = true
  try {
    const list = await searchUser(searchKey.value.trim())
    userList.value = list.map((u: any) => ({
      ...u,
      imgCount: '-',
      commentCount: '-',
      likeImgCount: '-',
      likeCommentCount: '-'
    }))
    total.value = list.length
  } finally {
    loading.value = false
  }
}

async function showDetail(uid: number) {
  detailVisible.value = true
  detailLoading.value = true
  try {
    detailData.value = await getUserDetail(uid)
  } finally {
    detailLoading.value = false
  }
}

async function handleDelete(uid: number, uname: string) {
  await deleteUser(uid)
  ElMessage.success(`已删除用户 ${uname}`)
  fetchList()
}

onMounted(() => {
  fetchList()
})
</script>

<style lang="less" scoped>
.user-manage {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 15px;
  }
  .pagination-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
  .mb-16 { margin-bottom: 16px; }
}
</style>
