//全局拦截
import axios from "axios";
import Element from 'element-ui'

import store from './store'
import router from './router'
import {JSEncrypt} from "jsencrypt";
import AESECB from "@/common/AESECB";

//提取前缀
axios.defaults.baseURL = "http://localhost:8081"
// axios.defaults.baseURL = "http://192.168.0.199:8081"


//前置拦截
axios.interceptors.request.use(config => {
    //通过AES加密data数据
    //设置请求的类型
    config.headers["Content-Type"] = "application/json"

    /*---------------我是RSE+AES双重加密的------------*/
    //实现RSA
    let encryptor = new JSEncrypt() // 新建JSEncrypt对象

    //RSA设置加密的方式
    encryptor.setPublicKey(store.getters.getPublicKey) // 设置公钥

    //加密AES秘钥
    const encryptAES = encryptor.encrypt(store.getters.getAESKey);

    //把加密的AES秘钥放在请求头里
    config.headers["encryptAES"] = encryptAES

    //使用AES加密data数据 并且AES秘钥不固定
    config.data = AESECB.Encrypt(JSON.stringify(config.data), store.getters.getAESKey);

    return config
})

//后置拦截
axios.interceptors.response.use(response => {
    let res = response.data;
    console.log("=====================")
    console.log("我是后置拦截", res)
    console.log("=====================")

    //判断状态码
    if (res.code === 200) {
        return response
    } else {
        //提示信息
        Element.Message.error(response.data.msg, {duration: 3 * 1000});

        //不会进入后面逻辑
        return Promise.reject(response.data.msg)
    }
}, error => {
    //错误信息
    console.log(error)
    //判断返回数据中data是否有值
    if (error.response.data) {
        error.message = error.response.data.msg
    }
    //如果返回是401跳转到登录页面
    if (error.response.data.status === 401) {
        store.commit("REMOVE_INFO")
        router.push("/login3")
    }
    //提示
    Element.Message.error(error.message, {duration: 3 * 1000});

    //组织返回
    return Promise.reject(error)

})
