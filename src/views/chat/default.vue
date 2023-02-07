<template>
  <div class="default-container">
    <!--中部联系人-->
    <div class="contact-box">
        <!--搜索部分-->
        <div class="search">
          <el-input type="text" placeholder="请输入搜索内容" v-model="keyword"></el-input>
        </div>
        <!--每日任务部分-->
        <div class="toDoList">
          <i class="el-icon-circle-check"></i>
          <span>今日待办：0</span>
        </div>
        <div class="tab">
          <el-tabs v-model="activeName" type="card">
            <!--信息部分-->
            <el-tab-pane name="message">
              <i class="iconfont icon-xiaoxi" slot="label" style="font-size: 20px"></i>
              <el-card class="message-box">
                <!--空的聊天界面-->
                <div class="empty-message" v-if="empty">
                  <img src="../../assets/xiaoxi.png" alt=""/>
                  <div class="empty-text">No Message</div>
                </div>
                <div class="message" v-else></div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane name="friend">
              <i class="iconfont icon-biaoqing" slot="label" style="font-size: 20px"></i>
              <el-card class="friend-box">
                <div class="friend-search">
                  <input class="friend-input" placeholder="请输入分组名"/>
                  <el-button type="success" class="friend-btn">添加</el-button>
                </div>
                <!--好友部分-->
                <el-collapse class="friend" value="create">
                  <el-collapse-item title="聊天列表（0/4）" name="create">
                    <el-table :data="friendsList.filter(data => (!keyword||(data.name.toLowerCase().includes(keyword.toLowerCase())))
                              && !(data.name.toLowerCase().includes(youInfo.name.toLowerCase())))"
                              stripe class="friend-image" :show-header="false" @cell-click="openChat">
                      <el-table-column>
                        <template slot-scope="scope">
                          <el-avatar :size="50" fit="cover" :src="scope.row.img"></el-avatar>
                          <span style="margin-left: 10px; width: 110px">{{scope.row.name}}</span>
                          <span v-if="active" style="margin-left: 5px;color: #33ff33;">在线</span>
                          <span v-else style="margin-left: 60px;color: #a91414">离线</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                </el-collapse>
              </el-card>
            </el-tab-pane>
            <!--群聊部分-->
            <el-tab-pane name="group">
              <i class="iconfont icon-guanzhuyonghuguanli" slot="label" style="font-size: 20px"></i>
              <el-card class="group-box">
                <el-collapse class="group">
                  <el-collapse-item title="我创建的群聊（0）" name="create"></el-collapse-item>
                  <el-collapse-item title="我管理的群聊（0）" name="manage"></el-collapse-item>
                  <el-collapse-item title="我加入的群聊（0）" name="joined"></el-collapse-item>
                </el-collapse>
                <!--创建群聊-->
                <div class="add-btn">
                  <i class="iconfont icon-jiahaodefuben" @click="createGroup"></i>
                </div>
                <!--群聊表单-->
                <el-dialog
                    title="创建群聊"
                    :visible.sync="newGroupForm"
                    width="30%"
                    :modal-append-to-body="false">
                  <el-form :model="newGroupData" :rules="newGroupRules" label-width="65px" ref="newGroupData">
                    <el-form-item label="群头像" prop="GroupImg" ref="uploadElement">
                      <el-input v-model="newGroupData.GroupImg" v-if="false"></el-input>
                      <el-upload
                          class="avatar-uploader"
                          ref="upload"
                          :show-file-list="false"
                          action="#"
                          :before-upload="beforeAvatarUpload"
                          :on-success="handleAvatarSuccess"
                          :data="newGroupData">
                        <img v-if="newGroupData.GroupImg" :src="newGroupData.GroupImg" class="avatar" alt="">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="群名称" prop="GroupName">
                      <el-input v-model="newGroupData.GroupName"></el-input>
                    </el-form-item>
                    <el-form-item label="群描述">
                      <el-input v-model="newGroupData.GroupDescription"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary">立即创建</el-button>
                      <el-button>重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    <!--右边聊天窗口-->
    <div class="chatting-box">
      <img src="../../assets/呼叫，手机.png" alt="" class="chatting-empty" v-if="emptyChat"/>
      <div v-else class="chatUI">
        <div class="head">
          <span class="name">{{friendInfo.name}}</span>
          <span><i class="iconfont icon-gengduo"></i></span>
          <span><i class="iconfont icon-a-24gl-phoneLoudspeaker"></i></span>
          <span><i class="iconfont icon-shexiangji"></i></span>
          <span><i class="iconfont icon-tv-full"></i></span>
        </div>

        <div class="main">
          <span class="no-message">没有更多了~</span>
          <!--有聊天记录：循环聊天记录-->
          <div v-for="(list, index) in chatMessageList" :key="index">
            <!--循环显示聊天记录-->
            <div v-if="(list.receiver === friendInfo.name)&&friendInfo.name === '默认群聊'">
              <div :class="list.type === 'you' ? 'right' : 'left'">
                <div :class="list.type === 'you' ? 'right-image' : 'left-image'">
                  <div :class="list.type === 'you' ? 'right-image' : 'left-image'">
                    <div v-if="list.type==='you'" class="time" style="margin-right: 5px">{{list.time}} YOU</div>
                    <el-avatar :size="40" v-if="list.type==='you'" :src="list.senderImg"></el-avatar>
                    <el-avatar :size="40" v-if="list.type==='friend'" :src="list.senderImg"></el-avatar>
                    <div v-if="list.type==='friend'" class="time" style="margin-left: 5px"> {{list.time}} </div>
                  </div>
                </div>
                <div :class="list.type === 'you' ? 'RightmsgBoxOut' : 'LeftmsgBoxOut'">{{list.msg}}</div>
              </div>
            </div>
            <div v-else>
              <div v-if="((list.receiver === youInfo.name)&&(list.sender === friendInfo.name))||((list.receiver === friendInfo.name)&&(list.sender === youInfo.name))">
                <div :class="list.type === 'you' ? 'right' : 'left'">
                  <div :class="list.type === 'you' ? 'right-image' : 'left-image'">
                    <div v-if="list.type==='you'" class="time" style="margin-right: 5px">{{list.time}} YOU</div>
                    <el-avatar :size="40" v-if="list.type==='you'" :src="list.senderImg"></el-avatar>
                    <el-avatar :size="40" v-if="list.type==='friend'" :src="list.senderImg"></el-avatar>
                    <div v-if="list.type==='friend'" class="time" style="margin-left: 5px"> {{list.receiver}} {{list.time}} </div>
                  </div>
                  <div :class="list.type === 'you' ? 'RightmsgBoxOut' : 'LeftmsgBoxOut'">{{list.msg}}</div>
                </div>
              </div>
            </div>
        </div>
        </div>

        <div class="bottom">
          <div class="function">
            <i class="iconfont icon-biaoqing"></i>
            <i class="iconfont icon-a-xiangcezhaopian-m"></i>
            <i class="iconfont icon-wenjianjia"></i>
            <i class="iconfont icon-tv-full"></i>
            <i class="iconfont icon-shexiangji"></i>
            <i class="iconfont icon-a-24gl-phoneLoudspeaker"></i>
            <span>
              <i class="iconfont icon-shangjiantou"></i>
              历史记录
            </span>
          </div>
          <div class="info-box">
            <el-input v-model="uu" class="msg"></el-input>
            <div class="btn">
              <el-button type="success" size="mini" round @click="send">发送</el-button>
              <el-button type="danger" size="mini" round>清空</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'default-container',
  data() {
    return {
      keyword: '', // 头部搜素框绑定数据
      activeName: 'friend', // 默认选择消息展示
      empty: true, // 空消息数据
      active: true, // 好友状态
      msgList:[], // 聊天数据
      emptyChat: true, // 聊天界面
      head: localStorage.getItem('userImg'), // 用户头像
      // 群聊数据
      newGroupForm: false,
      newGroupData: {
        GroupImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        GroupName: '',
        GroupDescription: ''
      },
      newGroupRules: {
        GroupImg: [
          { required: true, message: '请选择图片', trigger: 'blur'}
        ],
        GroupName: [
          { required: true, message: '请输入群名称', trigger: 'blur'},
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },
      uu: '', // 提交的聊天数据
    }
  },
  methods: {
    // 开启聊天界面
    openChat(row) {
      if(row.name === '默认群聊'){
        this.$store.commit('changeChatType','group');
      }else{
        this.$store.commit('changeChatType','private');
      }
      this.$store.commit('setChatInfo', {name:row.name, img:row.img})
      this.$store.commit('setYouInfo', {name:localStorage.getItem('username'), img:localStorage.getItem('userImg')})
      this.emptyChat = false
    },
    // 创建群聊
    createGroup() {
      this.newGroupForm = true
    },
    // 图片上传函数
    handleAvatarSuccess(res, file) {
      this.newGroupData.GroupImg = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt10M;
    },
    // 发送消息
    send() {
      // 先判断是群聊还是私聊
      if(this.chatType === 'group'){
        let data = {
          type:'you',
          sender: this.youInfo.name, // 发送者id
          senderImg: this.youInfo.img, // 发送者的img
          receiver: "默认群聊", // 接收方id
          time: this.getCurrentTime(), // 获取日期与时间
          msg: this.uu, // 消息内容
        }
        this.$socket.emit('groupChat', data);
        this.$store.commit('SOCKET_updateChatMessageList', data)
      }else{
        let data = {
          type:'you',
          sender: this.youInfo.name, // 发送者id
          senderImg: this.youInfo.img, // 发送者的img
          receiver: this.friendInfo.name, // 接收方id
          time: this.getCurrentTime(), // 获取日期与时间
          msg: this.uu, // 消息内容
        }
        this.$socket.emit('privateChat', data);
        // 把自己的信息直接push到数组中
        this.$store.commit('SOCKET_updateChatMessageList', data)
      }
      // 清空
      this.uu = '';
    },
    // 获取当前时间
    getCurrentTime() {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      return yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
    }
  },
  computed: {
    // 聊天对象数据存入Vuex
    friendInfo() {
      return this.$store.state.friendInfo
    },
    // 你的信息
    youInfo() {
      return this.$store.state.youInfo
    },
    // 判断用户是否登录
    isLogin() {
      return this.$store.state.isLogin
    },
    // 好友列表数据
    friendsList() {
      return this.$store.state.userList
    },
    // 聊天类型
    chatType() {
      return this.$store.state.chatType
    },
    chatMessageList() {
      return this.$store.state.chatMessageList
    }
  },
  created() {

  }
}
</script>

