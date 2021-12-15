import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 三级联动组件——注册为全局组件
import TypeNav from '@/components/TypeNav/typenav'
Vue.component(TypeNav.name, TypeNav)

// 引入仓库
import store from '@/store'

// 注册路由
import router from '@/router'

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')