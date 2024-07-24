import { Img } from "@/pojo/Img"
import ImgApi from '@/api/img'
import global from '@/globalVariable/global'

export const useImgStore = defineStore('img', () => {
    const imgs = ref<Img[]>([])
    async function getImgs(order:string,pageSize:number,page:number) {
        const { code, message, date } = (await ImgApi.getImgs(order,pageSize,page)).data
        imgs.value = date
        console.log(imgs.value);
        
        imgs.value.forEach(element => {
            element.isrc = global.host+element.isrc.substring(element.isrc.indexOf('/img')+4)
        });
    }
    return {
        getImgs,
        imgs
    }
})