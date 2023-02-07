<template>
  <div class="markdown-container">
    <div class="area">
      <mavon-editor v-model="content" ref="md" @change="change" class="area-box"/>
      <el-button @click="submit">提交笔记</el-button>
    </div>
    <el-dialog :visible.sync="createNote">
      <el-form ref="NoteForm">
        <el-form-item label="选择笔记标签：" label-width="140px" required>
          <div class="tag-chosen">
            <el-radio-group v-model="defaultTag" class="tags" @change="tagChosen">
              <el-radio :label="tag" border size="mini" v-for="(tag, index) in allTags" :key="index">{{tag}}</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="上传笔记背景：" label-width="140px" required>
          <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:3000/admin/user/upload"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :before-upload="uploadBefore"
              accept="image/*"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar"  alt=""/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: center">
          <el-button @click="cancelNote">取消</el-button>
          <el-button @click="confirmNote">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { newNote, content } from '@/api'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: 'markdown-container',
    components: {
      mavonEditor
    },
    props: {
      path: String, // 设置文件保存的路径，作为参数传递进来
    },
    data() {
      return {
        preview: true, // 切换markdown
        content:'', // 输入的markdown
        html:'',    // 及时转的html,
        createNote: false,
        defaultTag: 'MS',
        createTime: new Date(),
        allTags: [], // 新建笔记中的标签数据
        fileList: [], // 文件列表
        imgUrl: '', // 上传的图片
      }
    },
    methods: {
      previewHTML() {
        this.preview = false
      },
      backToEdit() {
        this.preview = true
      },
      // 所有操作都会被解析重新渲染
      change(value, render){
        // render 为 markdown 解析后的结果[html]
        this.html = render;
      },
      tagChosen(val) {
        this.defaultTag = val
      },
      // 提交
      async submit(){
        this.defaultTag = 'MS'
        this.createNote = true
      },
      // 取消上传笔记
      cancelNote() {
        this.createNote = false
      },
      // 确定上传笔记
      async confirmNote() {
        this.createTime = this.getCurrentDataStr(this.createTime)
        let newNoteData = {
          noteUserId: localStorage.getItem('userId'),
          noteTag: this.defaultTag,
          noteContent: this.html,
          noteCoverImg: this.imgUrl,
          noteCreateTime: this.createTime,
        }
        console.log(newNoteData)
        if(this.html === '' || this.html === null) {
          this.$message.warning('笔记不能为空')
        } else {
          localStorage.setItem('preNote', this.html)
          const data = await newNote(newNoteData)
          if(data.data.status === 200) {
            this.$message.success('创建成功，可以在笔记列表查看')
          } else {
            this.$message.error('数据有误，请重新尝试')
          }
          this.createNote = false
        }
        localStorage.setItem('preNote', '')
      },
      // 获取新建笔记内的标签数据
      async createTag() {
        const data = await content()
        let arr = []
        data.data.noteData.map(item => {
          arr.push(item.noteTag)
        })
        this.allTags = [...new Set(arr)]
        arr.push()
      },
      // 图片上传成功
      uploadSuccess(res, file) {
        console.log(res)
        this.imgUrl = URL.createObjectURL(file.raw);
        console.log(this.imgUrl)
      },
      // 图片上传之前
      uploadBefore(file) {
        let limitMax = 5000 * 1024;
        if(file.size > limitMax) {
          this.$message("大小超出限制");
          return false
        }
      },
    },
    created() {
      this.createTag()
      this.html = localStorage.getItem('preNote')
    }
  }
</script>

<style lang="scss">
  .markdown-container {
    width: 100%;
    height: 100%;
    .el-dialog {
      position: relative;
      margin: 0 auto 50px;
      background: #FFF;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 580px;
      min-width: 527px;
      .avatar-uploader {
        width: 178px;
        height: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
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
      .tag-chosen {
        display: flex;
        flex-wrap: wrap;
        .tags {
          margin-right: 10px;
        }
      }
    }
    .area {
      margin-top: 20px;
      .auto-textarea-wrapper .auto-textarea-input.no-resize {
        resize: none;
        background-color: white;
      }
      .area-box {
        min-height: 600px;
      }
      button {
        margin-top: 10px;
        float: right;
      }
    }
  }
</style>
