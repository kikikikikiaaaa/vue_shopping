import { reqAddressInfo } from '@/api/index'
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {}
const mutations = {}
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
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