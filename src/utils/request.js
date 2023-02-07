// 引入axios
import axios from 'axios'
// 引入store
import store from '@/store'

// 创建axios实例
const service = axios.create({
    // 内网测试地址
    baseURL: 'http://localhost:3000/admin',
    // 外网地址
    // baseURL: '/api',
    // 设置超时间
    timeout: 5000,
})
// axios二次封装
// 添加请求拦截器，若token存在则在请求头中加token，不存在也继续请求
service.interceptors.request.use(
    config => {
        // 每次发送请求之前都检测vuex是否存有token，放在请求头发送给服务器
        // Authorization是根据后端自定义字段
        let token = store.state.refresh_token || store.state.token
        token && (config.headers.Authorization = 'Bearer ' + token)
        return config
    },
    error => {
        console.log("在request拦截器显示错误：", error.response)
        return Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use( response => {
    return response
}, error => {
    // 获取错误状态代码，token失效
    const{ status } = error.response
    if (status === 401) {
        console.log('token失效，请重新登录')
        // 清除token
        localStorage.removeItem('token')
        // 重新跳转到login页面
        this.$router.push('/login')
    }
    return Promise.reject(error)
})

export default service
