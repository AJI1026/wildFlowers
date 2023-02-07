<template>
  <div class="homePage">
    <div class="section section2 light">
      <div class="outside_box">
        <!--控制日历显示与隐藏-->
        <div class="calendarControl" @click="showCalendar">
          <i class="el-icon-d-arrow-left" v-if="CalendarArrow" style="color: #e1e1e1"></i>
          <i class="el-icon-d-arrow-right" v-else style="color: #e1e1e1"></i>
        </div>
        <!--日历-->
        <calendar style="transform: scale(0.48);" class="cc"></calendar>
        <!--左边文字说明-->
        <div class="description_box">
          <div class="text_description">
            <span class="text_box" ref="leftText">
              {{injectText}}
            </span>
          </div>
        </div>
        <!--中间书籍简介-->
        <el-pagination class="introductionList-page" layout="pager"></el-pagination>
        <div class="card_box">
          <!--左箭头-->
          <div class="pre-page" @click="getSimpleBookList">
            <i class="el-icon-arrow-left"></i>
          </div>
          <div class="card_list">
              <!--卡片-->
              <a href="#" class="card" @click="showDetailIntroduction(index)" v-for="(item,index) in totalList" :key="index">
                <div class="background"></div>
                <div class="content">
                  <p class="category">{{item[1]}}</p>
                  <h3 class="heading">{{item[0]}}</h3>
                  <p class="detail">{{item[2]}}</p>
                </div>
              </a>
          </div>
          <div class="card_list">
            <!--卡片-->
            <a href="#" class="card" @click="showDetailIntroduction(index+3)" v-for="(item,index) in totalListSecond" :key="index">
              <div class="background"></div>
              <div class="content">
                <p class="category">{{item[1]}}</p>
                <h3 class="heading">{{item[0]}}</h3>
                <p class="detail">{{item[2]}}</p>
              </div>
            </a>
          </div>
          <div class="card_list">
            <!--卡片-->
            <a href="#" class="card" @click="showDetailIntroduction(index+6)" v-for="(item,index) in totalListThird" :key="index">
              <div class="background"></div>
              <div class="content">
                <p class="category">{{item[1]}}</p>
                <h3 class="heading">{{item[0]}}</h3>
                <p class="detail">{{item[2]}}</p>
              </div>
            </a>
          </div>
        </div>
        <!--右箭头-->
        <div class="next-page" @click="nextPage">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import calendar from "@/components/calendar";
import {simpleBookList} from "@/api";

  export default {
    name: 'home-content',
    components: {
      calendar
    },
    data() {
      return {
        // 文字打字机
        i:0,
        timer: '',
        injectText: '',
        textArray: 'I hope you will be like a sword that splits the night; Or like snowdrops blooming in winter; Come on, go after what you want; Life is short, to bloom yourself and show yourself.',
        // 简介列表数据
        frontImg: 1,
        bookNameList: '',
        authorList: '',
        // 简介详细内容
        detailList: '',
        // 第一列数据
        totalList: [],
        // 第二列数据
        totalListSecond: [],
        // 第三列数据
        totalListThird: [],
        // 日历显示隐藏的箭头
        CalendarArrow: true,
      }
    },
    methods: {
      // 文字打字机逻辑
      show() {
        if(this.$refs.leftText) {
          this.$refs.leftText.innerHTML= this.textArray.substr(0, this.i)
          this.i++
        }
      },
      // 获取简介列表
      async getSimpleBookList() {
        const { data } = await simpleBookList()
        for(let i = 0; i < data.data.length; i++) {
          this.bookNameList = [...this.bookNameList, data.data[i].bookName]
          this.authorList = [...this.authorList, data.data[i].author]
          this.detailList = [...this.detailList, data.data[i].detail]
        }
        // 先清空之前的数据
        this.totalList = ''
        this.totalListSecond = ''
        this.totalListThird = ''
        // 第一列数据
        for(let i = 0; i <= 2; i++) {
          this.totalList = [...this.totalList, [this.bookNameList[i],this.authorList[i],this.detailList[i]]]
        }
        // 第二列数据
        for(let i = 3; i <= 5; i++) {
          this.totalListSecond = [...this.totalListSecond, [this.bookNameList[i],this.authorList[i],this.detailList[i]]]
        }
        // 第三列数据
        for(let i = 6; i <= 8; i++) {
          this.totalListThird = [...this.totalListThird, [this.bookNameList[i],this.authorList[i],this.detailList[i]]]
        }
      },
      // 展开简介卡片，展示书籍简介详情
      showDetailIntroduction(which) {
        document.getElementsByClassName('card')[which].classList.toggle('showDetail')
      },
      // 显示和隐藏日历
      showCalendar() {
        document.querySelector('.calendar').classList.toggle('show-calendar')
        document.querySelector('.text_description').classList.toggle('upText')
        this.CalendarArrow = !this.CalendarArrow
      },
      // 日历箭头方向判断
      checkDirection() {
        if(document.querySelector('.cc')) {
          if(window.innerWidth <= 780) {
            document.querySelector('.cc').classList.add('show-calendar')
            this.CalendarArrow = false
          } else {
            document.querySelector('.cc').classList.remove('show-calendar')
          }
        }
      },
      // 下一页数据
      async nextPage() {
        const { data } = await simpleBookList()
        if (this.totalListThird[2][1] === data.data[17].author) {
          this.$message.info('没有更多的数据啦！')
        } else {
          // 先清空之前的数据
          this.totalList = ''
          this.totalListSecond = ''
          this.totalListThird = ''
          // 第一列数据
          for(let i = 9; i <= 11; i++) {
            this.totalList = [...this.totalList, [this.bookNameList[i],this.authorList[i],this.detailList[i]]]
          }
          // 第二列数据
          for(let i = 12; i <= 14; i++) {
            this.totalListSecond = [...this.totalListSecond, [this.bookNameList[i],this.authorList[i],this.detailList[i]]]
          }
          // 第三列数据
          for(let i = 15; i <= 17; i++) {
            this.totalListThird = [...this.totalListThird, [this.bookNameList[i],this.authorList[i],this.detailList[i]]]
          }
        }
      },
      // 简介卡片拖拽
    },
    mounted() {
      // 设置文字打字机的定时器
      this.timer = setInterval(this.show, 50)
    },
    beforeDestroy() {
      // 清除文字打字机的定时器
      if(this.i + 1 >= this.textArray.length) {
        clearInterval(this.timer)
      }
    },
    created() {
      // 必须用此方法对虚拟DOM进行操作
      this.$nextTick(this.show)
      this.getSimpleBookList()
      setInterval(this.checkDirection,1)
    }
  }
