<template>
  <div class="content-wrap">
    <div class="top">
      <div class="title">收益明细</div>
      <el-row :gutter="40">
          <el-col :span="12">
            <div class="left">
              <span>总收益</span><span class="font-bold">￥{{totalProfit}}</span>
              <br>
              <span>成交额</span><span class="font-bold">￥{{totalTurnOver}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right">
              <span>可提现</span><span class="font-bold">￥{{totalBalance}}</span>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">提现</el-button>
            </div>
          </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table @row-dblclick="rowClick" :data="tableData" align="left" style="width: 100%">
        <el-table-column type="index" :index="indexMethod" label="编号" width="50"></el-table-column>
        <el-table-column  prop="userId" label="用户账户"></el-table-column>
        <el-table-column prop="shopName" label="店名"></el-table-column>
        <el-table-column prop="expenseCount" label="提现金额"></el-table-column>
        <el-table-column prop="expenseTime" label="提现时间"></el-table-column>
        <!-- <el-table-column prop="order_num" label="订单号"></el-table-column>
        <el-table-column  prop="goods" label="交易内容"></el-table-column>
        <el-table-column prop="name" label="客户"></el-table-column>
        <el-table-column prop="date" label="交易时间"></el-table-column>
        <el-table-column  prop="total" label="总价"></el-table-column>
        <el-table-column  prop="gainsharing" label="分成"></el-table-column>        
        <el-table-column  prop="status" label="状态"></el-table-column> -->
        
      </el-table>
    </div>
    <div class="page-wrap">
      <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
      <div class="block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IncomeManage',
  data () {
    return {
      totalProfit: 0,
      totalTurnOver: 0,
      totalBalance: 0,
      start: 0,
      limit: 10,
      total: 0,
      currentPage: 1,
      tableData: [
        {
          order_num: 20171206125010,
          name: '王小虎',
          goods: '纯棉T恤',
          total: '99',
          status: '已到账',
          date: '2016-05-02 09:12:36',
          gainsharing: '29'
        },
        {
          order_num: 20171206125010,
          name: '王小虎',
          goods: '纯棉T恤',
          total: '99',
          status: '已到账',
          date: '2016-05-02 09:12:36',
          gainsharing: '29'
        },
        {
          order_num: 20171206125010,
          name: '王小虎',
          goods: '纯棉T恤',
          total: '99',
          status: '已到账',
          date: '2016-05-02 09:12:36',
          gainsharing: '29'
        },
        {
          order_num: 20171206125010,
          name: '王小虎',
          goods: '纯棉T恤',
          total: '99',
          status: '已到账',
          date: '2016-05-02 09:12:36',
          gainsharing: '29'
        },
        {
          order_num: 20171206125010,
          name: '王小虎',
          goods: '纯棉T恤',
          total: '99',
          status: '已到账',
          date: '2016-05-02 09:12:36',
          gainsharing: '29'
        }
      ]
    }
  },
  methods: {
    rowClick (row, event, column) {},
    // 序号
    indexMethod (index) {
      return index + this.start + 1
    },
    // 分页事件
    handleCurrentChange (val) {
      this.start = this.limit * (val - 1)
      this.getData(this.start, this.limit)
    },
    // 获取收益明细列表
    getData (start, limit) {
      let _this = this
      this.axios.get('/ideat/dataManage/getExpenseRecord', {
        params: {
          start: start,
          limit: limit,
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
        _this.tableData = data.body.expenseList
        _this.total = data.body.total
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    this.userId = sessionStorage.getItem('username')
    this.getData(this.start, this.limit)
    let _this = this
    this.axios.get('/ideat/dataManage/getTotalStat', {
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
      _this.totalProfit = data.body.totalProfit
      _this.totalTurnOver = data.body.totalTurnOver
      _this.totalBalance = data.body.totalBalance
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';
.title, .left, .right {
  text-align: left;
}
.left, .right {
  margin-top: 10px;
  span {
    margin-top: 10px;
    display: inline-block;
    margin-left: 20px;
    font-size: 14px;
  }
}
.table-box {
  margin-top: 20px;
}
</style>