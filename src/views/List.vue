<template>
  <div class="list-wrap">
    <v-header :logo-img="logo" :shop-name="shopName"></v-header>
    <div class="content-wrap clearfix">
      <ul>
        <li v-for="item in goodsList" :key="item.goodsId">
          <img class="cloth-img" :src="item.goodsPicPath" @click="toDetail">
          <div class="item-cls">
            <div class="item-name">
              <span>{{item.goodsName}}</span>
              <span>￥{{item.goodsPrice}}</span>
            </div>
            <div class="item-btm">
              <router-link to="/customized">
                <button @click="toDesign(item.goodsId)">定制此款</button>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
      <div v-show="goodsList.length == 0"><i class="fa fa-info"></i>&nbsp;暂无该类商品</div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
export default {
  name: 'List',
  components: {
    'v-footer': Footer,
    'v-header': Header
  },
  data () {
    return {
      // logoImg: require('../assets/usered.png'),
      // shopName: 'myshop'
    }
  },
  computed: {
    ...mapGetters({
      goodsList: 'goodsList',
      logo: 'logo',
      shopName: 'shopName',
      domain: 'domain'
    })
  },
  methods: {
    toDetail () {
      this.$router.push('/goods-detail')
    },
    toDesign (goodsId) {
      this.$store.dispatch('setGoodsId', goodsId)
    }
  },
  mounted () {
    let params = {
      domain: this.domain,
      goodsType: 0
    }
    this.$store.dispatch('getGoodsList', params)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.list-wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  font-size: 14px;
  .content-wrap {
    min-height: 100%;
    width: 96%;
    text-align: center;
    margin-top: px2rem(116px);
    ul {
      margin: 0 auto;
      padding-bottom: px2rem(120px);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: px2rem(320px);
        height: px2rem(430px);
        margin: px2rem(16px);
        border: px2rem(2px) solid #ececec;
        .cloth-img {
          width: 100%;
          height: px2rem(320px);
        }
        .item-cls {
          text-align: center;
          margin-top: px2rem(8px);
          .item-name {
            display: flex;
            justify-content: space-between;
            height: px2rem(40px);
            width: 100%;
            span {
              padding-left: px2rem(10px);
              padding-right: px2rem(10px);            
            }
          }
          button {
            border: none;
            background-color: $btn-color;
            border-radius: px2rem(30px);
            width: px2rem(160px);
            height: px2rem(46px);
            color: $btn-font-color;
            font-size: $btn-font-size;
          }
        }
      }
    }
    
  }
}
</style>