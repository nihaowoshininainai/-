import request from '@/utils/request'

export interface OverviewData {
    users: { total: number; todayNew: number }
    images: { total: number; todayUploads: number; totalViews: number }
    comments: { total: number; todayNew: number }
    likes: { total: number }
}

export interface TrendItem {
    date: string
    uploads: number
    comments: number
    newUsers: number
}

export interface ActiveUser {
    uid: number
    uname: string
    imgCount: number
}

export interface HotImage {
    iid: number
    iname: string
    pageview: number
}

export interface TrendsData {
    last7Days: TrendItem[]
    activeUsers: ActiveUser[]
    hotImages: HotImage[]
}

export function getOverview() {
    return request.get<any, OverviewData>('/admin/dashboard/overview')
}

export function getTrends() {
    return request.get<any, TrendsData>('/admin/dashboard/trends')
}
