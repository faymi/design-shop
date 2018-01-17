<template>
  <div class="content-wrap">
    <div class="header">
      <div class="left">订单管理</div>
      <div class="right">
        <div class="search-ipt">
          <el-input placeholder="订单号、客户、电话、地址" prefix-icon="el-icon-search" @keyup.enter.native="search" v-model="searchInput"></el-input>          
        </div>
        <div class="search-btn">
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="search-bar" v-show="searchResultShow">搜索“{{searchText}}”关键字结果：</div>
    <div class="table">
      <el-table @row-dblclick="rowClick" :data="tableData" align="left" style="width: 100%">
        <el-table-column label="订单号" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>订单号: {{ scope.row.orderId }}，收件人：{{ scope.row.consignee }}，总价：{{ scope.row.orderTotal }}</p>
              <p style="text-align: center;">双击查看订单详情</p>
              <div slot="reference" class="name-wrapper" style="display: inline-block; cursor: pointer;">
                <el-tag size="medium">{{ scope.row.orderId }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="客户" width="100"></el-table-column>
        <el-table-column  prop="orderPhone" label="联系电话" width="116"></el-table-column>
        <el-table-column  prop="orderAddress" label="收货地址"></el-table-column>
        <el-table-column  prop="consignee" label="收件人"></el-table-column>
        <el-table-column  prop="orderTotal" label="总价"></el-table-column>
        <el-table-column  prop="status" label="状态"></el-table-column>
        <el-table-column prop="orderTime" label="日期" width="180"></el-table-column>
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
  name: 'OrderManage',
  data () {
    return {
      searchResultShow: false,
      searchText: '',
      currentPage: 1,
      total: 0,
      start: 0,
      limit: 10,
      searchInput: '',
      tableData: []
    }
  },
  methods: {
    getData (start, limit, inputParams) {
      let _this = this
      let params
      params = {
        start: start,
        limit: limit
      }
      if (inputParams !== '' && inputParams !== 'undefined') {
        params.params = inputParams
      }
      this.axios.get('ideat/orderManage/getOrderList', {
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
        _this.total = result.total
        _this.tableData = result.result
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    search () {
      if (this.searchInput !== '') {
        this.searchResultShow = true
        this.searchText = this.searchInput
      } else {
        this.searchResultShow = false
      }
      this.getData(this.searchInput)
    },
    rowClick (row, event, column) {
      console.log(row)
      // this.$router.push({name: 'OrderDetail', params: { orderId: '' }})
      const {href} = this.$router.resolve({
        name: 'OrderDetail',
        query: { orderId: row.orderId }
      })
      window.open(href, '_blank')
    },
    // 分页事件
    handleCurrentChange (val) {
      this.start = this.limit * (val - 1)
      this.getData(this.start, this.limit)
    }
  },
  mounted () {
    this.getData(this.start, this.limit)
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
