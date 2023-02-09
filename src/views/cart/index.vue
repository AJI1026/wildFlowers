<template>
  <div class="cart-container">
    <!--填写个人信息-->
    <!--步骤条-->
    <div class="step-head" v-if="step===1">
      <el-steps :active="1" align-center finish-status="process" process-status="wait" class="step-box">
        <el-step title="信息" description="填入收货地址"></el-step>
        <el-step title="下单" description="确保填入的信息正确"></el-step>
        <el-step title="付款" description="支持支付宝付款方式"></el-step>
        <el-step title="完成" description="订单完成"></el-step>
      </el-steps>
    </div>
    <div class="step-head" v-if="step===2">
      <el-steps :active="2" align-center finish-status="process" process-status="wait" class="step-box">
        <el-step title="信息" description="填入收货地址"></el-step>
        <el-step title="下单" description="确保填入的信息正确"></el-step>
        <el-step title="付款" description="支持支付宝付款方式"></el-step>
        <el-step title="完成" description="订单完成"></el-step>
      </el-steps>
    </div>
    <div class="step-head" v-if="step===3">
      <el-steps :active="3" align-center finish-status="process" process-status="wait" class="step-box">
        <el-step title="信息" description="填入收货地址"></el-step>
        <el-step title="下单" description="确保填入的信息正确"></el-step>
        <el-step title="付款" description="支持支付宝付款方式"></el-step>
        <el-step title="完成" description="订单完成"></el-step>
      </el-steps>
    </div>
    <div class="step-head" v-if="step===4">
      <el-steps :active="4" align-center finish-status="process" process-status="wait" class="step-box">
        <el-step title="信息" description="填入收货地址"></el-step>
        <el-step title="下单" description="确保填入的信息正确"></el-step>
        <el-step title="付款" description="支持支付宝付款方式"></el-step>
        <el-step title="完成" description="订单完成"></el-step>
      </el-steps>
    </div>
    <div class="orders-history" v-if="step===1">
      <el-button @click="orderHistory">历史消费记录</el-button>
    </div>
    <!--返回箭头-->
    <el-page-header @back="preStep"
                    :content="backArrowData[step-2]"
                    class="back-prev-step"
                    v-if="step!==1"
                    style="color: white">
    </el-page-header>
    <!--头部分割-->
    <div class="divide-top">
      <el-divider direction="horizontal"></el-divider>
    </div>
    <!--步骤1-->
    <div class="stepOne-body" v-if="step===1">
      <div class="build-address">
        <el-table :data="addressData" style="width: 100%" max-height="300">
          <el-table-column fixed prop="name" label="收件人" width="100"></el-table-column>
          <el-table-column prop="city" label="城市" width="200"></el-table-column>
          <el-table-column prop="address" label="具体地址" width="200"></el-table-column>
          <el-table-column prop="mobilePhone" label="电话" width="120"></el-table-column>
          <el-table-column prop="remark" label="标签" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                  @click.native.prevent="deleteAddressData(scope.$index, addressData)"
                  type="text"
                  size="small">
                移除
              </el-button>
              <el-button
                  @click.native.prevent="changeAddressData(scope.$index, addressData)"
                  type="text"
                  size="small">
                修改
              </el-button>
              <el-button
                  @click.native.prevent="chooseAddress(scope.$index, addressData)"
                  type="text"
                  size="small">
                选择
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--修改地址表单-->
        <el-dialog title="Update Address" :visible.sync="updateAddress" @close="closeUpdateForm">
          <el-form ref="updateForm" :model="updateAddressData" label-width="120px" class="addressee-form">
            <!--城市选择-->
            <el-form-item label="City">
              <el-col :span="11">
                <el-cascader v-model="selectedOptions" :options="options" @change="handleCityChange"></el-cascader>
              </el-col>
            </el-form-item>
            <!--地址详情-->
            <el-form-item label="Address-Detail">
              <el-input v-model="updateAddressData.address"></el-input>
            </el-form-item>
            <!--默认地址-->
            <el-form-item label="Default Address">
              <el-switch v-model="updateAddressData.defaultAddress" active-color="#13ce66"></el-switch>
            </el-form-item>
            <!--收件人-->
            <el-form-item label="Addressee">
              <el-input v-model="updateAddressData.name"></el-input>
            </el-form-item>
            <!--电话-->
            <el-form-item label="Mobile-Phone">
              <el-input v-model="updateAddressData.mobilePhone"></el-input>
            </el-form-item>
            <!--标签-->
            <el-form-item label="Remark">
              <el-tag v-for="(tag,index) in updateAddressData.remark" :key="index"
                      closable
                      :disable-transitions = "false"
                      @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <!--新增标签-->
              <el-input class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm">
              </el-input>
              <!--添加新标签-->
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 加一个试试</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="confirmUpdateAddress">Update Address</el-button>
              <el-button @click="closeUpdateForm">Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--创建新的地址-->
        <div class="new-address">
          <el-button type="primary" @click="showNewAddressForm">
            <i class="el-icon-plus"></i>
            Create a new address !
          </el-button>
          <!--创建新的地址表单-->
          <el-dialog title="New Address" :visible.sync="createNewAddress" @close="closeNewAddress">
            <el-form ref="addressForm" :model="addressForm" label-width="120px" class="addressee-form">
              <!--城市选择-->
              <el-form-item label="City">
                <el-col :span="11">
                  <el-cascader v-model="selectedOptions" :options="options" @change="handleCityChange"></el-cascader>
                </el-col>
              </el-form-item>
              <!--地址详情-->
              <el-form-item label="Address-Detail">
                <el-input v-model="addressForm.address"></el-input>
              </el-form-item>
              <!--默认地址-->
              <el-form-item label="Default Address">
                <el-switch v-model="addressForm.defaultAddress" active-color="#13ce66"></el-switch>
              </el-form-item>
              <!--收件人-->
              <el-form-item label="Addressee">
                <el-input v-model="addressForm.name"></el-input>
              </el-form-item>
              <!--电话-->
              <el-form-item label="Mobile-Phone">
                <el-input v-model="addressForm.mobilePhone"></el-input>
              </el-form-item>
              <!--标签-->
              <el-form-item label="Remark">
                <el-tag v-for="(tag,index) in addressForm.remark" :key="index"
                        closable
                        :disable-transitions = "false"
                        @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <!--新增标签-->
                <el-input class="input-new-tag"
                          v-if="inputVisible"
                          v-model="inputValue"
                          ref="saveTagInput"
                          @keyup.enter.native="handleInputConfirm"
                          @blur="handleInputConfirm">
                </el-input>
                <!--添加新标签-->
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 加一个试试</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="confirmNewAddress">Create Address</el-button>
                <el-button @click="closeNewAddress">Cancel</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
      <!--购物车物品-->
      <div class="main-part">
        <!--地址信息未选择时显示-->
        <div class="add-address" v-if="emptyAddress">
          <i class="el-icon-add-location" @click="chooseAddressNotify"></i>
        </div>
        <!--地址信息显示-->
        <div class="address-descriptions" v-else>
          <el-descriptions class="margin-top" :column="3" border style="max-height: 156px">
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                UserName
              </template>
              {{addressChosen.name}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                Mobile-Phone
              </template>
              {{addressChosen.mobilePhone}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                City
              </template>
              {{addressChosen.city}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                Remark
              </template>
              <el-tag size="small" v-for="(tag,index) in addressChosen.remark" :key="index">
                {{tag}}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                Address-Detail
              </template>
              {{addressChosen.address}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!--购物车为空时-->
        <el-empty description="购物车空～" v-if="emptyCart" class="empty-cart"></el-empty>
        <!--购物车不为空时-->
        <div class="cart-box" v-else>
          <el-table :data="cartData" style="width: 100%">
            <el-table-column fixed label="物品" width="160">
              <template slot-scope="scope">
                <img :src="scope.row.CoverImg" width="100px" alt="">
              </template>
            </el-table-column>
            <el-table-column label="书名" width="300">
              <template slot-scope="scope">
                <div style="font-size: 14px; color: black; font-weight: 400">{{scope.row.bookName}}</div>
              </template>
            </el-table-column>
            <el-table-column label="价格" width="120">
              <template slot-scope="scope">
                <div>
                  <i class="iconfont icon-jiage"></i>
                  <span style="color: #d182a3; margin-left: 5px">{{scope.row.bookPrice | capitalize}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="120">
              <template slot-scope="scope">
                <div>
                  <i class="el-icon-close"></i>
                  {{scope.row.goodsQuantity}}
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                    @click.native.prevent="goodsDelete(scope.$index, cartData)"
                    type="text"
                    size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--合计金额-->
        <div class="total-price">
          <span><i class="iconfont icon-jiage"></i>合计金额：</span>
          <span style="color: #d182a3;">{{totalPrice | capitalize}}</span>
        </div>
        <!--下单按钮-->
        <div class="checkout-button">
          <el-button type="success" round @click="checkout" v-if="createOrder">创建订单</el-button>
          <el-button type="success" round v-else @click="backOrder">返回订单</el-button>
        </div>
      </div>
    </div>
    <!--步骤2-->
    <div class="stepTwo-body" v-if="step===2">
      <!--收件人信息-->
      <div class="address-info">
        <el-card shadow="always">
          <el-descriptions title="收件人地址信息" direction="vertical" :column="4" border>
            <el-descriptions-item label="用户名">{{addressChosen.name}}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{addressChosen.mobilePhone}}</el-descriptions-item>
            <el-descriptions-item label="城市" :span="2">{{addressChosen.city}}</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small" v-for="(tag, index) in addressChosen.remark" :key="index">{{tag}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="具体地址">{{addressChosen.address}}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
      <!--商品信息-->
      <el-empty class="goods-info" v-if="isGoodsData"></el-empty>
      <div class="goods-info" v-else>
        <el-card shadow="always" style="background-color: #13163a; border: none">
          <div class="order-id">订单编号：{{getOrder}}</div>
          <div class="goods-info-detail" v-for="item in goodsSettlement" :key="item.bookName">
            <img alt="loading" class="goods-picture" :src="item.CoverImg"/>
            <span class="goods-name">{{item.bookName}}</span>
            <span class="goods-price">单价：{{item.bookPrice}}</span>
            <span class="goods-quantity">
              <i class="el-icon-close"></i>
              {{item.goodsQuantity}}
            </span>
          </div>
          <!--展开看更多数据-->
          <div class="more-data">
            <el-tooltip effect="dark" content="点击加载更多数据哦～" placement="top" v-if="moreData">
              <i class="el-icon-more-outline" @click="showMoreData"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="没有啦～" placement="top" v-if="lessData">
              <i class="el-icon-arrow-up" @click="closeMoreData"></i>
            </el-tooltip>
            <div v-if="none"></div>
          </div>
          <!--合计金额-->
          <div class="total-price">
            <span><i class="iconfont icon-jiage"></i>合计金额：</span>
            <span style="color: #d182a3;">{{totalPrice | capitalize}}</span>
          </div>
          <!--分割线-->
          <div class="goods-divide-one">
            <el-divider direction="horizontal"></el-divider>
          </div>
          <!--支付信息-->
          <div class="pay-others">
            <!--支付方式-->
            <div class="choose-payMethod">支付方式：
              <span class="pay-way">支付宝</span>
              <span>
                <a href="#" class="pay-change">(更改)</a>
              </span>
            </div>
            <!--礼物选项-->
            <div class="choose-payMethod">礼物选项：
              <span>不，这是为您自己的账号购买的。</span>
            </div>
            <!--账号名称-->
            <div class="choose-payMethod">wildFlowers账号：
              <span>AJI1026</span>
            </div>
          </div>
          <!--分割线-->
          <div class="goods-divide-two">
            <el-divider direction="horizontal"></el-divider>
          </div>
          <!--协议-->
          <div class="agreement">
              <el-checkbox v-model="agree">我同意&laquo;WildFlowers用户协议&raquo; 中的条款(最后更新于2022年12月31日)。</el-checkbox>
            <div>支付宝的交易经由支付宝网站授权。点击下方按钮以打开新的网页游览器开始交易</div>
          </div>
          <!--交易提示-->
          <div class="choice-box">
            <el-button class="trade-message" @click="cancelOrder">
              <span>
                取消订单
              </span>
            </el-button>
            <el-popover v-if="showLoading" placement="top" content="🐶请勾选用户协议哦～">
              <el-button class="trade-message" slot="reference" @click="getPay">确认付款</el-button>
            </el-popover>
            <el-button class="trade-message" v-else>
                处理中
                <i class="el-icon-loading"></i>
            </el-button>
          </div>
        </el-card>
      </div>
      <!--支付方式-->
      <div class="pay-method">
        <el-card shadow="always">

        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addressList,
  addStep,
  changeAddress,
  decreaseStep,
  deleteAddress,
  goodeDelete,
  goodsList,
  newAddress,
  orderInformation,
  orderInformationUpdate,
  pcPay,
  step
} from '@/api'
// 引入三级联动省市区地区
import {CodeToText, regionData} from 'element-china-area-data'

export default {
    name: 'cart-container',
    inject: ['reload'],
    filters: {
      capitalize(value) {
        return parseFloat(value).toFixed(2)
      }
    },
    data() {
      return {
        backArrowData: ['地址选择','下单'], // 返回箭头数据
        step: '', // 默认第一步
        options: regionData, // 三级联动地址数据
        selectedOptions: [],
        inputVisible: false, // 标签数据
        inputValue: '',
        updateAddress: false, // 修改地址的表单数据
        updateAddressData: {},
        originAddressData: {},
        addressForm: {
          city: '',
          address: '',
          defaultAddress: false,
          name: '',
          mobilePhone: '',
          remark: ['家'],
        }, // 新地址表单数据
        addressData: [], // 地址表格数据
        createNewAddress: false, // 创建新地址表单
        emptyAddress: true, // 空地址
        addressChosen: {}, // 已选地址数据
        emptyCart: false, // 空购物车
        cartData: [], // 购物车数据
        totalPrice: 0, // 合计金额
        goodsSettlement: [], // 支付页面商品数据
        isGoodsData: false,
        getOrder: localStorage.getItem('getOrderId'),
        moreData: false, // 展示更多数据
        lessData: false,
        none: true,
        agree: false, // 付款数据
        showLoading: true,
        orderData: {
          orderId: '',
          orderAddressee: '',
          orderAddress: '',
          orderMobilePhone: '',
          orderRemark: [],
          orderGoods: [],
          orderStatus: '',
          alipayNo: ''
        }, // 订单数据
        createOrder: true,
        immediateData: [], // 立即支付数据
      }
    },
    methods: {
      // 弹出新地址创建表单
      showNewAddressForm() {
        this.createNewAddress = true
      },
      // 生成订单号数据
      setTimeFmt(s) {
        // 个位数补齐十位数
        return s < 10 ? '0' + s : s
      },
      createOrderId() {
        // 利用时间去生成id
        const now = new Date()
        let month = now.getMonth() + 1
        let day = now.getDate()
        let hour = now.getHours()
        let minutes = now.getMinutes()
        let seconds = now.getSeconds()
        month = this.setTimeFmt(month)
        day = this.setTimeFmt(day)
        hour = this.setTimeFmt(hour)
        minutes = this.setTimeFmt(minutes)
        seconds = this.setTimeFmt(seconds)
        return now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString()
      },
      // 下单并生成订单编号
      async checkout() {
        localStorage.setItem('getOrderId', '')
        if(this.cartData.length === 0) {
          this.$notify.success('嗨呀！购物车没东西呀🐶')
        } else {
          await addStep(this.step)
          this.step++
          this.orderData.orderId = this.createOrderId()
          localStorage.setItem('getOrderId', this.orderData.orderId )
          this.getOrder = this.orderData.orderId
          // 收货人
          this.orderData.orderAddressee = this.addressChosen.name
          // 收货人电话
          this.orderData.orderMobilePhone = this.addressChosen.mobilePhone
          // 拼接地址
          this.orderData.orderAddress = this.addressChosen.city.replace(/\//g, "") + this.addressChosen.address
          // 地址标签
          this.orderData.orderRemark = this.addressChosen.remark
          this.orderData.orderGoods = this.cartData
          await orderInformation(this.orderData)
        }
      },
      // 返回上一步
      async preStep() {
        await decreaseStep(this.step)
        this.step--
        this.createOrder = false
      },
      // 返回订单
      async backOrder() {
        await addStep(this.step)
        this.step++
      },
      // 历史订单记录
      orderHistory() {
        this.$router.push('/orderHistory/all')
      },
      // 购物车列表的数据
      async goodsData() {
        if(this.$store.state.buyNowData !== '') {
          this.cartData = this.immediateData
          this.totalPrice = this.immediateData[0].bookPrice
        } else {
          const data = await goodsList()
          this.cartData = data.data.goodsListData
          let price = []
          this.cartData.map((goods) => price.push(+goods.bookPrice * goods.goodsQuantity))
          price.length > 0? this.totalPrice = eval(price.toString().replace(/,/g,'+')) : this.totalPrice = 0
          if(this.cartData.length === 0) {
            this.emptyCart = true
          }
        }
      },
      // 购物车删除数据
      async goodsDelete(index, row) {
        let deleteData = {
          bookName: row[index].bookName
        }
        await goodeDelete(deleteData)
        await this.goodsData()
        localStorage.setItem('getOrderId', '')
        this.createOrder = true
      },
      // 城市选择
      handleCityChange(value) {
        // 选择地址后，selectedOptions 会保存对应的区域码
        // 利用CodeToText转换区域吗为汉字
        this.options.selectedOptions = value
        let name = ''
        this.selectedOptions.map(item => name += CodeToText[item] + '/')
        this.addressForm.city = name
      },
      // 标签编辑
      handleClose(tag) {
        this.addressForm.remark.splice(this.addressForm.remark.indexOf(tag), 1);
      },
      showInput() {
        if(this.addressForm.remark.length < 4) {
          this.inputVisible = true;
          this.$nextTick(() => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        } else {
          this.$notify.error({
            title: 'Tips: ',
            message: '抱歉～，最多四个标签'
          })
        }
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.addressForm.remark.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 初始地址数据
      async firstAddressList() {
        const data = await addressList()
        this.addressData = []
        data.data.addressListData.map(item => {
          if(item.defaultAddress === true) {
            this.addressChosen = item
            this.emptyAddress = false
          }
          this.addressData.push(item)
        })
      },
      // 增加新地址
      async confirmNewAddress() {
        console.log()
        await newAddress(this.addressForm)
        this.createNewAddress = false
        this.$refs.addressForm.resetFields()
        await this.firstAddressList()
      },
      // 关闭新建地址表单
      closeNewAddress() {
        this.createNewAddress = false
      },
      // 选择地址提示
      chooseAddressNotify() {
        this.$notify.info({
          title: 'Tips: ',
          message: '👈请先在左边选择地址哦～'
        })
      },
      // 选择地址
      chooseAddress(index, row) {
        this.addressChosen = row[index]
        this.emptyAddress = false
      },
      // 移除地址
      async deleteAddressData(index, row) {
        await deleteAddress(row[index].addressId)
        await this.firstAddressList()
      },
      // 修改地址
      changeAddressData(index, row) {
        this.updateAddress = true
        this.originAddressData = JSON.stringify(row[index])
        this.updateAddressData = JSON.parse(this.originAddressData)
      },
      // 关闭修改地址表单
      closeUpdateForm() {
        this.updateAddress = false
      },
      // 确定提交修改表单数据
      async confirmUpdateAddress() {
        await changeAddress(this.updateAddressData)
        this.updateAddress = false
        await this.firstAddressList()
      },
      // 获取step初始数据
      async getStep() {
        const data = await step()
        this.step = data.data.stepData[0].step
      },
      // 支付页面商品数据
      async payGoodsData() {
        await this.goodsData()
        this.orderData.orderId = this.getOrder
        this.orderData.orderGoods = this.cartData
        await orderInformationUpdate(this.orderData)
        const data = await goodsList()
        if(data.data.goodsListData.length === 0) {
          this.isGoodsData = true
        } else if(data.data.goodsListData.length > 5) {
          this.moreData = true
          this.none = false
          for(let i = 0; i < 5; i++) {
            this.goodsSettlement.push(data.data.goodsListData[i])
          }
        } else {
          this.none = true
          this.goodsSettlement = data.data.goodsListData
        }
      },
      // 展示更多数据
      async showMoreData() {
        const data = await goodsList()
        for(let i = 5; i < data.data.goodsListData.length; i++) {
          this.goodsSettlement.push(data.data.goodsListData[i])
        }
        this.moreData = false
        this.none = false
        this.lessData = true
      },
      // 收起数据
      async closeMoreData() {
        const data = await goodsList()
        this.goodsSettlement = []
        for(let i = 0; i < 5; i++) {
          this.goodsSettlement.push(data.data.goodsListData[i])
        }
        this.moreData = true
        this.lessData = false
        this.none = false
      },
      // 付款函数
      async getPay() {
        if(this.agree === true) {
          this.showLoading = false
          let obj = {
            'orderId': localStorage.getItem('getOrderId')
          }
          const data = await pcPay(obj)
          window.location.href = data.data.result
        }
      },
      // 取消付款
      async cancelOrder() {
        await decreaseStep(this.step)
        this.step--
      }
    },
    created() {
      let oneData = {
        bookName: this.$store.state.buyNowData.bookName,
        CoverImg: this.$store.state.buyNowData.CoverImg,
        bookPrice: this.$store.state.buyNowData.bookPrice,
        goodsQuantity: 1
      }
      this.immediateData.push(oneData)
      this.goodsData()
      this.firstAddressList()
      this.getStep()
      this.payGoodsData()
    }
}
</script>

<style lang="scss">
  .cart-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: scroll;
    .orders-history {
      display: flex;
      justify-content: flex-start;
      margin-left: 20px;
      width: 100%;
    }
    // 步骤条样式
    .step-head {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
      width: 100%;
      height: 120px;
      .step-box {
        width: 800px;
      }
    }
    // 返回箭头
    .back-prev-step {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      i {
        cursor: pointer;
        margin-left: 20px;
        font-size: 30px;
        color: white;
        &:hover {
          transform: scale(1.12);
        }
      }
    }
    // 头部分割线
    .divide-top {
      display: flex;
      width: 100%;
      height: 25px;
      font-size: 100vw;
      opacity: 0.6;
    }
    // 主体第一步样式
    .stepOne-body {
      width: 100%;
      display: flex;
      justify-content: center;
      // 地址栏样式
      .build-address {
        width: 480px;
        height: 600px;
        overflow-x: scroll;
        padding: 10px 20px 10px 20px;
        .new-address {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
        .el-tag + .el-tag {
          margin-left: 10px;
        }
        .button-new-tag {
          margin-left: 10px;
          height: 32px;
          line-height: 30px;
          padding-top: 0;
          padding-bottom: 0;
        }
        .input-new-tag {
          width: 90px;
          margin-left: 10px;
          vertical-align: bottom;
        }
      }
      // 主体样式
      .main-part {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: center;
        color: black;
        padding: 10px;
        border-left: 1px solid white;
        // 地址栏样式
        .add-address {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px dashed grey;
          width: 100%;
          height: 60px;
          margin-bottom: 30px;
          i {
            font-size: 40px;
            color: darkgrey;
          }
        }
        // 头部地址信息描述
        .address-descriptions {
          width: 97%;
          max-height: 176px;
          overflow: scroll;
          margin-bottom: 40px;
          .margin-top {
            width: 100%;
          }
        }
        // 空购物车
        .empty-cart {
          width: 100%;
        }
        // 购物车列表
        .cart-box {
          width: 97%;
          height: auto;
        }
        // 总金额
        .total-price {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          height: 40px;
          margin-top: 20px;
          padding: 10px 20px 0 0;
          border-top: 1px solid darkgrey;
          span {
            color: white;
          }
        }
        // 跳转下单按钮
        .checkout-button {
          display: flex;
          justify-content: flex-end;
          padding-right: 20px;
          margin-top: 20px;
          height: 40px;
          width: 100%;
        }
      }
    }
    // 主体第二步样式
    .stepTwo-body {
      display: flex;
      width: 100%;
      height: auto;
      .address-info {
        width: 300px;
        height: auto;
        margin: 10px;
      }
      // 订单编号样式
      .order-id {
        color: white;
        margin: 0 0 20px 10px;
      }
      // 更多数据样式
      .more-data {
        display: flex;
        justify-content: center;
        i {
          cursor: pointer;
          color: white;
          font-size: 30px;
          &:hover {
            transform: scale(1.12);
          }
        }
      }
      // 支付页面商品信息
      .goods-info {
        display: flex;
        flex: 1;
        margin-top: 10px;
        min-width: 470px;
        height: 100%;
        overflow: scroll;
        .goods-info-detail {
          display: flex;
          align-items: center;
          margin: 10px;
        }
        .goods-picture {
          width: 40px;
          height: 40px;
        }
        .goods-name {
          font-size: 12px;
          margin-left: 20px;
        }
        .goods-price {
          font-size: 12px;
          margin-left: 40px;
          color: #ff0562;
        }
        .goods-quantity {
          color: #ff0562;
          font-size: 12px;
          i {
            margin-left: 5px;
          }
        }
        .total-price {
          display: flex;
          justify-content: flex-end;
        }
        .pay-others {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 5px;
          padding: 10px;
          height: 120px;
          min-width: 192px;
          background-color: rgba(12,25,39);
          color: rgb(68,76,85);
          div {
            width: 100%;
            .pay-way {
              color: #5ca55c;
            }
            .pay-change {
              margin-left: 2px;
              color: white;
            }
            span {
              color: white;
            }
          }
        }
        .agreement {
          color: white;
        }
        .choice-box {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-around;
          height: 60px;
        }
        .trade-message {
          background-color: #5ca55c;
          width: 160px;
          min-width: 160px;
          height: 40px;
          border-radius: 10px;
          margin-top: 20px;
          display: flex;
          justify-content: center;
          span {
            color: white;
          }
        }
      }
      // 付款方式
      .pay-method {
        width: 300px;
        height: 500px;
        margin: 10px;
      }
    }
  }
</style>
