<template>
  <div class="content-wrap">
    <div class="header">
      <div class="left">账号管理</div>
      <div class="right">
        <div class="search-btn">
          <el-button type="primary" @click="centerDialogVisible = true">添加账号</el-button>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table stripe @row-dblclick="row_DbClick" :data="tableData" align="left" style="width: 100%">
        <el-table-column prop="num" label="编号" width="100"></el-table-column>
        <el-table-column prop="userId" label="账号" width="180"></el-table-column>
        <el-table-column  prop="shopName" label="店名" width="120"></el-table-column>
        <el-table-column  prop="logoPic" label="LOGO">
            <template slot-scope="scope">
                <img class="row-img" :src="scope.row.logoPic" alt="">
            </template>
        </el-table-column>        
        <el-table-column  prop="userDomain" label="域名"></el-table-column>
        <el-table-column prop="balance" label="余额">
          <!-- <template slot-scope="scope">
            <span>{{ scope.row.balance}}</span>
            <el-button @click.native.prevent="getCash(scope.$index, tableData4)" type="text" size="small">提现</el-button>
          </template> -->
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template  slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择" @change="selectChange(scope.row.userId, scope.row.status)">
              <el-option
                v-for="item in scope.row.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-wrap">
      <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="添加账号"
      :visible.sync="centerDialogVisible"
      width="550px"
      center>
        <div class="changePwd-wrap">
          <el-form :model="accountForm" status-icon :rules="accountRules" ref="accountForm" label-width="100px">
            <div class="changePwd">
              <el-form-item label="账号：" prop="account">
                <el-input placeholder="请输入账号" type="text" v-model="accountForm.account"></el-input>
              </el-form-item>
            </div>
            <!-- <div class="changePwd">
              <el-form-item label="域名：" prop="domain">
                <el-input placeholder="请输入域名" type="text" v-model="accountForm.domain"></el-input>
              </el-form-item>
            </div> -->
            <div class="changePwd">
              <el-form-item label="密码：" prop="new_pwd">
                <el-input placeholder="请输入密码" type="password" v-model="accountForm.new_pwd"></el-input>
              </el-form-item>
            </div>
            <div class="changePwd">
              <el-form-item label="确认密码：" prop="rep_pwd">
                <el-input placeholder="请确认密码" type="password" v-model="accountForm.rep_pwd"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveAccount('accountForm')">确 定</el-button>
          <el-button @click="cancel('accountForm')">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GoodsManage',
  data () {
    let validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    // let validateDomain = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入域名'))
    //   } else {
    //     callback()
    //   }
    // }
    let validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.accountForm.rep_pwd !== '') {
          this.$refs.accountForm.validateField('rep_pwd')
        }
        callback()
      }
    }
    let validateRepPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认新密码'))
      } else if (value !== this.accountForm.new_pwd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      searchInput: '',
      centerDialogVisible: false,
      domain: 'http://idea.vesstack.com/sdds2531524sdsd',
      accountForm: {
        account: '',
        domain: '',
        new_pwd: '',
        rep_pwd: ''
      },
      accountRules: {
        account: [
            { validator: validateAccount, trigger: 'blur' }
        ],
        // domain: [
        //   { validator: validateDomain, trigger: 'blur' }
        // ],
        new_pwd: [
          { validator: validateNewPass, trigger: 'blur' }
        ],
        rep_pwd: [
          { validator: validateRepPass, trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  methods: {
    selectChange (userId, value) {
      // console.log(userId, value)
      let _this = this
      let time = this.moment().format('YYYY-MM-DD HH:mm:ss')
      this.axios.post('ideat/userManage/editUserInfo', {
        status: value,
        updateTime: time,
        userId: userId
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
    row_DbClick (row, event) {
      // console.log(row)
      const {href} = this.$router.resolve({
        name: 'AccountDetail',
        query: { accountId: row.userId }
      })
      window.open(href, '_blank')
    },
    saveAccount (formName) {
      let _this = this
      let userId = this.accountForm.account
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('ideat/userManage/addUser', {
            userId: userId,
            pwd: this.accountForm.new_pwd
            // domain: this.accountForm.domain
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {
    let _this = this
    let options = [{value: '1', label: '运营中'}, {value: '0', label: '已关闭'}]
    this.axios.get('ideat/userManage/getUserList', {
      params: {
        start: 0,
        limit: 10
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
      // console.log(data)
      let result = data.body.result
      for (let i = 0; i < result.length; i++) {
        result.num = i + 1
        result[i].options = options
        result[i].value = String(result[i].status)
      }
      _this.tableData = result
      // console.log(JSON.stringify(result))
    })
    .catch(function (error) {
      console.log(error)
    })
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
  .right {
    width: 60%;
    height: 100%;
    float: right;
    display: flex;
    justify-content: flex-end;
    .search-btn {
      margin-left: 20px;
    }
  }
}
.table {
  border: 1px solid #ececec;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  padding: 20px 20px 50px 20px;
  margin-top: 20px;
  .row-img {
    width: 40px;
    height: 40px;
  }
  .ipt-wrap {
    display: flex;
    justify-content: flex-start;
    p {
      width: 50px;
      height: 20px;
    }
    input {
      width: 60px;
      height: 20px;
      border: 1px solid #ececec;
      border-radius: 2px;
    }
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #b4bccc; 
    opacity:1; 
    font-size: 12px;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #b4bccc;
      opacity:1;
      font-size: 12px;
  }

  input:-ms-input-placeholder{
      color: #b4bccc;
      opacity:1;
      font-size: 12px;
  }

  input::-webkit-input-placeholder{
      color: #b4bccc;
      opacity:1;
      font-size: 12px;
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
