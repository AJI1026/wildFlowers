<template>
  <div class="personalSet-container">
    <div class="personalSet-box">
      <el-card class="personalSet">
        <div class="head-info">
          <div class="image">
            <img :src="personalImg" alt=""/>
          </div>
          <div class="text">
            <span class="messageId">ChatId：100000005</span>
            <span class="accountName">账户名：test</span>
            <span class="registerTime">注册时间：2021-01-19</span>
            <span class="loginTime">登录时间：2021-01-19</span>
          </div>
        </div>
        <div class="setting-choice">
          <el-tabs v-model="activeName">
            <el-tab-pane label="个人资料" name="personalInformation">
              <div class="box">
                <span class="property">昵称</span>
                <span>AJI1026</span>
                <el-button style="float: right; padding: 3px 0; margin-top: 20px" type="text">修改</el-button>
              </div>
              <div class="box">
                <span class="property">年龄</span>
                <span>24</span>
                <el-button style="float: right; padding: 3px 0; margin-top: 20px" type="text">修改</el-button>
              </div>
              <div class="box">
                <span class="property">Email</span>
                <span>878705727@qq.com</span>
                <el-button style="float: right; padding: 3px 0; margin-top: 20px" type="text">修改</el-button>
              </div>
              <div class="box">
                <span class="property">性别</span>
                <span>
                  <el-radio-group v-model="sex" size="mini">
                    <el-radio-button label="男"></el-radio-button>
                    <el-radio-button label="女"></el-radio-button>
                    <el-radio-button label="保密"></el-radio-button>
                  </el-radio-group>
                </span>
                <el-button style="float: right; padding: 3px 0; margin-top: 20px" type="text">修改</el-button>
              </div>
              <div class="box">
                <span class="property">个性签名</span>
                <span>Who dares... Win</span>
                <el-button style="float: right; padding: 3px 0; margin-top: 20px" type="text">修改</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="密码设置" name="codeSetting">
              <div class="box">
                <span class="property">旧密码</span>
                <span>请输入原始密码</span>
              </div>
              <div class="box">
                <span class="property">新密码</span>
                <span>请输入新密码</span>
              </div>
              <div class="box">
                <span class="property">确认新密码</span>
                <span>请确认新密码</span>
              </div>
              <div class="box btn">
                <el-button type="primary" size="mini" style="margin-left: 500px">确认</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'personalSet-container',
    data() {
      return {
        activeName: 'personalInformation',
        sex: '男', // 性别数据
        personalImg: localStorage.getItem('userImg'), // 个人头像
      }
    }
  }
</script>

<style lang="scss">
  .personalSet-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 61px);
    .personalSet-box {
      margin: 10px;
      width: 600px;
      height: 575px;
      .personalSet {
        width: 100%;
        height: 100%;
        background-color: #252525;
        border: 1px solid #252525;
        color: white;
        .head-info {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100px;
          .image {
            img {
              width: 90px;
            }
          }
          .text {
            opacity: 0.7;
            margin-left: 20px;
            width: 200px;
            display: flex;
            flex-wrap: wrap;
            color: white;
            font-size: 14px;
            span {
              width: 100%;
            }
          }
        }
        .setting-choice {
          .el-tabs__item {
            color: #409EFF;
          }
          .el-tabs__header {
            margin: 0;
          }
          .box {
            border-bottom: 1px solid grey;
            width: 100%;
            height: 60px;
            line-height: 60px;
            font-size: 13px;
            .property {
              display: inline-block;
              width: 100px;
            }
          }
          .btn {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
