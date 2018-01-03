<template>
  <div class="loading">
    <div class="loading-wrap">
      <div class="loading-gif">
        <div class="loading-size weui-loading"></div>
        <div class="text">{{loadingMsg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Loading',
  data () {
    return {}
  },
  computed: mapState({
    loadingMsg: state => state.com.loadingMsg
  })
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';
.loading {
  .loading-wrap {
    z-index: 999;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .loading-gif {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: px2rem(220px);
      height: px2rem(220px);
      border-radius: px2rem(20px);
      background-color: rgba(0,0,0,0.6);
      text-align: center;
      .loading-size {
        margin-top: px2rem(40px);
        width: px2rem(80px);
        height: px2rem(80px);
      }
      .text {
        margin-top: px2rem(20px);
        color: #fff;
        font-size: 14px; 
        overflow: auto;  
        margin: auto;  
        position: absolute;
        left: 0; 
        right: 0;
        bottom: px2rem(40px);
      }
    }
  }
}
</style>
