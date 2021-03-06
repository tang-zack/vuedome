import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from "axios";

import "element-ui/lib/theme-chalk/index.css"

import "./axios"


Vue.use(Element)

Vue.config.productionTip = false
//设置全局axios
Vue.prototype.$axios = axios


new Vue({
    router,
    store,
    axios,
    render: h => h(App)
}).$mount('#app')


