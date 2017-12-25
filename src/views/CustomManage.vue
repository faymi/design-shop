<template>
  <div class="content-wrap">
    <div class="header">
      <div class="left">用户列表</div>
      <div class="right">
        <div class="search-ipt">
          <el-input placeholder="用户名、电话、地址" prefix-icon="el-icon-search" @keyup.enter.native="search" v-model="searchInput"></el-input>          
        </div>
        <div class="search-btn">
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table stripe :data="tableData" align="left" style="width: 100%">
        <el-table-column prop="customerId" label="序号" width="80"></el-table-column>
        <el-table-column prop="customerName" label="用户名" width="100"></el-table-column>
        <el-table-column  prop="customerPhone" label="联系电话"></el-table-column>
        <el-table-column  prop="address" label="地址"></el-table-column>
        <el-table-column prop="registerTime" label="首次登陆时间"></el-table-column>
        <el-table-column  prop="lastLoginTime" label="最近登录时间"></el-table-column>
        <el-table-column  prop="IP" label="最近登录IP"></el-table-column>
        <!-- <el-table-column  prop="order_num" label="订单数"></el-table-column>
        <el-table-column  prop="total" label="成交额"></el-table-column> -->
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
  </div>
</template>

<script>
export default {
  name: 'OrderManage',
  data () {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      searchInput: '',
      tableData: []
    }
  },
  methods: {
    search () {
      // console.log(this.searchInput)
      this.getData(this.searchInput)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    getData (inputParams) {
      let params
      if (inputParams !== '' && inputParams !== 'undefined') {
        params = {
          params: inputParams,
          start: 0,
          limit: 10
        }
      } else {
        params = {
          start: 0,
          limit: 10
        }
      }
      let _this = this
      this.axios.get('ideat/userManage/getCustomerList', {
        params: {
          ...params
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
        _this.tableData = result.result
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getData()
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
    .search-ipt {
      width: 300px;
    }
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
}
</style>
