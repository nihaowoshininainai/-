import type { Img } from "@/pojo/Img"
import { request } from "./request"
import type { User } from "@/pojo/User"
import type { Commentt } from "@/pojo/Commentt"
const getComment = (img: Img) => {
    return request.get(`/getComment?iid=${img.iid}`)
}
const addComment = (img: Img, user: User, content: string) => {
    return request.post('/addComment', {
        img: img,
        user: user,
        content: content
    })
}
const clickLike = (user: User, comment: Commentt) => {
    return request.get(`/clickLike?uid=${user.uid}&cid=${comment.cid}`)
}

const getClickLike = (user: User) => {
    return request.get(`/getClickComments?uid=${user.uid}`)
}

const delClick = (cid: number, uid: number) => {
    const url = `/delClick?cid=${cid}&uid=${uid}`
    return request.get(url)
}
export default {
    getComment: getComment,
    addComment: addComment,
    clickLike: clickLike,
    getClickLike: getClickLike,
    delClick: delClick
}