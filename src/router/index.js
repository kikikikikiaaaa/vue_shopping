import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from '@/store/home'
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