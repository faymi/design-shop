<template>
  <div class="login-wrap">
    <div class="input-wrap">
      <div class="input-item">
         <i class="fa fa-user-o"></i>
        <input type="text" id="account" v-model="account" placeholder="用户名">
      </div>
      <div class="input-item">
        <i class="fa fa-key"></i>
        <input type="password" id="pwd" v-model="password" placeholder="密码">
      </div>
      <div class="input-item" v-show="!loginToggle">
        <i class="fa fa-key"></i>
        <input type="password" id="repPwd" v-model="repPassword" placeholder="确认密码">
      </div>
      <div class="input-login" v-show="loginToggle">
        <van-button size="large" type="primary" :loading="loginLoading" @click="login">登录</van-button>
      </div>
      <div class="input-login" v-show="!loginToggle">
        <van-button size="large" type="primary" :loading="resgistLoading" @click="resgist">注册</van-button>
      </div>
    </div>
    <div class="tips">
      <span v-if="isOriginHei" v-show="loginToggle" @click="loginToggle=!loginToggle">还没账号？前往注册</span>
      <span v-if="isOriginHei" v-show="!loginToggle" @click="loginToggle=!loginToggle">已有账号？前往登录</span>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import api from '@/api/fetch'

export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: '',
      repPassword: '',
      loginToggle: true,
      isOriginHei: true,
      loginLoading: false,
      resgistLoading: false,
      screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
      originHeight: document.body.clientHeight // 默认高度在watch里拿来做比较
    }
  },
  computed: {
    ...mapGetters({
      domain: 'domain'
    })
  },
  methods: {
    validate (type) {
      if (this.account === '') {
        this.$toast('用户名不能为空')
        return false
      }
      if (this.password === '') {
        this.$toast('密码不能为空')
        return false
      }
      if (type === 'resgist') {
        if (this.repPassword === '') {
          this.$toast('请确认密码')
          return false
        }
        if (this.repPassword !== this.password) {
          this.$toast('您两次输入的密码不同，请重新输入')
          return false
        }
      }
      return true
    },
    login () {
      if (!this.validate('login')) {
        return
      }
      let params = {
        account: this.account,
        pwd: this.password,
        domain: this.domain
      }
      this.loginLoading = true
      api.login(params)
      .then(res => {
        this.loginLoading = false
        if (res.code === 0) {
          this.$toast({type: 'success', duration: 1000, message: '登录成功'})
          this.$store.dispatch('setLoginStatus', true)
          this.$store.dispatch('setShopCartId', res.msg)
          this.$store.dispatch('setCustomerId', this.account)
          setTimeout(() => {
            this.$router.push({path: '/', query: {domain: this.domain}})
          }, 1000)
        } else {
          this.$toast(res.msg)
        }
      })
    },
    resgist () {
      if (!this.validate('resgist')) {
        return
      }
      let params = {
        account: this.account,
        pwd: this.password,
        domain: this.domain
      }
      this.resgistLoading = true
      api.register(params)
      .then(res => {
        this.resgistLoading = false
        if (res.code === 0) {
          this.$toast({type: 'success', duration: 1000, message: '注册成功'})
          this.$store.dispatch('setLoginStatus', true)
          this.$store.dispatch('setShopCartId', res.msg)
          this.$store.dispatch('setCustomerId', this.account)
          setTimeout(() => {
            this.$router.push({path: '/', query: {domain: this.domain}})
          }, 1000)
        } else {
          this.$toast(res.msg)
        }
      })
    }
  },
  watch: {
    // 监测窗口大小变化，避免手机键盘将元素顶上去
    screenHeight (val) {
      if (this.originHeight !== val) {
        this.isOriginHei = false
      } else {
        this.isOriginHei = true
      }
    }
  },
  mounted () {
    const _this = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        _this.screenHeight = window.screenHeight
      })()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.login-wrap {
  width: 100%;
  height: 100%;
  background: #578ffe;
  position: relative;
  .input-wrap {
    position: absolute;
    top: 60%;
    left: 50%;
    width: 80%;
    height: 30%;
    transform: translate(-50%, -60%);
    .input-item {
      width: 100%;
      height: px2rem(60px);
      margin-bottom: px2rem(20px);
      color: #e6e6e6;
      font-size: 14px;
      position: relative;
      box-sizing:border-box;
      -webkit-box-sizing:border-box; /* Safari */
      i {
        position: absolute;
        top: px2rem(16px);
        left: px2rem(4px);
      }
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        background: transparent;
        border-bottom: px2rem(2px) solid #e6e6e6;
        color: #e6e6e6;
        font-size: 14px;
        padding-left: px2rem(48px);
        box-sizing:border-box;
        -webkit-box-sizing:border-box; /* Safari */
      }
    }
    .input-login {
      width: 100%;
      height: px2rem(100px);
      margin-top: px2rem(60px);
      color: #e6e6e6;
      font-size: 14px;
      box-sizing:border-box;
      -webkit-box-sizing:border-box; /* Safari */
    }
  }
  .tips {
    position: absolute;
    bottom: px2rem(60px);
    left: 50%;
    transform: translateX(-50%);
    color: #e6e6e6;
    &:active {
      color: #000;
    }
  }
  .input-item>input::-webkit-input-placeholder {
    color: #e6e6e6;
  }
    
  .input-item>input:-moz-placeholder {
    color: #e6e6e6;
  }
    
  .input-item>input::-moz-placeholder {
    color: #e6e6e6;
  }
    
  .input-item>input:-ms-input-placeholder {
    color: #e6e6e6;
  }
}
</style>