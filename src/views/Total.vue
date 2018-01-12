<template>
  <div class="total-wrap">
    <div class="total-main">
      <div class="total-top">
        <div class="total-top-left">
          <ul>
            <li>
              <img :src="frontImg">
              <div class="img-front-made">
                <img :src="frontImgMade" alt="">
              </div>
            </li>
            <li>
              <img :src="backImg">
              <div class="img-front-made">
                <img :src="backImgMade" alt="">
              </div>
            </li>
          </ul>
        </div>
        <div class="total-top-right">
          <span>
            定制单价
          </span>
          <span>
            ￥{{designPrice}}
          </span>
        </div>
      </div>
      <div class="total-center">
        <p>选择商品数量&尺寸</p>
        <ul>
          <li v-if="showS">
            <div class="left">S</div>
            <div class="right">
              <i class="fa fa-minus activeTouch" @click="minus('s')"></i>
              <input type="text" v-model="inputS"/>
              <i class="fa fa-plus activeTouch" @click="plus('s')"></i>
            </div>
          </li>
          <li v-if="showM">
            <div class="left">M</div>
            <div class="right">
              <i class="fa fa-minus activeTouch" @click="minus('m')"></i>
              <input type="text" v-model="inputM"/>
              <i class="fa fa-plus activeTouch" @click="plus('m')"></i>
            </div>
          </li>
          <li v-if="showL">
            <div class="left">L</div>
            <div class="right">
              <i class="fa fa-minus activeTouch" @click="minus('l')"></i>
              <input type="text" v-model="inputL"/>
              <i class="fa fa-plus activeTouch" @click="plus('l')"></i>
            </div>
          </li>
          <li v-if="showXL">
            <div class="left">XL</div>
            <div class="right">
              <i class="fa fa-minus activeTouch" @click="minus('xl')"></i>
              <input type="text" v-model="inputXL"/>
              <i class="fa fa-plus activeTouch" @click="plus('xl')"></i>
            </div>
          </li>
          <li v-if="show2XL">
            <div class="left">2XL</div>
            <div class="right">
              <i class="fa fa-minus activeTouch" @click="minus('2xl')"></i>
              <input type="text" v-model="input2XL"/>
              <i class="fa fa-plus activeTouch" @click="plus('2xl')"></i>
            </div>
          </li>
          <li v-if="show3XL">
            <div class="left">3XL</div>
            <div class="right">
              <i class="fa fa-minus activeTouch" @click="minus('3xl')"></i>
              <input type="text" v-model="input3XL"/>
              <i class="fa fa-plus activeTouch" @click="plus('3xl')"></i>
            </div>
          </li>
        </ul>
        <div class="total-price">
          <div class="left">总价</div>
          <div class="right">
            <span v-if="totalPrice == 0">{{totalPrice}} 元</span>
            <span v-else>{{totalNum}}*{{designPrice}} = {{totalPrice}} 元</span>
          </div>
        </div>
      </div>
      <div class="total-bottom-left">
        <button @click="addToShopCart">加入购物车</button>
      </div>
      <div class="total-bottom-right">
        <button @click="makeOrder">直接下单</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as _ from '@/util/tool'
import api from '@/api/fetch'

