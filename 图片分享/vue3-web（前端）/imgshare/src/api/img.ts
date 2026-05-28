import type { Img } from "@/pojo/Img"
import { request } from "./request"

const getImgs = async (order: string, count: number, page: number) => {
    return request.get(`/search?order=${order}&count=${count}&page=${page}&iname=`)
}

const getCount = (iname: string) => {
    return request.get(`/getCount?iname=${iname}`)
}

const getUserImg = async () => {
    return request.get(`/getUserImg`)
}

const getLikeImg = () => {
    return request.get(`/getLikeImg`)
}

const delUserImg = (img: Img) => {
    return request.post('deleteImg', img)
}

const getImgMessage = (iid: number) => {
    return request.get(`/likeOrNot?iid=${iid}`)
}

const addLike = (iid: number) => {
    return request.get(`/addLike?iid=${iid}`)
}

const delLike = (iid: number) => {
    return request.get(`/delLike?iid=${iid}`)
}

const addPageView = (iid: number) => {
    return request.get(`/addPageView?iid=${iid}`)
}

const getSearch = async (order: string, count: number, page: number, iname: string) => {
    return request.get(`/search?order=${order}&count=${count}&page=${page}&iname=${iname}`)
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