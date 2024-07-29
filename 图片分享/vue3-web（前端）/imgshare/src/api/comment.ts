import type { Img } from "@/pojo/Img"
import { request } from "./request"
import type { User } from "@/pojo/User"
const getComment = (img: Img) => {
    return request.get(`/getComment?iid=${img.iid}`)
}
const addComment = (img:Img,user:User,content:string) => {
    return request.post('/addComment', {
        img: img,
        user: user,
        content: content
    })
}

export default {
    getComment: getComment,
    addComment: addComment
}