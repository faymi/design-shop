<template>
  <div class="footer">
    <div class="product activeTouch">
      <i class="fa fa-shopping-bag"></i>
      <router-link class="" :to="{ name: 'List', query: {domain: domian}}">商品</router-link>
    </div>
    <div class="user activeTouch">
      <i class="fa fa-user-circle"></i>
      <router-link :to="{ name: 'User', params: {}}">我的</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      domian: 'domain'
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.footer {
  width: 100%;
  height: px2rem(110px);
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-top: px2rem(2px) solid #ececec; 
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 14px;
  .product, .user {
    width: 50%;
    text-align: center;
    line-height: px2rem(110px);
    color: #2f333c;
    a {
      color: #2f333c;
    }
  }
}
</style>