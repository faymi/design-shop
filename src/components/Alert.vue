<template>
  <div class="alert">
    <div class="alert-wrap">
      <div class="alertText">
        {{alertMsg}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Alert',
  data () {
    return {}
  },
  computed: mapState({
    alertMsg: state => state.com.alertMsg
  })
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';

.alert {
  .alert-wrap {
    position: fixed;
    width: px2rem(250px);
    height: px2rem(80px);
    line-height: px2rem(80px);
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: px2rem(20px);
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    .alertText {
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
