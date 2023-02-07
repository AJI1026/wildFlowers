<template>
    <div class="self-container">
      <div class="main-box">
        <!--左边个人信息-->
        <div class="left-box">
          <div v-if="edit">
            <div class="head-image">
              <el-avatar :size="300" @error="errorHandler">
                <img :src="profileImg" alt="image loading..."/>
              </el-avatar>
            </div>
            <div class="head-name">
              AJI1026
            </div>
            <div class="head-btn">
              <button @click="editFile">Edit profile</button>
            </div>
            <div class="head-follow">
              <i class="iconfont icon-guanzhuyonghuguanli"></i>
              <span class="num">0 <span class="text">followers</span></span>
              <span class="divide"> | </span>
              <span class="num">1 <span class="text">following</span></span>
            </div>
            <div class="head-school">
              <i class="iconfont icon-xialingyingicon-40"></i>
              George Mason University
            </div>
          </div>
          <div v-else>
            <div class="head-image">
              <el-avatar :size="300" @error="errorHandler">
                <img :src="profileImg" alt="image loading..."/>
              </el-avatar>
            </div>
            <el-form class="info-modify">
              <!--姓名-->
              <el-form-item class="info-name">
                <p>Name</p>
                <el-input></el-input>
              </el-form-item>
              <!--箴言-->
              <el-form-item class="bio">
                <p>Bio</p>
                <textarea placeholder="Add a bio"></textarea>
              </el-form-item>
              <p style="font-size: 12px; color: wheat;margin-top: -20px">
                You can @mention other users and organizations to link to them
              </p>
              <!--学校-->
              <el-form-item class="school" label-width="20px">
                <div style="width: 30px; height: 30px;box-sizing: border-box" slot="label">
                  <i class="iconfont icon-xialingyingicon-40"></i>
                </div>
                <el-input placeholder="School"></el-input>
              </el-form-item>
              <!--按钮-->
              <el-form-item class="info-btn">
                <el-button type="success" size="mini">确认</el-button>
                <el-button type="info" size="mini" @click="cancelModify">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!--文章、笔记、热力图-->
        <div class="right-box">

        </div>
        <!--时间线-->
        <div class="time-line">
          <time-line></time-line>
        </div>
      </div>

    </div>
</template>

<script>
  import timeLine from '@/components/timeLine/index'

  export default {
    name: 'self-container',
    components: {
      timeLine
    },
    data() {
      return{
        profileImg: localStorage.getItem('userImg'), // 头像
        edit: false, // 控制修改面板显示
        gif: {url: require('../../assets/scroll.gif')}
      }
    },
    methods: {
      errorHandler() {
        return true
      },
      // 修改个人信息
      editFile() {
        this.edit = !this.edit
      },
      // 取消修改
      cancelModify() {
        this.edit = !this.edit
      }
    },
    created() {
    }
  }
</script>

<style lang="scss">
  .self-container {
    width: 100%;
    height: 100%;
    overflow: scroll;
    .main-box {
      display: flex;
      width: 100%;
      height: 100%;
      margin-top: 70px;
      .left-box {
        box-sizing: border-box;
        padding-left: 20px;
        padding-right: 20px;
        width: 320px;
        height: 600px;
        .head-image {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .head-name {
          display: flex;
          justify-content: center;
          color: black;
          margin-top: 20px;
          font-size: 22px;
        }
        .head-btn {
          display: flex;
          justify-content: center;
          margin-top: 14px;
          button {
            height: 30px;
            width: 300px;
            border-radius: 6px;
            color: black;
            background-color: white;
            border: 1px solid grey;
            cursor: pointer;
            &:hover {
              border: 1px solid black;
            }
          }
        }
        .head-follow {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 14px;
          .divide {
            margin: 0 10px 0 10px;
            color: black;
          }
          .num {
            color: #ff0562;
          }
          .text {
            color: black;
          }
        }
        .head-school {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 28px;
          color: black;
          i {
            font-size: 20px;
          }
        }
        // 修改面板样式
        .info-modify {
          height: 360px;
          .info-name {
            p {
              display: flex;
              align-items: center;
              height: 20px;
              font-size: 14px;
              color: white;
            }
          }
          .bio {
            margin-top: -20px;
            height: 100px;
            p {
              display: flex;
              align-items: center;
              height: 20px;
              font-size: 14px;
              color: white;
            }
            textarea {
              width: 100%;
              height: 80px;
            }
          }
          .school {
            i {
              font-size: 20px;
              color: white;
            }
          }
          .info-btn {
            display: flex;
            justify-content: center;
            margin-top: -20px;
          }
        }
      }
      .right-box {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        justify-content: center;
        margin-right: 20px;
      }
      .time-line {
        box-sizing: border-box;
        padding-right: 20px;
        width: 320px;
        height: 100%;
      }
    }
  }
</style>
