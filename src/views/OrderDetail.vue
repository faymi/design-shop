<template>
  <div class="content-wrap">
    <div class="info-wrap">
      <div class="table-wrap">
        <div class="table-left">
          <ul>
            <li><p><b>订单号：{{orderId}}</b></p></li>
            <li><p><b>客户：{{userName}}</b></p></li>
            <li><p>收货地址：{{address}}</p></li>
            <li><p>联系电话：{{phone}}</p></li>
            <li><p>商品数量：{{amount}}件</p></li>
            <li><p>合计金额：￥{{cost}}</p></li>
          </ul>
        </div>
        <div class="table-right">
          <p>{{status}}</p>
          <div class="deliver">
            <el-input placeholder="快递单号" v-model="deliveryNum" class="input-with-select">
              <el-select v-model="select" slot="prepend" style="width: 80px;" placeholder="请选择">
                <el-option label="顺丰" value="1"></el-option>
                <el-option label="申通" value="2"></el-option>
                <el-option label="圆通" value="3"></el-option>
                <el-option label="韵达" value="4"></el-option>
                <el-option label="其他" value="5"></el-option>
              </el-select>
            </el-input>
            <el-input placeholder="运费" v-model="deliveryPrice" class="delivery-class"></el-input>
          </div>
          <div class="table-btn">
            <el-button class="btn-size" type="primary" @click="closeOrder">关闭订单</el-button>
            <el-button class="btn-size" type="primary" @click="deliver">发货</el-button>
            <el-button class="btn-size" v-show="false" type="primary">已发货</el-button>
          </div>
          <!-- <span>合计：￥{{totalPrice}}（含运费￥{{deliveryPrice}}）</span> -->
        </div>
      </div>
      <div class="table-detail" v-for="(item, index) in goodsInfoResult" :key="index">
        <div class="detail-left">
          <ul>
            <li>
              <p>商品：{{item.goodsName}}</p>
              <span>成本单价：￥{{item.cost}}</span>
              <span>商品单价：￥{{item.price}}</span>
              <span>印花工艺：{{item.printing}}</span>
              <span>商品数量：{{item.buyCount}}</span>
            </li>
            <li>
              <p>商品数量：<b v-for="size in item.sizeList">{{size.sizeId}}件{{size.buyCount}}码，</b>共{{item.buyCount}}件</p>
            </li>
            <li>
              <p>总价：￥{{item.goodsTotalPrice}}</p>
            </li>
          </ul>
          <p>效果图：</p>
          <v-picture :front-img="item.frontXGPath" :front-img-made="item.frontSCPath" :back-img="item.backXGPath" :back-img-made="item.backSCPath" :index="String(index)"></v-picture>
        </div>
        <div class="detail-right">
          <p>素材图下载：</p>
          <span><a :href="item.frontSCPath" download="">{{frontImgName}}</a></span>
          <span><a :href="item.backSCPath"  download="">{{backImgName}}</a></span>
          <p class="p-2">效果图下载：</p>
          <span><a href="javascipt: void(0)" @click="saveFrontImg($event, index)">{{frontImgName}}</a></span>
          <span><a href="javascipt: void(0)"  @click="saveBackImg($event, index)">{{backImgName}}</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComposePicture from '@/components/ComposePicture'

