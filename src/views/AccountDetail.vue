<template>
  <div class="wrap-all">
    <div class="content-wrap">
      <div class="account-wrap">
        <div class="inner-wrap">
          <div class="account-header">
            <div class="header-left">
              <p>账号详情</p>
            </div>
            <div class="header-right">
              <el-button type="primary" @click="delDialog = true">删除</el-button>
              <el-button type="primary" @click="editDialog = true">编辑</el-button>
            </div>
          </div>
          <div class="account-detail">
            <div class="img-logo">
              <img src="../assets/logo.png" alt="">
            </div>
            <div class="detail-left">
              <div class="shop-name-cls"><span>店名：</span>狗迷会</div>              
              <div><span>账号：</span>idea</div>
              <div><span>域名：</span>www.baidu.com</div>
            </div>
            <div class="detail-right">
              <div><span>余额：</span>￥1000<el-button type="text">提现</el-button></div>
              <div><span>状态：</span>运营中</div>
            </div>
          </div>
          <div class="detail-list">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="订单列表" name="first">
                <el-table :data="tableData" align="left" style="width: 100%">
                  <el-table-column prop="order_num" label="订单号" width="180"></el-table-column>
                  <el-table-column prop="name" label="用户" width="100"></el-table-column>
                  <el-table-column  prop="phone" label="联系电话" width="116"></el-table-column>
                  <el-table-column  prop="address" label="收货地址"></el-table-column>
                  <el-table-column  prop="goods" label="商品"></el-table-column>
                  <el-table-column  prop="total" label="总价"></el-table-column>
                  <el-table-column  prop="status" label="状态"></el-table-column>
                  <!-- <el-table-column prop="date" label="日期" width="180"></el-table-column> -->
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="商品列表" name="second">
                <el-table :data="tableData" align="left" style="width: 100%">
                  <el-table-column prop="order_num" label="订单号" width="180"></el-table-column>
                  <el-table-column prop="name" label="客户" width="100"></el-table-column>
                  <el-table-column  prop="phone" label="联系电话" width="116"></el-table-column>
                  <el-table-column  prop="address" label="收货地址"></el-table-column>
                  <el-table-column  prop="goods" label="商品"></el-table-column>
                  <el-table-column  prop="total" label="总价"></el-table-column>
                  <el-table-column  prop="status" label="状态"></el-table-column>
                  <el-table-column prop="date" label="日期" width="180"></el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
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
      </div>
    </div>
    <el-dialog title="删除账号" :visible.sync="delDialog" width="400px" center>
      <div class="del-dialog-wrap">
        <span>是否确认删除该账号“idea？”</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delDialog = false">确 定</el-button>
        <el-button @click="delDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑账号" :visible.sync="editDialog" width="550px" center>
      <div class="edit-dialog-wrap">
        <div class="main-wrap">
          <div class="domian-cls">
            <span>账号：</span>
            <span>{{account}}</span>
          </div>
          <div class="domain-cls">
            <span>密码：</span>
            <el-input type="password" v-model="password" class="domain-ipt" clearable></el-input>
          </div>
          <div class="logo-info">
            <span>Logo:</span>
            <div class="img-wrap" @click="upload_logo">
              <img v-if="dataUrl" :src="dataUrl" alt="">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <!-- <el-button class="upload-cls" type="primary" size="small" @click="upload">上传LOGO</el-button> -->
            <input id="edit_pic_ipt" type="file" name="image" accept="image/*" @change="handleInputChange" style="display: none;">
          </div>
          <div class="domain-cls">
            <span>店名：</span>
            <el-input placeholder="请输入店名" id="shopName" v-model="shopName" class="domain-ipt" clearable></el-input>
          </div>
          <div class="domain-cls">
            <span>域名：</span>
            <span>{{domain}}</span>
          </div>
          <div class="domain-cls">
            <span>客服电话：</span>
            <el-input placeholder="请输入内容" v-model="phone" class="domain-ipt" clearable></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDialog = false">确 定</el-button>
        <el-button @click="editDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AccountDetail',
  data () {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      delDialog: false,
      editDialog: false,
      activeName: 'first',
      account: 'ideat',
      password: '123456',
      shopName: '狗迷会',
      dataUrl: '',
      imgFile: {},
      phone: '18819412313',
      domain: 'http://idea.vesstack.com/sdds2531524sdsd',
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
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    upload_logo () {
      let tag = document.getElementById('edit_pic_ipt')
      tag.click()
    },
    handleInputChange (event) {
      // let file = obj.files[0]
      // 获取当前选中的文件
      const file = event.target.files[0]
      const imgMasSize = 1024 * 1024 * 10 // 10MB
      // 检查文件类型
      if (['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split('/')[1]) < 0) {
          // 自定义报错方式
          // Toast.error("文件类型仅支持 jpeg/png/gif！", 2000, undefined, false);
        return
      }
      // 文件大小限制
      if (file.size > imgMasSize) {
        // 文件大小自定义限制
        // Toast.error("文件大小不能超过10MB！", 2000, undefined, false);
        return
      }
      // 判断是否是ios
      // let u = navigator.userAgent
      // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      // if (isiOS) {
      //     // iOS
      //   this.transformFileToFormData(file)
      //   return
      // }
      // 图片压缩之旅
      this.transformFileToDataUrl(file)
    },
    transformFileToFormData (file) {
      const formData = new FormData()
      // 自定义formData中的内容
      // type
      formData.append('type', file.type)
      // size
      formData.append('size', file.size || 'image/jpeg')
      // name
      formData.append('name', file.name)
      // lastModifiedDate
      formData.append('lastModifiedDate', file.lastModifiedDate)
      // append 文件
      formData.append('file', file)
      // 上传图片
      // uploadImg(formData)
    },
    transformFileToDataUrl (file) {
      // 存储文件相关信息
      let _this = this
      this.imgFile.type = file.type || 'image/jpeg'   // 部分安卓出现获取不到type的情况
      this.imgFile.size = file.size
      this.imgFile.name = file.name
      this.imgFile.lastModifiedDate = file.lastModifiedDate
      // console.log(file)
      // 封装好的函数
      const reader = new FileReader()
      // file转dataUrl是个异步函数，要将代码写在回调里(onload)
      reader.onload = function (e) {
        _this.dataUrl = reader.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.account-wrap {
  margin: 0px 60px 0px 60px;
  border:1px solid #000;
  font-size: 14px;
  padding: 10px;
  .inner-wrap {
    margin: 20px 40px;
    .account-header {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      .header-left, .header-right {
        width: 50%;
        height: 100%;
      }
      .header-left {
        text-align: left;
        p {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .header-right {
        text-align: right;
      }
    }
    .account-detail {
      display: flex;
      justify-content: flex-start;
      .img-logo {
        img {
          width: 150px;
          height: 150px;
        }
      }
      .detail-left {
        margin: 0 40px;
        >div {
          margin: 10px 10px 20px 10px;
          text-align: left;
          &.shop-name-cls, &.shop-name-cls>span{
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
      .detail-right {
        margin: 0 40px;
        >div {
          text-align: left;
          &:first-child {
            margin-top: 32px;
            margin-bottom: 8px;
          }
        }
      }
    }
  }
}
.del-dialog-wrap {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  span {
    font-size: 16px;
    color: #000;
  }
}
.edit-dialog-wrap {
  width: 90%;
  margin: 0 auto;
  .main-wrap {
    >div {
      margin-top: 20px;
      height: 40px;
      text-align: left;
      >span {
        width: 80px;
        text-align: left;
        line-height: 40px;
        display: inline-block;
        flex: none;
      }
      >p {
        border: 1px solid #D8DCE5;
        background-color: #f5f7fa;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 4px;
        color: #878d99;
        line-height: 40px;
      }
    }
    .logo-info {
      height: 100px;
      text-align: left;
      display: flex;
      align-items: flex-start;
      .img-wrap {
        width: 100px;
        height: 100px;
        margin-right: 40px;
        border: 1px dashed #d9d9d9;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
          width: 98%;
          height: 98%;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 98%;
          height: 98%;
          line-height: 100px;
          text-align: center;
        }
      }
      .upload-cls {
        align-self:flex-end;
      }
    }
    .domain-cls {
      display: flex;
      justify-content: flex-start;
      .domain-ipt {
        width: 400px;
      }
    }
    .div-btn {
      margin-top: 60px;
      button {
        margin-right: 40px;
      }
    }
  }
}
</style>