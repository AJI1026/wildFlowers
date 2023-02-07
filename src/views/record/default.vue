<template>
  <div class="default-container">'
    <div class="basic-info">
      <div class="article-time">
        <span class="time" style="margin-left: 5px">
          <i class="iconfont icon-shizhong"></i>
          {{createTime}}
        </span>
        <span class="time">
          <i class="iconfont icon-jurassic_user"></i>
          {{createUser}}
        </span>
        <span class="time">
          <i class="iconfont icon-a-24gf-eye2"></i>
          {{readingTimes}}
        </span>
        <span class="code">
          <i class="iconfont icon-settings"></i>
          前端代码
        </span>
      </div>
    </div>
    <div class="markdown-body">
      <el-card class="content" :style="{ backgroundImage: `url(${noteCoverImg})`}">
        <div class="this"></div>
      </el-card>
    </div>
    <!--评论-->
    <el-card class="commend">
      <h3>发表评论</h3>
      <form class="commend-form">
        <el-input
            id="input"
            type="textarea"
            :rows="2"
            placeholder="说点什么呢``"
            v-model="text"
            :autosize="{ minRows: 2, maxRows: 6}"
        >
        </el-input>
        <el-button type="text" size="medium" class="Commend" @click="confirmCommend">发布</el-button>
        <el-button type="text" size="medium" class="Commend" @click="cancelCommend">清空</el-button>
        <el-button type="text" size="medium" @click="showEmoji = !showEmoji">😃</el-button>
      </form>
      <VEmojiPicker @select="selectEmoji" style="width: 100%;" v-show="showEmoji"/>
    </el-card>
    <!--留白-->
    <div class="blank"></div>
  </div>
</template>

<script>
import { detail, noteWho, newCommend } from '@/api'
import { VEmojiPicker } from 'v-emoji-picker';

export default {
  name: 'default-container',
  components: {
    VEmojiPicker
  },
  data() {
    return {
      noteId: this.$route.params && this.$route.params.id,
      noteCoverImg: '',
      isRespond: true,
      // 评论部分数据
      text: '',
      showEmoji: true,
      createTime: '', // 笔记创建时间
      createUser: '', // 笔记创建用户
      readingTimes: '', // 笔记阅读次数
      createImg: '', // 评论头像
    }
  },
  methods:{
    // 获取笔记详情数据
    async getContent() {
      // 处理导航回去时无id请求数据的情况
      if(this.noteId === undefined) {
        this.noteId = localStorage.getItem('nowNoteId')
        let thisNoteDetail = await detail(this.noteId)
        let MD = document.querySelector('.this')
        MD.innerHTML = thisNoteDetail.data.detailData.noteContent
        this.noteCoverImg  = thisNoteDetail.data.detailData.noteCoverImg
        this.createTime = thisNoteDetail.data.detailData.noteCreateTime
        this.readingTimes = thisNoteDetail.data.detailData.noteReading
        noteWho(localStorage.getItem('whoseId')).then((data) => {
          this.createImg = data.data.who.userImg
          this.createUser = data.data.who.username
        }).catch(err => {
          console.log(err)
        })
      } else {
        let MD = document.querySelector('.this')
        let thisNoteDetail = await detail(this.noteId)
        MD.innerHTML = thisNoteDetail.data.detailData.noteContent
        localStorage.setItem('nowNoteId', this.noteId)
        this.noteCoverImg  = thisNoteDetail.data.detailData.noteCoverImg
        this.createTime = thisNoteDetail.data.detailData.noteCreateTime
        this.readingTimes = thisNoteDetail.data.detailData.noteReading
        noteWho(localStorage.getItem('whoseId')).then((data) => {
          this.createImg = data.data.who.userImg
          this.createUser = data.data.who.username
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 表情选取
    selectEmoji(emoji) {
      let input = document.getElementById("input")
      let startPos = input.selectionStart
      let endPos = input.selectionEnd
      let resultText = input.value.substring(0, startPos) + emoji.data + input.value.substring(endPos)
      input.value = resultText
      input.focus()
      input.selectionStart = startPos + emoji.data.length
      input.selectionEnd = startPos + emoji.data.length
      this.text = resultText
    },
    // 发布评论
    async confirmCommend() {
      // 这里需要提交用户信息数据和评论的数据，用户信息包括当前用户名和用户头像
      let newCommendData = {
        myName: localStorage.getItem('username'),
        myImg: localStorage.getItem('userImg'),
        myCommend: this.text,
        myCommendTime: this.getCurrentTime()
      }
      await newCommend(newCommendData)
      this.text = ''
    },
    // 清空评论
    cancelCommend() {
      this.text = ''
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
  created() {
    this.$nextTick(this.getContent)
  }
}
</script>

<style lang="scss">
// 隐藏滚动条
  .default-container {
    width: 100%;
    height: 100%;
    .basic-info {
      display: flex;
      align-items: flex-start;
      height: 40px;
      .article-time {
        width: 100%;
        overflow: hidden;
        color: white;
        .time {
          font-size: 14px;
          margin-right: 20px;
          i {
            font-size: 14px;
          }
        }
        .code {
          font-size: 14px;
          float: right;
          margin-right: 5px;
          i {
            font-size: 14px
          }
        }
      }
    }
    .content {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: auto;
      font-size: 14px;
      background-color: #252525;
      border: none;
      .el-card__body {
        padding: 0;
      }
      .this {
        padding: 20px;
        background-color: white;
        opacity: 0.8;
      }
    }
    .commend {
      margin-top: 10px;
      width: 100%;
      height: 620px;
      opacity: 0.8;
      border: none;
      background-color: #4d4c5a;
      color: white;
      .el-card__body {
        height: 100%;
      }
      .commend-form {
        width: 100%;
        height: 100px;
        .el-textarea__inner {
          color: #ff0562;
          height: 100px;
        }
        .Commend {
          float: right;
          margin-left: 20px;
        }
      }
    }
    .blank {
      width: 100%;
      height: 20px;
    }
  }
  pre {
    color: white;
  }
</style>
