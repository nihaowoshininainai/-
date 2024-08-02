import type { Img } from "@/pojo/Img"
import { request } from "./request"
import { useUserStore } from "@/stores/user"

const getImgs = async (order: string, count: number, page: number) => {
    return request.get(`/search?order=${order} &count=${count} &page=${page} &iname=`)
}

const getCount = (iname: string) => {
    return request.get(`/getCount?iname=${iname}`)
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
    const url = `/likeOrNot?uid=${useUserStore().user.uid}&&iid=${img.iid}`
    return request.get(url)
}

const addLike = (img: Img) => {
    const url = `/addLike?uid=${useUserStore().user.uid}&&iid=${img.iid}`
    return request.get(url)
}

const delLike = (uid: number, iid: number) => {
    const url = `/delLike?uid=${uid}&iid=${iid}`
    return request.get(url)
}

const addPageView = (iid: number) => {
    const url = `/addPageView?iid=${iid}`
    return request.get(url)
}

const getSearch = async (order: string, count: number, page: number, iname: string) => {
    return request.get(`/search?order=${order} &count=${count} &page=${page} &iname=${iname}`)
}
export default {
    getImgs: getImgs,
    getCount: getCount,
    getUserImg: getUserImg,
    getLikeImg: getLikeImg,
    delUserImg: delUserImg,
    getImgMessage: getImgMessage,
    addLike: addLike,
    delLike: delLike,
    addPageView: addPageView,
    getSearch: getSearch
}