<template>
  <div class="user-wrap">
    <div class="user-content">
      <div class="user-top">
        <div class="head">
          <span @click="toAddress" class="activeTouch">收货地址</span>
          <span><img src="../assets/usered.png" alt=""></span>
          <span @click="toPhoneCall" class="activeTouch">联系客服</span>
        </div>
        <div class="user">
          <p>FAYMI</p>
          <p>广东 广州</p>
        </div>
        <div class="user-bar">
          <span class="activeTouch" v-for="(item, index) in tab" :class="{activeTab: seletedIndex === index}" :key="index" @click="selectIndex(item.val, index)">{{item.key}}</span>
        </div>
      </div>
      <div class="user-middle">
        <div class="pay-list" v-for="(item, index) in orderList" :key="item.index">
          <div class="list-top">
            <div class="left">
              <div class="left-img-wrap">
                <img :src="item.frontXGPath" @click="getOrderDetail(item.orderId)">
              </div>
              <div>
                <p>{{item.orderId}}</p>
                <!-- <p>￥69</p> -->
              </div>
            </div>
            <div class="right warn">{{item.status}}</div>
          </div>
          <div class="total">
            <span>共{{item.goodsCount}}件商品 合计：￥{{item.orderTotal}}</span>
          </div>
        </div>
        <div v-show="orderList.length == 0"><i class="fa fa-info"></i>&nbsp;暂无该类商品</div>
      </div>
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import { mapGetters } from 'vuex'
import api from '@/api/fetch'

export default {
  name: 'User',
  components: {
    'v-footer': Footer
  },
  data () {
    return {
      tab: [
        {key: '全部', val: 5},
        {key: '待付款', val: 0},
        {key: '待发货', val: 1},
        {key: '待收货', val: 2},
        {key: '已签收', val: 3},
        {key: '已关闭', val: 4}
      ],
      seletedIndex: 0,
      status: 5,
      orderList: []
    }
  },
  computed: {
    ...mapGetters({
      domain: 'domain',
      customerId: 'customerId'
    })
  },
  methods: {
    toAddress () {
      this.$router.push('/address?nosign=1')
    },
    toPhoneCall () {
      this.$router.push('/phone-call')
    },
    selectIndex (status, index) {
      this.seletedIndex = index
      this.status = status
      this.getOrderData()
    },
    getOrderData () {
      let params = {
        domain: this.domain,
        customerId: this.customerId,
        status: this.status
      }
      this.$store.dispatch('showLoading', true)
      api.getOrderList(params)
      .then(res => {
        this.$store.dispatch('showLoading', false)
        // console.log(res)
        if (res.code === 0) {
          this.orderList = res.body
        }
      })
    },
    getOrderDetail (orderId) {
      this.$router.push({path: '/pay', query: { orderId: orderId }})
    }
  },
  mounted () {
    this.getOrderData()
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
    height: 100%;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    position: relative;
    .user-top {
      height: px2rem(360px);
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
    }
    .user-middle {
      flex: 1;
      position: absolute;
      top: px2rem(360px);
      left: 0;
      right: 0;
      bottom: px2rem(112px);
      overflow: auto;
      .pay-list {
        margin: 0 auto;
        .list-top {
          display: flex;
          justify-content: space-between;
          >div.left, >div.right {
            width: 50%;
            .left-img-wrap {
              width: px2rem(200px);
              height: px2rem(200px);
              img {
                width: 100%;
                height: 100%;
                background-size: cover;
              }
            }
          }
          div.right {
            text-align: right;
            line-height: px2rem(200px);
            padding-right: px2rem(20px);
          }
          div.left {
            display: -webkit-box;
            // display: flex;
            // justify-content: flex-start;
            // align-items: center;
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
  .activeTab {
    border-bottom: px2rem(6px) solid $btn-color;
    color: $btn-color;
  }
}
</style>