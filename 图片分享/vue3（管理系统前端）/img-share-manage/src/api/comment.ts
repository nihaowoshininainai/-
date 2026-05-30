import request from '@/utils/request'

export interface CommentUserInfo {
    uid: number
    uname: string
}

export interface CommentImgInfo {
    iid: number
    iname: string
}

export interface CommentItem {
    cid: number
    content: string
    commdate: string
    clicklike: number
    user: CommentUserInfo
    img: CommentImgInfo
}

export interface CommentListRes {
    list: CommentItem[]
    total: number
    page: number
    pageSize: number
}

export interface ImgComment {
    cid: number
    content: string
    commdate: string
    clicklike: number
    user: CommentUserInfo
}

export interface UserCommentItem {
    cid: number
    content: string
    commdate: string
    clicklike: number
    img: CommentImgInfo
}

export interface TopHotComment {
    cid: number
    content: string
    clicklike: number
    commenter: string
}

export interface CommentStatistics {
    totalComments: number
    todayComments: number
    topHotComments: TopHotComment[]
    averageLikes: number
}

export function getCommentList(page = 1, pageSize = 10) {
    return request.get<any, CommentListRes>('/admin/comment/list', { params: { page, pageSize } })
}

export function getCommentByImg(iid: number) {
    return request.get<any, ImgComment[]>('/admin/comment/byImg', { params: { iid } })
}

export function getCommentByUser(uid: number) {
    return request.get<any, UserCommentItem[]>('/admin/comment/byUser', { params: { uid } })
}

export function getCommentStatistics() {
    return request.get<any, CommentStatistics>('/admin/comment/statistics')
}

export function deleteComment(cid: number) {
    return request.post('/admin/comment/delete', { cid })
}
