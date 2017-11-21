<template>
  <div class="wrap">
      <div class="header">
          <div class="left">
            <span>首页</span>
            <span class="icon-tips size"></span>
          </div>
          <div class="tools">
            <span class="size icon-withdraw"></span>
            <span class="size icon-next"></span>
            <span class="size icon-clear"></span> 
          </div>
          <div class="right">
            <span class="size icon-share"></span>
            <span class="size">下一步</span>
          </div>
      </div>
      <div class="content">
          i am content
      </div>
      <div class="footer" v-on:click="sayHi()">
          i am footer
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'hello world'
    }
  },
  methods: {
    sayHi () {
      alert('hi,i am hhh')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';
@import '../../static/com-icon/style';
.wrap {
  width: 100%;
  color: #959595;
  .header {
    width: auto;
    height: px2rem(60px);
    line-height: px2rem(60px);
    .left {
      width: 20%;
      float: left;
      .size {
        width: px2rem(60px);
        height: 100%;
        text-align: center;
        float: left;
        font-size: 18px;
      }
    }
    .tools {
      float: left;     
      width: 50%;
    }
    .right {
      float: left;     
      width: 30%;
    }
  }
}
</style>

