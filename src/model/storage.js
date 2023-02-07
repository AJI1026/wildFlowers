// 封装storage，否则一刷新，store会重新被加载，token就没了
// 三个操作：保存、获取、删除
import Cookies from 'js-cookie'

const TOKEN_NAME = 'token'
const REFRESH_TOKEN = 'refresh_token'
const TOKEN_TIME = 'time'

// 保存
export const saveToken = (tokenObj) => {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(tokenObj))
}
export const saveRefreshToken = (refreshTokenObj) => {
    localStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshTokenObj))
}
export const saveTime = (timeObj) => {
    Cookies.setItem(TOKEN_TIME, timeObj)
}

// 获取
export const getToken = () => {
    return JSON.parse(localStorage.getItem(TOKEN_NAME))
}
export const getRefreshToken = () => {
    return JSON.parse(localStorage.getItem(REFRESH_TOKEN))
}
export const getTime = () => {
    return Cookies.get(TOKEN_TIME)
}

// 删除
export const delToken = () => {
    localStorage.removeItem(TOKEN_NAME)
    localStorage.removeItem(REFRESH_TOKEN)
}
export const delTime = () => {
    Cookies.remove(TOKEN_TIME)
}
