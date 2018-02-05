<template>
  <div class="pay-wrap">
    <div class="text">
      付款成功！
    </div>
    <div class="back-home">
      <router-link to="{path: '/', query: { pay: 'success' }}">
        <button>返回首页</button>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PaySuccess',
  data () {
    return {}
  },
  methods: {
  },
  mounted () {
    let textObj = document.getElementsByClassName('text')
    textObj[0].style.height = document.documentElement.clientHeight / 2 + 'px'
    textObj[0].style.lineHeight = document.documentElement.clientHeight / 2 + 'px'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.pay-wrap {
  .text {
    height: px2rem(330px);
    line-height: px2rem(360px);
    width: 100%;
    font-size: 20px;
  }
  .back-home {
    button {
        width: px2rem(240px);
        height: px2rem(90px);
        border: none;
        margin: px2rem(20px);
        // border-radius: px2rem(20px);
        color: $btn-font-color;
        font-size: 16px;
        background-color: $btn-color;
      }
  }
}
</style>