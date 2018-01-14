<template>
  <div class="pay-wrap">
    <div class="pay-content">
      <div v-for="(item, index) in orderList" :key="index">
        <div class="pay-top">
          <p>{{item.goodsName}}</p>
          <div class="order-status">{{status}}</div>
          <div>订单号：{{orderId}}</div>
          <div>数量：<span v-for="(sizeItem,index) in item.sizeList" :key="index">{{sizeItem.buyCount}}件{{sizeItem.sizeId}}码、</span>，共{{item.buyCount}}件</div>
          <div>总价：{{item.buyCount}} x {{item.price}} = {{item.goodsTotalPrice}}元</div>
        </div>
        <div class="pay-img">
          <div class="pay-img-wrap">
            <img :src="item.frontXGPath">
            <div><img :src="item.frontSCPath"></div>
          </div>
          <div class="pay-img-wrap">
            <img :src="item.backXGPath">
            <div><img :src="item.backSCPath"></div>
          </div>
        </div>
      </div>
      <div class="pay-address">
        <div><b>{{userId}}</b>&nbsp;&nbsp;{{phone}}</div>
        <div>{{address}}</div>
      </div>
      <div class="pay-btn">
        <button>稍后付款</button>
        <button @click="weChatPay">微信支付</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/fetch'

export default {
  name: 'Pay',
  data () {
    return {
      userId: '',
      phone: '',
      address: '',
      orderId: '',
      status: '',
      orderList: [
        {
          frontImg: require('../assets/txu.jpg'),
          backImg: require('../assets/txu-back.jpg'),
          goodsName: '纯棉T恤',
          status: 0
        },
        {
          frontImg: require('../assets/txu.jpg'),
          backImg: require('../assets/txu-back.jpg'),
          goodsName: '纯棉T恤',
          status: 1
        }
      ],
      goodsInfoResult: []
    }
  },
  computed: {
    ...mapGetters({
      shopcartList: 'shopcartList',
      domain: 'domain'
    })
  },
  methods: {
    weChatPay () {
      this.$router.push('/pay-success')
    }
  },
  mounted () {
    this.$store.dispatch('showLoading', true)
    this.orderId = this.$route.query.orderId
    let params = {
      orderId: this.orderId,
      domain: this.domain
    }
    api.getOrderDetail(params)
    .then(res => {
      this.$store.dispatch('showLoading', false)
      if (res.code === 0) {
        this.orderList = res.body.goodsInfoResult
        this.address = res.body.addressResult.address
        this.phone = res.body.addressResult.phone
        this.userId = res.body.addressResult.consignee
        this.status = res.body.addressResult.status
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.pay-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .pay-content {
    width: 96%;
    margin: 0 auto;
    margin-top: px2rem(20px);
    .pay-top {
      width: 100%;
      margin-top: px2rem(20px);
      border-bottom: px2rem(2px) solid #ececec;
      padding-bottom: px2rem(20px);
      position: relative;
      .order-status {
        position: absolute;
        top: px2rem(10px);
        right: px2rem(10px);
      }
      p {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
      }
      div {
        text-align: left;
        margin: px2rem(10px) 0 px2rem(10px) 0;
        font-size: 14px;
      }
    }
    .pay-img {
      width: 100%;
      margin-top: px2rem(20px);
      display: flex;
      justify-content: space-between;
      border-bottom: px2rem(2px) solid #ececec; 
      padding-bottom: px2rem(20px);
      div.pay-img-wrap {
        width: px2rem(340px);
        height: px2rem(400px);
        position: relative;
        img {
          width: 100%;
          height: 100%;
          background-size: cover;
        }
        div {
          width: px2rem(170px);
          height: px2rem(200px);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .pay-address {
      width: 100%;
      margin-top: px2rem(20px); 
      border-bottom: px2rem(2px) solid #ececec; 
      padding-bottom: px2rem(20px);
      div {
        margin: px2rem(10px);
        text-align: left;
        font-size: 14px;
      }
    }
    .pay-btn {
      width: 100%;
      margin: 0 auto;
      margin-top: px2rem(20px);
      button {
        width: 70%;
        height: px2rem(90px);
        border: none;
        margin: px2rem(20px);
        border-radius: px2rem(20px);
        color: $btn-font-color;
        font-size: 16px;
        &:nth-child(2) {
          background-color: #00cc33;
        }
      }
    }
  }
}
</style>