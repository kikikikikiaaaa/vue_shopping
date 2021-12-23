import {
    reqCartList,
    reqDeleteCartByID
} from '@/api'
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartByID(skuId)
        if (result.code == 200) {
            return 1
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}