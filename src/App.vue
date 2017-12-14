<template>
  <div id="app">
    <div class="container">
      <div class="header" v-show="header_show">
        <div class="left">idea2t</div>
        <div class="right">faymi</div>
      </div>
      <div class="aside" v-show="aside_show">
        <el-menu default-active="/home" class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/home" :class="{'isActive': active}">首页概览</el-menu-item>
          <el-menu-item index="/orderManage" :class="{'isActive': !active}">订单管理</el-menu-item>
          <el-menu-item index="/goodsManage" :class="{'isActive': !active}">商品管理</el-menu-item>
          <el-menu-item index="/accountManage" :class="{'isActive': !active}">账号管理</el-menu-item>
          <el-menu-item index="/customManage" :class="{'isActive': !active}">用户列表</el-menu-item>
          <el-menu-item index="/incomeManage" :class="{'isActive': !active}">收益明细</el-menu-item>
          <el-menu-item index="/accountInfo" :class="{'isActive': !active}">账号资料</el-menu-item>
        </el-menu>
      </div>
      <div :class="{'main': ismain}">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      active: true,
      header_show: true,
      aside_show: true,
      path: '',
      ismain: false
    }
  },
  watch: {
    '$route' (to, from) {
      let path = to.path.split('/')[1]
      if (path === 'login' || path === 'orderDetail' || path === 'accountDetail') {
        this.header_show = false
        this.aside_show = false
        this.ismain = false
      } else {
        this.header_show = true
        this.aside_show = true
        this.ismain = true
      }
    }
  },
  created () {
    this.path = this.$route.path
    if (this.path === '/login' || this.path === '/orderDetail' || this.path === '/accountDetail') {
      this.header_show = false
      this.aside_show = false
      this.ismain = false
    } else {
      this.header_show = true
      this.aside_show = true
      this.ismain = true
    }
  }
}
</script>

<style <style lang="scss" scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 60px;
  background-color: rgb(84, 92, 100);
}
.header .left {
  width: 200px;
  height: 100%;
  float: left;
  line-height: 60px;
  color: #fff;
  font-size: 20px;
}
.header .right {
  float: right;
  width: 200px;
  height: 100%;
  line-height: 60px;
  color: #fff;
}
.aside {
  width: 200px;
  position: absolute;
  top: 70px;
  bottom: 0px;
  left:0px;
  border-right: solid 1px #e6e6e6;
  background-color: #fcfcfc;
}
.aside .el-menu {
  border: none;
}
.main {
  margin-left: 200px;
}
</style>
