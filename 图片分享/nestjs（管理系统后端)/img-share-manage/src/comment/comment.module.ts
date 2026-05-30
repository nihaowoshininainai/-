import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment';
import { Img } from 'src/entity/img';
import { User } from 'src/entity/user';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Img, User])],
    providers: [CommentService],
    controllers: [CommentController]
})
export class CommentModule { }
