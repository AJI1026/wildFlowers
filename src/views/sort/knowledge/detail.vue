<template>
  <div class="knowledge-detail-container">
    <el-container>
      <!--左侧书籍商品信息-->
      <el-main class="book-info">
        <!--返回按钮-->
        <el-button type="warning" @click.native="back">
          返回
        </el-button>
        <!--书籍头部标题-->
        <div class="book-title">
          <p>{{bookData.bookName}}</p>
          <p>
            <i class="iconfont icon-jurassic_user"></i>
            {{bookData.bookAuthor}}
          </p>
        </div>
        <el-divider></el-divider>
        <!--书籍商品信息-->
        <div class="book">
          <div class="book-card">
            <div class="book-img">
              <!--trigger适用于任何类型-->
              <viewer :trigger="bookData.CoverImg">
                <img :src="bookData.CoverImg" alt="">
              </viewer>
            </div>
            <div class="book-basic-info">
              <p class="name">
                <i class="iconfont icon-iosfloweroutline"></i>
                <span class="info-title">
                  书名：
                  <span class="title-content">{{bookData.bookName}}</span>
                </span>
              </p>
              <p class="name">
                <i class="iconfont icon-iosfloweroutline"></i>
                <span class="info-title">
                  作者：
                  <span class="title-content">{{bookData.bookAuthor}}</span>
                </span>
              </p>
              <p class="name">
                <i class="iconfont icon-iosfloweroutline"></i>
                <span class="info-title">
                  标签：
                  <el-tag type="primary" class="title-content tag"  @click.native="back">
                    {{bookData.bookType}}
                  </el-tag>
                </span>
              </p>
              <p class="name">
                <i class="iconfont icon-iosfloweroutline"></i>
                <span class="info-title">
                  时间：
                  <span class="title-content">{{bookData.bookTime}}</span>
                </span>
              </p>
              <p class="name">
                <i class="iconfont icon-iosfloweroutline"></i>
                <span class="info-title">
                  评分：
                  <span class="title-content">{{bookData.bookGrade}}</span>
                </span>
              </p>
              <p class="name">
                <i class="iconfont icon-iosfloweroutline"></i>
                <span class="info-title">
                  ISBN：
                  <span class="title-content">{{bookData.bookCode}}</span>
                </span>
              </p>
            </div>
          </div>
          <div class="book-choose">
            <div class="top">
              <div class="price">
                <i class="iconfont icon-jiage"></i>
                <span>{{bookData.bookPrice | capitalize}}</span>
                <p>原价：{{originPrice | capitalize}}</p>
              </div>
              <div class="off">
                <img src="https://pic.quanjing.com/69/cb/QJ6954884739.jpg@!350h" alt="">
              </div>
            </div>
            <div class="bottom">
              <!--images只适合于数组-->
              <viewer :images="bookData.detailImg">
                <div v-for="item in bookData.detailImg" :key="item" class="chosen">
                  <img class="medium" :src="item" alt="" />
                </div>
              </viewer>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <!--书籍内容简介-->
        <div class="content-introduction"></div>
        <el-divider></el-divider>
        <!--作者简介-->
        <div class="author-introduction"></div>
        <!--二维码、分享-->
        <div class="share"></div>
      </el-main>
      <!--右侧标签导航-->
      <el-aside class="book-tag">

      </el-aside>
    </el-container>
  </div>
</template>

<script>

export default {
    name: 'knowledge-detail-container',
    data() {
      return {
        bookData: '', // 书籍的数据
        originPrice: '', // 原价
      }
    },
    filters: {
      capitalize(value) {
        return parseFloat(value).toFixed(2)
      }
    },
    methods: {
      back() {
        this.$router.push('/knowledge/books')
      }
    },
    created() {
      // 解析url获取书籍数据
      this.bookData = JSON.parse(decodeURIComponent(this.$route.query.obj));
      console.log(this.bookData)
      this.originPrice = this.bookData.bookPrice * 1.15
    }
  }
</script>

<style lang="scss">
  .knowledge-detail-container {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    .el-container {
      width: 100%;
      height: 100%;
      .book-info {
        .book-title {
          p:nth-child(1) {
            font-size: 20px;
            font-weight: 600;
            color: #252525;
          }
          p:nth-child(2) {
            color: #252525;
          }
        }
        .book {
          display: flex;
          flex-wrap: nowrap;
          height: 300px;
          color: #252525;
          .book-card {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 500px;
            height: 100%;
            box-sizing: border-box;
            padding: 10px;
            background-color: white;
            border-radius: 12px;
            .book-img {
              width: 200px;
              height: 260px;
              margin-right: 40px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .book-basic-info {
              width: 200px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              .name {
                .info-title {
                  font-weight: 800;
                  .title-content {
                    font-size: 14px;
                    font-weight: 400;
                    color: #252525;
                  }
                  .tag {
                    &:hover {
                      cursor: pointer;
                      transition: .5s ease-in-out;
                      background-color: #c3c2c8;
                    }
                  }
                }
              }
            }
          }
          .book-choose {
            width: 600px;
            margin-left: 10px;
            box-sizing: border-box;
            padding: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .top {
              width: 100%;
              border-radius: 12px;
              background-color: grey;
              position: relative;
              .price {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: flex-start;
                box-sizing: border-box;
                padding-left: 10px;
                height: 60px;
                width: 200px;
                border-top-left-radius: 12px;
                border-top-right-radius: 26px;
                border-bottom-right-radius: 26px;
                background-color: dimgrey;
                position: relative;
                i {
                  font-size: 18px;
                }
                span {
                  font-size: 20px;
                  position: relative;
                  top: -4px;
                  color: white;
                }
                p {
                  position: absolute;
                  top: 22px;
                  left: 20px;
                  font-size: 12px;
                  text-decoration: line-through;
                }
              }
              .off {
                position: absolute;
                top: 0;
                right: 10px;
                width: 100px;
                height: 60px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .bottom {
              background-color: white;
              border-radius: 0 12px 12px 12px;
              position: relative;
              top: -70px;
              width: 100%;
              box-sizing: border-box;
              padding: 10px;
              .chosen {
                float: left;
                cursor: pointer;
                width: 54px;
                height: 54px;
                margin: 5px;
                img {
                  width: 54px;
                  height: 54px;
                }
                &:hover {
                  transform: scale(1.12);
                }
              }
            }
          }
        }
      }
      .book-tag {
        background-color: #33373f;
      }
    }
  }

</style>
