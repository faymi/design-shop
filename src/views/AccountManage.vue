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
        <el-table-column prop="account" label="账号" width="180"></el-table-column>
        <el-table-column  prop="shopName" label="店名" width="120"></el-table-column>
        <el-table-column  prop="picture" label="LOGO">
            <template slot-scope="scope">
                <img class="row-img" :src="scope.row.picture" alt="">
            </template>
        </el-table-column>        
        <el-table-column  prop="domain" label="域名"></el-table-column>
        <el-table-column label="余额">
          <template slot-scope="scope">
            <span>{{ scope.row.balance}}</span>
            <el-button @click.native.prevent="getCash(scope.$index, tableData4)" type="text" size="small">提现</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template  slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择" @change="selectChange(scope.row.num, scope.row.value)">
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
      accountForm: {
        account: '',
        new_pwd: '',
        rep_pwd: ''
      },
      accountRules: {
        account: [
            { validator: validateAccount, trigger: 'blur' }
        ],
        new_pwd: [
          { validator: validateNewPass, trigger: 'blur' }
        ],
        rep_pwd: [
          { validator: validateRepPass, trigger: 'blur' }
        ]
      },
      tableData: [
        {
          num: 20171206125010,
          shopName: '狗迷会',
          picture: require('../assets/logo.png'),
          account: 'admin',
          domain: 'www.baidu.com',
          order_num: '99',
          balance: '15461',
          date: '2016-05-02',
          options: [
            {
              value: '1',
              label: '运营中'
            },
            {
              value: '2',
              label: '已关闭'
            }
          ],
          value: '1'
        },
        {
          num: 20171206125011,
          shopName: '鸿兴会',
          picture: require('../assets/logo.png'),
          account: 'admin',
          domain: 'www.baidu.com',
          order_num: '99',
          balance: '15461',
          date: '2016-05-02',
          options: [
            {
              value: '1',
              label: '运营中'
            },
            {
              value: '2',
              label: '已关闭'
            }
          ],
          value: '1'
        },
        {
          num: 20171206125012,
          shopName: '狮子会',
          picture: require('../assets/logo.png'),
          account: 'admin',
          domain: 'www.baidu.com',
          order_num: '99',
          balance: '15461',
          date: '2016-05-02',
          options: [
            {
              value: '1',
              label: '运营中'
            },
            {
              value: '2',
              label: '已关闭'
            }
          ],
          value: '1'
        },
        {
          num: 20171206125013,
          shopName: '学生会',
          picture: require('../assets/logo.png'),
          account: 'admin',
          domain: 'www.baidu.com',
          order_num: '99',
          balance: '15461',
          date: '2016-05-02',
          options: [
            {
              value: '1',
              label: '运营中'
            },
            {
              value: '2',
              label: '已关闭'
            }
          ],
          value: '2'
        },
        {
          num: 20171206125014,
          shopName: '猫迷会',
          picture: require('../assets/logo.png'),
          account: 'admin',
          domain: 'www.baidu.com',
          order_num: '99',
          balance: '15461',
          date: '2016-05-02',
          options: [
            {
              value: '1',
              label: '运营中'
            },
            {
              value: '2',
              label: '已关闭'
            }
          ],
          value: '2'
        }
      ]
    }
  },
  methods: {
    selectChange (num, value) {
      console.log(num, value)
    },
    row_DbClick (row, event) {
      console.log(row)
      const {href} = this.$router.resolve({
        name: 'AccountDetail',
        query: { accountId: row.account }
      })
      window.open(href, '_blank')
    },
    saveAccount (formName) {
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
            pwd: this.accountForm.new_pwd,
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
