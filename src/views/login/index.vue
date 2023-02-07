<template>
  <div class="login">
    <!--设置按钮-->
    <!--天气组件-->
    <div class="weather">
      <div id="he-plugin-standard"></div>
    </div>
    <!--登录页-->
    <div class="login-box" v-if="login" style="z-index: 2" ref="loginBox">
      <el-form class="login-form" ref="loginForm" :model="user" :rules="userFormRules">
        <!--用户名-->
        <el-form-item class="name" prop="username">
          <el-input v-model="user.username" placeholder="请输入用户名">
            <i class="el-icon-user-solid" slot="prepend"></i>
          </el-input>
        </el-form-item>
        <!--用户密码-->
        <el-form-item class="code" prop="password">
          <el-input v-model="user.password" placeholder="请输入密码" :type='showCode?"password":"text"' ref="vanish">
            <i class="el-icon-lock" slot="prepend" v-if="showCode" @click="show"></i>
            <i class="el-icon-unlock" slot="prepend" v-else @click="show"></i>
          </el-input>
          <i class="iconfont icon-yanjing-2 eye" v-if="showCode" @click="show"></i>
          <i class="iconfont icon-yanjing eye" v-else @click="show"></i>
        </el-form-item>
        <!--验证码-->
        <el-form-item class="captcha">
          <el-input v-model="captcha" placeholder="验证码" type="text" style="width: 55%"  @keyup.enter.native="onSubmit">
            <i class="el-icon-s-ticket" slot="prepend"></i>
          </el-input>
          <span v-html="captchaImg" @click="refresh" class="captchaImg"></span>
        </el-form-item>
        <!--登录与注册按钮-->
        <el-form-item class="btn">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="success" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--注册页-->
    <div class="register-box" v-else style="z-index: 2;" ref="loginBox">
      <el-form class="register-form" :model="user" :rules="userFormRules" ref="registerForm">
        <!--新的用户名-->
        <el-form-item class="nName" prop="username" label="用户名：">
          <el-input v-model="user.username" placeholder="请输入新的用户名">
            <i class="el-icon-user-solid" slot="prepend"></i>
          </el-input>
        </el-form-item>
        <!--新的密码-->
        <el-form-item class="nCode" prop="password" label="密码：">
          <el-input v-model="user.password" placeholder="请输入新的密码" :type='showCode?"password":"text"' ref="vanish">
            <i class="el-icon-lock" slot="prepend"></i>
          </el-input>
          <i class="iconfont icon-yanjing-2 eye" v-if="showCode" @click="show"></i>
          <i class="iconfont icon-yanjing eye" v-else @click="show"></i>
        </el-form-item>
        <!--确认密码-->
        <div></div>
        <el-form-item class="cCode" prop="confirm" label="确认密码：">
          <el-input v-model="user.confirm" placeholder="请再次输入密码" :type='showCode?"password":"text"' ref="vanish" @keyup.enter.native="onRegister">
            <i class="el-icon-lock" slot="prepend"></i>
          </el-input>
          <i class="iconfont icon-yanjing-2 eye" v-if="showCode" @click="show"></i>
          <i class="iconfont icon-yanjing eye" v-else @click="show"></i>
        </el-form-item>
        <!--取消与注册按钮-->
        <el-form-item class="btn">
          <el-button type="info" @click="cancel">取消</el-button>
          <el-button type="success" @click="onRegister">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--视频背景-->
<!--    <div class="videoContainer">-->
<!--      <video id="bgVid" autoplay muted loop>-->
<!--        <source src="../../assets/login.mp4" type="video/mp4">-->
<!--      </video>-->
<!--    </div>-->
<!--    <div id="d1">-->
<!--      <audio id="a1" controls autoplay loop>-->
<!--        <source src="../../assets/login.mp3">-->
<!--      </audio>-->
<!--    </div>-->
    <!-- 底部波浪-->
    <waveComponent></waveComponent>
  </div>
