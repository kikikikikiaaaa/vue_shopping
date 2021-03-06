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

// 删除商品
export const reqDeleteCartByID = skuId => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})


// 获取验证码
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 完成注册
export const reqUserRegister = (data) => requests({
    url: `/user/passport/register`,
    method: 'post',
    data
})

// 登录
export const reqUserLogin = (data) => requests({
    url: `/user/passport/login`,
    method: 'post',
    data
})

// 获取用户信息（token）
export const reqUserInfo = () => requests({
    url: `/user/passport/auth/getUserInfo`,
    method: 'get'
})

// 退出登录
export const reqLogout = () => requests.get('/user/passport/logout')

// 获取用户地址
export const reqAddressInfo = () => requests.get('/user/userAddress/auth/findUserAddressList')

// 获取订单交易页信息
export const reqOrderInfo = () => requests.get('order/auth/trade')

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })