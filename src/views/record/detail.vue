<template>
  <div class="detail-container" ref="detailContainer">
    <!--左边个人信息与文章栏目-->
    <div class="left-side-2">
      <div class="content-wrapper-2">
        <div class="search-box">
          <el-card class="search">
            <div class="search-top">
              <span>Who am i ?</span>
              <span style="font-size: 6px">没有BUG的代码是不完整的！</span>
            </div>
            <div class="search-bottom">
              <i class="iconfont icon-sousuo"></i>
              <input class="search-input" placeholder="搜索">
            </div>
          </el-card>
        </div>
        <div class="info-box">
          <el-card class="info">
            <el-tabs v-model="activeName">
              <el-tab-pane label="基本信息" name="first">
                <div class="head-image">
                  <el-avatar :size="60" @error="errorHandler">
                    <img :src="personalImg" alt="image loading...">
                  </el-avatar>
                </div>
                <div class="head-info">
                  <span>AJI1026</span>
                  <div class="head-sentence">
                    最大的勇气就是做自己
                  </div>
                </div>
                <div class="head-count">
                  <div>
                    <span class="num">100</span>
                    <span class="text">
                        <a href="">订阅</a>
                      </span>
                  </div>
                  <span class="divide"></span>
                  <div>
                    <span class="num">33</span>
                    <span class="text">
                        <a href="">文章</a>
                      </span>
                  </div>
                  <span class="divide"></span>
                  <div>
                    <span class="num">13</span>
                    <span class="text">
                        <a href="">关注</a>
                      </span>
                  </div>
                  <span class="divide"></span>
                  <div>
                    <span class="num">33</span>
                    <span class="text">
                        <a href="">分类</a>
                      </span>
                  </div>
                </div>
                <div class="head-media">
                  <i class="iconfont icon-yinle">
                    <a href="https://music.163.com/" target="_blank">网易云</a>
                  </i>
                  <i class="iconfont icon-github">
                    <a href="https://github.com/" target="_blank">Github</a>
                  </i>
                </div>
                <div class="head-link">
                  <div class="link">
                    <i class="iconfont icon-lianjie">Links</i>
                  </div>
                  <a href="http://localhost:8080/#/record/detail/markdown">
                    <i class="iconfont icon-icon-pencil"></i>
                    新的笔记
                  </a>
                  <a href="http://localhost:8080/#/record">
                    <i class="iconfont icon-xiaoxi"></i>
                    笔记列表
                  </a>
                  <a href="http://localhost:8080/#/about">
                    <i class="iconfont icon-rizhi"></i>
                    个人出刊
                  </a>
                  <a href="http://localhost:8080/#/record">
                    <i class="iconfont icon-TIFFANYSROOM_huaban"></i>
                    留言板
                  </a>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </div>
    </div>
    <!--右边文章内容-->
    <div class="right-side">
      <div class="note-type">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/record/detail/default' }">当前文章</el-breadcrumb-item>
          <el-breadcrumb-item><a href="http://localhost:8080/#/record/detail/markdown">创建笔记</a></el-breadcrumb-item>
          <el-breadcrumb-item>文章创作</el-breadcrumb-item>
          <el-breadcrumb-item>新的日志</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view></router-view>
    </div>
    <!--评论-->
    <div class="comment">
      <el-card class="comment-box">
        <div v-for="(commend, index) in commendList" :key="index" class="box">

          <div class="basic-info">
            <el-avatar :size="40" fit="cover" :src="commend.myImg"></el-avatar>
            <span>{{commend.myName}}</span>
          </div>
          <div class="commend">
            <span class="message">{{commend.myCommend}}</span>
          </div>
          <div class="time">{{commend.myCommendTime}}</div>

        </div>
      </el-card>
      <el-card class="news-box">

      </el-card>
    </div>
  </div>
</template>

<script>
  import { commend } from '@/api'
  export default {
    name: 'detail-container',
    data() {
      return {
        activeName: 'first',
        eachContentData: [],
        commendList: [],
        personalImg: localStorage.getItem('userImg'), // 个人头像
        gif: {url: require('../../assets/scroll.gif')},
        scrollTop: 0, // 默认距离顶部的距离
        scrollTrigger2: false, // 默认初始值
      }
    },
    methods: {
      errorHandler() {
        return true
      },
      articleList() {
        this.$router.push('/record')
      },
      // 获取评论数据
      async getCommend() {
        const data = await commend()
        this.commendList = (data.data.commendData)
        this.$forceUpdate()
      },
      // 侧边栏粘性滚动
      fixedActiveBar(e) {
        let sidebar2 = document.getElementsByClassName("left-side-2")[0];
        let sidebar_content2 = document.getElementsByClassName("content-wrapper-2")[0];
        if(sidebar2 !== undefined && sidebar_content2 !== undefined) {
          let scrollTop = e.target.scrollTop;
          let viewportHeight = window.innerHeight;
          let contentHeight = sidebar_content2.getBoundingClientRect().height;
          let sidebarTop = sidebar2.getBoundingClientRect().top + window.pageYOffset;

          if(scrollTop >= contentHeight - viewportHeight) {
            sidebar_content2.style.transform = `translateY(-${contentHeight - viewportHeight + sidebarTop}px)`;
            sidebar_content2.style.position = "fixed";
            if(scrollTop === 0) {
              sidebar_content2.style.top = "150px";
            }
          } else {
            sidebar_content2.style.transform = "";
            sidebar_content2.style.position = "";
            sidebar_content2.style.marginTop = "150px"
          }
        }
      },
    },
    created() {
      this.$nextTick(this.getCommend)
    },
    mounted() {
      window.addEventListener('scroll', this.fixedActiveBar,true)
    },
  }
