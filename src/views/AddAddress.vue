<template>
  <div class="add-wrap">
    <div class="list-wrap">
      <div class="addlist">
        <p>收件人</p>
        <input type="text">
      </div>
      <div class="addlist">
        <p>联系电话</p>
        <input type="text">
      </div>
      <div class="addlist">
        <p>收货地址</p>
        <input type="text">
      </div>
      <div class="addlist">
        <p>邮政编码</p>
        <input type="text">
      </div>
      <div class="bottom-btn">
        <router-link to="/address">
          <button>添加地址</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AdddAddress',
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
.add-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .list-wrap {
    width: 96%;
    display: flex;
    flex-direction: column;
    margin-top: px2rem(20px); 
    .addlist {
      height: px2rem(140px);
      margin: px2rem(10px);
      text-align: center;
      input, p {
        margin: px2rem(10px);
        text-align: left;
        font-size: 16px;      
      }
      input {
        width: 100%;
        height: px2rem(70px);
        border: px2rem(2px) solid #ececec;
      }
    }
  }
}
</style>