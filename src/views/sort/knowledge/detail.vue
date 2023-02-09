<template>
  <div class="knowledge-detail-container">
    <el-container>
      <!--左侧书籍商品信息-->
      <el-main class="book-info">
        <!--返回按钮-->
        <el-button type="warning" @click.native="back">返回</el-button>
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
                <el-tooltip class="item" effect="dark" :content="bookData.bookName" placement="top">
                  <span class="info-title" style="cursor: pointer">
                  书名：
                  <span class="title-content">{{bookData.bookName}}</span>
                </span>
                </el-tooltip>
              </p>
              <p class="name">
                <i class="iconfont icon-iosfloweroutline"></i>
                <el-tooltip class="item" effect="dark" :content="bookData.bookAuthor" placement="top">
                  <span class="info-title"  style="cursor: pointer">
                  作者：
                  <span class="title-content">{{bookData.bookAuthor}}</span>
                </span>
                </el-tooltip>
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
              <div class="storage">
                <div class="buy">
                  <span>库存：{{bookData.bookStore}}件</span>
                  <i class="iconfont icon-dianpu" style="margin-left: 20px" @click="goShop"></i>
                  <i class="iconfont icon-kefu" @click="goService"></i>
                  <i class="iconfont icon-gouwuchekong" style="margin-right: 40px" @click="goCart"></i>
                  <div class="btn">
                    <el-button type="warning" round size="small">加入购物车</el-button>
                    <el-button type="danger" round size="small">立即购买</el-button>
                  </div>
                </div>
                <div class="bottom-decoration"></div>
              </div>
            </div>
          </div>
          <div class="book-video">
            <video id="myVideo" class="video-js">
              <source>
            </video>
          </div>
        </div>
        <!--书籍内容简介-->
        <div class="content-introduction">
          <div class="content-head">
            <div class="content-head-square"></div>
            <div class="head">内容简介</div>
          </div>
          <div class="content-body">{{bookData.bookIntroduction}}</div>
        </div>
        <!--作者简介-->
        <div class="author-introduction">
          <div class="content-head">
            <div class="content-head-square"></div>
            <div class="head">作者简介</div>
          </div>
          <div class="content-body">{{bookData.authorIntroduction}}</div>
        </div>
        <!--二维码-->
        <div class="qrCode">
          <div id="qrcode"></div>
        </div>
        <!--分享-->
        <div class="share">
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
        </div>
      </el-main>
      <!--右侧标签导航-->
      <el-aside class="book-tag">

      </el-aside>
    </el-container>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

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
    components: {
      QRCode
    },
    methods: {
      // 返回书籍页面
      back() {
        this.$router.push('/knowledge/books')
      },
      // 去到店铺
      goShop() {
        this.$router.push('/shop')
      },
      // 去到客服
      goService() {
        this.$router.push('/service')
      },
      // 去到购物车
      goCart() {
        this.$router.push('/cart')
      },
      // 生成二维码
      //  生成二维码
      qrcode () {
        let qrcode = new QRCode("qrcode", {
          width: 180,
          height: 180,
        });
        function makeCode () {
          qrcode.makeCode("http://192.168.0.102:80/#/index?code=" + localStorage.getItem('username'));
        }
        makeCode();
      },
    },
    created() {
      // 解析url获取书籍数据
      this.bookData = JSON.parse(decodeURIComponent(this.$route.query.obj));
      console.log(this.bookData)
      this.originPrice = this.bookData.bookPrice * 1.15
    },
    mounted () {
      this.$nextTick(function () {
        this.qrcode();
      })
    }
  }
</script>

<style lang="scss">
  .knowledge-detail-container {
    width: 100%;
    height: 100%;
    .el-container {
      width: 100%;
      height: 100%;
      // 书籍商品信息
      .book-info {
        min-width: 904px;
        .book-title {
          p:nth-child(1) {
            font-size: 20px;
            font-weight: 600;
            color: #252525;
            margin-top: 10px;
          }
          p:nth-child(2) {
            color: #252525;
            margin-top: 10px;
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
            width: 440px;
            height: 100%;
            box-sizing: border-box;
            padding: 10px;
            background-color: #FFFFFB;
            border-radius: 12px;
            .book-img {
              width: 200px;
              height: 260px;
              cursor: pointer;
              margin-right: 20px;
              img {
                max-height: 260px;
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
                margin-bottom: 10px;
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
            width: 450px;
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
                  top: 30px;
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
              background-color: #FFFFFB;
              border-radius: 0 12px 12px 12px;
              position: relative;
              top: -29px;
              width: 100%;
              box-sizing: border-box;
              padding: 10px;
              display: flex;
              flex-wrap: wrap;
              height: 160px;
              .storage {
                width: 100%;
                min-width: 420px;
                color: #8B4726;
                .buy {
                  margin-top: 20px;
                  box-sizing: border-box;
                  padding-left: 5px;
                  font-size: 14px;
                  margin-bottom: 10px;
                  height: 40px;
                  line-height: 40px;
                  i {
                    font-size: 20px;
                    margin-right: 10px;
                    cursor: pointer;
                  }
                  .btn {
                    height: 40px;
                    display: inline-block;
                  }
                }
              }
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
          .book-video {
            border: 1px solid black;
            width: 200px;
            height: 100%;
            .video-js {
              width: 100%;
              height: 100%;
            }
          }
        }
        .content-introduction, .author-introduction {
          .content-head {
            position: relative;
            margin-top: 20px;
            .content-head-square {
              position: absolute;
              left: -5px;
              width: 10px;
              height: 40px;
              background-color: #00AA90;
            }
            .head {
              height: 40px;
              font-size: 18px;
              box-sizing: border-box;
              padding: 5px 0 5px 15px;
              font-weight: 600;
              background-color: #FFFFFB;
              border-bottom: 2px solid #00AA90;
            }
          }
          .content-body {
            background-color: #FFFFFB;
            width: 100%;
            height: auto;
            word-wrap: break-word;
            font-size: 14px;
            text-indent: 2em;
            color: black;
            margin-top: 10px;
            box-sizing: border-box;
            padding: 20px;
            line-height: 40px;
            border-radius: 5px;
            font-family: "Times New Roman",serif;
          }
        }
        .qrCode {
          height: 200px;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .share {
          border: 1px solid black;
          height: 100px;
          margin-top: 10px;
        }
      }
      // 右侧导航标签
      .book-tag {
        background-color: #33373f;
        display: flex;
      }
    }
  }

</style>
