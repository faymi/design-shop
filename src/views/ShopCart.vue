<template>
  <div class="cart-wrap">
    <div class="cart-content-wrap">
      <div class="cart-content" v-for="(item,index) in orderList" :key="index">
        <div class="pay-list">
          <div class="list-top">
            <div class="left">
              <img :src="item.frontXGPath">
              <div>
                <p>{{item.goodsName}}</p>
                <p>￥{{item.price}}</p>
              </div>
            </div>
            <button class="right del-btn" @click="deleteGoods(item.cartRecordId)">删除</button>
          </div>
          <div class="total">
            <span>共{{item.goodsCount}}件商品 &nbsp;&nbsp; 合计：￥{{item.total}}（含运费￥{{item.deliveryCost}}）</span>
          </div>
        </div>
      </div>
      <div class="cost-total">
        总合计：￥{{allTotal}}元
      </div>
    </div>
    <div class="bottom-btn">
      <router-link :to="{path: '/address',query: {name: 'shopcartOrder'}}">
        <button>确认下单</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { MessageBox } from 'mint-ui'
import api from '@/api/fetch'
import * as _ from '@/util/tool'

export default {
  name: 'ShopCart',
  data () {
    return {
      allTotal: 0,
      orderList: []
    }
  },
  methods: {
    deleteGoods (cartRecordId) {
      let params = {
        cartRecordId: cartRecordId
      }
      MessageBox.confirm('确定删除?').then(action => {
        api.deleteCartRecordId(params)
        .then(res => {
          if (res.code === 0) {
            this.getShopCartData()
            _.alert('删除商品成功')
          } else {
            _.alert('删除商品失败')
          }
        })
      })
    },
    getShopCartData () {
      let params = {
        shopCartId: this.shopCartId
      }
      this.$store.dispatch('showLoading', true)
      api.getShopCartList(params)
      .then(res => {
        this.$store.dispatch('showLoading', false)
        if (res.code === 0) {
          this.allTotal = res.body.cartTotal
          this.orderList = res.body.cartResult
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      shopCartId: 'shopCartId',
      customerId: 'customerId'
    })
  },
  mounted () {
    this.getShopCartData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.cart-wrap {
  width: 100%;
  height: 100%;
  padding-top: px2rem(20px);
  .cart-content-wrap {
    padding-bottom: px2rem(150px);
    .cart-content {
      width: 96%;
      margin: 0 auto;
      margin-top: px2rem(10px);
      .pay-list {
        margin: 0 auto;
        .list-top {
          display: flex;
          justify-content: space-between;
          >div.left, >button.right {
            width: 50%;
            img {
              width: px2rem(200px);
              height: px2rem(200px);
              float: left;
            }
          }
          button.right {
            text-align: right;
            line-height: px2rem(200px);
            padding-right: px2rem(20px);
          }
          button.del-btn {
            width: px2rem(100px);
            height: px2rem(40px);
            display: inline-block;
            line-height: px2rem(40px);
            border: none;
            border-radius: px2rem(20px);
            background-color: $btn-del-color;
            color: $btn-font-color;
            font-size: $btn-font-size;
            margin-top: px2rem(60px);
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
  .cost-total {
    margin-top: px2rem(10px);
    width: 100%;
    height: px2rem(80px);
    line-height: px2rem(80px);
    text-align: center;
    border-bottom: px2rem(2px) solid #ececec;    
    font-size: 16px;
  }
}
</style>