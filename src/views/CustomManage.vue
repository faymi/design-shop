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
        <el-table-column prop="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="用户名" width="100"></el-table-column>
        <el-table-column  prop="phone" label="联系电话"></el-table-column>
        <el-table-column  prop="address" label="地址"></el-table-column>
        <el-table-column prop="firstLoginTime" label="首次登陆时间"></el-table-column>
        <el-table-column  prop="recentLoginTime" label="最近登录时间"></el-table-column>
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
      tableData: [
        {
          index: 1,
          name: '王小虎',
          phone: 18819412313,
          address: '上海市普陀区金沙江路 1518 弄',
          goods: '纯棉T恤',
          total: '99',
          order_num: 123,
          status: '代签收',
          date: '2016-05-02',
          firstLoginTime: '2017-12-12 08:45:12',
          recentLoginTime: '2017-12-12 09:35:24',
          IP: '192.168.0.1'
        },
        {
          index: 1,
          name: '王小虎',
          phone: 18819412313,
          address: '上海市普陀区金沙江路 1518 弄',
          goods: '纯棉T恤',
          total: '99',
          order_num: 123,
          status: '代签收',
          date: '2016-05-02',
          firstLoginTime: '2017-12-12 08:45:12',
          recentLoginTime: '2017-12-12 09:35:24',
          IP: '192.168.0.1'
        },
        {
          index: 2,
          name: '王小虎',
          phone: 18819412313,
          address: '上海市普陀区金沙江路 1518 弄',
          goods: '纯棉T恤',
          total: '99',
          order_num: 123,
          status: '代签收',
          date: '2016-05-02',
          firstLoginTime: '2017-12-12 08:45:12',
          recentLoginTime: '2017-12-12 09:35:24',
          IP: '192.168.0.1'
        },
        {
          index: 3,
          name: '王小虎',
          phone: 18819412313,
          address: '上海市普陀区金沙江路 1518 弄',
          goods: '纯棉T恤',
          total: '99',
          order_num: 123,
          status: '代签收',
          date: '2016-05-02',
          firstLoginTime: '2017-12-12 08:45:12',
          recentLoginTime: '2017-12-12 09:35:24',
          IP: '192.168.0.1'
        },
        {
          index: 4,
          name: '王小虎',
          phone: 18819412313,
          address: '上海市普陀区金沙江路 1518 弄',
          goods: '纯棉T恤',
          total: '99',
          order_num: 123,
          status: '代签收',
          date: '2016-05-02',
          firstLoginTime: '2017-12-12 08:45:12',
          recentLoginTime: '2017-12-12 09:35:24',
          IP: '192.168.0.1'
        }
      ]
    }
  },
  methods: {
    search () {
      console.log(this.searchInput)
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
