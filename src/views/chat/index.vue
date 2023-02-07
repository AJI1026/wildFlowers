<template>
    <div class="chat-container">
      <div class="chat-box">
        <!--左侧导航-->
        <div class="nav-box">

          <div class="head-image">
            <el-avatar :size="50" @error="errorHandler">
              <img  :src="head" alt="image loading...">
            </el-avatar>
            <el-tooltip class="item" effect="dark" content="AJI1026" placement="left">
              <span class="head-name">{{name}}</span>
            </el-tooltip>
          </div>

          <div class="head-icons">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @select="changeSidebar">
              <el-menu-item index="Contact">
                <el-tooltip class="item" effect="dark" content="添加好友" placement="left">
                  <i class="iconfont icon-guanzhuyonghuguanli"></i>
                </el-tooltip>
              </el-menu-item>
              <el-menu-item index="StarFriend">
                <el-tooltip class="item" effect="dark" content="星标朋友" placement="left">
                  <i class="iconfont icon-shoucangxuanzhong"></i>
                </el-tooltip>
              </el-menu-item>
              <el-menu-item index="Collect">
                <el-tooltip class="item" effect="dark" content="收藏文件" placement="left">
                  <i class="iconfont icon-shoucangdefuben"></i>
                </el-tooltip>
              </el-menu-item>
            </el-menu>
          </div>

          <div class="head-github">
            <el-tooltip class="item" effect="dark" content="前往项目库" placement="left">
              <i class="iconfont icon-github"></i>
            </el-tooltip>
          </div>

          <div class="head-settings">
            <el-popover placement="left" trigger="hover">
              <el-menu class="settingNav" router>
                <el-menu-item index="default">聊天主页</el-menu-item>
                <el-menu-item index="personalSet">个人设置</el-menu-item>
                <el-menu-item index="systemInfo">系统设置</el-menu-item>
                <el-menu-item @click="themeShow = true">主题设置</el-menu-item>
                <el-menu-item index="feedBack">反馈</el-menu-item>
              </el-menu>
              <i class="iconfont icon-xiugai" slot="reference"></i>
            </el-popover>
          </div>

          <!--主题设置弹框-->
          <el-dialog :visible.sync="themeShow" style="margin-top: 20vh" :modal-append-to-body="false">

            <div class="opacity">
              <span>透明度（0.6）</span>
              <div class="block">
                <el-slider v-model="opacityValue" :min="0" :max="1" :step="0.01"></el-slider>
              </div>
            </div>

            <div class="blur">
              <span>毛玻璃效果模糊度（18）</span>
              <div class="block">
                <el-slider v-model="blurValue" :min="0" :max="100" :step="1"></el-slider>
              </div>
            </div>

            <div class="backgroundChosen">
              <span style="margin-bottom: 10px">背景图片</span>
              <div>
                <div class="image-box-btn">
                  <el-radio v-model="picChosen" label="city" border>城市</el-radio>
                  <el-radio v-model="picChosen" label="abstract" border>抽象</el-radio>
                  <el-radio v-model="picChosen" label="coast" border>海岸</el-radio>
                  <el-radio v-model="picChosen" label="others" border>自定义</el-radio>
                </div>
                <div class="image-box">
                  <img src="" alt="" />
                </div>
              </div>
            </div>

            <div class="notification">
              <div class="switch">
                提示音设置
                <el-switch
                  v-model="noSwitch"
                  active-text="开启"
                  active-color="#13ce66"
                  inactive-text="关闭"
                  style="margin-left: 10px">
              </el-switch>
              </div>
              <div class="notification-box-btn">
                <el-radio v-model="noChosen" label="default" border>默认</el-radio>
                <el-radio v-model="noChosen" label="PcQQ" border>PC QQ</el-radio>
                <el-radio v-model="noChosen" label="MobileQQ" border>手机 QQ</el-radio>
                <el-radio v-model="noChosen" label="fun" border>滑稽</el-radio>
                <el-radio v-model="noChosen" label="ios" border>苹果</el-radio>
                <el-radio v-model="noChosen" label="sea" border>海浪</el-radio>
              </div>
            </div>

            <div class="text-color">
              <span>字体颜色（#409EFF）</span>
              <el-color-picker v-model="textColor"></el-color-picker>
            </div>

            <div class="background-color">
              <span>背景颜色（#409EFF）</span>
              <el-color-picker v-model="backgroundColor"></el-color-picker>
            </div>

          </el-dialog>
        </div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'chat-container',
    data() {
      return  {
        // 空消息数据
        empty: true,
        // 主题设置数据
        themeShow: false,
        opacityValue: 0.6,
        blurValue: 18,
        picChosen: 'city',
        noSwitch: true,
        noChosen: 'default',
        textColor: '#409EFF',
        backgroundColor: '#409EFF',
        // 一些聊天用户信息
        name: localStorage.getItem('username'), // 用户名
        head: localStorage.getItem('userImg'), // 用户头像
      }
    },
    methods: {
      errorHandler() {
        return true
      },
      changeSidebar(path) {
        this.$router.push(path);
      },
    }
  }
</script>

<style scoped lang="scss">
  .chat-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: scroll;
    width: 100%;
    height: 100%;
    .chat-box {
      display: flex;
      flex-wrap: nowrap;
      height: 600px;
      width: 1000px;
      opacity: 0.7 ;
      margin-top: 100px;
      background-color: black;
      border-radius: 5px;
      .nav-box {
        border-right: 1px solid #6d6d6d;
        width:60px;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .head-image {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          height: 100px;
          .head-name {
            font-size: 14px;
            width: 40px;
            color: white;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .head-icons {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          height: 160px;
          .el-menu-vertical-demo {
            display: flex;
            flex-wrap: wrap;
            width: 60px;
            height: 160px;
            background-color: black;
            border: none;
            li:hover {
              background-color: #c5c5c5;
              i {
                color: black;
              }
            }
          }
        }
        .head-github {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 20px;
          margin-top: 100px;
          i {
            font-size: 20px;
            color: white;
          }
          &:hover {
            transform: scale(1.1);
          }
        }
        .head-settings {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-top: 100px;
          width: 100%;
          height: 30px;
          i {
            color: white;
          }
        }
      }
      .default-container {
        display: flex;
        width: 939px;
        height: 100%;
      }
    }
    ::v-deep .el-dialog {
      overflow: scroll;
      position: relative;
      margin: 0 auto 50px;
      background: #FFF;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 30%;
      height: 60%;
    }
    .el-radio.is-bordered+.el-radio.is-bordered {
      margin: 0 5px 5px 0;
    }
    .el-radio {
      color: #606266;
      font-weight: 500;
      line-height: 1;
      cursor: pointer;
      white-space: nowrap;
      outline: 0;
      margin-right: 5px;
    }

    .backgroundChosen {
      .image-box-btn {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .el-radio.is-bordered {
          padding: 5px 10px 5px 10px;
          border-radius: 4px;
          border: 1px solid #DCDFE6;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          height: 30px;
        }
      }
    }

    .notification {
      .switch {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .notification-box-btn {
        margin-top: 10px;
      }
      .el-radio.is-bordered {
        padding: 5px 10px 5px 10px;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 30px;
      }
    }

    .text-color, .background-color {
      margin-top: 20px;
      display: flex;
      align-items: center;
    }
  }
</style>
