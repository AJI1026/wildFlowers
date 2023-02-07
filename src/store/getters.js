const getters = {
    token: state => state.token, // 把token提到getters中，方便调用
    userId: state => state.user.userId,
    userName: state => state.user.userName,
    userImg: state => state.user.userImg,
}
export default getters
