<template>
  <div class="login-content">
    <div class="login-conwrap">
      <p>idea2t</p>
      <div class="ipt-wrap">
        <el-input placeholder="用户名" v-model="username"><el-button slot="prepend" icon="fa fa-user-o fa-fw"></el-button></el-input>
      </div>
      <div class="ipt-wrap">
        <el-input placeholder="密码" v-model="password" type="password"><el-button slot="prepend" icon="fa fa-key fa-fw"></el-button></el-input>        
      </div>
      <div class="ipt-wrap">
        <el-button class="login-cls" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';
.login-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $card-bg-color;
  .login-conwrap {
    width: 400px;
    height: 300px;
    overflow: auto;  
    margin: auto;  
    position: absolute;  
    top: 0; 
    left: 0; 
    bottom: 0; 
    right: 0;
    border: 1px solid #ececec;
    padding: 20px;
    background: #ffffff;
    background-color: transparent;
    filter:Alpha(opacity=10);
    background-color: rgba(255,255,255,0.1);
    p {
      margin-top: 30px;
      margin-bottom: 40px;
      font-size: 20px;
      color: #fff;
    }
    .ipt-wrap {
      margin: 20px;
      .login-cls {
        width: 100%;
      }
    }
  }
}
</style>
