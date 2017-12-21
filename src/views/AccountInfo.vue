<template>
  <div class="content-wrap">
    <div class="info-wrap">
      <div class="inner-wrap">
        <div class="header">
        <div class="left">账号资料</div>
        </div>
        <div class="main-wrap">
          <div class="domian-cls">
            <span>账号：</span>
            <span>{{account}}</span>
          </div>
          <div class="logo-info">
            <span>Logo:</span>
            <div class="img-wrap" @click="upload">
              <img v-if="dataUrl" :src="dataUrl" alt="">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <!-- <el-button class="upload-cls" type="primary" size="small" @click="upload">上传LOGO</el-button> -->
            <input id="add_pic_ipt" type="file" name="image" accept="image/*" @change="handleInputChange" style="display: none;">
          </div>
          <div class="domain-cls">
            <span>店名：</span>
            <el-input placeholder="请输入店名" id="shopName" v-model="shopName" class="domain-ipt"></el-input>
          </div>
          <div class="domain-cls">
            <span>域名：</span>
            <el-input id="ipt_domain" v-model="domain" readonly="readonly" class="domain-ipt"></el-input>
            <el-button class="copy-cls" type="primary" size="small" @click="copy">点击复制</el-button>
          </div>
          <div class="domain-cls">
            <span>客服电话：</span>
            <el-input placeholder="请输入内容" v-model="phone" class="domain-ipt"></el-input>
          </div>
          <div class="div-btn">
            <el-button type="primary" @click="saveChange">保存修改</el-button>
            <el-button type="success" @click="centerDialogVisible = true">修改密码</el-button>
            <el-button type="warning" class="logout" @click="logout">退出登录</el-button>
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
    </div>
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
      account: '',
      shopName: '',
      userId: '',
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
      },
      imgFile: {},
      dataUrl: ''
    }
  },
  methods: {
    upload () {
      let tag = document.getElementById('add_pic_ipt')
      tag.click()
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
    saveChange () {
      let _this = this
      let time = this.moment().format('YYYY-MM-DD HH:mm:ss')
      let userId = this.userId
      this.editDialog = true
      this.axios.post('ideat/userManage/editUserInfo', {
        servicePhone: _this.phone,
        shopName: _this.shopName,
        updateTime: time,
        userId: userId,
        userPic: _this.dataUrl
      })
      .then(function (response) {
        // console.log(response)
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
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // 退出登录
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    savePwd (formName) {
      let _this = this
      let time = this.moment().format('YYYY-MM-DD HH:mm:ss')
      let username = this.userId
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
    },
    handleInputChange (event) {
      // let file = obj.files[0]
      // 获取当前选中的文件
      const file = event.target.files[0]
      const imgMasSize = 1024 * 1024 * 10 // 10MB
      // 检查文件类型
      if (['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split('/')[1]) < 0) {
          // 自定义报错方式
          // Toast.error("文件类型仅支持 jpeg/png/gif！", 2000, undefined, false);
        this.$message.error('文件类型仅支持 jpeg/png/gif！')
        return
      }
      // 文件大小限制
      if (file.size > imgMasSize) {
        // 文件大小自定义限制
        // Toast.error("文件大小不能超过10MB！", 2000, undefined, false);
        this.$message.error('文件大小不能超过10MB！')
        return
      }
      // 判断是否是ios
      // let u = navigator.userAgent
      // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      // if (isiOS) {
      //     // iOS
      //   this.transformFileToFormData(file)
      //   return
      // }
      // 图片压缩之旅
      this.transformFileToDataUrl(file)
    },
    transformFileToFormData (file) {
      const formData = new FormData()
      // 自定义formData中的内容
      // type
      formData.append('type', file.type)
      // size
      formData.append('size', file.size || 'image/jpeg')
      // name
      formData.append('name', file.name)
      // lastModifiedDate
      formData.append('lastModifiedDate', file.lastModifiedDate)
      // append 文件
      formData.append('file', file)
      // 上传图片
      // uploadImg(formData)
    },
    transformFileToDataUrl (file) {
      // 存储文件相关信息
      let _this = this
      this.imgFile.type = file.type || 'image/jpeg'   // 部分安卓出现获取不到type的情况
      this.imgFile.size = file.size
      this.imgFile.name = file.name
      this.imgFile.lastModifiedDate = file.lastModifiedDate
      // console.log(file)
      // 封装好的函数
      const reader = new FileReader()
      // file转dataUrl是个异步函数，要将代码写在回调里(onload)
      reader.onload = function (e) {
        _this.dataUrl = reader.result
      }
      reader.readAsDataURL(file)
    }
  },
  mounted () {
    let _this = this
    this.userId = sessionStorage.getItem('username')
    this.axios.get('ideat/userManage/getUserInfo', {
      params: {
        userId: this.userId
      }
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
      let result = data.body
      _this.account = result.userName
      _this.shopName = result.shopName
      _this.domain = result.userDomain
      _this.dataUrl = result.logoPic
      _this.phone = result.servicePhone
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';
.info-wrap {
  margin: 0px 60px 20px 60px;
  // border:1px solid #000;
  font-size: 14px;
  padding: 10px;
  .inner-wrap {
    margin: 0px 40px;
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
      // width: 100%;
      // margin-top: 20px;
      border: 1px solid #ececec;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      padding: 0px 20px 50px 20px;
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
        >p {
          border: 1px solid #D8DCE5;
          background-color: #f5f7fa;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 4px;
          color: #878d99;
          line-height: 40px;
        }
      }
      .logo-info {
        height: 100px;
        text-align: left;
        display: flex;
        align-items: flex-start;
        .img-wrap {
          width: 100px;
          height: 100px;
          margin-right: 40px;
          border: 1px dashed #d9d9d9;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          img {
            width: 98%;
            height: 98%;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 98%;
            height: 98%;
            line-height: 100px;
            text-align: center;
          }
        }
        .upload-cls {
          align-self:flex-end;
        }
      }
      .domain-cls {
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
        position: relative;
        button {
          margin-right: 40px;
        }
        .logout {
          position: absolute;
          float: right;
          right: 0px;
        }
      }
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
