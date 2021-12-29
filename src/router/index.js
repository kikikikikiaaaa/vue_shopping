import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from '@/store'
import routes from '@/router/routes'


const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savePosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach(async(to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        if (to.path == '/login') {
            next('/home')
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        if (to.path == '/shopcart') {
            alert('请先登录')
            next('/login')
        } else next()
    }
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