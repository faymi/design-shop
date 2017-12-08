<template>
<div>
  <div class="footer">
    <div class="product">
      <i class="fa fa-picture-o"></i>
      <router-link class="" :to="{ name: 'List', params: {}}">添加图片</router-link>
    </div>
    <div class="user" @click="add_font">
      <i class="fa fa-font"></i>
      <router-link :to="{}">添加文字</router-link>
    </div>
    <div class="font-show" v-show="toggle">
      <ul>
        <li v-for="item in fonts">
          {{item.v}}
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ToolBar',
  data () {
    return {
      toggle: false,
      fonts: [
        {v: 'OpenSansCondensed'},
        {v: 'IndieFlower'},
        {v: 'Lobster'},
        {v: 'AlexBrush'},
        {v: 'Pacifico'},
        {v: 'Special Elite'},
        {v: 'Gloria Hallelujah'},
        {v: 'huakang-haibao'}
      ]
    }
  },
  methods: {
    add_font () {
      this.toggle = !this.toggle
    }
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
  .product, .user {
    width: 50%;
    text-align: center;
    line-height: px2rem(110px);
    color: #2f333c;
    a {
      color: #2f333c;
    }
  }
  .font-show {
    position: absolute;
    right: 0px;
    bottom: px2rem(110px);
    ul {
      margin: 0 auto;
      width: px2rem(300px);
      height: px2rem(300px);
      overflow-x: auto;
      background-color: #fff;
      li {
        width: 100%;
        height: px2rem(60px);
        margin: px2rem(10px);
        line-height: px2rem(60px);
        border-bottom: px2rem(2px) solid #ececec;
      }
      &::-webkit-scrollbar{
        display:none;
      }
    }
  }
}
</style>