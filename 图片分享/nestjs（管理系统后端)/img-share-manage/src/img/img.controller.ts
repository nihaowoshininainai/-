import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ImgService } from './img.service';

@ApiTags('Image - 图片管理')
@Controller('admin/img')
export class ImgController {
    constructor(
        private imgService: ImgService
    ) { }

    @Get('list')
    @ApiOperation({
        summary: '获取图片列表',
        description: `分页查询图片，支持按浏览量或上传时间排序，支持按名称模糊搜索。
返回每张图片的上传者信息、评论数、点赞数等统计数据`
    })
    @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', example: 10 })
    @ApiQuery({ name: 'order', required: false, description: '排序字段：uploaddate(时间) / pageview(浏览量)', example: 'uploaddate' })
    @ApiQuery({ name: 'iname', required: false, description: '图片名称关键词（空字符串查全部）', example: '' })
    getList(@Query() query: any) {
        const page = query.page || 1
        const pageSize = query.pageSize || 10
        const order = query.order || 'uploaddate'
        const iname = query.iname || ''
        return this.imgService.getList(page, pageSize, order, iname)
    }

    @Get('detail')
    @ApiOperation({
        summary: '获取图片详情',
        description: '获取图片完整信息，包括：上传者信息、评论列表（含评论者）、点赞用户列表'
    })
    @ApiQuery({ name: 'iid', required: true, description: '图片ID', example: 1 })
    getDetail(@Query() query: any) {
        return this.imgService.getDetail(query.iid)
    }

    @Get('statistics')
    @ApiOperation({
        summary: '图片统计数据',
        description: `获取图片整体统计：
- 总图片数
- 今日新增图片数
- TOP 10 热门图片（按浏览量）
- 平均浏览量`
    })
    getStatistics() {
        return this.imgService.getStatistics()
    }

    @Get('hot')
    @ApiOperation({
        summary: '热门图片排行榜',
        description: '获取浏览量最高的 N 张图片'
    })
    @ApiQuery({ name: 'limit', required: false, description: '返回数量限制', example: 10 })
    getHotImgs(@Query() query: any) {
        const limit = query.limit || 10
        return this.imgService.getHotImgs(limit)
    }

    @Post('delete')
    @ApiOperation({
        summary: '删除图片',
        description: '删除指定图片及其所有关联评论。建议先查看图片详情确认是否需要删除。'
    })
    async delete(@Body() body: any) {
        return await this.imgService.delete(body.iid, body.isrc)
    }
}