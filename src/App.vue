<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <div class="left">idea2t</div>
        <div class="right" @click="showDialog">faymi</div>
      </div>
      <div class="aside">
        <el-menu default-active="/home" class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/home" :class="{'isActive': active}">首页</el-menu-item>
          <el-menu-item index="/orderManage" :class="{'isActive': !active}">订单管理</el-menu-item>
          <el-menu-item index="/goodsManage" :class="{'isActive': !active}">商品管理</el-menu-item>
          <el-menu-item index="/accountManage" :class="{'isActive': !active}">账号管理</el-menu-item>
          <el-menu-item index="/customManage" :class="{'isActive': !active}">客户列表</el-menu-item>
          <el-menu-item index="/incomeManage" :class="{'isActive': !active}">收益明细</el-menu-item>
        </el-menu>
      </div>
      <div class="main">
        <router-view/>
      </div>
      <v-dialog :outer-visible="outerVisible" :inner-visible="innerVisible"></v-dialog>
    </div>
  </div>
</template>

<script>
import dialog from '@/components/ChangeAccount'

export default {
  name: 'app',
  components: {
    'v-dialog': dialog
  },
  data () {
    return {
      outerVisible: false,
      innerVisible: false
    }
  },
  methods: {
    showDialog () {
      console.log(this.outerVisible)
      this.outerVisible = true
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
