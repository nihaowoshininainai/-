import type { User } from "@/pojo/User"
import { request } from "./request";
import router from "@/router";

const login = (user: User) => {
    request.post('login', user).then((res) => {

        const data = res.data;
        console.log(data);
        const { code, message, date } = data
        if (code === 0) {
            ElMessage.error(message + "请检查用户名或密码")
            console.log(user);
        }
        else {
            ElMessage.success(message)
            localStorage.setItem('token', date.token)
            user.uid = date.user.uid
            user.uname = date.user.uname
            router.push('/home')
        }
    })
}

const register = (user: User) => {
    request.post('register', user).then((res) => {
        const data = res.data
        console.log(data);
        const { code, message } = data
        if (code === 0) {
            ElMessage.error(message + '用户名重复')
        } else {
            ElMessage.success(message + '，请登录')
            router.push('/login')
        }

    })
}
export default {
    userLoginApi: login,
    userRegisterApi: register


}