</script>

<style lang="scss">
  .detail-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    overflow-y: scroll;
    // 左边
    .left-side-2 {
      width: 200px;
      min-width: 200px;
      height: 100%;
      margin-top: 150px;
      margin-right: 20px;
      margin-left: 100px;
      opacity: 0.8;
      .content-wrapper-2 {
        width: 200px;
        height: 100%;
        // 搜索样式
        .search {
          min-width: 187px;
          height: 150px;
          border-radius: 24px;
          position: relative;
          .el-card__body {
            padding: 0 !important;
          }
          .search-top {
            padding: 16px;
            background-color: #003238;
            opacity: 0.5;
            color: white;
            span {
              display: flex;
              justify-content: center;
              margin-bottom: 16px;
            }
          }
          .search-bottom {
            display: flex;
            height: 50px;
            align-items: center;
            justify-content: center;
            i {
              color: grey;
              position: absolute;
              left: 70px;
            }
            .search-input {
              text-align: center;
              border-radius: 4px;
              height: 20px;
              background-color: #c8c8c8;
              border: none;
            }
          }
        }
        // 个人信息样式
        .info {
          margin-top: 10px;
          height: 460px;
          border-radius: 24px;
          padding: 0 12px 0 12px;
          .el-card__body {
            padding: 0 !important;
          }
          .head-image {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover {
              opacity: 0.7;
            }
          }
          .head-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            margin: 10px 0;
            span {
              display: flex;
              justify-content: center;
              width: 100%;
            }
            .head-sentence {
              display: flex;
              justify-content: center;
              width: 100%;
              margin-top: 8px;
              font-size: 8px;
            }
          }
          .head-count {
            display: flex;
            height: 30px;
            div {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;
              width: 40px;
            }
            .divide {
              width: 0;
              border: 0.5px solid grey;
              height: 30px;
              opacity: 0.4;
            }
            .num {
              font-size: 8px;
            }
            .text {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              font-size: 8px;
              a {
                text-decoration: none;
                color: #3e7ac5;
                position: relative;
                &::after {
                  content: '';
                  width: 100%;
                  height: 1px;
                  background-color: currentColor;
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  transform: scaleX(0);
                  transform-origin: right;
                  transition: transform 0.3s ease-out;
                }
                &:hover::after {
                  transform: scale(1);
                  transform-origin: left;
                }
              }
            }
          }
          .head-media {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            font-weight: 400;
            opacity: 0.8;
            i {
              margin: 0 10px 0 10px;
              a {
                text-decoration: none;
                color: black;
                position: relative;
                &::after {
                  content: '';
                  width: 100%;
                  height: 1px;
                  background-color: currentColor;
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  transform: scaleX(0);
                  transform-origin: right;
                  transition: transform 0.3s ease-out;
                }
                &:hover::after {
                  transform: scale(1);
                  transform-origin: left;
                }
              }
            }
          }
          .head-link {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            margin-top: 40px;
            height: 140px;
            i {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 5px;
            }
            a {
              color: black;
              font-weight: 200;
              opacity: 0.8;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              position: relative;
              text-decoration: none;
              &::after {
                content: '';
                width: 100%;
                height: 1px;
                background-color: #5ca55c;
                position: absolute;
                left: 0;
                bottom: 0;
                transform: scaleX(0);
                transform-origin: right;
                transition: transform 0.3s ease-out;
              }
              &:hover::after {
                transform: scale(1);
                transform-origin: left;
              }
            }
          }
        }
      }
    }
    // 右边文章内容
    .right-side {
      display: flex;
      flex-wrap: wrap;
      width: 800px;
      margin-top: 110px;
      height: 100%;
      min-height: 820px;
      .note-type {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        height: 30px;
        color: white;
      }
    }
    // 评论
    .comment {
      margin-left: 20px;
      width: 200px;
      margin-top: 170px;
      height: 100%;
      .el-card__body {
        padding: 5px;
      }
      .comment-box {
        overflow-y: scroll;
        min-width: 200px;
        width: 100%;
        height: 400px;
        opacity: 0.7;
        background-color: #4d4c5a;
        border: #4d4c5a;
        .box {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 20px;
          .basic-info {
            display: flex;
            flex-wrap: wrap;
            width: 40px;
            height: 52px;
            color: #ff0562;
            font-size: 12px;
            justify-content: center;
            align-items: center;
          }
          .commend {
            display: flex;
            flex-wrap: wrap;
            margin-left: 5px;
            width: 130px;
            height: auto;
            border-radius: 14px;
            background-color: #6d6d6d;
            padding: 5px;
            word-break: break-all;
            word-wrap: break-word;
            white-space: pre-wrap;
            .message {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              font-size: 14px;
              color: white;
            }
          }
          .time {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 12px;
            color: #33ff33;
            width: 100%;
            padding-right: 5px;
          }
        }
      }
      .news-box {
        margin-top: 12px;
        width: 100%;
        height: 300px;
        background-color: #4d4c5a;
        border: #4d4c5a;
        opacity: 0.7;
      }
    }
  }
</style>
