import { Controller, Get, Query } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService
    ) { }
    @Get('getall')
    getAll() {
        return this.commentService.getAll()
    }
    @Get('delById')
    delById(@Query() query: any) {
        return this.commentService.delById(query.id)
    }
}
