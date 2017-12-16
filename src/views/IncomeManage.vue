<template>
  <div class="content-wrap">
    <div class="top">
      <div class="title">收益明细</div>
      <el-row :gutter="40">
          <el-col :span="12">
            <div class="left">
              <span>总收益</span><span class="font-bold">￥{{totalIncome}}</span>
              <br>
              <span>成交额</span><span class="font-bold">￥{{turnVolume}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right">
              <span>可提现</span><span class="font-bold">￥{{cash}}</span>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">提现</el-button>
            </div>
          </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table @row-dblclick="rowClick" :data="tableData" align="left" style="width: 100%">
        <el-table-column prop="order_num" label="订单号"></el-table-column>
        <el-table-column  prop="goods" label="交易内容"></el-table-column>
        <el-table-column prop="name" label="客户"></el-table-column>
        <el-table-column prop="date" label="交易时间"></el-table-column>
        <el-table-column  prop="total" label="总价"></el-table-column>
        <el-table-column  prop="gainsharing" label="分成"></el-table-column>        
        <el-table-column  prop="status" label="状态"></el-table-column>
        
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
  name: 'IncomeManage',
  data () {
    return {
      totalIncome: 16125,
      turnVolume: 45415,
      cash: 2455,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
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