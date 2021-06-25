import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import LoginSaToken from "@/views/LoginSaToken";
import LoginRSEAES from "@/views/LoginRSEAES";
import LoginPhone from "@/views/LoginPhone";

import Blogs from "@/views/Blogs";
//滑动验证
import Verify1 from "@/views/Verify1";
import SlideVerify from "@/views/SlideVerify"

//文件上传
import FileUpload from "@/views/file/FileUpload";
import FileUpload2 from "@/views/file/FileUpload2";
import Pictureuploadandecho from "@/views/file/Pictureuploadandecho";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        //重定向
        redirect: {name: "Blogs"}
    }, {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs,
        //需要登录才能访问
        meta: {
            requireAuth: true
        }
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/login2',
        name: 'LoginSaToken',
        component: LoginSaToken
    }, {
        path: '/login3',
        name: 'LoginRSEAES',
        component: LoginRSEAES
    }, {
        path: '/loginphone',
        name: 'LoginPhone',
        component: LoginPhone
    }
    , {
        path: '/verify1',
        name: 'Verify1',
        component: Verify1,
    }, {
        path: '/slideVerify',
        name: 'SlideVerify',
        component: SlideVerify,
    }, {
        path: '/fileupload',
        name: 'FileUpload',
        component: FileUpload,
    }, {
        path: '/fileupload2',
        name: 'FileUpload2',
        component: FileUpload2,
    }, {
        path: '/pictureuploadandecho',
        name: 'Pictureuploadandecho',
        component: Pictureuploadandecho,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
