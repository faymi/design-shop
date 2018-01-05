<template>
  <div class="head">
      <div class="left">
        <div class="img-wrap">
          <img :src="logoImg" alt="">
          <span>{{shopName}}</span>
        </div>
      </div>
      <div class="right">
        <span class="fa fa-shopping-cart" @click="toShopCart"></span>
        <span class="fa fa-navicon" @click="showList = !showList"></span>
      </div>
      <div class="list-drop" v-show="showList">
        <ul>
          <li v-for="item in goodsSort" :key="item.val" @click="sort(item.val)">{{item.key}}</li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    logoImg: {
      type: String,
      default: ''
    },
    shopName: {
      type: String,
      default: ''
    },
    goodsSort: {
      type: Array,
      default: function () {
        return [
          {key: '全部', val: 0},
          {key: 'T恤', val: 1},
          {key: '卫衣', val: 2},
          {key: 'Polo衫', val: 3}
        ]
      }
    }
  },
  data () {
    return {
      showList: false
    }
  },
  methods: {
    toShopCart () {
      this.$router.push('/shop-cart')
    },
    // 分类
    sort (val) {
      let params = {
        domain: '1092b56c4d494f63ac37bb16baf4c6be',
        goodsType: val
      }
      this.showList = false
      this.$store.dispatch('getGoodsList', params)
    }
  },
  mounted () {
    let item = document.getElementsByClassName('list-drop')
    item[0].style.height = document.body.scrollHeight + 'px'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.head {
  width: 100%;
  height: px2rem(110px);
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: px2rem(2px) solid #ececec; 
  position: fixed;
  top: 0;
  left: 0;
  font-size: 14px;
  .left {
    .img-wrap {
      margin-top: px2rem(5px);
      margin-left: px2rem(20px);
      width: px2rem(100px);
      height: px2rem(100px);
      display: flex;
      justify-content: flex-start;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
        border-radius: px2rem(50px);
      }
      span {
        line-height: px2rem(110px);
        margin-left: px2rem(10px);
        white-space: nowrap;
      }
    }
  }
  .right {
    margin-right: px2rem(20px);
    span {
      font-size: 22px;
      margin-left: px2rem(20px);
      line-height: px2rem(110px);
    }
  }
  .list-drop {
    position: absolute;
    top: px2rem(120px);
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    ul {
      background: #fff;
      li {
        width: 100%;
        height: px2rem(60px);
        line-height: px2rem(60px);
        border-bottom: px2rem(2px) solid #ececec;         
      }
    }
  }
}
</style>