<template>
  <div class="record-container" ref="recordContainer">
    <!--分类标题-->
    <div class="category-title-box">
      <div class="category-title">
        <el-card class="category">
          <span>分类：{{tagNow || 'all'}}</span>
          <div class="category-bottom">
            <i class="iconfont icon-wenzhang"></i>
            {{articleNum}}篇文章
          </div>
        </el-card>
      </div>
    </div>
    <!--下方大盒子-->
    <div class="bottom-box">
      <!--左边个人信息与文章栏目-->
      <div class="left-side">
        <div class="content-wrapper">
          <div class="search-box">
            <el-card class="search">
              <div class="search-top">
                <span>Who am i ?</span>
                <span style="font-size: 6px">没有BUG的代码是不完整的！</span>
              </div>
              <div class="search-bottom">
                <i class="iconfont icon-sousuo"></i>
                <input class="search-input" placeholder="搜索" :value="tagDataFilter">
              </div>
            </el-card>
          </div>
          <div class="info-box">
            <el-card class="info">
              <el-tabs v-model="activeName">
                <el-tab-pane label="个人概述" name="first">
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
                        <a href="http://localhost:8080/#/record" target="_blank">订阅</a>
                      </span>
                    </div>
                    <span class="divide"></span>
                    <div>
                      <span class="num">{{eachContentData.length}}</span>
                      <span class="text">
                        <a href="http://localhost:8080/#/record" target="_blank">笔记</a>
                      </span>
                    </div>
                    <span class="divide"></span>
                    <div>
                      <span class="num">13</span>
                      <span class="text">
                      <a href="http://localhost:8080/#/record" target="_blank">关注</a>
                    </span>
                    </div>
                    <span class="divide"></span>
                    <div>
                      <span class="num">{{tagList.length}}</span>
                      <span class="text">
                      <a href="http://localhost:8080/#/record" target="_blank">分类</a>
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
                <el-tab-pane label="文章标签" name="second">
                  <el-tag :type="tagType[Math.round(Math.random()*4)]"
                          v-for="(tag, index) in tagList"
                          :key="index"
                          @click="tagChosen(index)"
                          style="cursor: pointer; margin: 5px">
                    {{tag}}
                  </el-tag>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
        </div>
      </div>
      <!--右边是个人文章-->
      <div class="right-side">
        <div class="article">