</script>

<style lang="scss">
  .homePage {
    width: 100%;
    height: 100vh;
    position: relative;
    transition: all 0.3s ease;
    // 分屏2
    .section2 {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      .outside_box {
        display: flex;
        height: calc(100% - 62px);
        margin-top: 62px;
        // 日历显示隐藏控制
        .calendarControl {
          display: flex;
          align-items: center;
          z-index: 2;
          width: 15px;
          height: 300px;
          position: absolute;
          top: 65px;
          border-top-right-radius: 24px;
          border-bottom-right-radius: 24px;
          background-color: #33373f;
          opacity: 0.6;
        }
        // 左边文字描述样式
        .description_box {
          height: 100%;
          width: 300px;
          .text_description {
            position: relative;
            left: 20px;
            top: calc(60% - 62px);
            text-indent: 20px;
            padding: 10px;
            .text_box {
              color: #e1e1e1;
              font-style: italic;
              width: 280px;
            }
          }
        }
        // 左划箭头样式
        .pre-page {
          display: flex;
          align-items: center;
          height: 100%;
          i {
            color: #e1e1e1;
            font-size: 60px;
            opacity: 0.6;
            &:hover {
              opacity: 1;
              transform: scale(1.12);
              font-weight: 600;
            }
          }
        }
        // 右划箭头样式
        .next-page {
          display: flex;
          align-items: center;
          position: relative;
          left: -1%;
          i {
            color: #e1e1e1;
            font-size: 60px;
            opacity: 0.6;
            &:hover {
              opacity: 1;
              transform: scale(1.12);
              font-weight: 600;
            }
          }
        }
        @media (max-width: 976px) {
          .next-page {
            display: flex;
            align-items: center;
            position: relative;
            left: -17%;
            i {
              color: #e1e1e1;
              font-size: 60px;
              opacity: 0.6;
              &:hover {
                opacity: 1;
                transform: scale(1.12);
                font-weight: 600;
              }
            }
          }
        }
        @media (max-width: 945px) {
          .next-page {
            display: flex;
            align-items: center;
            position: relative;
            left: -10%;
            i {
              color: #e1e1e1;
              font-size: 60px;
              opacity: 0.6;
              &:hover {
                opacity: 1;
                transform: scale(1.12);
                font-weight: 600;
              }
            }
          }
        }
        // 卡片样式
        .card_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1050px;
          height: 100%;
          flex-wrap: wrap;
          overflow: hidden;
          .card_list {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            flex-wrap: wrap;
            width: 330px;
            height: 100%;
            .card {
              overflow: hidden;
              display: flex;
              flex-wrap: wrap;
              position: relative;
              border-radius: 16px;
              .background {
                background-color: #666666;
                width: 300px;
                height: 200px;
                filter: brightness(0.75) saturate(1.2) contrast(0.85);
                transition: filter 200ms linear, transform 200ms linear;
              }
              .content {
                padding: 12px;
                position: absolute;
                top: 0;
                .category, .detail{
                  color: #e1e1e1;
                  font-size: 0.9rem;
                  margin-bottom: 8px;
                  text-transform: uppercase;
                }
                .heading {
                  display: flex;
                  width: 270px;
                  color: #e1e1e1;
                  font-size: 1.8rem;
                }
                .detail {
                  padding: 0 10px;
                  margin-top: 20px;
                  letter-spacing: 5px;
                  font-style: italic;
                  text-indent: 40px;
                }
              }
              &:hover {
                .background {
                  transform: scale(1.05);
                  filter: none;
                }
              }
            }
            .card:not(:hover) .background {
              filter: brightness(0.6) saturate(1) contrast(1.2) blur(5px);
            }
            .card:not(:hover) .content {
              filter: brightness(0.8) blur(2px);
            }
            .showDetail {
              z-index: 2;
              position: absolute;
              top: 62px;
              left: 0;
              .background {
                width: 100vw;
                height: 100vh;
              }
              .heading {
                width: 300px !important;
              }
              .detail {
                margin-top: 50px !important;
              }
            }
          }
        }
      }
    }
    // 日历显示隐藏
    .show-calendar {
      left: -500px;
    }
    // 段落上移
    .upText {
      transition: 1s ease-in-out;
      top: calc(50% - 62px) !important;
    }
  }
</style>
