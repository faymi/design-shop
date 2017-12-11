<template>
  <div class="content-wrap">
    <div class="header">
      <div class="left">账号资料</div>
    </div>
    <div class="main-wrap">
      <div class="logo-info">
        <span>Logo:</span>
        <img src="../assets/logo.png" alt="">
        <el-button class="upload-cls" type="primary" size="small" @click="upload">上传LOGO</el-button>
      </div>
      <div class="domian-cls">
        <span>域名：</span>
        <el-input placeholder="请输入内容" id="ipt_domain" v-model="domain" class="domain-ipt">
          <template slot="prepend">http://</template>
          <el-button slot="append"></el-button>
          <template slot="append">.vesstack.com</template>
        </el-input>
        <el-button class="copy-cls" type="primary" size="small" @click="copy">点击复制</el-button>
      </div>
      <div class="domian-cls">
        <span>账号：</span>
        <span>admin</span>
      </div>
      <div class="domian-cls">
        <span>客服电话：</span>
        <el-input placeholder="请输入内容" v-model="phone" class=" domain-ipt"></el-input>
      </div>
      <div class="div-btn">
        <el-button type="primary">保存修改</el-button>
        <el-button type="success" @click="centerDialogVisible = true">修改密码</el-button>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="centerDialogVisible"
      width="550px"
      center>
        <div class="changePwd-wrap">
          <el-form :model="pwdForm" status-icon :rules="pwdRules" ref="pwdForm" label-width="100px">
            <div class="changePwd">
              <!-- <span>旧密码：</span> -->
              <el-form-item label="旧密码：" prop="old_pwd">
                <el-input placeholder="请输入旧密码" type="password" v-model="pwdForm.old_pwd"></el-input>
              </el-form-item>
            </div>
            <div class="changePwd">
              <!-- <span>新密码：</span> -->
              <el-form-item label="新密码：" prop="new_pwd">
                <el-input placeholder="请输入新密码" type="password" v-model="pwdForm.new_pwd"></el-input>
              </el-form-item>
            </div>
            <div class="changePwd">
              <!-- <span>确认新密码：</span> -->
              <el-form-item label="确认新密码：" prop="rep_pwd">
                <el-input placeholder="请确认新密码" type="password" v-model="pwdForm.rep_pwd"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="savePwd('pwdForm')">确 定</el-button>
          <el-button @click="cancel('pwdForm')">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AccountInfo',
  data () {
    // 校验字段
    let validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    }
    let validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdForm.rep_pwd !== '') {
          this.$refs.pwdForm.validateField('rep_pwd')
        }
        callback()
      }
    }
    let validateRepPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认新密码'))
      } else if (value !== this.pwdForm.new_pwd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      centerDialogVisible: false,
      domain: '',
      phone: '',
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        rep_pwd: ''
      },
      pwdRules: {
        old_pwd: [
            { validator: validateOldPass, trigger: 'blur' }
        ],
        new_pwd: [
          { validator: validateNewPass, trigger: 'blur' }
        ],
        rep_pwd: [
          { validator: validateRepPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    upload () {
    },
    copy () {
      let ipt = document.getElementById('ipt_domain')
      ipt.select()
      let tag = document.execCommand('Copy')
      if (tag) {
        this.$message({
          message: '复制内容成功！',
          type: 'success',
          center: true
        })
      }
    },
    savePwd (formName) {
      let _this = this
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      let time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      let username = sessionStorage.getItem('username')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('ideat/userManage/editPwd', {
            userId: username,
            pwd: this.pwdForm.new_pwd,
            updateTime: time
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
            _this.$notify.success({
              title: '温馨提示',
              message: data.msg
            })
            _this.$refs[formName].resetFields()
            _this.centerDialogVisible = false
          })
          .catch(function (error) {
            console.log(error)
          })
        } else {
          return false
        }
      })
    },
    cancel (formName) {
      this.$refs[formName].resetFields()
      this.centerDialogVisible = false
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
.main-wrap {
  width: 100%;
  margin-top: 20px;
  border: 1px solid #ececec;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  padding: 20px 20px 50px 20px;
  >div {
    margin-top: 20px;
    height: 40px;
    text-align: left;
    >span {
      width: 100px;
      text-align: left;
      line-height: 40px;
      display: inline-block;
    }
  }
  .logo-info {
    height: 100px;
    text-align: left;
    display: flex;
    align-items: flex-start;
    img {
      width: 100px;
      height: 100px;
      margin-right: 40px;
    }
    .upload-cls {
      align-self:flex-end;
    }
  }
  .domian-cls {
    display: flex;
    justify-content: flex-start;
    .domain-ipt {
      width: 400px;
    }
    .copy-cls {
      margin-left: 20px;
    }
  }
  .div-btn {
    margin-top: 60px;
    button {
      margin-right: 40px;
    }
  }
}
.changePwd-wrap {
  width: 80%;
  margin: 0 auto;
  .changePwd {
    margin: 20px;
  }
}

</style>
