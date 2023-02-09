<template>
  <div class="it-container">
    <div class="top-part">
      <!--返回按钮-->
      <div class="back">
        <el-page-header @back="backHome" content="主页" class="back-item"></el-page-header>
        <b>当前书籍标签：<span style="color: #ff0562">{{bookTypeTag}}</span></b>
      </div>
      <!--书籍轮播图-->
      <div class="swiper-container">
        <div class="swiper">
          <el-carousel height="160px" :interval="4000" type="card">
            <el-carousel-item class="head-swiper">
              <div class="swiper1"></div>
            </el-carousel-item>
            <el-carousel-item class="head-swiper">
              <div class="swiper2"></div>
            </el-carousel-item>
            <el-carousel-item class="head-swiper">
              <div class="swiper3"></div>
            </el-carousel-item>
            <el-carousel-item class="head-swiper">
              <div class="swiper4"></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!--书籍导航-->
      <div class="book-nav">
        <el-tag>IT</el-tag>
        <el-tag>数字金融</el-tag>
        <el-tag>人文社科</el-tag>
        <el-tag>历史</el-tag>
        <el-tag>哲学</el-tag>
        <el-tag>动物学、行为学</el-tag>
        <el-tag>机械、自动化</el-tag>
        <el-tag>航天、物理</el-tag>
        <el-tag>细胞、遗传学</el-tag>
      </div>
    </div>
    <!--任务列表-->
    <div class="left-side-2">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="To Do List" name="ToDoList">
          <draggable v-model="taskArray" group="people" @start="drag=true" @end="drag=false">
            <div v-for="(element, index) in taskArray" :key="index" class="to-do-list" ref="TaskList">
              <!--任务名称-->
              <input type="checkbox"  v-model="element.taskStatus" @change="checkedTask(index)">
              <span class="check-task">{{element.task}}</span>
              <!--任务内容-->
              <div class="task-content">{{element.goal}}</div>
              <span class="behave" @click="checkIndex(index)">查</span>
              <!--查看弹窗-->
              <el-drawer :title="checkData.task" :visible.sync="check" :with-header="false">
                <span>{{checkData.goal}}</span>
              </el-drawer>
              <span> | </span>
              <span class="behave" @click="modifyIndex(index)">改</span>
              <!--修改弹窗-->
              <el-drawer title="Find your way !" :before-close="handleClose" :visible.sync="dialog" direction="rtl" custom-class="demo-drawer" ref="modifyDrawer">
                <div class="demo-drawer__content">
                  <el-form :model="form">
                    <!--任务名称-->
                    <el-form-item label="Name" :label-width="formLabelWidth">
                      <el-input v-model="form.task" autocomplete="off"></el-input>
                    </el-form-item>
                    <!--任务内容-->
                    <el-form-item label="Content" :label-width="formLabelWidth">
                      <el-input v-model="form.goal" autocomplete="off"></el-input>
                    </el-form-item>
                    <!--创建时间-->
                    <el-form-item label="Time" :label-width="formLabelWidth">
                      <el-input v-model="form.createTime" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">Cancel</el-button>
                    <el-button type="primary" @click="confirmForm" :loading="loading">{{ loading ? 'Submitting ...' : 'Confirm' }}</el-button>
                  </div>
                </div>
              </el-drawer>
              <span> | </span>
              <span class="behave" @click="deleteTask(index)">删</span>
            </div>
          </draggable>
          <!--增加任务-->
          <div class="add-task">
            <el-button type="info" plain @click="addNewTask"><i class="el-icon-plus"></i>添加新任务</el-button>
          </div>
          <!--增加任务表单-->
          <el-dialog title="新的任务" :visible.sync="addTaskForm" @close="cancelAddTask">
            <el-form :model="addForm">
              <!--任务名称-->
              <el-form-item label="名称" :label-width="addFormLabelWidth">
                <el-input v-model="addForm.task" autocomplete="off"></el-input>
              </el-form-item>
              <!--任务内容-->
              <el-form-item label="内容" :label-width="addFormLabelWidth">
                <el-input v-model="addForm.goal" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelAddTask">取 消</el-button>
              <el-button type="primary" @click="confirmAddTask">确 定</el-button>
            </div>
          </el-dialog>
        </el-collapse-item>
        <el-collapse-item title="Completed" name="Completed">
          <draggable v-model="completedTaskArray" group="people" @start="drag=true" @end="drag=false">
            <div v-for="(element, index) in completedTaskArray" :key="index" class="to-do-list" ref="TaskList">
              <!--任务名称-->
              <span class="check-task complete">{{element.task}}</span>
              <!--任务内容-->
              <div class="task-content">{{element.goal}}</div>
              <span class="behave" @click="completedDelete(index)">删除任务</span>
            </div>
          </draggable>
        </el-collapse-item>
        <el-collapse-item title="Collected Book" name="Collected">

        </el-collapse-item>
        <el-collapse-item title="Individual works" name="Individual">

        </el-collapse-item>
      </el-collapse>
    </div>
    <!--数据展示-->
    <div class="shell">
      <div class="box" v-for="(item, index) in itBookList" :key="index">
        <div class="images" @click="forDetail(index)">
          <img :src="item.CoverImg" alt="">
        </div>
        <div class="price">
          <i class="price-icon iconfont icon-price"></i>
          <span>: {{item.bookPrice | capitalize}} CNY</span>
        </div>
        <div class="content">
          <div :key="index">
            <span>收藏</span>
            <i class="iconfont icon-shoucangxuanzhong" v-if="collectStatus[index]" @click="getCollected(index)"></i>
            <i class="iconfont icon-shoucang" v-else @click="getCollected(index)"></i>
          </div>
          <div>
            <span>加入购物车</span>
            <i class="iconfont icon-jiahao" @click="addToCart(index)"></i>
          </div>
        </div>
        <div class="shadow-box" @click="forDetail(index)"></div>
      </div>
      <!--分页-->
      <div class="Page">
        <el-pagination  background
                        layout="prev, pager, next"
                        :current-page=Number(pagesData.pageNum)
                        :page-sizes="[6]"
                        :page-size=6
                        :total=pagesData.dataCount
                        @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <!--已加入购物车的书籍-->
    <div class="right-side">
      <div class="right-box">
        <!--购物车为空时-->
        <el-empty description="购物车列表空～" v-if="emptyCart"></el-empty>
        <!--购物车不为空时-->
        <div v-for="(item, index) in simpleCartList" :key="index" class="goods-info">
          <img :src="item.CoverImg" alt="商品图片" class="goods-picture">
          <span class="goods-name">{{item.bookName}}</span>
          <el-input-number v-model="goodsNum[index]" @change="goodsNumChange(index)" :min="0" :max="99" class="goods-num"></el-input-number>
        </div>
      </div>
      <!--购物车按钮-->
      <div class="cart-list-button">
        <el-button type="info" plain class="clear-cart" @click="clearCart">清空购物车</el-button>
        <el-button type="success" plain class="checkout-cart" @click="toCartPage">购物车结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  add,
  addGoods,
  exist,
  collectStatus,
  completed,
  completedDelete,
  completedStatus,
  deleteAll,
  deleteTask,
  goodsList,
  knowledgeBook,
  modify,
  quantityChange,
  task
} from '@/api'
import draggable from 'vuedraggable'