export default {
  name: 'Total',
  data () {
    return {
      frontImg: require('../assets/t-shirt-front.jpg'),
      // frontImgMade: require('../assets/txu.jpg'),
      backImg: require('../assets/t-shirt.png'),
      // backImgMade: require('../assets/logo.png'),
      designPrice: 0,
      totalPrice: 0,
      totalNum: 0,
      inputS: 0,
      inputM: 0,
      inputL: 0,
      inputXL: 0,
      input2XL: 0,
      input3XL: 0,
      sizeMaxS: 0,
      sizeMaxM: 0,
      sizeMaxL: 0,
      sizeMaxXL: 0,
      sizeMax2XL: 0,
      sizeMax3XL: 0,
      showS: false,
      showM: false,
      showL: false,
      showXL: false,
      show2XL: false,
      show3XL: false
    }
  },
  computed: {
    ...mapGetters({
      frontImgMade: 'frontMadeImg',
      backImgMade: 'backMadeImg',
      goodsInfo: 'goodsInfo',
      goodsId: 'goodsId',
      domain: 'domain',
      shopCartId: 'shopCartId'
    })
  },
  methods: {
    addShopCartData (type) {
      let detail = []
      if (this.inputS !== 0) {
        detail.push({sizeId: 'S', amount: this.inputS})
      }
      if (this.inputM !== 0) {
        detail.push({sizeId: 'M', amount: this.inputM})
      }
      if (this.inputL !== 0) {
        detail.push({sizeId: 'L', amount: this.inputL})
      }
      if (this.inputXL !== 0) {
        detail.push({sizeId: 'XL', amount: this.inputXL})
      }
      if (this.input2XL !== 0) {
        detail.push({sizeId: 'XXL', amount: this.input2XL})
      }
      if (this.input3XL !== 0) {
        detail.push({sizeId: 'XXXL', amount: this.input3XL})
      }
      if (detail.length === 0) {
        _.alert('请先添加商品数量')
        return
      }
      let params = {
        goodsId: this.goodsId,
        colorId: this.goodsInfo.colorId,
        printing: this.goodsInfo.printing,
        goodsName: this.goodsInfo.goodsName,
        detail: detail,
        total: this.totalPrice,
        goodsCount: this.totalNum,
        frontImg: this.frontImgMade,
        backImg: this.backImgMade
      }
      // 0 添加购物车  1 直接下单
      if (type === '0') {
        params.shopCartId = this.shopCartId
        params.insertTime = this.moment().format('YYYY-MM-DD hh:mm:ss')
        this.$store.dispatch('addShopCart', params)
        this.$store.dispatch('showLoading', true)
        api.addShopCart(params)
        .then(res => {
          if (res.code === 0) {
            this.$store.dispatch('showLoading', false)
            this.$router.push('/add-to-cart')
          }
        })
      } else {
        params.domain = this.domain
        this.$store.dispatch('addSingleOrder', params)
        this.$router.push('/address')
      }
    },
    addToShopCart () {
      this.addShopCartData('0')
    },
    makeOrder () {
      this.addShopCartData('1')
    },
    // 减数量
    minus (type) {
      if (type === 's') {
        if (this.inputS > 0) {
          this.inputS--
        }
      }
      if (type === 'm') {
        if (this.inputM > 0) {
          this.inputM--
        }
      }
      if (type === 'l') {
        if (this.inputL > 0) {
          this.inputL--
        }
      }
      if (type === 'xl') {
        if (this.inputXL > 0) {
          this.inputXL--
        }
      }
      if (type === '2xl') {
        if (this.input2XL > 0) {
          this.input2XL--
        }
      }
      if (type === '3xl') {
        if (this.input3XL > 0) {
          this.input3XL--
        }
      }
      this.totalNum = this.inputS + this.inputM + this.inputL + this.inputXL + this.input2XL + this.input3XL
      this.totalPrice = this.totalNum * this.designPrice
    },
    // 加数量
    plus (type) {
      if (type === 's') {
        if (this.inputS < this.sizeMaxS) {
          this.inputS++
        } else {
          _.alert('货存不足！')
        }
      }
      if (type === 'm') {
        if (this.inputM < this.sizeMaxM) {
          this.inputM++
        } else {
          _.alert('货存不足！')
        }
      }
      if (type === 'l') {
        if (this.inputL < this.sizeMaxL) {
          this.inputL++
        } else {
          _.alert('货存不足！')
        }
      }
      if (type === 'xl') {
        if (this.inputXL < this.sizeMaxXL) {
          this.inputXL++
        } else {
          _.alert('货存不足！')
        }
      }
      if (type === '2xl') {
        if (this.input2XL < this.sizeMax2XL) {
          this.input2XL++
        } else {
          _.alert('货存不足！')
        }
      }
      if (type === '3xl') {
        if (this.input3XL < this.sizeMax3XL) {
          this.input3XL++
        } else {
          _.alert('货存不足！')
        }
      }
      this.totalNum = this.inputS + this.inputM + this.inputL + this.inputXL + this.input2XL + this.input3XL
      this.totalPrice = this.totalNum * this.designPrice
    }
  },
  mounted () {
    let params = {
      domain: this.domain,
      colorId: this.goodsInfo.colorId,
      goodsId: this.goodsId
    }
    this.$store.dispatch('showLoading', true)
    api.getGoodsInfo(params)
    .then(res => {
      this.$store.dispatch('showLoading', false)
      if (res.code === 0) {
        this.frontImg = res.body.imageList[0].frontXGPath
        this.backImg = res.body.imageList[0].backXGPath
        this.designPrice = res.body.doublePrice
        let sizeList = res.body.sizeList
        for (let i in sizeList) {
          if (sizeList[i].sizeId === 'S') {
            this.showS = true
            this.sizeMaxS = sizeList[i].amount
          }
          if (sizeList[i].sizeId === 'M') {
            this.showM = true
            this.sizeMaxM = sizeList[i].amount
          }
          if (sizeList[i].sizeId === 'L') {
            this.showL = true
            this.sizeMaxL = sizeList[i].amount
          }
          if (sizeList[i].sizeId === 'XL') {
            this.showXL = true
            this.sizeMaxXL = sizeList[i].amount
          }
          if (sizeList[i].sizeId === 'XXL') {
            this.show2XL = true
            this.sizeMax2XL = sizeList[i].amount
          }
          if (sizeList[i].sizeId === 'XXXL') {
            this.show3XL = true
            this.sizeMax3XL = sizeList[i].amount
          }
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.left {
  font-size: 16px;
  font-weight: bold;
}
.total-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .total-main {
    width: 96%;
    height: 100%;
    margin: 0 auto;
    .total-top {
      margin: px2rem(10px);
      border: px2rem(2px) solid $border-color;
      border-radius: px2rem(20px);
      display: flex;
      justify-content: space-between;
      .total-top-left {
        width: 70%;
        ul {
          display: flex;
          justify-content: flex-start;
          padding-left: px2rem(10px);
          li {
            width: px2rem(220px);
            height: px2rem(240px);
            margin: px2rem(10px);
            background-size: cover;
            position: relative;
            >img {
              width: 100%;
              height: 100%;
            }
            div.img-front-made {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: px2rem(120px);
              height: px2rem(140px);
              border: px2rem(2px) dashed #393939;
              background-size: cover;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .total-top-right {
        width: 30%;
        span {
          display: inline-block;
          width: 100%;
          &:first-child {
            height: px2rem(60px);
            line-height: px2rem(60px);
            margin-top: px2rem(70px);
            font-size: 14px;
            
          }
          &:nth-child(2) {
            height: px2rem(80px);
            line-height: px2rem(80px);
            font-size: 22px;
            font-weight: bold;
          }
        }
      }
    }
    .total-center {
      margin-top: px2rem(20px);
      margin-left: px2rem(10px);
      margin-right: px2rem(10px);
      border: px2rem(2px) solid $border-color;
      border-radius: px2rem(20px);
      p {
        text-align: left;
        margin: px2rem(20px);
        font-size: 14px;
        font-weight: bold;
      }
      ul {
        margin: px2rem(20px);
        font-size: 16px;
        font-weight: bold;
        li {
          height: px2rem(80px);
          display: flex;
          justify-content: space-between;
          input {
            width: px2rem(80px);
            text-align: center;
            border: px2rem(2px) solid #e6e6e6;
            margin: 0 px2rem(5px);
          }
        }
      }
      .total-price {
        margin: px2rem(20px);
        border-top: px2rem(2px) solid $border-color;
        display: flex;
        justify-content: space-between;
        div{
          margin-top: px2rem(20px);
          span {
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
    .total-bottom-left {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 50%;
      button {
        border: none;
        width: 100%;
        height: px2rem(110px);
        background-color: $btn-add-color;
        color: $btn-font-color;
        font-size: 16px;
      }
    }
    .total-bottom-right {
      position: fixed;
      bottom: 0;
      right: 0;
      width: 50%;
      button {
        border: none;
        width: 100%;
        height: px2rem(110px);
        background-color: $btn-color;
        color: $btn-font-color;
        font-size: 16px;
      }
    }
  }
}
</style>