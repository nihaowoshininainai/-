<script setup lang="ts">
/* __placeholder__ */
import { useUserStore } from '@/stores/user';
import type { FormRules, FormInstance } from 'element-plus';

const registerFormRef = ref<FormInstance>()
const registerForm = reactive({
    uname: '',
    pwd: '',
    checkPwd: ''
})
const checkUname = (rule: any, value: any, callback: any) => {
    if (value === '')
        callback(new Error('请输入用户名'))
    else {
        const rule = /^[\u4e00-\u9fa5A-Za-z0-9\-\_]*$/
        if (rule.test(registerForm.uname))
            callback()
        else
            callback(new Error('只允许数字，字母，中文，下划线，减号'))

    }
}
const checkPwd = (rule: any, value: any, callback: any) => {
    if (value === '')
        callback(new Error('请输入密码'))
    else {
        const rule = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/
        if (rule.test(registerForm.pwd))
            callback()
        else
            callback(new Error('由6-10位数字或者字母组成，且必须包含字母和数字'))
    }
}
const checkPwd2 = (rule: any, value: any, callback: any) => {
    if (value === '')
        callback(new Error('请再次输入密码'))
    else {
        if (registerForm.pwd != registerForm.checkPwd)
            callback(new Error('两次密码不一致'))
        else
            callback()

    }
}
const rules = reactive<FormRules<typeof registerForm>>({
    uname: [{ validator: checkUname, trigger: 'blur' }],
    pwd: [{ validator: checkPwd, trigger: 'blur' }],
    checkPwd: [{ validator: checkPwd2, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            useUserStore().register(registerForm.uname, registerForm.pwd)
            registerForm.uname = ''
            registerForm.pwd = ''
            registerForm.checkPwd = ''

        }
        else {
            console.log('提交失败')
        }
    })
}
</script>
<template>
    <el-row>
        <el-col :span="11" class="left"></el-col>
        <el-col :span="13" class="right"><el-form ref="registerFormRef" :model="registerForm" :rules="rules"
                label-width="auto" label-position="top" :hide-required-asterisk=true>
                <el-form-item label="用户名" prop="uname">
                    <el-input v-model="registerForm.uname" />
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="registerForm.pwd" type="password" />
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input v-model="registerForm.checkPwd" type="password"
                        @keydown.enter="submitForm(registerFormRef)" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm(registerFormRef)" type="primary"
                        style="margin: 0 auto;">注册</el-button>
                </el-form-item>
                <router-link to="/login"><el-link type="primary"
                        style="margin-left: 2rem;">已有账号？点我点我</el-link></router-link>

            </el-form></el-col>
    </el-row>
</template>
<style scoped>
.el-row {
    width: 50rem;
    height: 30rem;
    margin: 10rem auto;
}

.left {
    background-image: url(http://47.98.148.6:8094/1.png);
    background-size: cover;

}

.right {
    align-self: center;
    height: 192px;
}

.el-form {
    width: 25rem;
    margin: 0 auto;
}

@media screen and (max-width:800px) {
    .el-row {
        width: 100%;
        height: 40rem;
        flex-direction: column;
        margin: 0;
    }

    .left {
        align-self: center;
        max-width: unset;
        width: 15em;
    }

    .el-form {
        width: 100%;
    }
}
</style>