export default {
    name: 'knowledge-container',
    components: { draggable },
    inject: ['reload'],
    filters: {
      capitalize(value) {
        return parseFloat(value).toFixed(2)
      }
    },
    data() {
      return {
        itBookList: [], // 存每页书籍数据
        collectStatus: [], // 前端收藏状态
        pagesData: {}, // 存放分页的数据
        taskArray:[], // 任务列表数据
        completedTaskArray: [], // 已完成任务列表数据
        activeNames: ['ToDoList','Completed'], // 默认激活的折叠面板
        form: {}, // 任务列表改数据
        table: false,
        dialog: false,
        loading: false,
        formLabelWidth: '80px',
        timer: null,
        indexForModify: '',
        originData: {},
        check: false, // 任务列表查数据
        checkData: {},
        allId: [0], // 任务列表加数据
        max: '',
        addTaskForm: false,
        addForm: {
          id: '',
          task: '',
          goal: '',
          createTime: ''
        },
        addFormLabelWidth: '80px',
        completedStatusForm: {}, // 任务完成状态数据
        emptyCart:true, // 空购物车
        goodsData: {
          bookName: '',
          CoverImg: '',
          bookPrice: '',
          goodsQuantity: ''
        },  // 购物车商品数据
        simpleCartList: [], // 已加入购物车的简单列表数据
        goodsNum: [], // 商品数量
        indexOfGood: '', // 临时存商品下标，用于改变商品列表中商品数量
        simpleBookName: [],
        bookTypeTag: 'IT', // 书籍种类标签
      }
    },
    methods: {
      // 获取IT类别书籍
      async getItBooks(pageNum) {
        if(this.itBookList.length === 0) {
          window.location.href = 'http://localhost:8080/#/knowledge/books'
        }
        const data = await knowledgeBook(pageNum)
        this.pagesData = data.data.pagesData
        this.itBookList = data.data.list
        data.data.list.forEach((item) => {
          // 存放书籍收藏的状态，'0'代表未收藏，'1'代表收藏
          this.collectStatus = [...this.collectStatus, Boolean(item.CollectingStatus)]
        })
      },
      // 收藏书籍
      async getCollected(index) {
        this.collectStatus[index] = !this.collectStatus[index]
        // 请求头body数据，这里类型必须是raw/json格式
        let rawData = {
          "bookName": this.itBookList[index].bookName,
          "bookAuthor": this.itBookList[index].bookAuthor,
          "CollectingStatus": this.itBookList[index].CollectingStatus
        }
        await collectStatus(rawData)
        await knowledgeBook().then(() => {
          // 强制更新视图，解决v-if不能及时刷新状态
          this.$forceUpdate()
        })
      },
      // 当前页数据切换
      handleCurrentChange(val) {
        console.log(`当前页：${val}`)
        this.getItBooks(val)
      },
      // 返回首页按钮
      backHome() {
        this.$router.push('/home')
      },
      // 关闭修改任务按钮
      handleClose(done) {
        if (this.loading) {
          return;
        }
        this.$confirm('sure？')
            .then(() => {
              modify(this.form)
              this.loading = true;
              this.timer = setTimeout(() => {
                done();
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                  this.taskList()
                }, 400);
              }, 2000);
            })
            .catch(() => {});
      },
      // 关闭任务列表修改表单
      cancelForm() {
        this.loading = false;
        this.dialog = false;
        clearTimeout(this.timer);
      },
      // 任务列表修改确定按钮
      async confirmForm() {
        await modify(this.form)
        this.$refs.modifyDrawer[this.indexForModify].closeDrawer()
      },
      // 返回要改的数据
      modifyIndex(index) {
        this.dialog = true
        this.originData = JSON.stringify(this.taskArray[index])
        this.form = JSON.parse(this.originData)
        this.indexForModify = index
      },
      // 返回要查询的数据
      checkIndex(index) {
        this.check = true
        this.checkData = this.taskArray[index]
      },
      // 删除任务
      deleteTask(index) {
        // 个人解决办法，直接移除节点，不会有屏幕闪烁问题
        this.$refs.TaskList[index].remove()
        deleteTask(this.taskArray[index])
        // 官方解决增删改查后刷新问题，但是还是有闪烁问题
        // this.reload()
      },
      // 任务列表的查询数据
      async taskList() {
        const data = await task()
        this.taskArray = data.data.TaskData
      },
      // 添加新任务
      addNewTask() {
        this.addTaskForm = true
      },
      // 取消添加任务
      cancelAddTask() {
        this.addForm.id = ''
        this.addForm.task = ''
        this.addForm.goal = ''
        this.addForm.createTime = ''
        this.addTaskForm = false
      },
      // 确认添加任务
      async confirmAddTask() {
        let dData = new Date()
        this.addForm.createTime = dData.getFullYear() + "/" + (dData.getMonth() + 1) + "/" + dData.getDate()
        // 在前端解决id自增问题
        this.maxId()
        this.addForm.id = this.max + 1
        if(this.addForm.task === "" || this.addForm.goal === "") {
          this.cancelAddTask()
        } else {
          // 提交表单
          await add(this.addForm)
          this.addTaskForm = false
          this.reload()
        }
      },
      // 存储所有id并筛选出最大id值
      maxId() {
        this.taskArray.forEach(item => {
          this.allId.push(item.id)
        })
        this.completedTaskArray.forEach(item => {
          this.allId.push(item.id)
        })
        // 这里筛选出最大值
        this.max = Math.max(...this.allId)
      },
      // 获取已完成任务列表
      async completedList() {
        const data = await completed()
        this.completedTaskArray = data.data.completedData
      },
      // 复选框选择之后的处理
      async checkedTask(index) {
        this.completedStatusForm = {
          id: this.taskArray[index].id,
          taskStatus: this.taskArray[index].taskStatus
        }
        await completedStatus(this.completedStatusForm)
        this.reload()
      },
      // 删除已完成任务
      async completedDelete(index) {
        await completedDelete(this.completedTaskArray[index])
        this.reload()
      },
      // 加入购物车
      async addToCart(index) {
        this.$forceUpdate()
        this.emptyCart = false
        // 如果购物车里已包含某商品，就加数量
        const signal = await exist(this.itBookList[index].bookName)
        if(signal.data.exist === 1) {
          let sameGoodsData = {
            bookName: this.itBookList[index].bookName,
          }
          await addGoods(sameGoodsData)
          await this.goodsFirstData()
        } else {
          // 如果购物车没有该商品就加入
          let newGoodsData = {
            bookName: this.itBookList[index].bookName,
            CoverImg: this.itBookList[index].CoverImg,
            bookPrice: this.itBookList[index].bookPrice,
            goodsQuantity: 1
          }
          await addGoods(newGoodsData)
          this.simpleCartList = (await goodsList()).data.goodsListData
          await this.goodsFirstData()
          this.$forceUpdate()
        }
      },
      // 改变购物车内商品数量
      async goodsNumChange(index) {
        let goodsChangeData = {
          bookName: this.simpleCartList[index].bookName,
          goodsQuantity: this.goodsNum[index]
        }
        await quantityChange(goodsChangeData)
        await this.goodsFirstData()
        if(this.simpleCartList.length === 0) {
          this.emptyCart = true
        }
      },
      // 清空购物车列表
      async clearCart() {
        this.simpleCartList.length = 0
        await deleteAll()
        this.$forceUpdate()
        this.emptyCart = true
        this.goodsNum = []
      },
      // 跳转购物车页面结算
      toCartPage() {
        this.$store.state.buyNowData = ''
        this.$router.push('/cart')
      },
      // 起始购物车列表数据
      async goodsFirstData() {
        const data = await goodsList()
        this.simpleCartList = data.data.goodsListData
        this.goodsNum = []
        if(this.simpleCartList.length !== 0) {
          this.emptyCart = false
        }
        this.simpleCartList.forEach(item => {
          this.goodsNum.push(item.goodsQuantity)
          this.simpleBookName.push(item.bookName)
        })
        this.$forceUpdate()
      },
      // 去到详情页
      forDetail(index) {
        let bookQuery = JSON.stringify(this.itBookList[index])
        // 这里没有传id，而是把整个对象传过去是为了减少数据的请求次数
        this.$router.push("/knowledge/books/detail?obj="+encodeURIComponent(bookQuery))
      },
    },
    created() {
      this.getItBooks(1)
      this.taskList()
      this.completedList()
      this.$nextTick(this.goodsFirstData)
    },
    mounted() {
      this.getItBooks(1)
    }
}
</script>

