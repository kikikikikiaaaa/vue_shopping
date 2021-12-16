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