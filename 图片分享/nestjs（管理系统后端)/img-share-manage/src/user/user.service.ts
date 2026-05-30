import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user';
import { Result } from 'src/util/result';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    async getList(page: number = 1, pageSize: number = 10) {
        const [list, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: { uid: 'DESC' },
            select: ['uid', 'uname'],
            relations: ['imgs', 'comments', 'likeImg', 'likecomments']
        })

        const userList = list.map(user => ({
            uid: user.uid,
            uname: user.uname,
            imgCount: user.imgs?.length || 0,
            commentCount: user.comments?.length || 0,
            likeImgCount: user.likeImg?.length || 0,
            likeCommentCount: user.likecomments?.length || 0
        }))

        return Result.ok({
            list: userList,
            total,
            page,
            pageSize
        })
    }

    async search(uname: string) {
        if (!uname) {
            return Result.no('搜索关键词不能为空')
        }
        const users = await this.userRepository.createQueryBuilder('user')
            .where('user.uname like :uname', { uname: `%${uname}%` })
            .select(['user.uid', 'user.uname'])
            .getMany()

        return Result.ok(users)
    }

    async getDetail(uid: number) {
        if (!uid) {
            return Result.no('用户ID不能为空')
        }

        const user = await this.userRepository.findOne({
            where: { uid: uid },
            select: ['uid', 'uname'],
            relations: [
                'imgs',
                'imgs.comments',
                'comments',
                'comments.iid',
                'likeImg',
                'likecomments'
            ]
        })

        if (!user) {
            return Result.no('用户不存在')
        }

        return Result.ok({
            uid: user.uid,
            uname: user.uname,
            imgs: user.imgs?.map(img => ({
                iid: img.iid,
                iname: img.iname,
                isrc: img.isrc,
                uploaddate: img.uploaddate,
                pageview: img.pageview,
                commentCount: img.comments?.length || 0
            })) || [],
            comments: user.comments?.map(comment => ({
                cid: comment.cid,
                content: comment.content,
                commdate: comment.commdate,
                clicklike: comment.clicklike
            })) || [],
            statistics: {
                totalImgs: user.imgs?.length || 0,
                totalComments: user.comments?.length || 0,
                likedImgs: user.likeImg?.length || 0,
                likedComments: user.likecomments?.length || 0
            }
        }, '获取成功')
    }

    async getStatistics() {
        const totalUsers = await this.userRepository.count()
        const activeUsers = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.imgs', 'imgs')
            .where('imgs.iid IS NOT NULL')
            .getCount()

        const usersWithComments = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.comments', 'comments')
            .where('comments.cid IS NOT NULL')
            .getCount()

        return Result.ok({
            totalUsers,
            activeUsers,
            usersWithComments
        }, '统计数据获取成功')
    }

    async delete(uid: number) {
        if (!uid) {
            return Result.no('用户ID不能为空')
        }

        const user = await this.userRepository.findOne({
            where: { uid: uid },
            relations: ['imgs', 'comments']
        })

        if (!user) {
            return Result.no('用户不存在')
        }

        const affected = (await this.userRepository.delete(uid)).affected
        if (affected === 1) {
            return Result.ok(null, `已删除用户 ${user.uname} 及其所有关联数据`)
        }
        else {
            return Result.no("删除失败")
        }
    }
}