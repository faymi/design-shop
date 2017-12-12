<template>
  <div class="wrap-all">
    <div class="content-wrap">
      <div class="table-wrap">
        <div class="table-left">
          <ul>
            <li><p>订单号：201711300755</p></li>
            <li><p>客户：faymi</p></li>
            <li><p>收货地址：广东省深圳市南山区腾讯大厦</p></li>
            <li>
              <span>商品：纯棉T恤</span>
              <span>商品数量：12件</span>
              <span>商品单价：￥69</span>
            </li>
            <li>
              <span>印花工艺：直喷</span>
              <span>印花数量：2</span>
              <span>成本单价：￥25</span>
            </li>
            <li>
              <span>发票抬头：无</span>
            </li>
          </ul>
        </div>
        <div class="table-right">
          <p class="p-2">待付款</p>
          <div class="deliver">
            <el-input placeholder="快递单号" v-model="input5" class="input-with-select">
              <el-select v-model="select" slot="prepend" style="width: 120px;" placeholder="请选择">
                <el-option label="顺丰" value="1"></el-option>
                <el-option label="申通" value="2"></el-option>
                <el-option label="圆通" value="3"></el-option>
                <el-option label="韵达" value="4"></el-option>
                <el-option label="其他" value="5"></el-option>
              </el-select>
            </el-input>
          </div>
          <span>合计：￥160.00（含运费￥10.00）</span>
        </div>
      </div>
      <div class="table-detail">
        <div class="detail-left">
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
          <p>素材下载：</p>
          <a href="javascipt: void(0)">201711300755Z.png</a>
          <a href="javascipt: void(0)s">201711300755Z.png</a>
          <p class="p-2">比例大小：</p>
          <el-table :data="tableData" border style="width: 400px; margin-top: 20px;">
            <el-table-column prop="front" label="正面" width="199"></el-table-column>
            <el-table-column prop="back" label="反面" width="199"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="table-btn">
        <el-button class="btn-size" type="primary">关闭订单</el-button>
        <el-button class="btn-size" type="primary">发货</el-button>
        <el-button class="btn-size" v-show="false" type="primary">已发货</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  data () {
    return {
      select: '',
      tableData: [
        {
          front: '16*8 => 5*5',
          back: '16*8 => 5*5'
        },
        {
          front: '32*16 => 10*10',
          back: '32*16 => 10*10'
        }],
      value: ''
    }
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
      position: absolute;
      top: 40px;
      right: 0;
      .input-with-select {
        width: 350px;
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
    width: 40%;
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
      margin: 20px 0px;
    }
    a {
      display: block;
      color: #33a6ff;
      margin:  10px 0px;
    }
  }
}
.table-btn {
  font-size: 14px;
  border:1px solid #000;
  border-top: none;
  margin: 0px 60px 0px 60px;
  padding: 10px;  
  display: flex;
  justify-content: space-between;
  .btn-size {
    width: 100px;
  }
}
</style>

