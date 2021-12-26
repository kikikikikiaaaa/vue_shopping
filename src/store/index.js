import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from "./search";
import detail from './detail'
import cartlist from "./cartlist";
import user from './user'

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        cartlist,
        user
    }
})