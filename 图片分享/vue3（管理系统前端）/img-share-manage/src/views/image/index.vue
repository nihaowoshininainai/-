<template>
  <div class="image-manage">
    <el-card shadow="hover" class="mb-16">
      <template #header>
        <div class="card-header">
          <span>图片列表</span>
          <div class="header-right">
            <el-select v-model="orderField" style="width: 140px; margin-right: 12px;" @change="fetchList">
              <el-option label="按时间排序" value="uploaddate" />
              <el-option label="按浏览量排序" value="pageview" />
            </el-select>
            <el-input
              v-model="searchKey"
              placeholder="搜索图片名称"
              clearable
              style="width: 240px"
              @clear="fetchList"
              @keyup.enter="fetchList"
            >
              <template #append>
                <el-button :icon="Search" @click="fetchList" />
              </template>
            </el-input>
          </div>
        </div>
      </template>

      <el-table :data="imgList" v-loading="loading" stripe border>
        <el-table-column prop="iid" label="ID" width="70" align="center" />
        <el-table-column label="图片预览" width="100" align="center">
          <template #default="{ row }">
            <el-image
              v-if="row.isrc"
              :src="'/' + row.isrc"
              :preview-src-list="['/' + row.isrc]"
              fit="cover"
              style="width: 60px; height: 60px; border-radius: 4px;"
              preview-teleported
            />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="iname" label="图片名称" min-width="130">
          <template #default="{ row }">
            <el-link type="primary" @click="showDetail(row.iid)">{{ row.iname }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="上传者" width="110">
          <template #default="{ row }">{{ row.uploader?.uname }}</template>
        </el-table-column>
        <el-table-column prop="uploaddate" label="上传日期" width="120" sortable />
        <el-table-column prop="pageview" label="浏览量" width="90" align="center" sortable />
        <el-table-column prop="commentCount" label="评论数" width="80" align="center" />
        <el-table-column prop="likeCount" label="点赞数" width="80" align="center" />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="showDetail(row.iid)">详情</el-button>
            <el-popconfirm title="确定删除该图片？将级联删除所有关联数据！" @confirm="handleDelete(row.iid, row.iname, row.isrc)">
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

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header"><span>热门图片 TOP10</span></div>
          </template>
          <el-table :data="hotImages" v-loading="hotLoading" stripe size="small">
            <el-table-column type="index" label="#" width="50" align="center" />
            <el-table-column label="图片" width="100" align="center">
              <template #default="{ row }">
                <el-image
                  v-if="row.isrc"
                  :src="'/' + row.isrc"
                  fit="cover"
                  style="width: 50px; height: 50px; border-radius: 4px;"
                />
              </template>
            </el-table-column>
            <el-table-column prop="iname" label="名称" />
            <el-table-column prop="uploader" label="上传者" width="110" />
            <el-table-column prop="pageview" label="浏览量" width="100" align="center">
              <template #default="{ row }">
                <el-tag type="warning">{{ row.pageview }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="detailVisible" :title="'图片详情 - ' + (detailData?.iname ?? '')" width="780px" destroy-on-close>
      <div v-loading="detailLoading" v-if="detailData">
        <el-descriptions :column="2" border class="mb-16">
          <el-descriptions-item label="图片ID">{{ detailData.iid }}</el-descriptions-item>
          <el-descriptions-item label="名称">{{ detailData.iname }}</el-descriptions-item>
          <el-descriptions-item label="上传者">{{ detailData.uploader?.uname }}</el-descriptions-item>
          <el-descriptions-item label="上传日期">{{ detailData.uploaddate }}</el-descriptions-item>
          <el-descriptions-item label="浏览量">{{ detailData.pageview }}</el-descriptions-item>
          <el-descriptions-item label="点赞数">{{ detailData.likeCount }}</el-descriptions-item>
        </el-descriptions>

        <div v-if="detailData.isrc" class="mb-16">
          <el-image
            :src="'/' + detailData.isrc"
            :preview-src-list="['/' + detailData.isrc]"
            fit="contain"
            style="max-width: 100%; max-height: 350px;"
            preview-teleported
          />
        </div>

        <el-divider content-position="left">点赞用户 ({{ detailData.likedByUsers?.length ?? 0 }})</el-divider>
        <div class="tag-group" v-if="detailData.likedByUsers?.length">
          <el-tag v-for="u in detailData.likedByUsers" :key="u.uid" class="mb-8 mr-8">{{ u.uname }}</el-tag>
        </div>
        <el-empty v-else description="暂无点赞" :image-size="60" />

        <el-divider content-position="left">评论区 ({{ detailData.comments?.length ?? 0 }})</el-divider>
        <el-table :data="detailData.comments" size="small" max-height="250" v-if="detailData.comments?.length">
          <el-table-column prop="cid" label="ID" width="60" />
          <el-table-column label="评论者" width="110">
            <template #default="{ row }">{{ row.commenter?.uname }}</template>
          </el-table-column>
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
import { getImgList, getImgDetail, getHotImages, deleteImage } from '@/api/image'

const loading = ref(false)
const imgList = ref<any[]>([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchKey = ref('')
const orderField = ref('uploaddate')

const hotLoading = ref(false)
const hotImages = ref<any[]>([])

const detailVisible = ref(false)
const detailLoading = ref(false)
const detailData = ref<any>(null)

async function fetchList() {
  loading.value = true
  try {
    const res = await getImgList(page.value, pageSize.value, orderField.value, searchKey.value.trim())
    imgList.value = res.list
    total.value = res.total
  } finally {
    loading.value = false
  }
}

async function fetchHot() {
  hotLoading.value = true
  try {
    hotImages.value = await getHotImages(10)
  } finally {
    hotLoading.value = false
  }
}

async function showDetail(iid: number) {
  detailVisible.value = true
  detailLoading.value = true
  try {
    detailData.value = await getImgDetail(iid)
  } finally {
    detailLoading.value = false
  }
}

async function handleDelete(iid: number, iname: string, isrc?: string) {
  await deleteImage(iid, isrc)
  ElMessage.success(`已删除图片「${iname}」`)
  fetchList()
}

onMounted(() => {
  fetchList()
  fetchHot()
})
</script>

<style lang="less" scoped>
.image-manage {
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
  .mb-8 { margin-bottom: 8px; }
  .mr-8 { margin-right: 8px; }
  .tag-group {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
