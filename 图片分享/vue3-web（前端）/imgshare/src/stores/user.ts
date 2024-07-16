import { request } from "@/api/request"
import { User } from "@/pojo/User"
import router from "@/router"
import userApi from "@/api/user"


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
    return {
        login,
        user,
        register
    }

}, {
    persist: true
})