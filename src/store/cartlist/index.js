import {
    reqCartList,
    reqDeleteCartByID,
    reqUpdateCheckedById
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
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 1
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    deleteAllCheckedById({ dispatch, getters }) {
        let result = []
        getters.cartList.cartInfoList.forEach(item => {
            result.push(item.isChecked === 1 ? dispatch('deleteCartById', item.skuId) : '')
            console.log(result);
        });
        return Promise.all(result)
    },
    async updateAllChecked({ dispatch, getters }, flag) {
        let result = []
        getters.cartList.cartInfoList.forEach(item => {
            result.push(dispatch('updateCheckedById', {
                skuId: item.skuId,
                isChecked: flag
            }))
        })
        return Promise.all(result)
    }
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