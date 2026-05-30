<template>
  <div class="dashboard">
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6" v-for="item in statCards" :key="item.title">
        <el-card shadow="hover" class="stat-card" :class="item.className">
          <div class="stat-card-content">
            <div class="stat-info">
              <div class="stat-title">{{ item.title }}</div>
              <div class="stat-value">{{ item.value ?? '-' }}</div>
              <div class="stat-sub">
                今日新增: <span class="highlight">{{ item.today ?? 0 }}</span>
              </div>
            </div>
            <div class="stat-icon" :style="{ background: item.iconBg }">
              <el-icon :size="28"><component :is="item.icon" /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="content-row">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>近7天趋势</span>
            </div>
          </template>
          <div class="trend-chart" v-if="trendData.last7Days?.length">
            <div class="chart-bars">
              <div
                class="chart-bar-item"
                v-for="(day, index) in trendData.last7Days"
                :key="index"
              >
                <div class="bar-group">
                  <div
                    class="bar bar-upload"
                    :style="{ height: getBarHeight(day.uploads, 'uploads') + 'px' }"
                    :title="'上传: ' + day.uploads"
                  ></div>
                  <div
                    class="bar bar-comment"
                    :style="{ height: getBarHeight(day.comments, 'comments') + 'px' }"
                    :title="'评论: ' + day.comments"
                  ></div>
                  <div
                    class="bar bar-user"
                    :style="{ height: getBarHeight(day.newUsers, 'users') + 'px' }"
                    :title="'新用户: ' + day.newUsers"
                  ></div>
                </div>
                <div class="bar-label">{{ day.date.slice(5) }}</div>
              </div>
            </div>
            <div class="chart-legend">
              <span><i class="legend-dot upload"></i>上传</span>
              <span><i class="legend-dot comment"></i>评论</span>
              <span><i class="legend-dot user"></i>新用户</span>
            </div>
          </div>
          <el-empty v-else description="暂无趋势数据" />
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header"><span>活跃用户 TOP5</span></div>
          </template>
          <div class="rank-list" v-if="trendData.activeUsers?.length">
            <div
              class="rank-item"
              v-for="(user, index) in trendData.activeUsers"
              :key="user.uid"
            >
              <span class="rank-index" :class="{ top3: index < 3 }">{{ index + 1 }}</span>
              <span class="rank-name">{{ user.uname }}</span>
              <span class="rank-count">{{ user.imgCount }} 张图</span>
            </div>
          </div>
          <el-empty v-else description="暂无数据" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="content-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header"><span>热门图片 TOP5</span></div>
          </template>
          <el-table :data="trendData.hotImages" stripe v-if="trendData.hotImages?.length">
            <el-table-column type="index" label="#" width="50" />
            <el-table-column prop="iname" label="图片名称" />
            <el-table-column prop="pageview" label="浏览量" width="120" align="center">
              <template #default="{ row }">
                <el-tag>{{ row.pageview }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
          <el-empty v-else description="暂无数据" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getOverview, getTrends } from '@/api/dashboard'
import { User, Picture, ChatDotRound, Star } from '@element-plus/icons-vue'

const overview = ref<any>({})
const trendData = reactive<any>({ last7Days: [], activeUsers: [], hotImages: [] })

let maxUploads = 1
let maxComments = 1
let maxUsers = 1

const statCards = computed(() => [
  {
    title: '注册用户',
    value: overview.value.users?.total,
    today: overview.value.users?.todayNew,
    icon: User,
    iconBg: '#e6f7ff',
    className: 'card-user'
  },
  {
    title: '图片总数',
    value: overview.value.images?.total,
    today: overview.value.images?.todayUploads,
    icon: Picture,
    iconBg: '#fff7e6',
    className: 'card-image'
  },
  {
    title: '评论总数',
    value: overview.value.comments?.total,
    today: overview.value.comments?.todayNew,
    icon: ChatDotRound,
    iconBg: '#f6ffed',
    className: 'card-comment'
  },
  {
    title: '点赞总数',
    value: overview.value.likes?.total,
    today: '-',
    icon: Star,
    iconBg: '#fff0f6',
    className: 'card-like'
  }
])

function getBarHeight(value: number, type: string) {
  const maxVal = type === 'uploads' ? maxUploads : type === 'comments' ? maxComments : maxUsers
  if (maxVal === 0) return 4
  return Math.max(4, (value / maxVal) * 180)
}

onMounted(async () => {
  try {
    overview.value = await getOverview()
  } catch {}
  try {
    const trends = await getTrends()
    Object.assign(trendData, trends)
    if (trends.last7Days?.length) {
      maxUploads = Math.max(...trends.last7Days.map((d: any) => d.uploads), 1)
      maxComments = Math.max(...trends.last7Days.map((d: any) => d.comments), 1)
      maxUsers = Math.max(...trends.last7Days.map((d: any) => d.newUsers), 1)
    }
  } catch {}
})
</script>

<style lang="less" scoped>
.dashboard {
  .stat-cards {
    margin-bottom: 20px;
  }
  .stat-card {
    border-radius: 8px;
    .stat-card-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .stat-title {
      font-size: 14px;
      color: #909399;
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 28px;
      font-weight: bold;
      color: #303133;
      margin-bottom: 8px;
    }
    .stat-sub {
      font-size: 12px;
      color: #909399;
      .highlight {
        color: #409eff;
        font-weight: bold;
      }
    }
    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
    }
  }
  .card-user { border-top: 3px solid #409eff; }
  .card-image { border-top: 3px solid #e6a23c; }
  .card-comment { border-top: 3px solid #67c23a; }
  .card-like { border-top: 3px solid #f56c6c; }

  .content-row {
    margin-bottom: 20px;
  }
  .card-header {
    font-weight: bold;
    font-size: 15px;
  }

  .trend-chart {
    padding: 10px 0;
    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 220px;
      padding: 0 10px;
    }
    .chart-bar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      max-width: 70px;
    }
    .bar-group {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 200px;
    }
    .bar {
      width: 14px;
      min-height: 4px;
      border-radius: 2px 2px 0 0;
      transition: height 0.3s;
    }
    .bar-upload { background: #409eff; }
    .bar-comment { background: #67c23a; }
    .bar-user { background: #e6a23c; }
    .bar-label {
      margin-top: 8px;
      font-size: 12px;
      color: #909399;
    }
    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 12px;
      span {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #606266;
      }
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      display: inline-block;
    }
    .legend-dot.upload { background: #409eff; }
    .legend-dot.comment { background: #67c23a; }
    .legend-dot.user { background: #e6a23c; }
  }

  .rank-list {
    .rank-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      &:last-child { border-bottom: none; }
    }
    .rank-index {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #f0f0f0;
      text-align: center;
      line-height: 24px;
      font-size: 12px;
      color: #909399;
      margin-right: 12px;
      &.top3 {
        background: #e6a23c;
        color: #fff;
        font-weight: bold;
      }
    }
    .rank-name {
      flex: 1;
      font-size: 14px;
    }
    .rank-count {
      font-size: 13px;
      color: #909399;
    }
  }
}
</style>