<style lang="scss">
  .contact-box {
    padding: 10px;
    width: 227px;
    height: 580px;
    border-right: 1px solid #6d6d6d;
    .search {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .toDoList {
      display: flex;
      align-items: center;
      background-color: #282828;
      border-radius: 5px;
      margin-top: 10px;
      width: 100%;
      height: 30px;
      border: none;
      i, span {
        margin-left: 5px;
        color: white;
      }
      span {
        font-size: 8px;
      }
    }
    .tab {
      margin-top: 10px;
      width: 100%;
      .el-tab-pane {
        max-height: 443px;
      }
      .el-tabs__item {
        width: 75px;
      }
      .el-tabs__item .is-top .is-active {
        border-bottom: none;
      }
      .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: 1px solid #6d6d6d;
      }
      .el-tabs--card>.el-tabs__header .el-tabs__item {
        text-align: center;
        border-left: none;
      }
      .el-tabs--card>.el-tabs__header {
        border-bottom: 1px solid #6d6d6d;
      }
      .message-box,.friend-box,.el-card__body {
        background-color: black;
        height: 445px;
        border: 1px solid #6d6d6d;
      }
      .el-collapse-item__header {
        background-color: black;
        border-bottom: 1px solid #6d6d6d;
        color: white;
        padding-left: 5px;
      }
      .el-collapse-item__wrap {
        border-bottom: none;
        background-color: black;
        div {
          color: grey;
        }
      }
      .el-card__body {
        padding: 0;
        overflow: scroll;
      }
      .group-box,.el-card__body {
        background-color: black;
        height: 445px;
        border: none;
      }
      .group-box {
        position: relative;
        .add-btn {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          height: 26px;
          i {
            cursor: pointer;
            color: #00d0ff;
            font-size: 20px;
            margin: 10px;
            &:hover {
              transform: scale(1.1);
            }
          }
        }
        .el-card .group-box .is-always-shadow {
          border: 1px solid #6d6d6d;
        }
      }
      .message-box {
        .empty-message {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 445px;
          img {
            width: 100px;
            opacity: 0.7;
            margin-top: 160px;
          }
          .empty-text {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-bottom: 160px;
          }
        }
      }
      .friend-search {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        border-bottom: 1px solid #6d6d6d;
        .friend-input {
          width: 200px;
          height: 20px;
          border: 1px solid #6d6d6d;
          border-radius: 5px;
          background-color: black;
          padding: 5px;
          font-size: 10px;
          color: white;
        }
        .friend-btn {
          border: 1px solid white;
          transform: scale(0.7);
        }
      }
      .el-table--enable-row-transition .el-table__body td.el-table__cell {
        padding: 0;
        background-color: black;
        cursor: pointer;
        &:hover {
          background-color: #33373f;
        }
      }
      .cell {
        display: flex;
        height: 60px;
        align-items: center;
        color: white !important;
      }
      .el-collapse {
        border-top: none;
      }
      .el-avatar>img {
        display: block;
        height: 100%;
        vertical-align: middle;
        opacity: 1 !important;
      }
    }
  }
  .contact-box .tab .el-collapse-item__header {
    background-color: black;
    border-bottom: 1px solid #6d6d6d;
    color: white;
    padding-left: 5px;
  }
  .chatting-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 713px;
    height: 100%;
    .chatting-empty {
      width: 160px;
      opacity: 0.7;
    }
    .chatUI {
      width: 100%;
      height: 100%;
      .head {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #252525;
        .name {
          color: white;
          margin-left: 20px;
        }
        i {
          float: right;
          margin-right: 20px;
          color: white;
          font-size: 20px;
        }
      }
      .main {
        border-bottom: 1px solid #252525;
        height: 420px;
        text-align: center;
        overflow: scroll;
        box-sizing: border-box;
        padding-bottom: 20px;
        .no-message {
          color: #252525;
          font-size: 12px;
        }
        // 消息框样式
        // 你发送的消息样式
        .right {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          .right-image {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 100%;
            padding: 5px;
            cursor: pointer;
            .time {
              color: white;
              font-size: 12px;
            }
          }
          .RightmsgBoxOut {
            display: inline-block;
            min-width: 20px;
            margin-top: 2%;
            padding:5px 8px;
            border-radius: 5px;
            background-color: #5a64c1;
            width: auto;
            max-width: 500px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0;
            color: #e9e9e9;
            position: relative;
            margin-right: 50px;
          }
          .RightmsgBoxOut::before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            right:12px;
            top:-18px;
            border: 10px solid;
            border-color: transparent  transparent #5a64c1 transparent ;
          }
          .RightmsgBoxOut::after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            right:12px;
            top:-18px;
            border: 10px solid;
            border-color: transparent  transparent #5a64c1 transparent ;
          }
        }
        // 你朋友发送的消息样式
        .left {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          .left-image {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            padding: 5px;
            cursor: pointer;
            .time {
              color: white;
              font-size: 12px;
            }
          }
          .LeftmsgBoxOut {
            display: inline-block;
            min-width: 20px;
            margin-top: 2%;
            padding:5px 8px;
            border-radius: 5px;
            background-color: #5a64c1;
            width: auto;
            max-width: 500px;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0;
            color: #e9e9e9;
            position: relative;
            margin-left: 50px;
          }
          .LeftmsgBoxOut::before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            left:10px;
            top:-18px;
            border: 10px solid;
            border-color: transparent  transparent #5a64c1 transparent ;
          }
          .LeftmsgBoxOut::after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            left:10px;
            top:-18px;
            border: 10px solid;
            border-color: transparent  transparent #5a64c1 transparent ;
          }
        }
      }
      .bottom {
        height: 137px;
        .function {
          height: 20px;
          line-height: 20px;
          i {
            color: white;
            font-size: 20px;
            margin-left: 10px;
          }
          span {
            line-height: 20px;
            margin-right: 5px;
            i {
              font-size: 2px;
            }
            font-size: 12px;
            float: right;
            color: white;
          }
        }
        .info-box {
          overflow-y: scroll;
          height: 117px;
          position: relative;
          .msg {
            width: 100%;
            height: 100%;
            background-color: black;
            color: white;
            border: none;
            .el-input__inner {
              width: 100%;
              height: 100%;
              background-color: black;
              color: white;
              border: none;
              overflow: scroll;
            }
          }
          .btn {
            position: absolute;
            bottom: 5px;
            left: 564px;
          }
        }
      }
    }
  }

  // 上传功能样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
