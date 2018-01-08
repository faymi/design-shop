<template>
  <div class="wrap-all">
    <div class="content-wrap">
      <div class="table-wrap">
        <div class="table-left">
          <ul>
            <li><p><b>订单号：{{orderNum}}</b></p></li>
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
              <el-select v-model="select" slot="prepend" style="width: 120px;" placeholder="请选择">
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
      <div class="table-detail">
        <div class="detail-left">
          <ul>
            <li>
              <p>商品：{{goodsName}}</p>
              <span>成本单价：￥{{cost}}</span>
              <span>商品单价：￥{{price}}</span>
              <span>印花工艺：{{printSkill}}</span>
              <span>印花数量：{{printAmount}}</span>
            </li>
            <li>
              <p>商品数量：12件S码，12件M码，12件L码，12件XL码，共60件</p>
            </li>
            <li>
              <p>总价：￥{{totalPrice}}</p>
            </li>
          </ul>
          <p>效果图：</p>
          <div class="img-wrap">
            <div class="img-card">
              <img src="../assets/logo.png" alt="">
              <span>正面</span>
            </div>
            <div class="img-card">
              <img src="../assets/logo.png" alt="">
              <span>反面</span>
            </div>
          </div>
        </div>
        <div class="detail-right">
          <p>素材图下载：</p>
          <a href="javascipt: void(0)">{{frontImg}}</a>
          <a href="javascipt: void(0)s">{{backImg}}</a>
          <p class="p-2">效果图下载：</p>
          <a href="javascipt: void(0)">{{frontImg}}</a>
          <a href="javascipt: void(0)s">{{backImg}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  data () {
    return {
      status: '待付款',
      orderNum: '201711300755',
      userName: 'faymi',
      address: '广东省深圳市南山区腾讯大厦',
      goodsName: '纯棉T恤',
      amount: 15,
      price: 19,
      phone: 18819764214,
      printSkill: '直喷',
      printAmount: 2,
      cost: 29,
      invoice: '无',
      frontImg: '201711300755Z.png',
      backImg: '201711300755Z.png',
      totalPrice: '160.00',
      deliveryPrice: '10.00',
      deliveryNum: '',
      select: '1',
      value: ''
    }
  },
  methods: {
    closeOrder () {
    },
    deliver () {
    }
  },
  mounted () {
    let _this = this
    this.axios.get('ideat/orderManage/getOrderInfo', {
      params: {
        orderId: '1'
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
      console.log(result)
      return result
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
.table-wrap {
  margin: 0px 60px 0px 60px;
  border:1px solid #000;
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
  border:1px solid #000;
  border-top: none;
  margin: 0px 60px 0px 60px;
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
    .img-wrap {
      display: flex;
      justify-content: flex-start;
      .img-card {
        text-align: center;
        margin-right: 20px;
        span {
          display: block;
        }
        img {
          width: 140px;
          height: 160px;
        }
      }
    }
  }
  .detail-right {
    width: 60%;
    text-align: left;
    .p-2 {
      margin: 20px 0px 0px 0px;
    }
    a {
      display: block;
      color: #33a6ff;
      margin:  10px 0px;
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
</style>

