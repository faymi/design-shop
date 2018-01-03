<template>
  <div class="user-wrap">
    <div class="user-content">
      <div class="user-top">
        <div class="head">
          <span @click="toAddress">收货地址</span>
          <span><img src="../assets/usered.png" alt=""></span>
          <span @click="toPhoneCall">联系客户</span>
        </div>
        <div class="user">
          <p>FAYMI</p>
          <p>广东 广州</p>
        </div>
      </div>
      <div class="user-bar">
        <span>全部</span>
        <span>待付款</span>
        <span>待发货</span>
        <span>待收货</span>
        <span>已签收</span>
      </div>
      <div class="pay-list">
        <div class="list-top">
          <div class="left">
            <img src="../assets/t-shirt.png">
            <div>
              <p>纯棉T恤</p>
              <p>￥69</p>
            </div>
          </div>
          <div class="right warn">待付款</div>
        </div>
        <div class="total">
          <span>共12件商品 合计：￥160.00（含运费￥10.00）</span>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'User',
  components: {
    'v-footer': Footer
  },
  data () {
    return {}
  },
  methods: {
    toAddress () {
      this.$router.push('/address')
    },
    toPhoneCall () {
      this.$router.push('/phone-call')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.user-wrap {
  width: 100%;
  height: 100%;
  .user-content {
    width: 96%;
    margin: 0 auto;
    .user-top {
      .head {
        display: flex;
        justify-content: space-around;
        margin-top: px2rem(20px);
        span {
          display: inline-block;
          height: px2rem(140px);
          line-height: px2rem(140px);
          img {
            width: px2rem(120px);
            height: px2rem(120px);
          }
        }
      }
      .user {
        p {
          margin: px2rem(10px);
          &:first-child {
            font-weight: bold;
          }
        }
      }
    }
    .user-bar {
      width: 100%;
      margin: px2rem(20px) 0 px2rem(20px) 0;
      border-top: px2rem(2px) solid #ececec; 
      border-bottom: px2rem(2px) solid #ececec; 
      display: flex;
      justify-content: flex-start;
      span {
        display: inline-block;
        width: 25%;
        height: px2rem(80px);
        line-height: px2rem(80px);
      }
    }
    .pay-list {
      margin: 0 auto;
      .list-top {
        display: flex;
        justify-content: space-between;
        >div.left, >div.right {
          width: 50%;
          img {
            width: px2rem(200px);
            height: px2rem(200px);
            float: left;
          }
        }
        div.right {
          text-align: right;
          line-height: px2rem(200px);
          padding-right: px2rem(20px);
        }
        div.left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          p {
            margin: px2rem(10px);
            font-size: 14px;
          }
        }
      }
      .total {
        width: 100%;
        height: px2rem(50px);
        text-align: left;
        margin: px2rem(20px) 0 px2rem(20px) 0;
        border-bottom: px2rem(2px) solid #ececec;
        span {
          font-size: 14px;
        }
      }
    }
    
  }
}
</style>