export default {
  name: 'OrderDetail',
  components: {
    'v-picture': ComposePicture
  },
  data () {
    return {
      status: '待付款',
      userName: '',
      address: '',
      goodsName: '',
      amount: 0,
      price: 0,
      phone: '',
      cost: 0,
      frontImgName: '正面',
      backImgName: '反面',
      deliveryPrice: '',
      deliveryNum: '',
      select: '1',
      value: '',
      orderId: '',
      goodsInfoResult: []
    }
  },
  methods: {
    editOrder (status) {
      this.axios.post('ideat/orderManage/getOrderInfo', {
        orderId: this.orderId,
        status: status
      })
      .then(res => {
        if (res.code === 0) {
          this.$notify.success({
            title: '温馨提示',
            message: res.msg
          })
        }
      })
    },
    // 关闭订单
    closeOrder () {
      this.editOrder(4)
    },
    // 发货
    deliver () {
      this.editOrder(2)
    },
    // base64 转二进制格式
    base64Img2Blob (code) {
      var parts = code.split(';base64,')
      var contentType = parts[0].split(':')[1]
      var raw = window.atob(parts[1])
      var rawLength = raw.length
      var uInt8Array = new Uint8Array(rawLength)
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], {type: contentType})
    },
    // 下载正面效果图
    saveFrontImg (e, index) {
      let aLink = e.currentTarget
      var myCanvas = document.getElementById('canvas-front-0' + String(index))
      var image = myCanvas.toDataURL('image/png', 1.0)
      var blob = this.base64Img2Blob(image)
      aLink.download = this.frontImgName
      aLink.href = URL.createObjectURL(blob)
    },
    // 下载反面效果图
    saveBackImg (e, index) {
      let aLink = e.currentTarget
      var myCanvas = document.getElementById('canvas-back-0' + String(index))
      var image = myCanvas.toDataURL('image/png', 1.0)
      var blob = this.base64Img2Blob(image)
      aLink.download = this.backImgName
      aLink.href = URL.createObjectURL(blob)
    }
  },
  mounted () {
    let _this = this
    this.orderId = this.$route.query.orderId
    this.axios.get('ideat/orderManage/getOrderInfo', {
      params: {
        orderId: this.orderId
      }
    })
    .then(function (response) {
      let data = response.data
      if (data.code !== 0) {
        _this.$notify.error({
          title: '温馨提示',
          message: data.msg
        })
        return false
      }
      let result = data.body
      let addressResult = result.addressResult
      _this.userName = addressResult.consignee
      _this.address = addressResult.address
      _this.phone = addressResult.phone
      _this.amount = addressResult.goodsCount
      _this.cost = addressResult.orderTotal
      _this.status = addressResult.status
      _this.goodsInfoResult = result.goodsInfoResult
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.info-wrap {
  margin: 0px 60px 20px 60px;
  // border:1px solid #000;
  font-size: 14px;
  padding: 10px;
  .table-wrap {
    margin: 0px 60px 0px 60px;
    // border:1px solid #000;
    border: 1px solid #ececec;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    font-size: 14px;
    display: flex;
    padding: 10px;
    justify-content: space-around;
    .table-left, .table-right {
      width: 50%;
      height: 150px;
      text-align: left;
    }
    .table-left > ul {
      li {
        margin: 10px 0px 10px 0px;
        p > b {
          font-size: 16px;
          font-weight: bold;
        }
        span {
          display: inline-block;
          width: 150px;
          margin-right: 20px;
        }
      }
    }
    .table-right {
      position: relative;
      p {
        text-align: right;
        font-size: 24px;
        font-weight: bold;
      }
      .deliver {
        display: flex;
        justify-content: flex-end;
        position: absolute;
        top: 40px;
        right: 0;
        .input-with-select {
          width: 350px;
        }
        .delivery-class {
          width: 100px;
          margin-left: 10px;
        }
      }
      >span {
        display: inline-block;
        position: absolute;
        bottom: 10px;
        right: 0;
      }
    }
  }
  .table-detail {
    font-size: 14px;
    // border:1px solid #000;
    border: 1px solid #ececec;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    border-top: none;
    margin: 10px 60px 0px 60px;
    padding: 10px;  
    display: flex;
    justify-content: flex-start;
    .detail-left {
      width: 50%;
      > ul {
        li {
          margin: 10px 0px 10px 0px;
          text-align: left;
          span {
            display: inline-block;
            width: 150px;
            margin-right: 20px;
            margin-top: 10px;
          }
        }
      }
      p {
        text-align: left;
      }
    }
    .detail-right {
      width: 60%;
      text-align: left;
      .p-2 {
        margin: 20px 0px 0px 0px;
      }
      span {
        display: block;
        margin:  10px 0px;
        a {
          color: #33a6ff;
        }
      }
    }
  }
  .table-btn {
    margin-top: 70px;
    font-size: 14px;
    border-top: none;
    display: flex;
    justify-content: flex-end;
    .btn-size {
      width: 100px;
    }
  }
}
</style>

