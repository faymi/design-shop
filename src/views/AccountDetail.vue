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
              <img :src="logoImg" alt="">
            </div>
            <div class="detail-left">
              <div class="shop-name-cls"><span>店名：</span>{{shopName}}</div>              
              <div><span>账号：</span>{{userId}}</div>
              <div><span>域名：</span>{{domain}}</div>
            </div>
            <div class="detail-right">
              <div><span>余额：</span>￥{{balance}}<el-button type="text">提现</el-button></div>
              <div><span>状态：</span>{{status}}</div>
            </div>
          </div>
          <div class="detail-list">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="订单列表" name="order" class="table">
                <el-table :data="orderList" align="left" style="width: 100%">
                  <el-table-column prop="orderId" label="订单号" width="180"></el-table-column>
                  <el-table-column prop="orderName" label="客户" width="100"></el-table-column>
                  <el-table-column  prop="orderPhone" label="联系电话" width="116"></el-table-column>
                  <el-table-column  prop="orderAddress" label="收货地址"></el-table-column>
                  <el-table-column  prop="goodsName" label="商品"></el-table-column>
                  <el-table-column  prop="orderTotal" label="总价"></el-table-column>
                  <el-table-column  prop="status" label="状态"></el-table-column>
                  <el-table-column prop="orderTime" label="日期" width="180"></el-table-column>
                  <!-- <el-table-column prop="date" label="日期" width="180"></el-table-column> -->
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="商品列表" name="goods">
                <el-table :data="goodsList" align="left" style="width: 100%">
                  <el-table-column type="index" :index="indexMethod" label="编号" width="50"></el-table-column>
                  <el-table-column prop="goodsId" label="商品编号" width="180" v-if="false"></el-table-column>
                  <el-table-column prop="goodsName" label="商品" width="180">
                  </el-table-column>
                  <el-table-column  label="图片">
                      <template slot-scope="scope">
                          <img class="row-img" :src="scope.row.goodsPicPath" alt="">
                      </template>
                  </el-table-column>
                  <el-table-column label="成本价格">
                    <template slot-scope="scope">
                      <div class="ipt-wrap">
                        <p>单面：</p>{{scope.row.singleCost}}
                      </div>
                      <div class="ipt-wrap">
                        <p>双面：</p>{{scope.row.doubleCost}}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="零售价格" v-if="!authority">
                    <template slot-scope="scope">
                      <div class="ipt-wrap">
                        <p>单面：</p>{{scope.row.singlePrice}}
                      </div>
                      <div class="ipt-wrap">
                        <p>双面：</p>{{scope.row.doublePrice}}
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">编辑</el-button>              
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" v-if="!authority">
                    <template  slot-scope="scope">
                      <el-select v-model="scope.row.status" placeholder="请选择" @change="selectChange(scope.row.goodsId, scope.row.status)">
                        <el-option
                          v-for="item in scope.row.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
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
      </div>
    </div>
    <el-dialog title="删除账号" :visible.sync="delDialog" width="400px" center>
      <div class="del-dialog-wrap">
        <span>是否确认删除该账号“{{userId}}”？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteUser">确 定</el-button>
        <el-button @click="delDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑账号" :visible.sync="editDialog" width="550px" center>
      <div class="edit-dialog-wrap">
        <div class="main-wrap">
          <div class="domian-cls">
            <span>账号：</span>
            <span>{{userId}}</span>
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
            <el-input placeholder="请输入店名" id="shopName" v-model="shopNameEdit" class="domain-ipt" clearable></el-input>
          </div>
          <div class="domain-cls">
            <span>域名：</span>
            <b>{{domain}}</b>
          </div>
          <div class="domain-cls">
            <span>客服电话：</span>
            <el-input placeholder="请输入内容" v-model="phone" class="domain-ipt" clearable></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editUser">确 定</el-button>
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
      currentPage: 1,
      total: 0,
      start: 0,
      limit: 10,
      tabName: '',
      authority: false,
      delDialog: false,
      editDialog: false,
      activeName: 'order',
      userId: '',
      account: '',
      password: '',
      shopName: '',
      shopNameEdit: '',
      balance: 0,
      status: '',
      dataUrl: '',
      logoImg: '',
      imgFile: {},
      phone: '',
      domain: '',
      orderList: [],
      goodsList: []
    }
  },
  methods: {
    // tab 切换事件
    handleClick (tab, event) {
      this.tabName = tab.name
      this.start = 0
      if (tab.name === 'order') {
        this.getOrderList(this.start, this.limit)
      } else {
        this.getGoodsList(this.start, this.limit)
      }
    },
    // 获取订单列表
    getOrderList (start, limit) {
      let _this = this
      let params
      params = {
        start: start,
        limit: limit
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
        _this.orderList = result.result
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // 获取商品列表
    getGoodsList (start, limit) {
      let _this = this
      let data = {userId: this.userId}
      let params = data
      this.axios.get('/ideat/goodsManage/getGoodsList', {
        params: {
          ...params,
          start: start,
          limit: limit
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
        let result = data.body.result
        let options = [{value: '0', label: '未上架'}, {value: '1', label: '已上架'}]
        for (let i = 0; i < result.length; i++) {
          result[i].options = options
          result[i].status = String(result[i].status)
        }
        _this.total = data.body.total
        _this.goodsList = result
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // 序号
    indexMethod (index) {
      return index + this.start + 1
    },
    // 分页事件
    handleCurrentChange (val) {
      this.start = this.limit * (val - 1)
      if (this.tabName === 'order') {
        this.getOrderList(this.start, this.limit)
      } else {
        this.getGoodsList(this.start, this.limit)
      }
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
    },
    // 编辑账号
    editUser () {
      let _this = this
      let time = this.moment().format('YYYY-MM-DD HH:mm:ss')
      this.editDialog = true
      let params = {
        pwd: this.password,
        servicePhone: this.phone,
        shopName: this.shopNameEdit,
        updateTime: time,
        userId: this.userId
      }
      let reg = /^http/
      if (!reg.test(this.dataUrl)) {
        params.logoPic = this.dataUrl
      }
      this.axios.post('ideat/userManage/editUserInfo', {
        ...params
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
        _this.$notify.success({
          title: '温馨提示',
          message: data.msg
        })
        _this.editDialog = false
        _this.getData()
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // 删除账号
    deleteUser () {
      let _this = this
      let time = this.moment().format('YYYY-MM-DD HH:mm:ss')
      this.axios.post('ideat/userManage/deleteUser', {
        userId: _this.userId,
        updateTime: time
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
        _this.$notify.success({
          title: '温馨提示',
          message: data.msg
        })
        _this.delDialog = false
        _this.$router.push('/accountManage')
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // 获取初始数据
    getData () {
      let _this = this
      this.userId = this.$route.query.accountId
      this.axios.get('ideat/userManage/getUserInfo', {
        params: {
          userId: _this.userId
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
        _this.account = result.userName
        _this.shopName = result.shopName
        _this.shopNameEdit = result.shopName
        _this.domain = result.userDomain
        _this.balance = result.balance
        _this.status = result.status
        if (result.logoPic === '') {
          _this.dataUrl = _this.logoImg = require('../assets/user.png')
        } else {
          _this.logoImg = result.logoPic
          _this.dataUrl = result.logoPic
        }
        _this.password = result.pwd
        _this.phone = result.servicePhone
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    // console.log(this.$route.query)
    this.authority = sessionStorage.getItem('authority') === 'true'
    this.getData()
    this.getOrderList(this.start, this.limit)
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
    .detail-list {
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