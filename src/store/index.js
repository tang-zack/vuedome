import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //私有属性
        token: '',
        //JSON.parse反序列化
        userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
        //RSE公钥
        publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLNbmKl9/gLn7Bef/xtUkshC1WyrLZLRpXCcFYR1gQi0isWsZBTicC4efBOkkNG3r+1ue0gvtuU/tjREFGf4Y7HaKHGb5tNCOlMNeNjM5YLRwLFqrUSsQyD4rj4eua1ltearr24R0HilnTvnQm6Z/UY0s21vdOUFQBPY0GNAa+0wIDAQAB',
        //AES密匙
        AESKey: 'A8AFC887B2AB51A9'
    },
    mutations: {
        //set state对应上面的 token 载体传过来的值
        SET_TOKEN: (state, token) => {
            //赋值
            state.token = token
            //存入浏览器中
            localStorage.setItem("token", token)
        },
        //保存用户信息
        SET_USERINFO: (state, userInfo) => {
            //赋值
            state.userInfo = userInfo
            //存入浏览器中
            //序列化对象
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
        //删除 全部清空
        REMOVE_INFO: (state) => {
            //赋值
            state.token = ''
            state.userInfo = {}
            //存入浏览器中
            localStorage.setItem("token", '')
            sessionStorage.setItem("userInfo", JSON.stringify(''))
        },
        //设置AESKey
        SET_AESKey: (state, AESKey) => {
            state.AESKey = AESKey
        }
    },
    getters: {
        //get
        //获取用户信息
        getUser: status => {
            return status.userInfo
        },

        //获取RES公钥
        getPublicKey: status => {
            return status.publicKey
        },

        //获取AES秘钥
        getAESKey: state => {
            return state.AESKey
        }

    },
    actions: {},
    modules: {}
})
