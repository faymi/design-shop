<template>
  <div class="content-wrap">
    <div class="header">
      <div class="left">订单管理</div>
      <div class="right">
        <div class="search-ipt">
          <el-input placeholder="订单号、客户、电话、地址" prefix-icon="el-icon-search" v-model="searchInput"></el-input>          
        </div>
        <div class="search-btn">
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="search-bar">搜索“2017”关键字结果：</div>
    <div class="table">
      <el-table @row-dblclick="rowClick" :data="tableData" align="left" style="width: 100%">
        <el-table-column prop="order_num" label="订单号" width="180"></el-table-column>
        <el-table-column prop="name" label="客户" width="100"></el-table-column>
        <el-table-column  prop="phone" label="联系电话" width="116"></el-table-column>
        <el-table-column  prop="address" label="收货地址"></el-table-column>
        <el-table-column  prop="goods" label="商品"></el-table-column>
        <el-table-column  prop="total" label="总价"></el-table-column>
        <el-table-column  prop="status" label="状态"></el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <!-- <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column> -->
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
          order_num: 20171206125010,
          name: '王小虎',
          phone: 18819412313,
          address: '上海市普陀区金沙江路 1518 号200房阿斯顿发生动感',
          goods: '纯棉T恤',
          total: '99',
          status: '代签收',
          date: '2016-05-02'
        },
        {
          order_num: 20171206125010,
          name: '王小虎',
          phone: 18819412313,
          address: '上海市普陀区金沙江路 1518 弄',
          goods: '纯棉T恤',
          total: '99',
          status: '代签收',
          date: '2016-05-02'
        },
        {
          order_num: 20171206125010,
          name: '王小虎',
          phone: 18819412313,
          address: '上海市普陀区金沙江路 1518 弄',
          goods: '纯棉T恤',
          total: '99',
          status: '代签收',
          date: '2016-05-02'
        },
        {
          order_num: 20171206125010,
          name: '王小虎',
          phone: 18819412313,
          address: '上海市普陀区金沙江路 1518 弄',
          goods: '纯棉T恤',
          total: '99',
          status: '代签收',
          date: '2016-05-02'
        },
        {
          order_num: 20171206125010,
          name: '王小虎',
          phone: 18819412313,
          address: '上海市普陀区金沙江路 1518 弄',
          goods: '纯棉T恤',
          total: '99',
          status: '代签收',
          date: '2016-05-02'
        }
      ]
    }
  },
  methods: {
    rowClick (row, event, column) {
      console.log(row)
      // this.$router.push({name: 'OrderDetail', params: { orderId: '' }})
      const {href} = this.$router.resolve({
        name: 'OrderDetail',
        query: { orderId: row.order_num }
      })
      window.open(href, '_blank')
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
.search-bar {
  margin-top: 20px;
  text-align: left;
  font-size: 14px;
}
.table {
  border: 1px solid #ececec;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  padding: 0px 20px 50px 20px;
  margin-top: 20px;
}
</style>
