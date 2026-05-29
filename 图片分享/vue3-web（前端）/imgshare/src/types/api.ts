export interface ApiResponse<T = unknown> {
  code: number
  message: string
  date: T
}

export interface LoginData {
  user: UserInfo
  token: string
}

export interface UserInfo {
  uid: number
  uname: string
  pwd: string | null
  img: string | null
  comment: string | null
  likeImgs: string | null
  clickComments: string | null
}

export interface ImageItem {
  iid: number
  iname: string
  isrc: string
  uploaddate: string
  user: {
    uid: number
    uname: string
  }
  pageview: number
  comment: CommentItem[] | null
  likUsers: unknown[] | null
}

export interface MyImageItem {
  iid: number
  iname: string
  isrc: string
  uploaddate: string
  pageview: number
}

export interface CommentItem {
  cid: number
  commdate: string
  user: {
    uid: number
    uname: string
  }
  clicklike: number
  content: string
}

export interface SearchParams {
  order: 'uploaddate' | 'pageview'
  count: number
  page: number
  iname: string
}