import { reqAddressInfo, reqOrderInfo } from '@/api/index'
const state = {
    addressInfo: [],
    orderInfo: [],
    tradeNo: ''
}
const mutations = {
    GETADDRESS(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    GETORDERINFO(state, orderInfo, tradeNo) {
        state.orderInfo = orderInfo
        state.tradeNo = tradeNo
    }
}
const actions = {
    async getAddress({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('GETADDRESS', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETORDERINFO', result.data.detailArrayList, result.data.tradeNo)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}