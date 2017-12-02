<template>
  <div class="address-wrap">
    <div class="address-list">
      <ul>
        <li>
          <div class="user">faymi  18819411111</div>
          <div class="address">
            <span>广东省深圳南山区留学生创业大厦</span>
            <button class="del-btn">删除</button>
          </div>
          <div class="postcode">518053</div>
        </li>
      </ul>
    </div>
    <div class="add-address">
      <button>添加收货地址</button>
    </div>
    <div class="order">
        <router-link to="/pay">
          <button>确认下单</button>
        </router-link>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Address',
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
.address-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .address-list {
    width: 100%;
    margin-top: px2rem(20px);
    ul > li{
      border-top: px2rem(2px) solid #000;
      border-bottom: px2rem(2px) solid #000;      
      div {
        margin: px2rem(20px);
        height: px2rem(40px);        
        text-align: left;
        &.address {
          display: flex;
          justify-content: space-between;
          span {
            display: inline-block;
          }
          .del-btn {
            width: px2rem(100px);
            height: px2rem(40px);
            display: inline-block;
            line-height: px2rem(40px);
            border: none;
            border-radius: px2rem(20px);
            background-color: $btn-del-color;
            color: $btn-font-color;
            font-size: $btn-font-size;
          }
        }
      }
    }
  }
  .add-address {
    width: 100%;
    height: px2rem(110px);
    line-height: px2rem(110px);    
    margin-top: px2rem(20px);
    button {
      width: 100%;
      height: 100%;
      border: none;
      background-color: #fe6c00;
      color: $btn-font-color;
      font-size: 16px;
    }
  }
  .order {
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
</style>