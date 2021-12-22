import requests from "./ajax";
import mockRequests from "./mockAjax"

// 三级菜单接口
export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

// 轮播图接口
export const reqGetBannerList = () => {
    return mockRequests.get('/banner')
}

// floor接口
export const reqGetFloorList = () => {
    return mockRequests.get('/floor')
}

// 搜索商品接口 post请求 需要带参
export const reqGetSearchInfo = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}

// detail
export const reqGetGoodsInfo = (skuId) => {
    return requests.get(`/item/${skuId}`)
}

// 添加购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}

// 购物车详情
export const reqCartList = () => requests.get(`/cart/cartList`)