<!--          <el-card class="nope" v-if="eachContentData.length === 0"></el-card>-->
          <div class="articles" v-if="enoughContents">
            <!--1-->
            <el-card class="span-col-2 span-row-4 one" style="height: 300px" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[0].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[0].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[0]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--2-->
            <el-card class="span-row-2 two" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[1].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[1].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[1]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--3-->
            <el-card class="span-row-2 three" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[2].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[2].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[2]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--4-->
            <el-card class="span-row-4 four" style="height: 200px" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[3].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[3].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[3]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--5-->
            <el-card class="span-row-4 five" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[4].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[4].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[4]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--6-->
            <el-card class="span-row-4 six" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[5].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[5].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[5]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--7-->
            <el-card class="span-col-2 span-row-4 seven" style="height: 200px" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[6].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[6].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[6]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--8-->
            <el-card class="span-row-5 eight" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[7].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[7].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[7]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--9-->
            <el-card class="span-row-2 nine" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[8].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[8].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[8]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--10-->
            <el-card style="height: 200px" class="ten" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[9].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[9].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[9]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--11-->
            <el-card style="height: 120px;" class="eleven" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[10].noteCoverImg : ''})`}">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[10].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[10]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
            <!--12-->
            <el-card style="height: 120px;" class="twelve" @click.native="detail" :style="{ backgroundImage: `url(${this.eachContentData.length !==0 ? this.eachContentData[11].noteCoverImg : ''})` }">
              <div class="md-content"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{this.date.length !== 0 ? this.eachContentData[11].noteCreateTime : 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{noteReading[11]}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
          </div>
          <!--普通笔记列表样式-->
          <div v-else v-for="(item, index) in tagData" :key="index" class="normal-content">
            <el-card :style="{ backgroundImage: `url(${item.noteCoverImg})` }" class="normal-item" @click.native="detailNormal(index)">
              <div class="md-normal" v-html="item.noteContent"></div>
              <div class="article-time">
                  <span class="time" style="margin-left: 5px">
                    <i class="iconfont icon-shizhong"></i>
                    {{item.noteCreateTime || 'xxxx-xx-xx'}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-jurassic_user"></i>
                    {{item.noteUserName}}
                  </span>
                <span class="time">
                    <i class="iconfont icon-a-24gf-eye2"></i>
                    {{item.noteReading}}
                  </span>
                <span class="code">
                    <i class="iconfont icon-settings"></i>
                    前端代码
                  </span>
              </div>
            </el-card>
          </div>
        </div>
        <!--底部-->
        <div class="bottom-contact">
          <span><i class="iconfont icon-iosfloweroutline"></i> © 2023 WildFlowers, Inc.</span>
          <span>
            <a href="">Privacy</a>
          </span>
          <span>
            <a href="">Contact WildFlowers</a>
          </span>
          <span>
            <a href="">About</a>
          </span>
        </div>
      </div>
    </div>
    <!--返回顶部-->
    <div class="back-to-top" @click="backToTop">
      <img :src="gif.url" alt="">
    </div>
  </div>
</template>

<script>
import {content, noteWho, tagContent, readingTime } from '@/api'

export default {
  name: 'record-container',
  data() {
    return{
      personalImg: localStorage.getItem('userImg'), // 个人头像
      activeName: 'first',
      articleNone: false, // 没有文章时显示
      eachContentData: [], // 笔记数据
      date: [], // 当前时间
      NoteIndex: '', // 当前选择的笔记下标
      nidNull: localStorage.getItem('nId'),
      noteUserName: [], // 笔记对应的用户名
      noteReading: [], // 笔记阅读次数
      tagType: ['', 'success', 'info', 'warning', 'danger'], // 标签随机颜色
      tagList: [], // 标签类型合集
      tagNow: '', // 当前选择的笔记标签
      enoughContents: true,
      tagData: [],
      articleNum: '', // 文章数目
      gif: {url: require('../../assets/scroll.gif')},
      tagDataFilter: '', // 左侧搜索框数据
      scrollTop: 0, // 默认距离顶部的距离
      scrollTrigger: false, // 默认初始值
    }
  },
  methods: {
    errorHandler() {
      return true
    },
    // 跳转详情页
    async detail() {
      let allNoteContainer = document.querySelectorAll('.md-content')
      for(let i = 0; i < allNoteContainer.length; i++) {
        allNoteContainer[i].index = i;
        // 必须点击两次才能跳转的bug未解决，出现原因是这里循环导致
        allNoteContainer[i].onclick = function () {
          // 这里主要是找到对应下标，并存储
          localStorage.setItem('noteIndex', this.index)
        }
      }
      this.NoteIndex = localStorage.getItem('noteIndex')
      // 传递笔记id，在详情页获取数据
      if(this.NoteIndex !== '') {
        await readingTime(this.eachContentData[this.NoteIndex].noteId)
        localStorage.setItem('nId', this.eachContentData[this.NoteIndex].noteId)
        localStorage.setItem('whoseId', this.eachContentData[this.NoteIndex].noteUserId)
        this.$router.push({path: '/record/detail/' + localStorage.getItem('nId')})
      }
    },
    // 跳转详情页-normal
    async detailNormal(index) {
      await readingTime(this.tagData[index].noteId)
      localStorage.setItem('nId', index)
      localStorage.setItem('whoseId', this.tagData[index].noteUserId)
      this.$router.push({path: '/record/detail/' + this.tagData[index].noteId})
    },
    // 分类笔记数据
    async content() {
      localStorage.setItem('nowNoteId', '')
      localStorage.setItem('noteIndex', '')
      localStorage.setItem('nId', '')
      localStorage.setItem('whoseId', '')
      const contentData = await content()
      this.eachContentData = contentData.data.noteData
      this.articleNum = this.eachContentData.length
      this.eachContentData.forEach(item => {
        noteWho(item.noteUserId).then((data) => {
          this.noteUserName.push(data.data.who.username)
        }).catch(err => {
          console.log(err)
        })
        this.date.push(item.noteCreateTime)
        this.noteReading.push(item.noteReading)
        this.tagList.push(item.noteTag)
        // 去除重复标签
        this.tagList = [...new Set(this.tagList)]
      })
      let md = document.querySelectorAll('.md-content')
      md.forEach((item, index) => {
        item.innerHTML = this.eachContentData[index].noteContent
      })
    },
    // 选择笔记类别并切换类别
    async tagChosen(index) {
      this.tagNow = this.tagList[index]
      const tagContentData = await tagContent(this.tagNow)
      if(tagContentData.data.tagData.length === 12) {
        this.enoughContents = true
        this.eachContentData = tagContentData.data.tagData
        await this.content()
        this.articleNum = 12
      } else {
        this.tagData = tagContentData.data.tagData
        this.articleNum = this.tagData.length
        this.enoughContents = false
      }
    },
    // 侧边栏粘性滚动
    fixedActiveBar(e) {
      this.scrollTop = e.target.scrollTop
      let sidebar = document.getElementsByClassName("left-side")[0];
      let sidebar_content = document.getElementsByClassName("content-wrapper")[0];
      if(sidebar !== undefined && sidebar_content !== undefined) {
        let scrollTop = e.target.scrollTop;
        let viewportHeight = window.innerHeight;
        let contentHeight = sidebar_content.getBoundingClientRect().height;
        let sidebarTop = sidebar.getBoundingClientRect().top + window.pageYOffset;

        if(scrollTop >= contentHeight - viewportHeight + 41) {
          sidebar_content.style.transform = `translateY(-${contentHeight - viewportHeight + sidebarTop - 410}px)`;
          sidebar_content.style.position = "fixed";
          sidebar_content.style.top = "141px";
        } else {
          sidebar_content.style.transform = "";
          sidebar_content.style.position = "";
        }
      }
    },
    // 返回顶部
    backToTop() {
      let that = this; // 防止this指向问题
      // 防止频繁点击，返回顶部后设置scrollTrigger为初始值
      if (that.scrollTrigger) {
        return;
      }
      // 获取当前距离顶部的距离
      let scrollTop = this.scrollTop
      let steep = scrollTop / 2000
      let timer = setInterval(() => {
        that.scrollTop = true;
        scrollTop -= steep;
        steep += 20;
        if(scrollTop <= 0) {
          clearInterval(timer);
          that.scrollTrigger = false;
        }
        that.$refs.recordContainer.scrollTop = scrollTop
      }, 30)
    },
  },
  mounted() {
    this.content()
    window.addEventListener('scroll', this.fixedActiveBar,true)
  },
}
</script>

<style lang="scss">
  .record-container {
    width: 100%;
    height: 100%;
    overflow: scroll;
    // 头部分类盒子
    .category-title-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 100px;
      padding: 10px;
      opacity: 0.8;
      // 头部分类标题样式
      .category-title {
        width: 80%;
        height: 80px;
        .category {
          background: url("../../assets/wallhaven-zyxvqy.jpg") center;
          background-size: cover;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          color: white;
          .category-bottom {
            color: white;
            opacity: 0.6;
            font-size: 8px;
            margin-top: 10px;
          }
        }
      }
    }
    // 下方大盒子
    .bottom-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin-top: 10px;
      // 左边
      .left-side {
        width: 200px;
        height: 100%;
        margin-right: 20px;
        opacity: 0.8;
        .content-wrapper {
          top: 40px;
          width: 200px;
          height: 100%;
          // 搜索样式
          .search {
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
                left: 50px;
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
      // 右边
      .right-side {
        width: 63%;
        height: 100%;
        opacity: 0.8;
        .article {
          display: flex;
          flex-wrap: wrap;
          .nope {
            height: 300px;
            border-radius: 24px;
          }
          .articles {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 10px;
            .span-col-2{grid-column: span 2 / auto;}
            .span-row-4{grid-row: span 4 / auto;}
            .span-row-2{grid-row: span 2 / auto;}
            .span-row-5{grid-row: span 5 / auto;}
            .one {
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              color: #c8c8c8;
              filter: brightness(0.75) saturate(1.2) contrast(0.85);
              transition: filter 200ms linear, transform 200ms linear;
              border: none;
              cursor: pointer;
              &:hover {
                transform: scale(1.05);
                filter: none;
                .md-content {
                  opacity: 1;
                }
                .article-time {
                  color: #33ff33;
                }
              }
              .md-content {
                width: 100%;
                height: 240px;
                overflow: hidden;
                background-color: #4d4c5a;
                opacity: 0.6;
              }
              .article-time {
                width: 100%;
                margin-top: 5px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
                color: white;
                .time {
                  font-size: 12px;
                  margin-right: 20px;
                  i {
                    font-size: 12px;
                  }
                }
                .code {
                  font-size: 12px;
                  float: right;
                  margin-right: 5px;
                  i {
                    font-size: 12px
                  }
                }
              }
            }
            .two, .three {
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              border: none;
              cursor: pointer;
              color: white;
              filter: brightness(0.75) saturate(1.2) contrast(0.85);
              transition: filter 200ms linear, transform 200ms linear;
              &:hover {
                transform: scale(1.05);
                filter: none;
                .md-content {
                  opacity: 1;
                }
                .article-time {
                  color: #33ff33;
                }
              }
              .md-content {
                width: 100%;
                height: 79px;
                overflow: hidden;
                background-color: #4d4c5a;
                opacity: 0.6;
              }
              .article-time {
                width: 100%;
                margin-top: 5px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
                color: white;
                .time {
                  font-size: 12px;
                  margin-right: 2px;
                  i {
                    font-size: 12px;
                  }
                }
                .code {
                  font-size: 12px;
                  float: right;
                  margin-right: 2px;
                  i {
                    font-size: 12px
                  }
                }
              }
            }
            .four, .five, .six, .ten {
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              border: none;
              cursor: pointer;
              color: white;
              filter: brightness(0.75) saturate(1.2) contrast(0.85);
              transition: filter 200ms linear, transform 200ms linear;
              &:hover {
                transform: scale(1.05);
                filter: none;
                .md-content {
                  opacity: 1;
                }
                .article-time {
                  color: #33ff33;
                }
              }
              .md-content {
                background-color: #4d4c5a;
                opacity: 0.6;
                width: 100%;
                height: 140px;
                overflow: hidden;
              }
              .article-time {
                width: 100%;
                margin-top: 5px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
                color: white;
                .time {
                  font-size: 12px;
                  margin-right: 2px;
                  i {
                    font-size: 12px;
                  }
                }
                .code {
                  font-size: 12px;
                  float: right;
                  margin-right: 2px;
                  i {
                    font-size: 12px
                  }
                }
              }
            }
            .seven {
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              border: none;
              cursor: pointer;
              color: white;
              filter: brightness(0.75) saturate(1.2) contrast(0.85);
              transition: filter 200ms linear, transform 200ms linear;
              &:hover {
                transform: scale(1.05);
                filter: none;
                .md-content {
                  opacity: 1;
                }
                .article-time {
                  color: #33ff33;
                }
              }
              .md-content {
                background-color: #4d4c5a;
                opacity: 0.6;
                width: 100%;
                height: 140px;
                overflow: hidden;
              }
              .article-time {
                width: 100%;
                margin-top: 5px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
                color: white;
                .time {
                  font-size: 12px;
                  margin-right: 20px;
                  i {
                    font-size: 12px;
                  }
                }
                .code {
                  font-size: 12px;
                  float: right;
                  margin-right: 5px;
                  i {
                    font-size: 12px
                  }
                }
              }
            }
            .eight {
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              border: none;
              cursor: pointer;
              color: white;
              filter: brightness(0.75) saturate(1.2) contrast(0.85);
              transition: filter 200ms linear, transform 200ms linear;
              &:hover {
                transform: scale(1.05);
                filter: none;
                .md-content {
                  opacity: 1;
                }
                .article-time {
                  color: #33ff33;
                }
              }
              .md-content {
                background-color: #4d4c5a;
                opacity: 0.6;
                width: 100%;
                height: 360px;
                overflow: hidden;
              }
              .article-time {
                width: 100%;
                margin-top: 5px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
                color: white;
                .time {
                  font-size: 12px;
                  margin-right: 2px;
                  i {
                    font-size: 12px;
                  }
                }
                .code {
                  font-size: 12px;
                  float: right;
                  margin-right: 2px;
                  i {
                    font-size: 12px
                  }
                }
              }
            }
            .nine {
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              border: none;
              cursor: pointer;
              color: white;
              filter: brightness(0.75) saturate(1.2) contrast(0.85);
              transition: filter 200ms linear, transform 200ms linear;
              &:hover {
                transform: scale(1.05);
                filter: none;
                .md-content {
                  opacity: 1;
                }
                .article-time {
                  color: #33ff33;
                }
              }
              .md-content {
                background-color: #4d4c5a;
                opacity: 0.6;
                width: 100%;
                height: 270px;
                overflow: hidden;
              }
              .article-time {
                width: 100%;
                margin-top: 5px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
                color: white;
                .time {
                  font-size: 12px;
                  margin-right: 2px;
                  i {
                    font-size: 12px;
                  }
                }
                .code {
                  font-size: 12px;
                  float: right;
                  margin-right: 2px;
                  i {
                    font-size: 12px
                  }
                }
              }
            }
            .eleven, .twelve {
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              border: none;
              cursor: pointer;
              color: white;
              filter: brightness(0.75) saturate(1.2) contrast(0.85);
              transition: filter 200ms linear, transform 200ms linear;
              &:hover {
                transform: scale(1.05);
                filter: none;
                .md-content {
                  opacity: 1;
                }
                .article-time {
                  color: #33ff33;
                }
              }
              .md-content {
                width: 100%;
                height: 52px;
                overflow: hidden;
                background-color: #4d4c5a;
                opacity: 0.6;
              }
              .article-time {
                width: 100%;
                margin-top: 5px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
                color: white;
                .time {
                  font-size: 12px;
                  margin-right: 2px;
                  i {
                    font-size: 12px;
                  }
                }
                .code {
                  font-size: 12px;
                  float: right;
                  margin-right: 2px;
                  i {
                    font-size: 12px
                  }
                }
              }
            }
          }
          .normal-content {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
            width: 290px;
            margin-right: 10px;
            .normal-item {
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
              width: 290px;
              height: 220px;
              color: #c8c8c8;
              filter: brightness(0.75) saturate(1.2) contrast(0.85);
              transition: filter 200ms linear, transform 200ms linear;
              border: none;
              cursor: pointer;
              &:hover {
                transform: scale(1.05);
                filter: none;
                .md-normal {
                  opacity: 1;
                }
                .article-time {
                  color: #33ff33;
                }
              }
              .md-normal {
                width: 100%;
                height: 160px;
                overflow: hidden;
                background-color: #4d4c5a;
                opacity: 0.6;
              }
              .article-time {
                width: 100%;
                margin-top: 5px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
                color: white;
                .time {
                  font-size: 12px;
                  margin-right: 20px;
                  i {
                    font-size: 12px;
                  }
                }
                .code {
                  font-size: 12px;
                  float: right;
                  margin-right: 5px;
                  i {
                    font-size: 12px
                  }
                }
              }
            }
          }
        }
      }
      // 底部
      .bottom-contact {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        border-top: 1px solid white;
        margin-top: 40px;
        height: 100px;
        i {
          font-size: 20px;
        }
        span {
          color: white;
          a {
            text-decoration: none;
            color: white;
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
    }
    // 倒挂猫
    .back-to-top {
      cursor: pointer;
      position: absolute;
      width: 50px;
      height: 100%;
      right: 40px;
      top: 61px;
      img {
        width: 100%;
        height: 60%;
        &:hover {
          transition: .6s ease;
          transform: scale(1.1) translateY(20px);
        }
      }
    }
  }

</style>