<style lang="scss" scoped>
  .it-container {
    min-width: 968px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow-y: scroll;
    flex-wrap: wrap;
    .top-part{
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      // 返回按钮
      .back {
        width: 220px;
        height: 220px;
        color: white;
        .back-item {
          min-width: 133px;
          position: relative;
          top: 60px;
          left: 20px;
        }
        b {
          min-width: 128px;
          position: relative;
          top: 160px;
          left: 300px;
          color:#252525;
        }
      }
      // 头部轮播图
      .swiper-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100vw - 440px);
        height: 160px;
        min-width: 968px;
        opacity: 0;
        @media (min-width: 1170px) {
          opacity: 1;
          .swiper {
            width: 870px;
            height: 220px;
            .head-swiper {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .swiper1 {
              width: 870px;
              height: 220px;
              background: url("../../../assets/wallhaven-d66zvm.png") center;
              background-size: cover;
            }
            .swiper2 {
              width: 870px;
              height: 220px;
              background: url("../../../assets/wallhaven-gp8g5d.png") center;
              background-size: cover;
            }
            .swiper3 {
              width: 870px;
              height: 220px;
              background: url("../../../assets/wallhaven-x66zzd.jpg") center;
              background-size: cover;
            }
            .swiper4 {
              width: 870px;
              height: 220px;
              background: url("../../../assets/wallhaven-9dm55k.jpg") center;
              background-size: cover;
            }
          }
        }
      }
      // 分类书籍导航
      .book-nav {
        width: 220px;
        height: 220px;
        min-width: 220px;
        min-height: 220px;
        box-sizing: border-box;
        padding-top: 10px;
        padding-left: 10px;
        .el-tag {
          cursor: pointer;
          margin: 0 2px 2px 0;
          &:hover {
            background-color: #e1e1e1;
          }
        }
      }
    }

    // 中部书籍展示
    .shell {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      justify-content: space-around;
      min-width: 528px;
      flex: 1;
      height: 100%;
      .box {
        overflow: hidden;
        position: relative;
        border: 1px solid #000;
        background-color: #33373f;
        display: block;
        margin: 30px;
        height: 280px;
        width: 200px;
        border-radius: 12px;
        &:hover .shadow-box {
          left: 110%;
          transition: .3s ease-out;
          transform: translateY(-10px);
          box-shadow: 0 26px 40px -24px rgb(0 36 100 / 50%);
        }
        .images {
          width: 200px;
          height: 200px;
          cursor: pointer;
          img {
            width: 200px;
            height: 200px;
          }
        }
        .price {
          display: flex;
          width: 200px;
          justify-content: center;
          align-items: center;
          color: #33ff33;
          font-size: 14px;
          .price-icon {
            font-size: 30px;
            color: white;
          }
        }
        .content {
          display: flex;
          width: 200px;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          height: 20px;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 5px;
            span {
              color: white;
              font-size: 12px;
            }
            i {
              cursor: pointer;
              padding: 5px;
              font-size: 20px;
              color: white;
              &:hover {
                transform: scale(1.12);
              }
            }
          }
        }
        .shadow-box {
          position: absolute;
          left: -110%;
          top: 0;
          width: 200px;
          height: 280px;
          background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .5), rgba(255, 255, 255, 0));
          transform: skew(-30deg);
        }
      }
      .Page {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }

    // 左边
    .left-side-2 {
      width: 220px;
      height: 100%;
      .check-task {
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .complete {
        padding: 10px;
        width: 30px;
      }
      .to-do-list {
        font-family: "montserrat", sans-serif;
        cursor: pointer;
        border: 1px solid bisque;
        margin-top: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        .task-content {
          display: flex;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 4px;
          padding: 10px;
          font-size: 0.2rem;
          width: 80px;
          height: 40px;
        }
        .behave {
          font-size: 0.2rem;
          margin: 5px;
          color: #8B4726;
          &:hover {
            text-decoration: underline;
            transform: scale(1.12);
          }
        }
      }
      .add-task {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        i {
          font-size: medium;
        }
      }
    }

    // 右边
    .right-side {
      width: 220px;
      height: 100%;
      overflow: scroll;
      .right-box {
        width: 220px;
        height: 600px;
        background-color: wheat;
        border: 1px solid darkgrey;
        border-bottom: none;
        overflow: scroll;
      }
      .goods-info {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 220px;
        height: 60px;
        .goods-picture {
          display: flex;
          width: 40px;
          height: 40px;
          margin-left: 10px;
        }
        .goods-name {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: darkslategrey;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 60px;
          height: 40px;
          margin-left: 10px;
        }
        .goods-num {
          display: flex;
          transform: scale(0.7);
        }
      }
      .cart-list-button {
        display: flex;
        justify-content: center;
        width: 220px;
        background-color: wheat;
        border: 1px solid darkgrey;
        border-top: none;
        padding-bottom: 20px;
        .clear-cart, .checkout-cart {
          width: 100px;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
</style>
