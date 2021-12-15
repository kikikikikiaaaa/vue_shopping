// 对axios进行二次封装
import axios from 'axios'

// 引入nprogress进度条插件
import nProgress from 'nprogress'
// console.log(nProgress)
// 引入进度条样式
import 'nprogress/nprogress.css'

// 稍微配置axios
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    nProgress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    nProgress.done()
    return res.data
}, (err) => {
    return Promise.reject(new Error('faile'))
})

export default requests