<template>
  <div class="detail-wrap">
    <div class="wrap-view">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <van-swipe>
            <van-swipe-item v-for="(str, index) in listImg" :key="index">
              <img v-lazy="str.goodsPicPath" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="goods-name">
        <span>{{goodsName}}</span>
        <span>￥{{price}}</span>
      </div>
      <div class="print-skill">
        <span><b>印刷工艺：</b>{{printSkill}}</span>
      </div>
      <div class="goods-detail">
        <span><b>商品简介：</b>{{goodsDescript}}</span>
      </div>
      <div class="bottom-btn">
        <button @click="toDesign">立即定制</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from '@/api/fetch'

export default {
  name: 'GoodsDetail',
  data () {
    return {
      goodsName: '',
      price: 0,
      printSkill: '',
      goodsDescript: '',
      listImg: [],
      goodsId: ''
    }
  },
  methods: {
    toDesign () {
      this.$store.dispatch('setGoodsId', this.goodsId)
      this.$router.push('/customized')
    }
  },
  computed: {
    ...mapGetters({
      domain: 'domain'
    })
  },
  mounted () {
    // let swiper = new Swiper('.swiper-container', {
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets'
    //   },
    //   autoplay: true,
    //   on: {
    //     touchEnd: function (event) {
    //       swiper.autoplay.start()
    //     }
    //   }
    // })
    this.goodsId = this.$route.query.goodsId
    let params = {
      goodsId: this.goodsId,
      domain: this.domain
    }
    api.getGoodsDetail(params)
    .then(res => {
      if (res.code === 0) {
        let result = res.body
        this.listImg = result.scImageList
        this.goodsDescript = result.goodsDescript
        this.price = result.price
        this.printSkill = result.printing
        this.goodsName = result.goodsName
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.detail-wrap {
  .wrap-view {
    padding-bottom: px2rem(114px);
    overflow: auto;
    .swiper-container {
      width: 100%;
      height: px2rem(750px);
      .swiper-wrapper {
        width: 100%;
        height: 100%;
        .van-swipe {
          width: 100%;
          height: 100%;
          background-size: cover;
          .van-swipe__track .van-swipe-item img {
            height: 100%;
            width: 100%;
            background-size: cover;
          }
        }
      }
    }
    .goods-name {
      display: flex;
      justify-content: space-between;
      margin: px2rem(20px);
      span {
        &:first-child {
          font-size: 16px;
          font-weight: bold;
        }
      }
      span {
        &:nth-child(2) {
          font-size: 16px;
        }
      }
    }
    .print-skill, .goods-detail {
      text-align: left;
      margin: px2rem(20px);
      b {
        font-weight: bold;
      }
    }
    .goods-detail {
      span {
        line-height: px2rem(46px);
      }
    }
  }
}

</style>