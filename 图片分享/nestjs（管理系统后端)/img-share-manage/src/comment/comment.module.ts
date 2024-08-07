import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentService],
    controllers:[CommentController]
})
export class CommentModule {}
