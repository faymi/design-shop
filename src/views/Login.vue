<template>
  <div class="login-content">
    <div class="login-conwrap">
      <p>idea2t</p>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px">
        <div class="ipt-wrap">
          <el-form-item prop="username">
            <el-input id="userName" placeholder="用户名" v-model="ruleForm.username" clearable><el-button slot="prepend" icon="fa fa-user-o fa-fw"></el-button></el-input>
          </el-form-item>
        </div>
        <div class="ipt-wrap">
          <el-form-item prop="password">
            <el-input id="password" placeholder="密码" v-model="ruleForm.password" type="password" @keyup.enter.native="login('ruleForm')" clearable><el-button slot="prepend" icon="fa fa-key fa-fw"></el-button></el-input>        
          </el-form-item>
        </div>
        <div class="ipt-wrap">
          <el-form-item>
            <el-button class="login-cls" @keyup.enter.native="login('ruleForm')" @click="login('ruleForm')">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    // 校验字段
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
            { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    login (formName) {
      this.$refs[formName].validate((valid) => {
        let _this = this
        if (valid) {
          let username = this.ruleForm.username
          let password = this.ruleForm.password
          this.axios.post('/ideat/userManage/login', {
            userId: username,
            pwd: password
          })
          .then(function (response) {
            let data = response.data
            if (data.code !== 0) {
              _this.$notify.error({
                title: '温馨提示',
                message: data.msg
              })
              return
            }
            sessionStorage.setItem('username', username)
            sessionStorage.setItem('authority', true) // 权限控制
            _this.$router.push('/home')
          })
          .catch(function (error) {
            console.log(error)
          })
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    document.getElementById('userName').setAttribute('tabIndex', 1)
    document.getElementById('password').setAttribute('tabIndex', 2)
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
