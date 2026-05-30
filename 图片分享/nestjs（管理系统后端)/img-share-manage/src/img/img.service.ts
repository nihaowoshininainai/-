import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Img } from 'src/entity/img';
import { User } from 'src/entity/user';
import { Result } from 'src/util/result';
import { Repository } from 'typeorm';

@Injectable()
export class ImgService {
    constructor(
        @InjectRepository(Img)
        private imgRepository: Repository<Img>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async getList(page: number = 1, pageSize: number = 10, order: string = 'uploaddate', iname: string = '') {
        const validOrders = ['uploaddate', 'pageview']
        const orderBy = validOrders.includes(order) ? order : 'uploaddate'

        let queryBuilder = this.imgRepository.createQueryBuilder('img')
            .leftJoinAndSelect('img.uid', 'uid')
            .leftJoinAndSelect('img.comments', 'comments')
            .leftJoinAndSelect('img.users', 'users')
            .orderBy(`img.${orderBy}`, 'DESC')

        if (iname) {
            queryBuilder = queryBuilder.where('img.iname like :iname', { iname: `%${iname}%` })
        }

        const [list, total] = await queryBuilder
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount()

        const imgList = list.map(img => ({
            iid: img.iid,
            iname: img.iname,
            isrc: img.isrc,
            uploaddate: img.uploaddate,
            pageview: img.pageview,
            uploader: {
                uid: img.uid?.uid,
                uname: img.uid?.uname
            },
            commentCount: img.comments?.length || 0,
            likeCount: img.users?.length || 0
        }))

        return Result.ok({
            list: imgList,
            total,
            page,
            pageSize,
            orderBy
        }, `这是第${page}页`)
    }

    async getDetail(iid: number) {
        if (!iid) {
            return Result.no('图片ID不能为空')
        }

        const img = await this.imgRepository.findOne({
            where: { iid: iid },
            relations: [
                'uid',
                'comments',
                'comments.uid',
                'users'
            ]
        })

        if (!img) {
            return Result.no('图片不存在')
        }

        return Result.ok({
            iid: img.iid,
            iname: img.iname,
            isrc: img.isrc,
            uploaddate: img.uploaddate,
            pageview: img.pageview,
            uploader: {
                uid: img.uid?.uid,
                uname: img.uid?.uname
            },
            comments: img.comments?.map(comment => ({
                cid: comment.cid,
                content: comment.content,
                commdate: comment.commdate,
                clicklike: comment.clicklike,
                commenter: {
                    uid: comment.uid?.uid,
                    uname: comment.uid?.uname
                }
            })) || [],
            likeCount: img.users?.length || 0,
            likedByUsers: img.users?.map(user => ({
                uid: user.uid,
                uname: user.uname
            })) || []
        }, '获取成功')
    }

    async getStatistics() {
        const totalImgs = await this.imgRepository.count()

        const today = new Date().toISOString().split('T')[0]
        const todayImgs = await this.imgRepository.createQueryBuilder('img')
            .where('DATE(img.uploaddate) = :today', { today })
            .getCount()

        const hotImgs = await this.imgRepository.find({
            order: { pageview: 'DESC' },
            take: 10,
            select: ['iid', 'iname', 'pageview']
        })

        const avgPageview = await this.imgRepository.createQueryBuilder('img')
            .select('AVG(img.pageview)', 'avg')
            .getRawOne()

        return Result.ok({
            totalImgs,
            todayUploads: todayImgs,
            topHotImages: hotImgs.map(img => ({
                iid: img.iid,
                iname: img.iname,
                pageview: img.pageview
            })),
            averageViews: Math.round(avgPageview?.avg || 0)
        }, '统计数据获取成功')
    }

    async getHotImgs(limit: number = 10) {
        const imgs = await this.imgRepository.find({
            order: { pageview: 'DESC' },
            take: limit,
            relations: ['uid'],
            select: ['iid', 'iname', 'isrc', 'pageview']
        })

        return Result.ok(imgs.map(img => ({
            iid: img.iid,
            iname: img.iname,
            isrc: img.isrc,
            pageview: img.pageview,
            uploader: img.uid?.uname
        })), `获取热门图片TOP ${limit}`)
    }

    async delete(iid: number, isrc?: string) {
        if (!iid) {
            return Result.no('图片ID不能为空')
        }

        const img = await this.imgRepository.findOne({
            where: { iid: iid },
            relations: ['uid', 'comments']
        })

        if (!img) {
            return Result.no('图片不存在')
        }

        const affected = (await this.imgRepository.delete(iid)).affected
        if (affected === 1) {
            return Result.ok(null, `已删除图片「${img.iname}」及其 ${img.comments?.length || 0} 条评论`)
        }
        else {
            return Result.no("删除失败")
        }
    }
}