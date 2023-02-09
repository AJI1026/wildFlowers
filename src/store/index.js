import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/store/getters";
import {saveToken, getToken, delToken, getRefreshToken, saveRefreshToken, saveTime, getTime} from "@/model/storage";

Vue.use(Vuex)
// 用Vuex.Store对象来记录token
export default new Vuex.Store({
    // 保存公共数据
    state: {
        user: '',
        token: getToken() || {}, // 存储token，如果getToken的返回值是null，则initToken是一个空对象
        refresh_token: getRefreshToken(),
        startTime: getTime(), // 开始时间
        youInfo: {
            name: '',
            img: ''
        }, // 你
        friendInfo: {
            img: '',
            name: '',
        }, // 聊天对象
        isLogin: false, // 登录状态
        userList: [], // 用户列表
        chatType: '', // 聊天类型
        chatMessageList: [], // 聊天记录
        buyNowData: '', // 立即购买数据
    },
    getters, // 把getters挂载到全局
    // state中的数据要通过mutations才能修改
    mutations: {
        // 修改token，并将token存入localstorage，state是当前的state，token是要传入的数据
        setToken(state, token) {
            state.token = token
            // 保存到本地localstorage
            saveToken(state.token)
        },
        // 存入当前登入时间
        setTime(state, startTime) {
            state.startTime = startTime
            // 保存到cookie
            saveTime(state.startTime)
        },
        // 设置刷新用的token
        setRefreshToken(state, refresh_token) {
            state.refresh_token = refresh_token
            // 保存到本地localstorage
            saveRefreshToken(state.refresh_token)
        },
        // 修改state，存放用户状态
        setUser(state, data) {
            state.user = data
        },
        // 删除token
        delToken(state) {
            state.token = ""
            state.refresh_token = ""
            delToken()
        },
        USER_INFO(state,data){
            state.user = data
        },
        // 聊天对象信息设置
        setChatInfo(state, data) {
            state.friendInfo = data
        },
        // 聊天你自己的信息设置
        setYouInfo(state, data) {
            state.youInfo = data
            state.isLogin = true
        },
        // 渲染用户列表
        SOCKET_login(state, data) {
            state.userList = data
        },
        // 修改聊天类型
        changeChatType(state, data) {
            state.chatType = data
        },
        // 群聊记录修改
        SOCKET_updateChatMessageList(state, data) {
            state.chatMessageList.push(data)
            console.log(state.chatMessageList)
        },
        // 立即购买的数据
        setImmediateData(state, data) {
            state.buyNowData = data
        },
    },
    actions: {
        // 通过dispatch触发一个action行为
        saveUserInfo({commit},data){
            commit('USER_INFO',data)
        }
    },
})
