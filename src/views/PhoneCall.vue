<template>
  <div class="phone-wrap">
    <div class="phone-number">
      客服电话：{{phoneNumber}}
    </div>
    <div class="add-address">
      <router-link to="">
        <button>拨打电话</button>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PhoneCall',
  data () {
    return {
      phoneNumber: '400-820-820'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.phone-wrap {
  width: 100%;
  height: 100%;
  .phone-number {
    height: px2rem(80px);
    line-height: px2rem(80px);
    margin: px2rem(20px);
    border-top: px2rem(2px) solid #ececec;
    border-bottom: px2rem(2px) solid #ececec;
    font-size: 16px;
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
      background-color: $btn-pay-color;
      color: $btn-font-color;
      font-size: 16px;
    }
  }
}
</style>