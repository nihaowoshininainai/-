import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user';
import { Img } from 'src/entity/img';
import { Comment } from 'src/entity/comment';
import { Result } from 'src/util/result';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Img)
        private imgRepository: Repository<Img>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>
    ) { }

    async getOverview() {
        const totalUsers = await this.userRepository.count()
        const totalImgs = await this.imgRepository.count()
        const totalComments = await this.commentRepository.count()

        const today = new Date().toISOString().split('T')[0]

        const todayImgs = await this.imgRepository.createQueryBuilder('img')
            .where('DATE(img.uploaddate) = :today', { today })
            .getCount()

        const todayComments = await this.commentRepository.createQueryBuilder('comment')
            .where('DATE(comment.commdate) = :today', { today })
            .getCount()

        const totalViews = await this.imgRepository.createQueryBuilder('img')
            .select('SUM(img.pageview)', 'total')
            .getRawOne()

        return Result.ok({
            users: {
                total: totalUsers,
                todayNew: null
            },
            images: {
                total: totalImgs,
                todayUploads: todayImgs,
                totalViews: parseInt(totalViews?.total || 0)
            },
            comments: {
                total: totalComments,
                todayNew: todayComments
            },
            likes: {
                total: null
            }
        }, '概览数据获取成功')
    }

    async getTrends() {
        const last7Days = []
        for (let i = 6; i >= 0; i--) {
            const date = new Date()
            date.setDate(date.getDate() - i)
            const dateStr = date.toISOString().split('T')[0]

            const dayImgs = await this.imgRepository.createQueryBuilder('img')
                .where('DATE(img.uploaddate) = :date', { date: dateStr })
                .getCount()

            const dayComments = await this.commentRepository.createQueryBuilder('comment')
                .where('DATE(comment.commdate) = :date', { date: dateStr })
                .getCount()

            last7Days.push({
                date: dateStr,
                uploads: dayImgs,
                comments: dayComments,
                newUsers: null
            })
        }

        const top5HotImages = await this.imgRepository.find({
            order: { pageview: 'DESC' },
            take: 5,
            select: ['iid', 'iname', 'pageview']
        })

        return Result.ok({
            last7Days: last7Days,
            activeUsers: [],
            hotImages: top5HotImages.map(img => ({
                iid: img.iid,
                iname: img.iname,
                pageview: img.pageview
            }))
        }, '趋势数据获取成功')
    }
}