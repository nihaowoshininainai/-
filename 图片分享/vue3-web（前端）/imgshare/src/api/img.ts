import type { Img } from "@/pojo/Img"
import { request } from "./request"

const getImgs = async (order: string,count:number, page: number) => {
    
    return request.get(`/search?order=${order} &count=${count} &page=${page}`)
    
}

const getCount = () => {
   return request.get('/getCount')
}

const getUserImg = async (uid:number) => {
    return request.get(`/getUserImg?uid=${uid}`)
}

const getLikeImg = (uid: number) => {
    return request.get(`/getLikeImg?uid=${uid}`)
}

const delUserImg = (img: Img) => {
    return request.post('deleteImg',img)
}
export default {
    getImgs: getImgs,
    getCount: getCount,
    getUserImg: getUserImg,
    getLikeImg: getLikeImg,
    delUserImg: delUserImg
    
}