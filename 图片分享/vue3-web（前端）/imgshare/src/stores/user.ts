import { User } from "@/pojo/User"
import userApi from "@/api/user"
import imgApi from "@/api/img"
import type { Img } from "@/pojo/Img"


export const useUserStore = defineStore('user', () => {
    const user = ref<User>(new User())
    console.log(user)

    function login(
        uname: string, pwd: string
    ) {
        user.value.uname = uname
        user.value.pwd = pwd
        userApi.userLoginApi(user.value)
    }
    function register(uname: string, pwd: string) {
        user.value.uname = uname
        user.value.pwd = pwd
        userApi.userRegisterApi(user.value)
    }
    async function getImgs() {
        user.value.img = (await imgApi.getUserImg(user.value.uid)).data.date
        console.log(user.value.img);
        user.value.img.reverse()
        if (user.value.img[0] != null)
            user.value.img.forEach(element => {
                element.isrc = element.isrc.replace(import.meta.env.VITE_LOCAL, import.meta.env.VITE_HOST)
            })
    }
    async function getLikeImg() {
        user.value.likeImgs = (await imgApi.getLikeImg(user.value.uid)).data.date
        console.log(user.value.likeImgs);
        user.value.likeImgs.reverse()
        user.value.likeImgs.forEach(element => {
            element.isrc = element.isrc.replace(import.meta.env.VITE_LOCAL, import.meta.env.VITE_HOST)
        })

    }
    async function deleteImg(img: Img) {
        const { code, message, date } = (await imgApi.delUserImg(img)).data
        if (code === 1) {
            ElMessage.success(message)
            location.reload()
        }
        console.log(message);

    }
    async function delLike(iid: number) {
        imgApi.delLike(user.value.uid, iid).then((value) => {
            const { code, message, date } = value.data
            if (code === 1) {
                ElMessage.success(message)
                getLikeImg()
            }
        })

    }
    return {
        login,
        user,
        register,
        getImgs,
        getLikeImg,
        deleteImg,
        delLike
    }

}, {
    persist: true
})