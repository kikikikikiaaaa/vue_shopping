import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 三级联动组件——注册为全局组件
import TypeNav from '@/components/TypeNav/typenav'
Vue.component(TypeNav.name, TypeNav)

import Carousel from '@/components/Carousel/carousel'
Vue.component(Carousel.name, Carousel)

import Pagination from '@/components/Pagination/pagination'
Vue.component(Pagination.name, Pagination)

// 引入仓库
import store from '@/store'

// 引入mock
import '@/mock/mockServe'

import 'swiper/css/swiper.css'

// 注册路由
import router from '@/router'

import * as API from '@/api'

import { Button, Select, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    router,
    store
}).$mount('#app')