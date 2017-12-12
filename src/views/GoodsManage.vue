<template>
  <div class="content-wrap">
    <div class="header">
      <div class="left">商品管理</div>
      <div class="right">
        <div class="search-btn">
          <el-button type="primary" @click="dialogFormVisible = true">添加商品</el-button>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table stripe :data="tableData" align="left" style="width: 100%">
        <el-table-column prop="order_num" label="商品编号" width="180"></el-table-column>
        <el-table-column prop="name" label="商品" width="180"></el-table-column>
        <el-table-column  prop="picture" label="图片">
            <template slot-scope="scope">
                <img class="row-img" :src="scope.row.picture" alt="">
            </template>
        </el-table-column>
        <el-table-column  prop="cost" label="成本价格"></el-table-column>
        <el-table-column  prop="print_cost" label="印花成本">
          <template slot-scope="scope">
            <div class="ipt-wrap">
              <p>单面：</p>{{scope.row.print_cost}}
            </div>
            <div class="ipt-wrap">
              <p>双面：</p>{{scope.row.print_cost}}
            </div>
          </template>
        </el-table-column>
        <el-table-column  prop="print_cost" label="零售价格">
          <template slot-scope="scope">
            <div class="ipt-wrap">
              <p>单面：</p>{{scope.row.print_cost}}
            </div>
            <div class="ipt-wrap">
              <p>双面：</p>{{scope.row.print_cost}}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column  prop="total" label="设置单价">
          <template slot-scope="scope">
            <div class="ipt-wrap">
              <p>单面：</p><input type="text" placeholder="单面">
            </div>
            <div class="ipt-wrap">
              <p>双面：</p><input type="text" placeholder="双面">
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="状态">
          <template  slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
              <el-option
                v-for="item in scope.row.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="120">
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
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="900px">
      <div class="dialog-wrap">
        <div class="dialog-left">
          <ul>
            <li><span>商品名称：</span><el-input size="small" v-model="input" placeholder="请输入内容"></el-input></li>
            <li>
              <span>成本/元：</span>
            </li>
            <li><span>印花工艺：</span></li>
            <li><span>定制区域：</span></li>
            <li><span>效果图：</span></li>
          </ul>
        </div>
        <div class="dialog-right"></div>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GoodsManage',
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
          name: '纯棉T恤',
          picture: require('../assets/logo.png'),
          cost: '69',
          print_cost: '10',
          total: '99',
          status: '代签收',
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
          value: '1'
        },
        {
          order_num: 20171206125010,
          name: '纯棉T恤',
          picture: require('../assets/logo.png'),
          cost: '69',
          print_cost: '10',
          total: '99',
          status: '代签收',
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
          value: '2'
        },
        {
          order_num: 20171206125010,
          name: '纯棉T恤',
          picture: require('../assets/logo.png'),
          cost: '69',
          print_cost: '10',
          total: '99',
          status: '代签收',
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
          value: '1'
        },
        {
          order_num: 20171206125010,
          name: '纯棉T恤',
          picture: require('../assets/logo.png'),
          cost: '69',
          print_cost: '10',
          total: '99',
          status: '代签收',
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
          value: '2'
        },
        {
          order_num: 20171206125010,
          name: '纯棉T恤',
          picture: require('../assets/logo.png'),
          cost: '69',
          print_cost: '10',
          total: '99',
          status: '代签收',
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
          value: '2'
        }
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {
    let username = sessionStorage.getItem('username')
    let data = {userId: username}
    let params = JSON.stringify(data)
    this.axios.get('/ideat/goodsManage/getGoodsList', {
      params: {
        params: params
      }
    })
    .then(function (response) {
      console.log(response)
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
.dialog-wrap {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .dialog-left, .dialog-right {
    width: 50%;
    text-align: left;
  }
  .dialog-left {
    ul > li {
      margin: 10px;
      display: flex;
      justify-content: flex-start;
      span {
        display: block;
        width: 100px;
        height: 32px;
        line-height: 32px;
      }
    }
  }
}
</style>
