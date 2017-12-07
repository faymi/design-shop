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
        <el-input placeholder="请输入内容" v-model="domain" class="domain-ipt">
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
      width="30%"
      center>
      <div class="changePwd-wrap">
        <div class="changePwd">
          <span>旧密码：</span>
          <el-input placeholder="请输入旧密码" type="password" v-model="old_pwd" class=" domain-ipt"></el-input>
        </div>
        <div class="changePwd">
          <span>新密码：</span>
          <el-input placeholder="请输入新密码" type="password" v-model="new_pwd" class=" domain-ipt"></el-input>
        </div>
        <div class="changePwd">
          <span>确认新密码：</span>
          <el-input placeholder="请确认新密码" type="password" v-model="rep_pwd" class=" domain-ipt"></el-input>
        </div>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AccountInfo',
  data () {
    return {
      centerDialogVisible: false,
      domain: '',
      phone: '',
      old_pwd: '',
      new_pwd: '',
      rep_pwd: ''
    }
  },
  methods: {
    upload () {
    },
    copy () {
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
    display: flex;
    justify-content: flex-start;
    margin: 20px;
    >span {
      display: inline-block;
      width: 110px;
      height: 40px;
      line-height: 40px;
    }
  }
}

</style>
