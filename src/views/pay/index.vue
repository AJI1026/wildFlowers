<template>
  <div class="paySuccess-container">
    <div class="box">
      <div class="L">L</div>
      <div class="o">o</div>
      <div class="a">a</div>
      <div class="d">d</div>
      <div class="i">i</div>
      <div class="n">n</div>
      <div class="g">g</div>
    </div>
    <!--支付返回的信息-->
    <div class="orderMsg">
      {{message}}
      <el-button type="primary" class="btn" @click="resetCart">返回购物车</el-button>
    </div>
  </div>
</template>

<script>
  import { payJudge, orderChangeStatus, step, decreaseStep, deleteGoods } from '@/api'

  export default {
    name: 'paySuccess-container',
    inject: ['reload'],
    data() {
      return {
        // 订单状态
        orderStatus: '',
        // message
        message: '',
        // 订单号
        orderId: this.$route.query.out_trade_no,
        // 支付宝交易号
        alipayNo: this.$route.query.trade_no,
      }
    },
    methods: {
      // 支付返回的订单状态信息
      async payReturn() {
        let data = {
          out_trade_no: this.$route.query.out_trade_no,
          trade_no: this.$route.query.trade_no
        }
        const M = await payJudge(data)
        this.orderStatus = M.data.orderStatus
        this.message = M.data.msg
      },
      // 跳转到购物车页面，设置订单状态，清空localstorage订单号，清空商品列表，设置step到第一步
      async resetCart() {
        let data = {
          'orderId': this.orderId,
          'orderStatus': 3,
          'alipayNo': Number(this.alipayNo)
        }
        await orderChangeStatus(data)
        const nowStep = await step()
        if( nowStep.data.stepData[0].step > 1) {
          await decreaseStep(nowStep.data.stepData[0].step)
        }
        localStorage.setItem('getOrderId', '')
        await this.$router.push('/cart')
        await deleteGoods()
      }
    },
    created() {
      this.payReturn()
    }
  }
</script>

<style lang="css">
  .paySuccess-container {
    display: flex;
    flex-wrap: wrap;
    background-color: #1D3557;
    height: 100%;
    width: 100%;
  }
  .orderMsg {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin: -200px auto;
    width: 100%;
    height: 60px;
  }
  .orderMsg > .btn {
    margin-left: 20px;
  }
  .box {
    display: flex;
    width: 100%;
    height: 100px;
    margin: 200px auto;
    justify-content: center;
  }
  .box > div {
    color: white;
    height: 100px;
    font-size: 100px;
    text-align: center;
    line-height: 100px;
    font-weight: 900;
    text-shadow: 0 0 10px white;
    margin-left: 10px;
    opacity: 0;
  }
  .L {
    animation: L .5s 0s alternate infinite;
  }
  @keyframes L {
    from {
      transform: scale(1);
      opacity: 0;
    }
    to {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  .o {
    animation: o .5s 1s alternate infinite;
  }
  @keyframes o {
    from {
      transform: scale(1);
      opacity: 0;
    }
    to {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  .a {
    animation: a .5s 2s alternate infinite;
  }
  @keyframes a {
    from {
      transform: scale(1);
      opacity: 0;
    }
    to {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  .d {
    animation: d .5s 3s alternate infinite;
  }
  @keyframes d {
    from {
      transform: scale(1);
      opacity: 0;
    }
    to {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  .i {
    animation: i .5s 4s alternate infinite;
  }
  @keyframes i {
    from {
      transform: scale(1);
      opacity: 0;
    }
    to {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  .n {
    animation: n .5s 5s alternate infinite;
  }
  @keyframes n {
    from {
      transform: scale(1);
      opacity: 0;
    }
    to {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  .g {
    animation: g .5s 6s alternate infinite;
  }
  @keyframes g {
    from {
      transform: scale(1);
      opacity: 0;
    }
    to {
      transform: scale(1.1);
      opacity: 1;
    }
  }
</style>
