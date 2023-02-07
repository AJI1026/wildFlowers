<template>
    <div class="layoutPage-container">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
      <!-- 头部导航栏 -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#BC8F8F" text-color="white" active-text-color="#F5DEB3" router>
            <!--初始页-->
            <el-menu-item index="/begin" class="head">
                <el-avatar shape="circle" style="margin-right: 5px" fit="cover">
                  <img :src="userImg" alt=""/>
                </el-avatar>
                <span>Hi, {{username}}</span>
            </el-menu-item>
            <!-- 首页 -->
            <el-menu-item index="/home">
                <i class="iconfont icon-shouye-2" style="color: white;">主页</i>
            </el-menu-item>
            <!-- 书籍分类 -->
            <el-submenu index="/sort">
                <template slot="title">
                    <i class="iconfont icon-shu" style="margin-right: 5px;color: white;">书籍</i>
                </template>
                <el-menu-item index="/knowledge/books">Knowledge</el-menu-item>
                <el-menu-item index="/fantasy">Fantasy</el-menu-item>
            </el-submenu>
            <!-- 购物车 -->
            <el-menu-item index="/cart">
              <i class="iconfont icon-guidang" style="margin-right: 5px;color: white;">购物车</i>
            </el-menu-item>
            <!-- 总结文档 -->
            <el-menu-item index="/record">
                <i class="iconfont icon-shuji" style="margin-right: 5px;color: white;">创作</i>
            </el-menu-item>
            <!-- 聊天室 -->
            <el-menu-item index="/chat">
                <i class="iconfont icon-xiaoxi" style="margin-right: 5px;color: white;">聊天室(暂时废弃)</i>
            </el-menu-item>
            <!-- 关于我的 -->
            <el-menu-item index="/about">
                <i class="iconfont icon-jurassic_user" style="margin-right: 5px;color: white;">个人页面</i>
            </el-menu-item>
            <!--退出登录-->
            <div class="quit" @click="logout">退出</div>
        </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'layout-container',
  data() {
    return {
      activeIndex: this.$route.path,
      userImg: localStorage.getItem('userImg'),
      username: localStorage.getItem('username'),
    }
  },
  methods: {
    // 退出登录功能
    logout() {
      // localStorage.clear()
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('nowNoteId')
      window.localStorage.removeItem('frequentlyEmojis')
      window.localStorage.removeItem('noteIndex')
      window.localStorage.removeItem('userId')
      window.localStorage.removeItem('nId')
      window.localStorage.removeItem('whoseId')
      window.localStorage.removeItem('username')
      window.localStorage.removeItem('userImg')
      this.$store.dispatch('saveUserInfo', '')
      this.$router.push('/login')
    },
  },
  computed: {
    ...mapState({user: state => state.user})
  },
}
</script>

<style lang="scss">
    *{
        margin: 0;
        padding: 0;
    }
    .layoutPage-container {
      display: flex;
      height: 100%;
      ul {
        display: flex;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: center;
        li {
          display: flex;
          width: 150px;
          justify-content: center;
        }
      }
      .quit {
        color: white;
        width: 80px;
        height: 20px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 40px;
        &:hover {
          transform: scale(1.12);
          transition: .2s ease-in-out;
        }
      }
    }
    .el-menu-demo {
      opacity: 0.4;
      &:hover {
        opacity: 1;
      }
    }
    .layoutPage-container ul li {
      display: flex;
      width: 150px;
      justify-content: center;
      align-items: center;
    }
</style>
