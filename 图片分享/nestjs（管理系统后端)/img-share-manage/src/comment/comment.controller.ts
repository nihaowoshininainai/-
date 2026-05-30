import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CommentService } from './comment.service';

@ApiTags('Comment - 评论管理')
@Controller('admin/comment')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Get('list')
    @ApiOperation({
        summary: '获取评论列表',
        description: '分页获取所有评论，包含评论者信息和所属图片信息。可用于审核不当评论。'
    })
    @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', example: 10 })
    getList(@Query() query: any) {
        const page = query.page || 1
        const pageSize = query.pageSize || 10
        return this.commentService.getList(page, pageSize)
    }

    @Get('byImg')
    @ApiOperation({
        summary: '获取某图片的评论',
        description: '查询指定图片下的所有评论，用于审核特定图片的评论区'
    })
    @ApiQuery({ name: 'iid', required: true, description: '图片ID', example: 1 })
    getByImg(@Query() query: any) {
        return this.commentService.getByImg(query.iid)
    }

    @Get('byUser')
    @ApiOperation({
        summary: '获取某用户的评论',
        description: '查询指定用户发布过的所有评论，用于监控用户行为'
    })
    @ApiQuery({ name: 'uid', required: true, description: '用户ID', example: 1 })
    getByUser(@Query() query: any) {
        return this.commentService.getByUser(query.uid)
    }

    @Get('statistics')
    @ApiOperation({
        summary: '评论统计数据',
        description: `获取评论整体统计：
- 总评论数
- 今日新增评论数
- TOP 10 热门评论（按点赞数）
- 平均点赞数`
    })
    getStatistics() {
        return this.commentService.getStatistics()
    }

    @Post('delete')
    @ApiOperation({
        summary: '删除评论',
        description: '删除不当或违规评论。删除操作不可恢复。'
    })
    async delete(@Body() body: any) {
        return await this.commentService.delete(body.cid)
    }
}