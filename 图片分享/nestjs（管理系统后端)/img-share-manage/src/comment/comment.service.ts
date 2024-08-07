import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment';
import { Result } from 'src/util/result';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository:Repository<Comment>
    ) { }
    
    async getAll() {
        return Result.ok(await this.commentRepository.find())
    }
    async delById(id: number) {
        const affected = (await this.commentRepository.delete(id)).affected
        if (affected === 1) {
            return Result.ok(null, "删除成功")
        }
        else {
            return Result.no("删除失败")
        }
    }
}
