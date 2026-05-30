import request from '@/utils/request'

export interface UserItem {
    uid: number
    uname: string
    imgCount: number
    commentCount: number
    likeImgCount: number
    likeCommentCount: number
}

export interface UserListRes {
    list: UserItem[]
    total: number
    page: number
    pageSize: number
}

export interface UserImg {
    iid: number
    iname: string
    isrc: string
    uploaddate: string
    pageview: number
    commentCount: number
}

export interface UserComment {
    cid: number
    content: string
    commdate: string
    clicklike: number
}

export interface UserDetail {
    uid: number
    uname: string
    imgs: UserImg[]
    comments: UserComment[]
    statistics: {
        totalImgs: number
        totalComments: number
        likedImgs: number
        likedComments: number
    }
}

export interface UserStatistics {
    totalUsers: number
    activeUsers: number
    usersWithComments: number
}

export interface SearchUser {
    uid: number
    uname: string
}

export function getUserList(page = 1, pageSize = 10) {
    return request.get<any, UserListRes>('/admin/user/list', { params: { page, pageSize } })
}

export function searchUser(uname: string) {
    return request.get<any, SearchUser[]>('/admin/user/search', { params: { uname } })
}

export function getUserDetail(uid: number) {
    return request.get<any, UserDetail>('/admin/user/detail', { params: { uid } })
}

export function getUserStatistics() {
    return request.get<any, UserStatistics>('/admin/user/statistics')
}

export function deleteUser(uid: number) {
    return request.post('/admin/user/delete', { uid })
}
