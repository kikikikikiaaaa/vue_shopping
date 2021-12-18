import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 三级联动组件——注册为全局组件
import TypeNav from '@/components/TypeNav/typenav'
Vue.component(TypeNav.name, TypeNav)

import Carousel from '@/components/Carousel/carousel'
Vue.component(Carousel.name, Carousel)

// 引入仓库
import store from '@/store'

// 引入mock
import '@/mock/mockServe'

import 'swiper/css/swiper.css'

// 注册路由
import router from '@/router'

new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    router,
    store
}).$mount('#app')