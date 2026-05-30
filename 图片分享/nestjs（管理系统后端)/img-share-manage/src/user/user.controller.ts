import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User - 用户管理')
@Controller('admin/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('list')
    @ApiOperation({ summary: '获取用户列表', description: '分页获取所有用户，包含每个用户的图片数、评论数、点赞统计' })
    @ApiQuery({ name: 'page', required: false, description: '页码（从1开始）', example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', example: 10 })
    @ApiResponse({ status: 200, description: '成功返回用户列表' })
    getList(@Query() query: any) {
        const page = query.page || 1
        const pageSize = query.pageSize || 10
        return this.userService.getList(page, pageSize)
    }

    @Get('search')
    @ApiOperation({ summary: '搜索用户', description: '根据用户名模糊搜索用户' })
    @ApiQuery({ name: 'uname', required: true, description: '用户名关键词', example: '张三' })
    search(@Query() query: any) {
        return this.userService.search(query.uname)
    }

    @Get('detail')
    @ApiOperation({ summary: '获取用户详情', description: '获取用户的完整信息，包括上传的图片、发布的评论、点赞记录等' })
    @ApiQuery({ name: 'uid', required: true, description: '用户ID', example: 1 })
    getDetail(@Query() query: any) {
        return this.userService.getDetail(query.uid)
    }

    @Get('statistics')
    @ApiOperation({ summary: '用户统计数据', description: '获取系统用户整体统计：总用户数、活跃用户数、有评论的用户数等' })
    getStatistics() {
        return this.userService.getStatistics()
    }

    @Post('delete')
    @ApiOperation({ summary: '删除用户', description: '删除指定用户及其所有关联数据（图片、评论、点赞记录）' })
    @ApiResponse({ status: 200, description: '删除成功' })
    async delete(@Body() body: any) {
        return await this.userService.delete(body.uid)
    }
}