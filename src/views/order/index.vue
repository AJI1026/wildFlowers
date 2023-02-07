<template>
  <div class="orderHistory-container">
    <div class="back">
      <el-page-header @back="goBack" content="详情页面" class="back-content"></el-page-header>
    </div>
    <!--左边切换-->
    <div class="left-tab">
      <el-tabs tab-position="left" class="tab" v-model="value" style="overflow: scroll">

        <el-tab-pane label="所有订单" name="所有订单">
          <div style="margin-top: 15px;" class="search-box">
            <el-input placeholder="请输入搜索内容" v-model="allInput" class="input-with-select"></el-input>
          </div>
          <el-table
              v-if="value === '所有订单'"
              stripe
              :data="allTable"
              style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品编号">
                    <span>{{ props.row.orderId }}</span>
                  </el-form-item>
                  <el-form-item label="收货人">
                    <span>{{ props.row.orderAddressee }}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{ props.row.orderAddress }}</span>
                  </el-form-item>
                  <el-form-item label="地址标签">
                    <span>
                      <el-tag v-for="(tag, index) in props.row.orderRemark" :key="index">{{tag}}</el-tag>
                    </span>
                  </el-form-item>
                  <el-form-item label="电话">
                    <span>{{ props.row.orderMobilePhone }}</span>
                  </el-form-item>
                  <el-form-item label="状态">
                    <span v-if="props.row.orderStatus===0">未付款</span>
                    <span v-if="props.row.orderStatus===1">已取消</span>
                    <span v-if="props.row.orderStatus===2">已付款</span>
                    <span v-if="props.row.orderStatus===3">配送中</span>
                    <span v-if="props.row.orderStatus===4">已完成</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                label="商品编号"
                prop="orderId"
                width="200">
            </el-table-column>
            <el-table-column
                label="收货人"
                prop="orderAddressee"
                width="80">
            </el-table-column>
            <el-table-column
                label="地址"
                prop="orderAddress"
                width="120">
            </el-table-column>
            <el-table-column
                label="电话"
                prop="orderMobilePhone"
                width="120">
            </el-table-column>
            <el-table-column
                label="地址标签"
                prop="orderRemark"
                width="120">
              <template slot-scope="scope">
                <el-tag size="small" v-for="(tag,index) in scope.row.orderRemark" :key="index" style="margin: 2px;">{{tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="商品内容">
              <template slot-scope="scope">
                <el-button size="small" plain @click="check(scope.$index)">查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
                label="状态"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.orderStatus===0">未付款</el-tag>
                <el-tag type="info" v-if="scope.row.orderStatus===1">已取消</el-tag>
                <el-tag type="success" v-if="scope.row.orderStatus===2">已付款</el-tag>
                <el-tag type="warning" v-if="scope.row.orderStatus===3">配送中</el-tag>
                <el-tag type="primary" v-if="scope.row.orderStatus===4">已完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-button type="success" size="small" plain v-if="scope.row.orderStatus===2" @click="deliver(scope.$index)">发货</el-button>
                <el-button type="danger" size="small" v-if="scope.row.orderStatus===2 || scope.row.orderStatus===3" plain>退货</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品内容" :visible.sync="allGoodsVisible">
            <el-table :data="allGoods" style="overflow: scroll">
              <el-table-column property="CoverImg" label="名称" width="80">
                <template slot-scope="scope">
                  <img :src="scope.row.CoverImg" alt="loading" style="width: 60px; height: 60px">
                </template>
              </el-table-column>
              <el-table-column property="bookName" label="名称" width="300"></el-table-column>
              <el-table-column property="bookPrice" label="价格" width="100"></el-table-column>
              <el-table-column property="goodsQuantity" label="数量"></el-table-column>
            </el-table>
          </el-dialog>
        </el-tab-pane>

        <el-tab-pane label="已取消的订单" name="已取消的订单">
          <div style="margin-top: 15px;" class="search-box">
            <el-select placeholder="地址标签" v-model="cancel" @change="tagChosen">
              <el-option
                  v-for="item in cancelTagOptions"
                  :key="item.cancel"
                  :value="item.cancel">
              </el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="cancelInput" class="input-with-select" style="margin: 0 5px 0 5px"></el-input>
            <el-button @click="reset" plain>重置</el-button>
          </div>
          <el-table
              v-if="value === '已取消的订单'"
              stripe
              :data="cancelTable"
              style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品编号">
                    <span>{{ props.row.orderId }}</span>
                  </el-form-item>
                  <el-form-item label="收货人">
                    <span>{{ props.row.orderAddressee }}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{ props.row.orderAddress }}</span>
                  </el-form-item>
                  <el-form-item label="地址标签">
                    <span>
                      <el-tag v-for="(tag, index) in props.row.orderRemark" :key="index">{{tag}}</el-tag>
                    </span>
                  </el-form-item>
                  <el-form-item label="电话">
                    <span>{{ props.row.orderMobilePhone }}</span>
                  </el-form-item>
                  <el-form-item label="状态">
                    <span v-if="props.row.orderStatus===0">未付款</span>
                    <span v-if="props.row.orderStatus===1">已取消</span>
                    <span v-if="props.row.orderStatus===2">已付款</span>
                    <span v-if="props.row.orderStatus===3">配送中</span>
                    <span v-if="props.row.orderStatus===4">已完成</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                label="商品编号"
                prop="orderId">
            </el-table-column>
            <el-table-column
                label="收货人"
                prop="orderAddressee">
            </el-table-column>
            <el-table-column
                label="地址"
                prop="orderAddress">
            </el-table-column>
            <el-table-column
                label="电话"
                prop="orderMobilePhone">
            </el-table-column>
            <el-table-column
                label="地址标签"
                prop="orderRemark"
                width="120">
              <template slot-scope="scope">
                <el-tag size="small" v-for="(tag,index) in scope.row.orderRemark" :key="index" style="margin: 2px;">{{tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="商品内容">
              <template slot-scope="scope">
                <el-button size="small" plain @click="check(scope.$index)">查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
                label="状态"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.orderStatus===0">未付款</el-tag>
                <el-tag type="info" v-if="scope.row.orderStatus===1">已取消</el-tag>
                <el-tag type="success" v-if="scope.row.orderStatus===2">已付款</el-tag>
                <el-tag type="warning" v-if="scope.row.orderStatus===3">配送中</el-tag>
                <el-tag type="primary" v-if="scope.row.orderStatus===4">已完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-button type="success" size="small" plain v-if="scope.row.orderStatus===2" @click="deliver(scope.$index)">发货</el-button>
                <el-button type="danger" size="small" v-if="scope.row.orderStatus===2 || scope.row.orderStatus===3" plain>退货</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品内容" :visible.sync="cancelGoodsVisible">
            <el-table :data="cancelGoods" style="overflow: scroll">
              <el-table-column property="CoverImg" label="名称" width="80">
                <template slot-scope="scope">
                  <img :src="scope.row.CoverImg" alt="loading" style="width: 60px; height: 60px">
                </template>
              </el-table-column>
              <el-table-column property="bookName" label="名称" width="300"></el-table-column>
              <el-table-column property="bookPrice" label="价格" width="100"></el-table-column>
              <el-table-column property="goodsQuantity" label="数量"></el-table-column>
            </el-table>
          </el-dialog>
        </el-tab-pane>

        <el-tab-pane label="未付款的订单" name="未付款的订单">
          <div style="margin-top: 15px;" class="search-box">
            <el-select placeholder="地址标签" v-model="cancel" @change="tagChosen">
              <el-option
                  v-for="item in cancelTagOptions"
                  :key="item.cancel"
                  :value="item.cancel">
              </el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="cancelInput" class="input-with-select" style="margin: 0 5px 0 5px"></el-input>
            <el-button @click="reset" plain>重置</el-button>
          </div>
          <el-table
              v-if="value === '未付款的订单'"
              stripe
              :data="unPaidTable"
              style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品编号">
                    <span>{{ props.row.orderId }}</span>
                  </el-form-item>
                  <el-form-item label="收货人">
                    <span>{{ props.row.orderAddressee }}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{ props.row.orderAddress }}</span>
                  </el-form-item>
                  <el-form-item label="地址标签">
                    <span>
                      <el-tag v-for="(tag, index) in props.row.orderRemark" :key="index">{{tag}}</el-tag>
                    </span>
                  </el-form-item>
                  <el-form-item label="电话">
                    <span>{{ props.row.orderMobilePhone }}</span>
                  </el-form-item>
                  <el-form-item label="状态">
                    <span v-if="props.row.orderStatus===0">未付款</span>
                    <span v-if="props.row.orderStatus===1">已取消</span>
                    <span v-if="props.row.orderStatus===2">已付款</span>
                    <span v-if="props.row.orderStatus===3">配送中</span>
                    <span v-if="props.row.orderStatus===4">已完成</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                label="商品编号"
                prop="orderId">
            </el-table-column>
            <el-table-column
                label="收货人"
                prop="orderAddressee">
            </el-table-column>
            <el-table-column
                label="地址"
                prop="orderAddress">
            </el-table-column>
            <el-table-column
                label="电话"
                prop="orderMobilePhone">
            </el-table-column>
            <el-table-column
                label="地址标签"
                prop="orderRemark"
                width="120">
              <template slot-scope="scope">
                <el-tag size="small" v-for="(tag,index) in scope.row.orderRemark" :key="index" style="margin: 2px;">{{tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="商品内容">
              <template slot-scope="scope">
                <el-button size="small" plain @click="check(scope.$index)">查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
                label="状态"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.orderStatus===0">未付款</el-tag>
                <el-tag type="info" v-if="scope.row.orderStatus===1">已取消</el-tag>
                <el-tag type="success" v-if="scope.row.orderStatus===2">已付款</el-tag>
                <el-tag type="warning" v-if="scope.row.orderStatus===3">配送中</el-tag>
                <el-tag type="primary" v-if="scope.row.orderStatus===4">已完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-button type="success" size="small" plain v-if="scope.row.orderStatus===2" @click="deliver(scope.$index)">发货</el-button>
                <el-button type="danger" size="small" v-if="scope.row.orderStatus===2 || scope.row.orderStatus===3" plain>退货</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品内容" :visible.sync="unPaidGoodsVisible">
            <el-table :data="unPaidGoods" style="overflow: scroll">
              <el-table-column property="CoverImg" label="名称" width="80">
                <template slot-scope="scope">
                  <img :src="scope.row.CoverImg" alt="loading" style="width: 60px; height: 60px">
                </template>
              </el-table-column>
              <el-table-column property="bookName" label="名称" width="300"></el-table-column>
              <el-table-column property="bookPrice" label="价格" width="100"></el-table-column>
              <el-table-column property="goodsQuantity" label="数量"></el-table-column>
            </el-table>
          </el-dialog>
        </el-tab-pane>

        <el-tab-pane label="已付款的订单" name="已付款的订单">
          <div style="margin-top: 15px;" class="search-box">
            <el-select placeholder="地址标签" v-model="cancel" @change="tagChosen">
              <el-option
                  v-for="item in cancelTagOptions"
                  :key="item.cancel"
                  :value="item.cancel">
              </el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="cancelInput" class="input-with-select" style="margin: 0 5px 0 5px"></el-input>
            <el-button @click="reset" plain>重置</el-button>
          </div>
          <el-table
              v-if="value === '已付款的订单'"
              stripe
              :data="paidTable"
              style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品编号">
                    <span>{{ props.row.orderId }}</span>
                  </el-form-item>
                  <el-form-item label="收货人">
                    <span>{{ props.row.orderAddressee }}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{ props.row.orderAddress }}</span>
                  </el-form-item>
                  <el-form-item label="地址标签">
                    <span>
                      <el-tag v-for="(tag, index) in props.row.orderRemark" :key="index">{{tag}}</el-tag>
                    </span>
                  </el-form-item>
                  <el-form-item label="电话">
                    <span>{{ props.row.orderMobilePhone }}</span>
                  </el-form-item>
                  <el-form-item label="状态">
                    <span v-if="props.row.orderStatus===0">未付款</span>
                    <span v-if="props.row.orderStatus===1">已取消</span>
                    <span v-if="props.row.orderStatus===2">已付款</span>
                    <span v-if="props.row.orderStatus===3">配送中</span>
                    <span v-if="props.row.orderStatus===4">已完成</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                label="商品编号"
                prop="orderId">
            </el-table-column>
            <el-table-column
                label="收货人"
                prop="orderAddressee">
            </el-table-column>
            <el-table-column
                label="地址"
                prop="orderAddress">
            </el-table-column>
            <el-table-column
                label="电话"
                prop="orderMobilePhone">
            </el-table-column>
            <el-table-column
                label="地址标签"
                prop="orderRemark"
                width="120">
              <template slot-scope="scope">
                <el-tag size="small" v-for="(tag,index) in scope.row.orderRemark" :key="index" style="margin: 2px;">{{tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="商品内容">
              <template slot-scope="scope">
                <el-button size="small" plain @click="check(scope.$index)">查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
                label="状态"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.orderStatus===0">未付款</el-tag>
                <el-tag type="info" v-if="scope.row.orderStatus===1">已取消</el-tag>
                <el-tag type="success" v-if="scope.row.orderStatus===2">已付款</el-tag>
                <el-tag type="warning" v-if="scope.row.orderStatus===3">配送中</el-tag>
                <el-tag type="primary" v-if="scope.row.orderStatus===4">已完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-button type="success" size="small" plain v-if="scope.row.orderStatus===2" @click="deliver(scope.$index)">发货</el-button>
                <el-button type="danger" size="small" v-if="scope.row.orderStatus===2 || scope.row.orderStatus===3" plain>退货</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品内容" :visible.sync="paidGoodsVisible">
            <el-table :data="paidGoods" style="overflow: scroll">
              <el-table-column property="CoverImg" label="名称" width="80">
                <template slot-scope="scope">
                  <img :src="scope.row.CoverImg" alt="loading" style="width: 60px; height: 60px">
                </template>
              </el-table-column>
              <el-table-column property="bookName" label="名称" width="300"></el-table-column>
              <el-table-column property="bookPrice" label="价格" width="100"></el-table-column>
              <el-table-column property="goodsQuantity" label="数量"></el-table-column>
            </el-table>
          </el-dialog>
        </el-tab-pane>

        <el-tab-pane label="正在配送的订单" name="正在配送的订单">
          <div style="margin-top: 15px;" class="search-box">
            <el-select placeholder="地址标签" v-model="cancel" @change="tagChosen">
              <el-option
                  v-for="item in cancelTagOptions"
                  :key="item.cancel"
                  :value="item.cancel">
              </el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="cancelInput" class="input-with-select" style="margin: 0 5px 0 5px"></el-input>
            <el-button @click="reset" plain>重置</el-button>
          </div>
          <el-table
              v-if="value === '正在配送的订单'"
              stripe
              :data="deliveringTable"
              style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品编号">
                    <span>{{ props.row.orderId }}</span>
                  </el-form-item>
                  <el-form-item label="收货人">
                    <span>{{ props.row.orderAddressee }}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{ props.row.orderAddress }}</span>
                  </el-form-item>
                  <el-form-item label="地址标签">
                    <span>
                      <el-tag v-for="(tag, index) in props.row.orderRemark" :key="index">{{tag}}</el-tag>
                    </span>
                  </el-form-item>
                  <el-form-item label="电话">
                    <span>{{ props.row.orderMobilePhone }}</span>
                  </el-form-item>
                  <el-form-item label="状态">
                    <span v-if="props.row.orderStatus===0">未付款</span>
                    <span v-if="props.row.orderStatus===1">已取消</span>
                    <span v-if="props.row.orderStatus===2">已付款</span>
                    <span v-if="props.row.orderStatus===3">配送中</span>
                    <span v-if="props.row.orderStatus===4">已完成</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                label="商品编号"
                prop="orderId">
            </el-table-column>
            <el-table-column
                label="收货人"
                prop="orderAddressee">
            </el-table-column>
            <el-table-column
                label="地址"
                prop="orderAddress">
            </el-table-column>
            <el-table-column
                label="电话"
                prop="orderMobilePhone">
            </el-table-column>
            <el-table-column
                label="地址标签"
                prop="orderRemark"
                width="120">
              <template slot-scope="scope">
                <el-tag size="small" v-for="(tag,index) in scope.row.orderRemark" :key="index" style="margin: 2px;">{{tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="商品内容">
              <template slot-scope="scope">
                <el-button size="small" plain @click="check(scope.$index)">查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
                label="状态"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.orderStatus===0">未付款</el-tag>
                <el-tag type="info" v-if="scope.row.orderStatus===1">已取消</el-tag>
                <el-tag type="success" v-if="scope.row.orderStatus===2">已付款</el-tag>
                <el-tag type="warning" v-if="scope.row.orderStatus===3">配送中</el-tag>
                <el-tag type="primary" v-if="scope.row.orderStatus===4">已完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-button type="success" size="small" plain v-if="scope.row.orderStatus===2" @click="deliver(scope.$index)">发货</el-button>
                <el-button type="danger" size="small" v-if="scope.row.orderStatus===2 || scope.row.orderStatus===3" plain>退货</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品内容" :visible.sync="deliveringGoodsVisible">
            <el-table :data="deliveringGoods" style="overflow: scroll">
              <el-table-column property="CoverImg" label="名称" width="80">
                <template slot-scope="scope">
                  <img :src="scope.row.CoverImg" alt="loading" style="width: 60px; height: 60px">
                </template>
              </el-table-column>
              <el-table-column property="bookName" label="名称" width="300"></el-table-column>
              <el-table-column property="bookPrice" label="价格" width="100"></el-table-column>
              <el-table-column property="goodsQuantity" label="数量"></el-table-column>
            </el-table>
          </el-dialog>
        </el-tab-pane>

        <el-tab-pane label="已完成的订单" name="已完成的订单">
          <div style="margin-top: 15px;" class="search-box">
            <el-select placeholder="地址标签" v-model="cancel" @change="tagChosen">
              <el-option
                  v-for="item in cancelTagOptions"
                  :key="item.cancel"
                  :value="item.cancel">
              </el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="cancelInput" class="input-with-select" style="margin: 0 5px 0 5px"></el-input>
            <el-button @click="reset" plain>重置</el-button>
          </div>
          <el-table
              v-if="value === '已完成的订单'"
              stripe
              :data="completedTable"
              style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品编号">
                    <span>{{ props.row.orderId }}</span>
                  </el-form-item>
                  <el-form-item label="收货人">
                    <span>{{ props.row.orderAddressee }}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{ props.row.orderAddress }}</span>
                  </el-form-item>
                  <el-form-item label="地址标签">
                    <span>
                      <el-tag v-for="(tag, index) in props.row.orderRemark" :key="index">{{tag}}</el-tag>
                    </span>
                  </el-form-item>
                  <el-form-item label="电话">
                    <span>{{ props.row.orderMobilePhone }}</span>
                  </el-form-item>
                  <el-form-item label="状态">
                    <span v-if="props.row.orderStatus===0">未付款</span>
                    <span v-if="props.row.orderStatus===1">已取消</span>
                    <span v-if="props.row.orderStatus===2">已付款</span>
                    <span v-if="props.row.orderStatus===3">配送中</span>
                    <span v-if="props.row.orderStatus===4">已完成</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                label="商品编号"
                prop="orderId">
            </el-table-column>
            <el-table-column
                label="收货人"
                prop="orderAddressee">
            </el-table-column>
            <el-table-column
                label="地址"
                prop="orderAddress">
            </el-table-column>
            <el-table-column
                label="电话"
                prop="orderMobilePhone">
            </el-table-column>
            <el-table-column
                label="地址标签"
                prop="orderRemark"
                width="120">
              <template slot-scope="scope">
                <el-tag size="small" v-for="(tag,index) in scope.row.orderRemark" :key="index" style="margin: 2px;">{{tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="商品内容">
              <template slot-scope="scope">
                <el-button size="small" plain @click="check(scope.$index)">查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
                label="状态"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.orderStatus===0">未付款</el-tag>
                <el-tag type="info" v-if="scope.row.orderStatus===1">已取消</el-tag>
                <el-tag type="success" v-if="scope.row.orderStatus===2">已付款</el-tag>
                <el-tag type="warning" v-if="scope.row.orderStatus===3">配送中</el-tag>
                <el-tag type="primary" v-if="scope.row.orderStatus===4">已完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150"
                prop="orderStatus">
              <template slot-scope="scope">
                <el-button type="success" size="small" plain v-if="scope.row.orderStatus===2" @click="deliver(scope.$index)">发货</el-button>
                <el-button type="danger" size="small" v-if="scope.row.orderStatus===2 || scope.row.orderStatus===3" plain>退货</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品内容" :visible.sync="completedGoodsVisible">
            <el-table :data="cancelGoods" style="overflow: scroll">
              <el-table-column property="CoverImg" label="名称" width="80">
                <template slot-scope="scope">
                  <img :src="scope.row.CoverImg" alt="loading" style="width: 60px; height: 60px">
                </template>
              </el-table-column>
              <el-table-column property="bookName" label="名称" width="300"></el-table-column>
              <el-table-column property="bookPrice" label="价格" width="100"></el-table-column>
              <el-table-column property="goodsQuantity" label="数量"></el-table-column>
            </el-table>
          </el-dialog>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
import {allData, cancelData, completedData, deliveringData, paidData, unPaidData, tagData} from '@/api'

export default {
    name: 'orderHistoryLayout-container',
    data() {
      return {
        // tabs值
        value: '所有订单',
        // 搜索表单数据
        formInline: {
          user: '',
          region: ''
        },
        // 所有数据
        all: [],
        allData: [],
        allInput: '',
        allTagOptions: [],
        allGoodsVisible: false,
        allGoods: [],
        // 已取消的订单
        cancel: [],
        cancelData: [],
        cancelInput: '',
        cancelTagOptions: [],
        cancelGoodsVisible: false,
        cancelGoods: [],
        // 未付款的订单
        unPaid: [],
        unPaidData: [],
        unPaidInput: '',
        unPaidTagOptions: [],
        unPaidGoodsVisible: false,
        unPaidGoods: [],
        // 已付款的订单
        paid: [],
        paidData: [],
        paidInput: '',
        paidTagOptions: [],
        paidGoodsVisible: false,
        paidGoods: [],
        // 正在配送的订单
        delivering: [],
        deliveringData: [],
        deliveringInput: '',
        deliveringTagOptions: [],
        deliveringGoodsVisible: false,
        deliveringGoods: [],
        // 已完成的订单
        completed: [],
        completedData: [],
        completedInput: '',
        completedTagOptions: [],
        completedGoodsVisible: false,
        completedGoods: [],
      }
    },
    methods: {
      // 返回购物车页面
      goBack() {
        this.$router.push('/cart')
      },
      // 查询特定数据
      findSpecify () {
        console.log(this.formInline.region);
      },
      // 查看
      check(index) {
        switch (this.value) {
          case '所有订单':
          {
            this.allGoodsVisible = !this.allGoodsVisible
            this.allGoods = this.allData[index].orderGoods
          }
            break
          case '已取消的订单':
          {
            this.cancelGoodsVisible = !this.cancelGoodsVisible
            this.cancelGoods = this.cancelData[index].orderGoods
          }
            break
          case '未付款的订单':
          {
            this.unPaidGoodsVisible = !this.unPaidGoodsVisible
            this.unPaidGoods = this.unPaidData[index].orderGoods
          }
            break
          case '已付款的订单':
          {
            this.paidGoodsVisible = !this.paidGoodsVisible
            this.paidGoods = this.paidData[index].orderGoods
          }
            break
          case '正在配送的订单':
          {
            this.deliveringGoodsVisible = !this.deliveringGoodsVisible
            this.deliveringGoods = this.deliveringData[index].orderGoods
          }
            break
          case '已完成的订单':
          {
            this.completedGoodsVisible = !this.completedGoodsVisible
            this.completedGoods = this.completedData[index].orderGoods
          }
            break
        }
      },
      // 发货
      deliver(index) {
        console.log(index)
      },
      // 表格数据加载
      async tableData() {
        // 所有订单表格数据绑定
        this.allData = (await allData()).data.allData
        this.allData.forEach(item => {this.allTagOptions.push(...item.orderRemark)})
        this.allTagOptions = [...new Set(this.allTagOptions)]
        let l = this.allTagOptions.length
        this.allTagOptions.forEach(item => {
          this.allTagOptions.push({all: item})
        })
        this.allTagOptions.splice(0, l)
        // 已取消订单表格数据绑定
        this.cancelData = (await cancelData()).data.cancelData
        this.cancelData.forEach(item => {this.cancelTagOptions.push(...item.orderRemark)})
        this.cancelTagOptions = [...new Set(this.cancelTagOptions)]
        let l1 = this.cancelTagOptions.length
        this.cancelTagOptions.forEach(item => {
          this.cancelTagOptions.push({cancel: item})
        })
        this.cancelTagOptions.splice(0, l1)
        // 未付款订单表格数据绑定
        this.unPaidData = (await unPaidData()).data.unPaidData
        this.unPaidData.forEach(item => {this.unPaidTagOptions.push(...item.orderRemark)})
        this.unPaidTagOptions = [...new Set(this.unPaidTagOptions)]
        let l2 = this.unPaidTagOptions.length
        this.unPaidTagOptions.forEach(item => {
          this.unPaidTagOptions.push({unPaid: item})
        })
        this.unPaidTagOptions.splice(0, l2)
        // 已付款订单表格数据绑定
        this.paidData = (await paidData()).data.paidData
        this.paidData.forEach(item => {this.paidTagOptions.push(...item.orderRemark)})
        this.paidTagOptions = [...new Set(this.paidTagOptions)]
        let l3 = this.paidTagOptions.length
        this.paidTagOptions.forEach(item => {
          this.paidTagOptions.push({paid: item})
        })
        this.paidTagOptions.splice(0, l3)
        // 配送中订单表格数据绑定
        this.deliveringData = (await deliveringData()).data.deliveringData
        this.deliveringData.forEach(item => {this.deliveringTagOptions.push(...item.orderRemark)})
        this.deliveringTagOptions = [...new Set(this.deliveringTagOptions)]
        let l4 = this.deliveringTagOptions.length
        this.deliveringTagOptions.forEach(item => {
          this.deliveringTagOptions.push({delivering: item})
        })
        this.deliveringTagOptions.splice(0, l4)
        // 已完成订单表格数据绑定
        this.completedData = (await completedData()).data.completedData
        this.completedData.forEach(item => {this.completedTagOptions.push(...item.orderRemark)})
        this.completedTagOptions = [...new Set(this.completedTagOptions)]
        let l5 = this.completedTagOptions.length
        this.completedTagOptions.forEach(item => {
          this.completedTagOptions.push({completed: item})
        })
        this.completedTagOptions.splice(0, l5)
      },
      // 标签筛选
      async tagChosen() {
        let status = -1
        let tag = ''
        let modifyData = []
        switch (this.value) {
          case '已取消的订单':
            {
              status = 1
              tag = this.cancel
              modifyData = this.cancelData
            }
            break
          case '未付款的订单':
          {
            status = 0
            tag = this.unPaid
            modifyData = this.unPaidData
          }
            break
          case '已付款的订单':
          {
            status = 2
            tag = this.paid
            modifyData = this.paidData
          }
            break
          case '正在配送的订单':
          {
            status = 3
            tag = this.delivering
            modifyData = this.deliveringData
          }
            break
          case '已完成的订单':
          {
            status = 4
            tag = this.completed
            modifyData = this.completedData
          }
            break
        }
        let tagSearch = {
          'orderRemark': tag,
          'orderStatus': Number(status)
        }
        const data = await tagData(tagSearch)
        modifyData = data.data.tagData
        switch (status) {
          case 1:
          {
            this.cancelData = modifyData
          }
            break
          case 0:
          {
            this.unPaidData = modifyData
          }
            break
          case 2:
          {
            this.paidData = modifyData
          }
            break
          case 3:
          {
            this.deliveringData = modifyData
          }
            break
          case 4:
          {
            this.completedData = modifyData
          }
            break
        }
      },
      // 重置搜索数据
      async reset() {
        switch (this.value) {
          case '已取消的订单':
          {
            this.cancelData = (await cancelData()).data.cancelData
            this.cancel = ''
          }
            break
          case '未付款的订单':
          {
            this.unPaidData = (await unPaidData()).data.unPaidData
            this.unPaid = ''
          }
            break
          case '已付款的订单':
          {
            this.paidData = (await paidData()).data.paidData
            this.paid = ''
          }
            break
          case '正在配送的订单':
          {
            this.deliveringData = (await deliveringData()).data.deliveringData
            this.delivering = ''
          }
            break
          case '已完成的订单':
          {
            this.completedData = (await completedData()).data.completedData
            this.completed = ''
          }
            break
        }
      }
    },
    computed: {
      // 模糊搜索所有数据
      allTable () {
        const list = this.allInput
        if(list) {
          return this.allData.filter(item => {
            return Object.keys(item).some(key => {
              return String(item[key]).toLowerCase().indexOf(list) > -1
            })
          })
        }
        return this.allData
      },
      // 模糊搜索取消
      cancelTable() {
        const list = this.cancelInput
        if(list) {
          return this.cancelData.filter(item => {
            return Object.keys(item).some(key => {
              return String(item[key]).toLowerCase().indexOf(list) > -1
            })
          })
        }
        return this.cancelData
      },
      // 模糊搜索未付款
      unPaidTable() {
        const list = this.unPaidInput
        if(list) {
          return this.unPaidData.filter(item => {
            return Object.keys(item).some(key => {
              return String(item[key]).toLowerCase().indexOf(list) > -1
            })
          })
        }
        return this.unPaidData
      },
      // 模糊搜索已付款
      paidTable() {
        const list = this.paidInput
        if(list) {
          return this.paidData.filter(item => {
            return Object.keys(item).some(key => {
              return String(item[key]).toLowerCase().indexOf(list) > -1
            })
          })
        }
        return this.paidData
      },
      // 模糊搜索配送中
      deliveringTable() {
        const list = this.deliveringInput
        if(list) {
          return this.deliveringData.filter(item => {
            return Object.keys(item).some(key => {
              return String(item[key]).toLowerCase().indexOf(list) > -1
            })
          })
        }
        return this.deliveringData
      },
      // 模糊搜索已完成
      completedTable() {
        const list = this.completedInput
        if(list) {
          return this.completedData.filter(item => {
            return Object.keys(item).some(key => {
              return String(item[key]).toLowerCase().indexOf(list) > -1
            })
          })
        }
        return this.completedData
      }
    },
    created() {
      this.tableData()
    }
  }
</script>

<style lang="scss">
  .orderHistory-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: url("../../assets/wallhaven-x66zzd.jpg") center;
    background-size: cover;
    .back {
      width: 100%;
      .back-content {
        padding: 20px;
      }
    }
    .left-tab {
      box-sizing: border-box;
      padding-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 700px;
      // 搜索框样式
      .search-box {
        width: 100%;
        display: flex;
        margin-bottom: 10px;
      }
      .demo-form-inline {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .demo-table-expand {
        font-size: 0;
      }
      .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
      }
      .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
      .tab {
        width: 100vw;
        height: 100%;
      }
    }
  }
</style>
