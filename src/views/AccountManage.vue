<template>
  <div class="content-wrap">
    <div class="header">
      <div class="left">账号管理</div>
      <div class="right">
        <div class="search-btn">
          <el-button type="primary">添加账号</el-button>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table stripe :data="tableData" align="left" style="width: 100%">
        <el-table-column prop="num" label="编号" width="180"></el-table-column>
        <el-table-column  prop="picture" label="LOGO">
            <template slot-scope="scope">
                <img class="row-img" :src="scope.row.picture" alt="">
            </template>
        </el-table-column>
        <el-table-column prop="account" label="账号" width="180"></el-table-column>        
        <el-table-column  prop="domain" label="域名"></el-table-column>
        <el-table-column  prop="order_num" label="订单数"></el-table-column>
        <el-table-column  prop="order_total" label="成交额"></el-table-column>
        <el-table-column label="状态">
          <template  slot-scope="scope">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in scope.row.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">详情</el-button>
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
  </div>
</template>

<script>
export default {
  name: 'GoodsManage',
  data () {
    return {
      searchInput: '',
      tableData: [
        {
          num: 20171206125010,
          name: '纯棉T恤',
          picture: require('../assets/logo.png'),
          account: 'admin',
          domain: 'www.baidu.com',
          order_num: '99',
          order_total: '15461',
          date: '2016-05-02',
          options: [
            {
              value: '1',
              label: '未上架'
            },
            {
              value: '2',
              label: '已上架'
            }
          ],
          value: ''
        },
        {
          num: 20171206125010,
          name: '纯棉T恤',
          picture: require('../assets/logo.png'),
          account: 'admin',
          domain: 'www.baidu.com',
          order_num: '99',
          order_total: '15461',
          date: '2016-05-02',
          options: [
            {
              value: '1',
              label: '未上架'
            },
            {
              value: '2',
              label: '已上架'
            }
          ],
          value: ''
        },
        {
          num: 20171206125010,
          name: '纯棉T恤',
          picture: require('../assets/logo.png'),
          account: 'admin',
          domain: 'www.baidu.com',
          order_num: '99',
          order_total: '15461',
          date: '2016-05-02',
          options: [
            {
              value: '1',
              label: '未上架'
            },
            {
              value: '2',
              label: '已上架'
            }
          ],
          value: ''
        },
        {
          num: 20171206125010,
          name: '纯棉T恤',
          picture: require('../assets/logo.png'),
          account: 'admin',
          domain: 'www.baidu.com',
          order_num: '99',
          order_total: '15461',
          date: '2016-05-02',
          options: [
            {
              value: '1',
              label: '未上架'
            },
            {
              value: '2',
              label: '已上架'
            }
          ],
          value: ''
        },
        {
          num: 20171206125010,
          name: '纯棉T恤',
          picture: require('../assets/logo.png'),
          account: 'admin',
          domain: 'www.baidu.com',
          order_num: '99',
          order_total: '15461',
          date: '2016-05-02',
          options: [
            {
              value: '1',
              label: '未上架'
            },
            {
              value: '2',
              label: '已上架'
            }
          ],
          value: ''
        }
      ]
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
</style>
