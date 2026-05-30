import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard - 数据仪表盘')
@Controller('admin/dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) { }

    @Get('overview')
    @ApiOperation({
        summary: '系统概览数据',
        description: `获取系统的核心指标概览：

**用户模块**
- 总注册用户数
- 今日新注册用户数

**图片模块**
- 总图片数
- 今日新增上传数
- 总浏览量

**评论模块**
- 总评论数
- 今日新增评论数

**互动数据**
- 总点赞数

适合在管理后台首页展示。`
    })
    @ApiResponse({ status: 200, description: '返回系统概览数据' })
    getOverview() {
        return this.dashboardService.getOverview()
    }

    @Get('trends')
    @ApiOperation({
        summary: '趋势分析数据',
        description: `获取近7天的趋势数据和排行榜：

**时间维度**
- 近7天每天的：上传量、评论量、新增用户量

**排行榜**
- 活跃用户 TOP5（按上传图片数）
- 热门图片 TOP5（按浏览量）

适合用图表展示趋势变化。`
    })
    getTrends() {
        return this.dashboardService.getTrends()
    }
}