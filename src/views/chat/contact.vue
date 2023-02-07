<template>
  <div class="contact-container">

    <div class="search-box">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchContent" style="width: 600px; margin-right: 2px"></el-input>
      <el-select v-model="account" placeholder="请选择">
        <el-option
            v-for="item in accounts"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="tag">
      <el-tag style="margin-right: 5px" type="danger">当前搜索条件：</el-tag>
      <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" style="margin-right: 5px">
        {{tag.name}}
      </el-tag>
    </div>

    <div class="search-result">
      <div style="color: white; margin-bottom: 10px; font-size: 14px">一共搜索到1个结果</div>
      <el-card class="person">
        <div class="result-text">ChatId：10000005</div>
        <div class="result-info">
          <img :src="personalImg" alt=""/>
          <span class="name">AJI026</span>
          <el-button type="primary" style="margin-left: 240px" @click="addFriend">+ 添加</el-button>
        </div>
      </el-card>
      <div class="no-more">
        <el-alert title="没有更多了..." type="info" effect="dark"></el-alert>
      </div>
    </div>
    <!--添加好友弹出框-->
    <el-dialog title="附加消息" :visible.sync="addFriendDialog" width="50%" :before-close="handleClose" :modal-append-to-body="false">
      <el-input v-model="extraInfo" placeholder="请输入内容" style="background-color: white"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'contact-container',
    data() {
      return {
        // 输入框数据
        searchContent: '',
        account: '',
        accounts: [{ value: 1, label: 'Chat账号'},{ value: 2, label: '用户昵称'}],
        // 标签数据
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
        ],
        // 添加好友数据
        addFriendDialog: false,
        extraInfo: '',
        personalImg: localStorage.getItem('userImg'), // 用户头像
      }
    },
    methods: {
      // 添加好友弹出框
      addFriend() {
        this.addFriendDialog = !this.addFriendDialog
      },
      // 取消添加
      closeAdd() {
        this.addFriendDialog = false
      },
      // 确认添加
      confirmAdd() {
        this.addFriendDialog = false
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
            .then(() => {
              done();
            })
            .catch((err) => {
              console.log(err)
            });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contact-container {
    width: calc(100% - 61px);
    background-color: black;
    // 搜索框样式
    .search-box {
      margin: 10px 0 20px 2px;
    }
    // 标签样式
    .tag {
      margin: 0 0 20px 2px;
    }
    // 搜索结果样式
    .search-result {
      margin-left: 2px;
      overflow: scroll;
      height: 470px;
      .person {
        width: 500px;
        height: 160px;
        padding: 0 10px 0 10px;
        color: white;
        .el-card__body {
          padding: 0;
        }
        .result-text {
          line-height: 30px;
          height: 30px;
          border-bottom: 1px solid grey;
          font-size: 14px;
        }
        .result-info {
          padding: 10px 0 10px 0;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          border-bottom: 1px solid grey;
          img {
            width: 90px;
          }
          .name {
            margin-left: 20px;
          }
        }
      }
      .no-more {
        width: 523px;
        margin-top: 10px;
      }
    }
    // 组件样式修改
    .el-input__inner {
      -webkit-appearance: none;
      background-color: #252525;
      border-radius: 4px;
      border: 1px solid grey;
      box-sizing: border-box;
      color: white;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
    .el-card {
      border-radius: 4px;
      border: 1px solid grey;
      background-color: #252525;
      overflow: hidden;
      -webkit-transition: .3s;
      transition: .3s;
    }
    .chat-container[data-v-71064116] .el-dialog {
      overflow: scroll;
      position: relative;
      margin: 0 auto 50px;
      background: #FFF;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      box-sizing: border-box;
      width: 30%;
      height: 30%;
    }
  }
</style>
