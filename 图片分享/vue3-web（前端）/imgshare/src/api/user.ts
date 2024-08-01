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
            user.uid = date.uid
            console.log(user);
            router.push('/home')
        }
    })
}

const register = (user: User) => {
    request.post('register', user).then((res) => {
        const data = res.data
        console.log(data);
        const { code, message, date } = data
        if (code === 0) {
            ElMessage.error(message + '用户名重复')
        } else {
            ElMessage.success(message)
            user.uid = date.uid
            console.log(user);
            router.push('/home')
        }

    })
}
export default {
    userLoginApi: login,
    userRegisterApi: register


}
