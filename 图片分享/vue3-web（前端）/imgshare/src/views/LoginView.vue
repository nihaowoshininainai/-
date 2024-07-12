<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import type { FormRules, FormInstance } from 'element-plus';

    interface LoginForm{
        uname:string,
        pwd:string
    }

    const loginFormRef = ref<FormInstance>()
    const loginForm = reactive<LoginForm>({
        uname:'',
        pwd:''
    })
    const rules = reactive<FormRules<LoginForm>>({
        uname:[
            {
                required:true,
                message:'请输入用户名',
                trigger:'blur'
            }
        ],
        pwd:[
            {
                required:true,
                message:'请输入密码',
                trigger:'blur'
            }
        ]
    })
    const submitForm = (formEl: FormInstance | undefined)=>{
        console.log(loginForm)
        if(!formEl) return
        formEl.validate((valid)=>{
            if(valid){
                useUserStore().login(loginForm.uname,loginForm.pwd)
                loginForm.uname = ''
                loginForm.pwd = ''
            } else{
                console.log("出错了！")
            }
        })
    }
</script>
<template>
    <el-row>
        <el-col :span="11" class="left"></el-col>
        <el-col :span="13" class="right"><el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="auto"
        label-position="top"
        :hide-required-asterisk=true
    >
        <el-form-item label="用户名" prop="uname">
            <el-input v-model="loginForm.uname" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
            <el-input v-model="loginForm.pwd" type="password" @click="submitForm(loginFormRef)" />
        </el-form-item>
        <el-form-item>
            <el-button @click="submitForm(loginFormRef)" type="primary" style="margin: 0 auto;">登录</el-button>
        </el-form-item>
        <router-link to="register"><el-link type="primary" style="margin-left: 2rem;">还没注册？点我点我</el-link></router-link>
        
    </el-form></el-col>
    </el-row>
</template>
<style scoped>
    .el-row{
        width: 50rem;
        height: 30rem;
        margin: 10rem auto;
    }
    .left{
        background-image: url(http://47.98.148.6:8094/1.png);
        background-size: cover;
    
    }
    .right{
        align-self: center;
        height: 192px;
    }
    .el-form{
        width: 25rem;
        margin: 0 auto;
    }
    @media screen and (max-width:800px) {
        .el-row{
            width: 100%;
            flex-direction: column;
            margin: 0;
        }
        .left{
            align-self: center;
            max-width: unset;
            width: 15em;
        }
        .el-form{
            width: 100%;
        }
    }
</style>
