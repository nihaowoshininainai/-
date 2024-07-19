import { Img } from "@/pojo/Img"
import ImgApi from '@/api/img'

export const useImgStore = defineStore('img', () => {
    const imgs = ref<Img[]>([])
    async function getImgs(order:string,page:number) {
        const { code, message, date } = (await ImgApi.getImgs(order,page, 1)).data
        imgs.value = date
        console.log(imgs.value);
        
        const host = 'http://47.98.148.6:8094'
        imgs.value.forEach(element => {
            element.isrc = host+element.isrc.substring(element.isrc.indexOf('/img')+4)
        });
    }
    return {
        getImgs,
        imgs
    }
})