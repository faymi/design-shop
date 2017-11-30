<template>
  <div class="list-wrap">
    <div class="content-wrap clearfix">
      <ul>
        <li v-for="item in list">
          <img class="cloth-img" :src="item.shirt_src">
          <div class="item-cls">
            <div class="item-name">
              <span>{{item.name}}</span>
              <span>￥{{item.price}}</span>
            </div>
            <div class="item-btm">
              <button>定制此款</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  name: 'List',
  components: {
    Footer
  },
  data () {
    return {
      list: [
        {
          shirt_src: require('../assets/t-shirt.png'),
          name: '纯棉T恤',
          price: 69
        },
        {
          shirt_src: require('../assets/t-shirt.png'),
          name: '纯棉T恤',
          price: 69
        },
        {
          shirt_src: require('../assets/t-shirt.png'),
          name: '纯棉T恤',
          price: 69
        },
        {
          shirt_src: require('../assets/t-shirt.png'),
          name: '纯棉T恤',
          price: 69
        },
        {
          shirt_src: require('../assets/t-shirt.png'),
          name: '纯棉T恤',
          price: 69
        },
        {
          shirt_src: require('../assets/t-shirt.png'),
          name: '纯棉T恤',
          price: 69
        },
        {
          shirt_src: require('../assets/t-shirt.png'),
          name: '纯棉T恤',
          price: 69
        }
      ]
    }
  },
  methods: {
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
    display: flex;
    justify-content: space-between;
    ul {
      margin: 0 auto;
      text-align: left;
      padding-bottom: px2rem(120px);
      li {
        width: px2rem(320px);
        height: px2rem(430px);
        margin: px2rem(16px);
        border: px2rem(2px) solid #ececec;
        display: inline-block;
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
            background-color: #578ffe;
            border-radius: px2rem(30px);
            width: px2rem(160px);
            height: px2rem(46px);
            color: #fff;
            font-size: 12px;
          }
        }
      }
    }
    
  }
}
</style>