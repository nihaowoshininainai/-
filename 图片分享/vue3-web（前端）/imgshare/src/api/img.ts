import type { Img } from "@/pojo/Img"
import { request } from "./request"

const getImgs = async (order: string, count: number, page: number) => {

    return request.get(`/search?order=${order} &count=${count} &page=${page}`)

}

const getCount = () => {
    return request.get('/getCount')
}

const getUserImg = async (uid: number) => {
    return request.get(`/getUserImg?uid=${uid}`)
}

const getLikeImg = (uid: number) => {
    return request.get(`/getLikeImg?uid=${uid}`)
}

const delUserImg = (img: Img) => {
    return request.post('deleteImg', img)
}

const getImgMessage = (img: Img) => {
    const url = `/likeOrNot?uid=${img.user.uid}&&iid=${img.iid}`
    return request.get(url)
}

const addLike = (img: Img) => {
    const url = `/addLike?uid=${img.user.uid}&&iid=${img.iid}`
    return request.get(url)
}

const delLike = (img: Img) => {
    const url = `/delLike?uid=${img.user.uid}&iid=${img.iid}`
    return request.get(url)
}
export default {
    getImgs: getImgs,
    getCount: getCount,
    getUserImg: getUserImg,
    getLikeImg: getLikeImg,
    delUserImg: delUserImg,
    getImgMessage: getImgMessage,
    addLike: addLike,
    delLike: delLike
}