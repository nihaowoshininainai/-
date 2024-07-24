import { User } from "@/pojo/User"
import userApi from "@/api/user"
import imgApi from "@/api/img"
import global from "@/globalVariable/global"


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
        user.value.img.forEach(element => {
            element.isrc = global.host+element.isrc.substring(element.isrc.indexOf('/img')+4)
        })
    }
    async function getLikeImg() {
        user.value.likeImgs = (await imgApi.getLikeImg(user.value.uid)).data.date
        console.log(user.value.likeImgs);
        user.value.likeImgs.reverse()
        user.value.likeImgs.forEach(element => {
            element.isrc = global.host+element.isrc.substring(element.isrc.indexOf('/img')+4)
        })
        
    }
    return {
        login,
        user,
        register,
        getImgs,
        getLikeImg
    }

}, {
    persist: true
})