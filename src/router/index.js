import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/pages/Home/home'
import Login from '@/pages/Login/login'
import Register from '@/pages/Register/register'
import Search from '@/pages/Search/search'

const routes = [{
    path: '/',
    component: Home,
    meta: { show: true }
}, {
    path: '/home',
    component: Home,
    meta: { show: true }
}, {
    path: '/login',
    component: Login,
    meta: { show: false }
}, {
    path: '/register',
    component: Register,
    meta: { show: false }
}, {
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    name: 'search',
    // children: [{
    //     path: 'keyword',
    //     component: Search
    // }]
}, ]


const router = new VueRouter({
    routes,
    mode: 'history'
})

// 解决$router.push报错 重写push方法 （解决replace报错同理）
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this.location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}


export default router