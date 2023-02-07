import request from "@/utils/request";

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/user/login',
        data
    })
}
// 用户注册
export const register = data => {
    return request({
        method: 'POST',
        url: '/user/register',
        data
    })
}
// 验证码
export const codeImg = data => {
    return request({
        method: 'GET',
        url: '/user/codeImg',
        data
    })
}
// 书籍简介列表
export const simpleBookList = () => {
    return request({
        method: 'GET',
        url: '/user/simpleBookList',
    })
}
// 书籍分类知识类书籍
export const knowledgeBook = (pageNum) => {
    return request({
        method: 'GET',
        url: `/user/knowledgeBook?pageNum=${pageNum}`
    })
}
// 收藏书籍
export const collectStatus = (data) => {
    return request({
        method: 'POST',
        url: '/user/knowledgeBook/status',
        data: data
    })
}
// 任务列表查询
export const task = () => {
    return request({
        method: 'GET',
        url: '/user/sort/task'
    })
}
// 任务列表修改
export const modify = (modifyData) => {
    return request({
        method: 'POST',
        url: '/user/sort/modify',
        data: modifyData
    })
}
// 任务列表删除
export const deleteTask = (taskId) => {
    return request({
        method: 'DELETE',
        url: '/user/sort/delete',
        data: taskId
    })
}
// 任务列表添加
export const add = (addFormData) => {
    return request({
        method: 'PUT',
        url: '/user/sort/add',
        data: addFormData
    })
}
// 已完成任务列表数据
export const completed = () => {
    return request({
        method: 'GET',
        url: '/user/sort/completed'
    })
}
// 改变任务完成状态
export const completedStatus = (completeStatusForm) => {
    return request({
        method: 'POST',
        url: '/user/sort/completedStatus',
        data: completeStatusForm
    })
}
// 删除已完成任务
export const completedDelete = (completedDeleteForm) => {
    return request({
        method: 'DELETE',
        url: '/user/sort/completedDelete',
        data: completedDeleteForm
    })
}
// 购物车加商品
export const addGoods = (goodsData) => {
    return request({
        method: 'POST',
        url: '/user/cart/addGoods',
        data: goodsData
    })
}
// 购物车查商品
export const exist = (data) => {
    return request({
        method: 'GET',
        url: '/user/cart/exist',
        params: {
            bookName: data
        }
    })
}
// 起始的购物车列表数据
export const goodsList = () => {
    return request({
        method: 'GET',
        url: '/user/cart/goodsList'
    })
}
// 改变商品数量
export const quantityChange = (data) => {
    return request({
        method: 'POST',
        url: '/user/cart/quantityChange',
        data: data
    })
}
// 清空购物车
export const deleteAll = () => {
    return request({
        method: 'DELETE',
        url: '/user/cart/deleteAll'
    })
}
// 地址数据渲染
export const addressList = () => {
    return request({
        method: 'GET',
        url: '/user/address/addressList',
    })
}
// 新增地址
export const newAddress = (newAddressData) => {
    return request({
        method: 'PUT',
        url: '/user/address/newAddress',
        data: newAddressData
    })
}
// 移除地址
export const deleteAddress = (addressId) => {
    return request({
        method: 'DELETE',
        url: `/user/address/deleteAddress?addressId=${addressId}`,
    })
}
// 修改地址
export const changeAddress = (newData) => {
    return request({
        method: 'POST',
        url: '/user/address/changeAddress',
        data: newData
    })
}
// 移除商品
export const goodeDelete = (data) => {
    return request({
        method: 'DELETE',
        url: '/user/goods/delete',
        data: data
    })
}
// 获取初始step值
export const step = () => {
    return request({
        method: 'GET',
        url: '/user/order/step'
    })
}
// 增加step值
export const addStep = (stepData) => {
    return request({
        method: 'POST',
        url: `/user/order/addStep?step=${stepData}`
    })
}
// 减少step值
export const decreaseStep = (stepData) => {
    return request({
        method: 'POST',
        url: `/user/order/decreaseStep?step=${stepData}`
    })
}
// 生成订单
export const orderInformation = (orderData) => {
    return request({
        method: 'PUT',
        url: '/user/order/orderInformation',
        data: orderData
    })
}
// 付款页面修改订单数据
export const orderInformationUpdate = (orderDataUpdate) => {
    return request({
        method: 'POST',
        url: '/user/order/orderInformationUpdate',
        data: orderDataUpdate
    })
}
// 沙盒支付
export const pcPay = (data) => {
    return request({
        method: 'POST',
        url: '/user/order/pcPay',
        data: data,
    })
}
// 支付信息确认
export const payJudge = (data) => {
    return request({
        method: 'POST',
        url: '/user/order/payJudge',
        data: data,
    })
}
// 修改订单状态
export const orderChangeStatus = (data) => {
    return request({
        method: 'POST',
        url: '/user/order/status',
        data: data
    })
}
// 清空商品列表数据
export const deleteGoods = () => {
    return request({
        method: 'DELETE',
        url: '/user/order/deleteGoods'
    })
}
// 历史订单-所有
export const allData = () => {
    return request({
        method: 'GET',
        url: '/user/order/all'
    })
}
// 历史订单-已取消的订单
export const cancelData = () => {
    return request({
        method: 'GET',
        url: '/user/order/cancel'
    })
}
// 历史订单-未付款的订单
export const unPaidData = () => {
    return request({
        method: 'GET',
        url: '/user/order/unPaid'
    })
}
// 历史订单-已付款的订单
export const paidData = () => {
    return request({
        method: 'GET',
        url: '/user/order/paid'
    })
}
// 历史订单-正在配送的订单
export const deliveringData = () => {
    return request({
        method: 'GET',
        url: '/user/order/delivering'
    })
}
// 历史订单-已完成的订单
export const completedData = () => {
    return request({
        method: 'GET',
        url: '/user/order/completed'
    })
}
// 通过标签搜索数据
export const tagData = (data) => {
    return request({
        method: 'POST',
        url: '/user/order/searchByTag',
        data: data
    })
}
// 获取笔记数据
export const content = () => {
    return request({
        method: 'GET',
        url: '/user/note/content',
    })
}
// 笔记标签对应文章
export const tagContent = (data) => {
    return request({
        method: 'GET',
        url: '/user/note/tagFind',
        params: {
            noteTag: data
        }
    })
}
// 笔记详情
export const detail = (noteId) => {
    return request({
        method: 'POST',
        url: '/user/note/contentDetail',
        params: {
            noteId: noteId
        }
    })
}
// 新的笔记
export const newNote = (newData) => {
    return request({
        method: 'PUT',
        url: '/user/note/new',
        data: newData
    })
}
// 获取文章对应的用户名
export const noteWho = (data) => {
    return request({
        method: 'GET',
        url: '/user/note/user',
        params: {
            userId: data
        }
    })
}
// 加入新的评论
export const newCommend = (data) => {
    return request({
        method: 'PUT',
        url: '/user/note/newCommend',
        data: data
    })
}
// 获取评论数据
export const commend = () => {
    return request({
        method: 'GET',
        url: '/user/note/commend',
    })
}
// 笔记阅读量
export const readingTime = (data) => {
    return request({
        method: 'POST',
        url: '/user/note/readingTimes',
        params: {
            noteId: data
        }
    })
}
