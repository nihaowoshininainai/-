import { request } from "@/api/request"
import { User } from "@/pojo/User"
import router from "@/router"

export const useUserStore = defineStore('user',()=>{
    const user = ref<User>(new User())
    console.log(user)

    function login(
        uname:string,pwd:string
    ){
        user.value.uname = uname
        user.value.pwd = pwd
        
        request.post('login',user.value).then((res)=>{
            
            const data = res.data;
            console.log(data);
            const {code,message,date} = data
            if(code === 0){
                ElMessage.error(message+"请检查用户名或密码")
                user.value = new User()
                console.log(user.value);
            }
            else{
                ElMessage.success(message)
                user.value.uid = date.uid
                console.log(user.value);
                router.push('/home')
            }
        })
    }
    return{
        login
    }

})