</template>`s

<script>
import waveComponent from '@/components/wave/index';
import {codeImg, login, register} from '@/api'

export default {
  name: 'login-container',
  components: {
    waveComponent,
  },
  data() {
    return {
      // 登录用户数据
      user: {
        username: '',
        password: '',
        confirm: '',
      },
      // 用户表单规则
      userFormRules: {
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'},{min:2,max:10,message: '长度在 2 到 10 个字符', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'},{min:6,max:10,message: '长度在 6 到 10 个字符', trigger: 'blur'}],
        // 确认密码
        confirm: [{required: true, message: '请再次输入密码', trigger: 'blur'}, {
          // 两次密码是否一致逻辑
          validator:(rule,value,callback) => {
            if(value === '') {
              callback(new Error('请再次输入密码'))
            }else if(this.user.confirm !== this.user.password) {
              callback(new Error('两次输入密码不一致'))
            }else {
              callback()
            }
          }
        }]
      },
      // 控制密码的显示
      showCode: true,
      // 控制登录页和注册页的显示
      login: true,
      // 用户输入的验证码
      captcha: '',
      // 验证码svg
      captchaImg: '',
      // 验证码字母
      captchaId: '',
    }
  },
  methods: {
    // 控制显示或者隐藏密码
    show() {
      this.showCode = !this.showCode;
    },
    // 跳转注册页
    register() {
      this.login = false;
      // 点击注册后清除表单错误提示，否则注册登录会同时出现错误提示
      this.$refs.loginForm.clearValidate('username')
      this.$refs.loginForm.clearValidate('password')
    },
    // 取消注册
    cancel() {
      // 清除表单数据
      // 跳回登录页
      this.login = true;
      // 点击取消后清除表单错误提示，否则注册登录会同时出现错误提示
      this.$refs.registerForm.clearValidate('username')
      this.$refs.registerForm.clearValidate('password')
    },
    // 登录功能，需要用到异步
    async onSubmit() {
      try {
        const { data } = await login(this.user);
        if(this.captcha.toLowerCase() === this.captchaId.toLowerCase()) {
          // 存储用户信息到vuex
          let userVuex = {
            username: data.user.username,
            userImg: data.user.userImg,
            userId: data.user.userId,
          }
          localStorage.setItem('userImg',  data.user.userImg)
          localStorage.setItem('username',  data.user.username)
          localStorage.setItem('userId',  data.user.userId)
          await this.$store.dispatch('saveUserInfo', userVuex)
          this.$store.commit('setToken', data.token)
          this.$store.commit('setRefreshToken', data.refresh_token)
          // 把你自己的聊天信息存入vuex(这里分开写只是为了区分一下)
          this.$store.commit('setYouInfo', {name: data.user.username, img: data.user.userImg})
          // 连接socket
          this.$socket.connect()
          this.$socket.emit('onSubmit', {name:data.user.username, img:data.user.userImg, active: true}, (result) => {
            // 这里result回调函数是返回服务端的东西，用户已在登录状态就返回false，反之true
            if(result === true) {
              this.$message({
                type: 'success',
                message: '登录成功',
                duration: '1000'
              })
              this.$router.push('/begin');
            } else {
              this.$message({
                type: 'error',
                message: '用户已在登录状态',
                duration: '1000'
              })
            }
          })
        }else {
          this.$message.error('验证码错误')
          this.captcha = ""
          this.refresh()
        }
      }catch (err) {
        this.$message.error('用户不存在')
        this.captcha = ""
        this.user.username = ""
        this.user.password = ""
        this.refresh()
      }
    },
    // 注册功能
    async onRegister() {
      try {
        await register({
          username: this.user.username,
          password: this.user.password
        }).then((data) => {
          console.log(data)
          this.$refs.registerForm.validate((valid) => {
            if(valid) {
              this.login = true
              this.$message.info('请重新登录')
            }else {
              this.$message.error('注册不成功')
            }
          })
        })
      }catch (err) {
        console.log(err)
      }

    },
    // 请求验证码
    async getCaptcha() {
      const { data } = await codeImg()
      this.captchaImg = data.captchaImg
      this.captchaId = data.captchaId
    },
    // 点击图片刷新验证码
    refresh() {
      this.getCaptcha()
    },
    // 屏幕宽度变化，样式改变
    selfAdaption () {
      setTimeout(function () {
        let w = document.documentElement.offsetWidth || document.body.offsetWidth
        if(w <= 710) {
          console.log('1')
        }
      },2000)
    }
  },
  created() {
    // 和风天气插件调用
    window.WIDGET = {
      "CONFIG": {
        "layout": "2",
        "width": 230,
        "height": 270,
        "background": "4",
        "dataColor": "FF9900",
        "backgroundColor": "FFF2CC",
        "language": "zh",
        "borderRadius": "5",
        "key": "3820b1ebea5c4994960b41af3ad30b55"
      }
    };
    (function (d) {
      let c = d.createElement('link')
      c.rel = 'stylesheet'
      c.href = 'https://widget.qweather.net/standard/static/css/he-standard.css?v=1.4.0'
      let s = d.createElement('script')
      s.src = 'https://widget.qweather.net/standard/static/js/he-standard.js?v=1.4.0'
      let sn = d.getElementsByTagName('script')[0]
      sn.parentNode.insertBefore(c, sn)
      sn.parentNode.insertBefore(s, sn)
    })(document)
    this.getCaptcha()
  },
  mounted() {
    this.selfAdaption()
  }
}

</script>

<style lang="scss" scoped>
  * {
    padding: 0;
    margin: 0;
  }
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 384px;
    position: relative;
    //登录盒子样式
    .login-box {
      width: 280px;
      height: 360px;
      display: flex;
      position: absolute;
      left: 60%;
      background-color: rgba(255, 255, 255, .3);
      border-radius: 30px;
      .login-form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        i {
          display: flex;
          justify-content: center;
          font-size: 10px;
          width: 5px;
          cursor: pointer;
        }
        .name, .code, .captcha{
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .name {
          margin-top: 30%;
        }
        .code .eye{
          display: flex;
          position: absolute;
          top: 0;
          left: 90%;
        }
        .captcha .captchaImg{
          display: flex;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 60%;
          margin-left: 5px;
        }
        .btn {
          display: flex;
          margin-bottom: 5%;
          .el-form-item__content button {
            width: 40px;
            height: 24px;
          }
        }
      }
    }
    //注册盒子样式
    .register-box {
      width: 360px;
      height: 360px;
      display: flex;
      position: absolute;
      left: 55%;
      flex-wrap: wrap;
      background-color: rgba(255, 255, 255, .3);
      border-radius: 30px;
      .register-form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        .nName, .nCode, .cCode{
          display: flex;
          width: 100%;
          justify-content: center;
        }
        i {
          display: flex;
          justify-content: center;
          font-size: 10px;
          width: 5px;
          cursor: pointer;
        }
        .nName {
          margin-top: 20%;
        }
        .nCode .eye{
          display: flex;
          position: absolute;
          top: 0;
          left: 90%;
        }
        .cCode .eye{
          display: flex;
          position: absolute;
          top: 0;
          left: 90%;
        }
        .btn {
          display: flex;
          margin-bottom: 5%;
          .el-form-item__content button {
            width: 40px;
            height: 24px;
          }
        }
      }
    }
  }

  .videoContainer{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -100;
    #bgVid {
      width: 100vw;
    }
  }
  #d1{
    opacity: 0.5;
    position: absolute;
    bottom: 100px;
    right: 0;
    z-index: 20;
  }

  .weather {
    z-index: 999;
    position: absolute;
    width: 20%;
    height: auto;
    left: 10px;
    top: 10px;
  }

</style>
