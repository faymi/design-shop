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
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible" width="900px">
      <div class="dialog-wrap">
        <div class="dialog-left">
          <ul>
            <li><span>商品名称：</span><el-input size="small" v-model="goodName" placeholder="请输入商品名称"></el-input></li>
            <li>
              <span>商品类型：</span>
              <el-select v-model="value" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            </li>
            <li><span>印花工艺：</span><el-input size="small" v-model="skill"></el-input></li>
            <li>
              <span>成本价格：</span>
              <el-input style="width: 100px;height:32px;" v-model="singleCost">
                <template slot="prepend">单面</template>
                <template slot="append">元</template>
              </el-input>
              <el-input v-model="doubleCost" style="width: 100px;margin-left: 24px;">
                <template slot="prepend">双面</template>
                <template slot="append">元</template>
              </el-input>
            </li>
            <li>
              <span>零售价格：</span>
              <el-input style="width: 100px;height:32px;" v-model="singlePrice">
                <template slot="prepend">单面</template>
                <template slot="append">元</template>
              </el-input>
              <el-input v-model="doublePrice" style="width: 100px;margin-left: 24px;">
                <template slot="prepend">双面</template>
                <template slot="append">元</template>
              </el-input>
            </li>
            <!-- <li>
              <span>定制区域：</span>
              <el-input style="width: 100px;height:32px;" v-model="input3">
                <template slot="prepend">X</template>
                <template slot="append">cm</template>
              </el-input>
              <el-input style="width: 100px;height:32px;margin-left: 24px;" v-model="input3">
                <template slot="prepend">Y</template>
                <template slot="append">cm</template>
              </el-input>
              <a>正面</a>
            </li> -->
            <!-- <li>
              <span></span>
              <el-input style="width: 100px;height:32px;" v-model="input3">
                <template slot="prepend">X</template>
                <template slot="append">cm</template>
              </el-input>
              <el-input style="width: 100px;height:32px;margin-left: 24px;" v-model="input3">
                <template slot="prepend">Y</template>
                <template slot="append">cm</template>
              </el-input>
              <a>反面</a>
            </li> -->
            <li><span>商品简介：</span><el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input></li>
            <li><span>商品图片：</span><el-upload
              class="upload-card"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture-card"
              :auto-upload="false">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload></li>
            <!-- <li>
              <span>效果图：</span>
              <div class="img-cloth">
                <img src="../assets/logo.png" alt="">
                <div class="img-bottom">
                  <p>正面</p><el-button size="mini" type="primary" class="upload-btn">上传图片</el-button>
                  <input id="front_ipt" type="file" name="image" accept="image/*" @change="handleInputChange" style="display: none;">
                </div>
              </div>
              <div class="img-cloth">
                <img src="../assets/logo.png" alt="">
                <div class="img-bottom">
                  <p>正面</p><el-button size="mini" type="primary" class="upload-btn">上传图片</el-button>
                  <input id="back_ipt" type="file" name="image" accept="image/*" @change="handleInputChange" style="display: none;">
                </div>
              </div>
            </li> -->
          </ul>
        </div>
        <div class="dialog-right"></div>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addGoods">完成添加</el-button>
        <el-button @click="dialogFormVisible = false">取  消</el-button>
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
      goodName: '',
      skill: '',
      singleCost: '',
      doubleCost: '',
      singlePrice: '',
      doublePrice: '',
      textarea: '',
      fileList: [],
      options: [
        {
          value: '1',
          label: 'T恤'
        },
        {
          value: '2',
          label: '卫衣'
        },
        {
          value: '3',
          label: 'POLO衫'
        }],
      value: '1',
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
    addGoods () {
      this.$refs.upload.submit()
      this.dialogFormVisible = false
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
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
        text-align: right;
        flex: none;
      }
      a {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        margin-left: 10px;
      }
      .img-cloth {
        margin-right: 20px;
        img {
          width: 140px;
          height: 160px;
        }
        .img-bottom {
          display: flex;
          justify-content: space-around;
          .upload-btn {
            height:26px;
            line-height: 24px;
            padding:0px 4px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
// 修改element组件的样式 /deep/
.el-input-group--prepend /deep/ div.el-input-group__prepend,
.el-input-group--append /deep/ div.el-input-group__append {
  padding: 0 4px;
  height: 30px;
  line-height: 30px;
}
.el-input-group--prepend /deep/ input {
  height: 32px;
}
.el-input /deep/ input.el-input__inner {
  padding: 0px 4px;
}
.upload-card /deep/ ul.el-upload-list--picture-card /deep/ li.el-upload-list__item {
  width: 80px;
  height: 80px;
}
.upload-card /deep/ .el-upload--picture-card {
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 90px;
}
</style>
