import { reqCategoryList } from '@/api/index'
const state = {
    categorylist: []
}
const mutations = {
    CATEGORYLIST(state, categorylist) {
        state.categorylist = categorylist
            // console.log(categorylist);
            // console.log(state.categorylist);
    }
}
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result);
        // console.log(result.data);
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}