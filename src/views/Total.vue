<template>
  <div class="total-wrap">
    <div class="total-main">
      <div class="total-top">
        <div class="total-top-left">
          <ul>
            <li><img src="../assets/t-shirt.png"></li>
            <li><img src="../assets/t-shirt.png"></li>
          </ul>
        </div>
        <div class="total-top-right">
          <span>
            定制单价
          </span>
          <span>
            ￥60
          </span>
        </div>
      </div>
      <div class="total-center">
        <p>选择商品数量&尺寸</p>
        <ul>
          <li>
            <div class="left">S</div>
            <div class="right">
              <i class="fa fa-minus-circle"></i>
              <span>12</span>
              <i class="fa fa-plus-circle"></i>
            </div>
          </li>
          <li>
            <div class="left">M</div>
            <div class="right">
              <i class="fa fa-minus-circle"></i>
              <span>12</span>
              <i class="fa fa-plus-circle"></i>
            </div>
          </li>
          <li>
            <div class="left">L</div>
            <div class="right">
              <i class="fa fa-minus-circle"></i>
              <span>12</span>
              <i class="fa fa-plus-circle"></i>
            </div>
          </li>
        </ul>
        <div class="total-price">
          <div class="left">总价</div>
          <div class="right">
            10*60 = 600 元
          </div>
        </div>
      </div>
      <div class="total-bottom">
        <router-link to="/address">
          <button>下一步</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Total',
  data () {
    return {}
  },
  methods: {
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
      border: px2rem(2px) solid #000;
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
            img {
              width: 100%;
              height: 100%;
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
      border: px2rem(2px) solid #000;
      border-radius: px2rem(20px);
      p {
        text-align: left;
        margin: px2rem(20px);
        font-size: 16px;
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
        }
      }
      .total-price {
        margin: px2rem(20px);
        border-top: px2rem(2px) solid #000;
        display: flex;
        justify-content: space-between;
        div {
          margin-top: px2rem(20px);
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .total-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      button {
        border: none;
        width: 100%;
        height: px2rem(110px);
        background-color: $btn-color;
        color: $btn-font-color;
        font-size: 20px;
      }
    }
  }
}
</style>