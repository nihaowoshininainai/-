import type { Img } from "@/pojo/Img"
import { request } from "./request"

const getComment = (img: Img) => {
    return request.get(`/getComment?iid=${img.iid}`)
}
const addComment = (iid: number, content: string) => {
    return request.post('/addComment', {
        img: { iid: iid },
        content: content
    })
}
const clickLike = (cid: number) => {
    return request.get(`/clickLike?cid=${cid}`)
}

const getClickLike = () => {
    return request.get(`/getClickComments`)
}

const delClick = (cid: number) => {
    return request.get(`/delClick?cid=${cid}`)
}
export default {
    getComment: getComment,
    addComment: addComment,
    clickLike: clickLike,
    getClickLike: getClickLike,
    delClick: delClick
}