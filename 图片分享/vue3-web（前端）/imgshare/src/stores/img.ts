import { Img } from "@/pojo/Img"
import ImgApi from '@/api/img'
import global from '@/globalVariable/global'

export const useImgStore = defineStore('img', () => {
    const imgs = ref<Img[]>([])
    const userImgs = ref<Img[]>([])
    const likeImgs = ref<Img[]>([])
    async function getImgs(order: string, pageSize: number, page: number) {
        const { code, message, date } = (await ImgApi.getImgs(order, pageSize, page)).data
        imgs.value = date
        console.log(imgs.value);

        imgs.value.forEach(element => {
            element.isrc = element.isrc.replace(global.original,global.host)
        });
    }
    async function getUserImgs(uid: number) {
        userImgs.value = (await ImgApi.getUserImg(uid)).data.date
        userImgs.value.reverse()
        if (userImgs.value[0] != null)
            userImgs.value.forEach(element => {
                element.isrc = element.isrc.replace(global.original,global.host)
            })

        console.log(userImgs.value);

    }
    async function getLikeImgs(uid: number) {
        likeImgs.value = (await ImgApi.getLikeImg(uid)).data.date
        likeImgs.value.reverse()
        if (likeImgs.value[0] != null)
            likeImgs.value.forEach(element => {
                element.isrc = element.isrc.replace(global.original,global.host)
            })
        console.log(likeImgs.value);
    }
    return {
        getImgs,
        imgs,
        getUserImgs,
        getLikeImgs,
        userImgs,
        likeImgs
    }
}, {
    persist: true
})