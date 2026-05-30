import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment';
import { Img } from 'src/entity/img';
import { User } from 'src/entity/user';
import { Result } from 'src/util/result';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(Img)
        private imgRepository: Repository<Img>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async getList(page: number = 1, pageSize: number = 10) {
        const [list, total] = await this.commentRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: { commdate: 'DESC' },
            relations: ['uid', 'iid']
        })

        const commentList = list.map(comment => ({
            cid: comment.cid,
            content: comment.content,
            commdate: comment.commdate,
            clicklike: comment.clicklike,
            user: {
                uid: comment.uid?.uid,
                uname: comment.uid?.uname
            },
            img: {
                iid: comment.iid?.iid,
                iname: comment.iid?.iname
            }
        }))

        return Result.ok({
            list: commentList,
            total,
            page,
            pageSize
        }, `这是第${page}页`)
    }

    async getByImg(iid: number) {
        if (!iid) {
            return Result.no('图片ID不能为空')
        }

        const comments = await this.commentRepository.find({
            where: { iid: { iid: iid } },
            relations: ['uid'],
            order: { commdate: 'DESC' }
        })

        return Result.ok(comments.map(comment => ({
            cid: comment.cid,
            content: comment.content,
            commdate: comment.commdate,
            clicklike: comment.clicklike,
            user: {
                uid: comment.uid?.uid,
                uname: comment.uid?.uname
            }
        })), `这是id为${iid}的评论`)
    }

    async getByUser(uid: number) {
        if (!uid) {
            return Result.no('用户ID不能为空')
        }

        const comments = await this.commentRepository.find({
            where: { uid: { uid: uid } },
            relations: ['iid'],
            order: { commdate: 'DESC' }
        })

        return Result.ok(comments.map(comment => ({
            cid: comment.cid,
            content: comment.content,
            commdate: comment.commdate,
            clicklike: comment.clicklike,
            img: {
                iid: comment.iid?.iid,
                iname: comment.iid?.iname
            }
        })), `用户${uid}的评论列表`)
    }

    async getStatistics() {
        const totalComments = await this.commentRepository.count()

        const today = new Date().toISOString().split('T')[0]
        const todayComments = await this.commentRepository.createQueryBuilder('comment')
            .where('DATE(comment.commdate) = :today', { today })
            .getCount()

        const hotComments = await this.commentRepository.find({
            order: { clicklike: 'DESC' },
            take: 10,
            relations: ['uid'],
            select: ['cid', 'content', 'clicklike', 'commdate']
        })

        const avgLikes = await this.commentRepository.createQueryBuilder('comment')
            .select('AVG(comment.clicklike)', 'avg')
            .getRawOne()

        return Result.ok({
            totalComments,
            todayComments,
            topHotComments: hotComments.map(comment => ({
                cid: comment.cid,
                content: comment.content?.substring(0, 50),
                clicklike: comment.clicklike,
                commenter: comment.uid?.uname
            })),
            averageLikes: Math.round(avgLikes?.avg * 100) / 100 || 0
        }, '统计数据获取成功')
    }

    async delete(cid: number) {
        if (!cid) {
            return Result.no('评论ID不能为空')
        }

        const comment = await this.commentRepository.findOne({
            where: { cid: cid },
            relations: ['uid', 'iid']
        })

        if (!comment) {
            return Result.no('评论不存在')
        }

        const affected = (await this.commentRepository.delete(cid)).affected
        if (affected === 1) {
            return Result.ok(null, `已删除评论：${comment.content?.substring(0, 30)}...`)
        }
        else {
            return Result.no("删除失败")
        }
    }
}