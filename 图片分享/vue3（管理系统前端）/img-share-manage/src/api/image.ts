import request from '@/utils/request'

export interface ImgUploader {
    uid: number
    uname: string
}

export interface ImageItem {
    iid: number
    iname: string
    isrc: string
    uploaddate: string
    pageview: number
    uploader: ImgUploader
    commentCount: number
    likeCount: number
}

export interface ImgListRes {
    list: ImageItem[]
    total: number
    page: number
    pageSize: number
    orderBy: string
}

export interface CommenterInfo {
    uid: number
    uname: string
}

export interface ImageComment {
    cid: number
    content: string
    commdate: string
    clicklike: number
    commenter: CommenterInfo
}

export interface LikedByUser {
    uid: number
    uname: string
}

export interface ImageDetail {
    iid: number
    iname: string
    isrc: string
    uploaddate: string
    pageview: number
    uploader: ImgUploader
    comments: ImageComment[]
    likeCount: number
    likedByUsers: LikedByUser[]
}

export interface TopHotImage {
    iid: number
    iname: string
    pageview: number
}

export interface ImgStatistics {
    totalImgs: number
    todayUploads: number
    topHotImages: TopHotImage[]
    averageViews: number
}

export interface HotImageItem {
    iid: number
    iname: string
    isrc: string
    pageview: number
    uploader: string
}

export function getImgList(page = 1, pageSize = 10, order = 'uploaddate', iname = '') {
    return request.get<any, ImgListRes>('/admin/img/list', { params: { page, pageSize, order, iname } })
}

export function getImgDetail(iid: number) {
    return request.get<any, ImageDetail>('/admin/img/detail', { params: { iid } })
}

export function getImgStatistics() {
    return request.get<any, ImgStatistics>('/admin/img/statistics')
}

export function getHotImages(limit = 10) {
    return request.get<any, HotImageItem[]>('/admin/img/hot', { params: { limit } })
}

export function deleteImage(iid: number, isrc?: string) {
    return request.post('/admin/img/delete', { iid, isrc })
}
