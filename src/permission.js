import router from "./router";

// 路由判断登录 根据路由配置文件的参数 判断是否存在Token
router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限

        const token = localStorage.getItem("token")
        console.log("-----我是permission.js文件里面的获取的token-------" + token)

        if (token) { // 判断当前的token是否存在 ； 登录存入的token
            if (to.path === '/login3') {

            } else {
                next()
            }
        } else {
            next({
                path: '/login3'
            })
        }
    } else {
        next()
    }
})
