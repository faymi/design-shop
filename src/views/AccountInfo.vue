<template>
  <div class="content-wrap">
    <div class="header">
      <div class="left">账号资料</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountInfo',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';
.header {
  width: 100%;
  height: 40px;
  .left {
    width: 200px;
    height: 100%;
    float: left;
    text-align: left;
    line-height: 40px;
  }
}
</style>
