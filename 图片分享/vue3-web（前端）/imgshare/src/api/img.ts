import { request } from "./request"

const getImgs = async (order: string,count:number, page: number) => {
    
    return request.get(`/search?order=${order} &count=${count} &page=${page}`)
    
}

const getCount = () => {
   return request.get('/getCount')
}
export default {
    getImgs: getImgs,
    getCount:getCount
}