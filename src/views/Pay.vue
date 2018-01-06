<template>
  <div class="pay-wrap">
    <div class="pay-content">
      <div v-for="(item, index) in orderList" :key="index">
        <div class="pay-top">
          <p>{{item.goodsName}}</p>
          <div>数量：12件S码，12件M码，12件L码，12件XL码，共60件</div>
          <div>总价：10*60 = 600元</div>
        </div>
        <div class="pay-img">
          <img :src="item.frontImg">
          <img :src="item.backImg">
        </div>
      </div>
      <div class="pay-address">
        <div>{{userId}}&nbsp;&nbsp;{{phone}}</div>
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

export default {
  name: 'Pay',
  data () {
    return {
      userId: 'faymi',
      phone: '400880550',
      address: '广东省深圳南山区留学生创业大厦',
      orderList: [
        {
          frontImg: require('../assets/txu.jpg'),
          backImg: require('../assets/txu-back.jpg'),
          goodsName: '纯棉T恤'
        },
        {
          frontImg: require('../assets/txu.jpg'),
          backImg: require('../assets/txu-back.jpg'),
          goodsName: '纯棉T恤'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      shopcartList: 'shopcartList'
    })
  },
  methods: {
    weChatPay () {
      this.$router.push('/pay-success')
    }
  },
  mounted () {
    console.log(this.shopcartList)
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
      img {
        width: px2rem(340px);
        height: px2rem(400px);
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