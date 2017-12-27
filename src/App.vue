<template>
  <div id="app">
    <div class="container">
      <div class="header" v-show="header_show">
        <div class="left" @click="toHome">idea2t</div>
        <div class="right">
          <span>{{userId}}</span>
          <img @click="toAccountInfo" :src="logoPic" alt="">
        </div>
      </div>
      <div class="aside" v-show="aside_show">
        <el-menu :default-active="currentPath" class="el-menu-vertical-demo" active-text-color="#409EFF" :router="true">
          <el-menu-item v-for="item in menu" :index="item.index" :key="item.index" v-if="'/accountManage' === item.index ? authority === 'true' : true" :class="{'isActive': item.index === currentPath}">{{item.title}}</el-menu-item>
          <!-- <el-menu-item index="/home">首页概览</el-menu-item>
          <el-menu-item index="/orderManage">订单管理</el-menu-item>s
          <el-menu-item index="/goodsManage">商品管理</el-menu-item>
          <el-menu-item index="/accountManage">账号管理</el-menu-item>
          <el-menu-item index="/customManage">用户列表</el-menu-item>
          <el-menu-item index="/incomeManage">收益明细</el-menu-item> -->
          <!-- <el-menu-item index="/accountInfo">账号资料</el-menu-item> -->
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
      logoPic: require('./assets/user.png'),
      menu: [
        {index: '/home', title: '首页概览'},
        {index: '/orderManage', title: '订单管理'},
        {index: '/goodsManage', title: '商品管理'},
        {index: '/accountManage', title: '账号管理'},
        {index: '/customManage', title: '用户列表'},
        {index: '/incomeManage', title: '收益明细'}
      ],
      header_show: true,
      aside_show: true,
      path: '',
      currentPath: '',
      ismain: false,
      userId: '',
      authority: false
    }
  },
  methods: {
    toHome () {
      this.$router.push('/home')
    },
    toAccountInfo () {
      this.$router.push('/accountInfo')
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentPath = to.path
      let path = to.path.split('/')[1]
      if (path === 'login' || path === 'orderDetail' || path === 'accountDetail' || path === 'goodsDetail') {
        this.header_show = false
        this.aside_show = false
        this.ismain = false
      } else if (path === 'accountInfo') {
        this.header_show = true
        this.aside_show = false
        this.ismain = false
      } else {
        this.header_show = true
        this.aside_show = true
        this.ismain = true
        this.userId = sessionStorage.getItem('username')
      }
      // 权限控制菜单
      this.authority = sessionStorage.getItem('authority')
      let pic = sessionStorage.getItem('logoPic')
      if (pic) {
        this.logoPic = pic
      }
      // if (this.authority === 'false' && this.menu.length === 6) {
      //   this.menu.splice(3, 1) // 隐藏accountInfo（账号详情页）
      // }
    }
  },
  created () {
    this.path = this.currentPath = this.$route.path
    if (this.path === '/login' || this.path === '/orderDetail' || this.path === '/accountDetail' || this.path === '/goodsDetail') {
      this.header_show = false
      this.aside_show = false
      this.ismain = false
    } else if (this.path === '/accountInfo') {
      this.header_show = true
      this.aside_show = false
      this.ismain = false
    } else {
      this.header_show = true
      this.aside_show = true
      this.ismain = true
      this.userId = sessionStorage.getItem('username')
    }
    // 权限控制菜单
    this.authority = sessionStorage.getItem('authority')
    let pic = sessionStorage.getItem('logoPic')
    if (pic) {
      this.logoPic = pic
    }
    // if (this.authority === 'false' && this.menu.length === 6) {
    //   this.menu.splice(3, 1) // 隐藏accountInfo（账号详情页）
    // }
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
  cursor: pointer;
}
.header .right {
  float: right;
  width: 200px;
  height: 100%;
  line-height: 60px;
  color: #fff;
  img {
    width: 28px;
    height: 28px;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block; 
    vertical-align: middle;
    margin-left: 4px;
    margin-top: -6px;
  }
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
.isActive {
  color: #409EFF !important;
}
</style>
