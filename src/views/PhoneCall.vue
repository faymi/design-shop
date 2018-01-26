<template>
  <div class="phone-wrap">
    <div class="phone-number">
      客服电话：{{phoneNumber}}
    </div>
    <div class="add-address">
      <a :href="'tel: ' + phoneNumber + '#mp.weixin.qq.com'">拨打电话</a>
    </div>
  </div>
</template>

<script>
import api from '@/api/fetch'
import { mapGetters } from 'vuex'

export default {
  name: 'PhoneCall',
  data () {
    return {
      phoneNumber: ''
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      domain: 'domain'
    })
  },
  mounted () {
    let params = {
      domain: this.domain
    }
    api.getPhone(params)
    .then(res => {
      if (res.code === 0) {
        if (res.body.phone !== '') {
          this.phoneNumber = res.body.phone
        } else {
          this.phoneNumber = '暂无客服电话'
        }
      }
    })
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
    a {
      width: 100%;
      height: 100%;
      border: none;
      background-color: $btn-pay-color;
      color: $btn-font-color;
      font-size: 16px;
      display: inline-block;
    }
  }
}
</style>