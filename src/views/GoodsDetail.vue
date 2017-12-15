<template>
  <div class="wrap-all">
    <div class="content-wrap">
      <div class="goods-wrap">
        <div class="inner-wrap">
          <div class="goods-header">
            <div class="header-left">
              <p>商品详情</p>
            </div>
            <div class="header-right">
              <el-button type="primary" @click="delDialog = true">删除</el-button>
              <el-button type="primary" @click="editDialog = true">编辑</el-button>
            </div>
          </div>
          <div class="goods-content">
            <div class="goods-img"><img src="../assets/logo.png" alt=""></div>
            <div class="goods-detail">
              <div class="goods-name">
                <span>纯棉T恤</span>
                <el-select v-model="value" placeholder="请选择" size="small" style="width: 100px;">
                  <el-option key="0" label="已上架" value="0"></el-option>
                  <el-option key="1" label="已下架" value="1"></el-option>
                </el-select>
              </div>
              <div class="color-box">
                <ul class="color">
                  <li v-for="(color, index) in colors" @click="colorClick(index, color)" :id="index" :class="{selectedItem:index === tabColorIndex}"><div :style="{backgroundColor: color.key}"></div></li>
                </ul>
              </div>
              <div class="size-stock">
                <p>尺寸&库存</p>
                <span v-for="item in stock">{{item.size}}/{{item.amount}}</span>
              </div>
              <div class="price-box">
                <div class="price-left">
                  <p>成本单价</p>
                  <span>印花单面：￥18</span>
                  <span>印花双面：￥28</span>
                </div>
                <div class="price-right">
                  <p>零售单价</p>
                  <span>印花单面：未设置</span>
                  <span>印花双面：￥28</span>
                </div>
                <div class="price-right">
                  <p>印花工艺</p>
                  <span>打印机直喷</span>
                </div>
              </div>
            </div>
          </div>
          <div class="goods-introduction">
            <p>商品简介</p>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</span>
          </div>
          <div class="goods-picture">
            <img src="../assets/logo.png" alt="">
            <img src="../assets/logo.png" alt="">
            <img src="../assets/logo.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="删除商品" :visible.sync="delDialog" width="400px" center>
      <div class="del-dialog-wrap">
        <span>是否确认删除该商品“纯棉T恤？”</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delDialog = false">确 定</el-button>
        <el-button @click="delDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GoodsDetail',
  data () {
    return {
      delDialog: false,
      value: '0',
      tabColorIndex: 0,
      colors: [{key: 'white'}, {key: 'black'}, {key: 'red'}, {key: 'grey'}], // 色块数组
      stock: [{size: 'S', amount: 200}, {size: 'M', amount: 12}, {size: 'L', amount: 621}, {size: 'XL', amount: 1544}, {size: 'XXL', amount: 212}]
    }
  },
  methods: {
    // 色块点击事件
    colorClick (index, color) {
      this.tabColorIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.goods-wrap {
  margin: 0px 60px 20px 60px;
  border:1px solid #000;
  font-size: 14px;
  padding: 10px;
  .inner-wrap {
    margin: 20px 40px;
    .goods-header {
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
    .goods-content {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      .goods-img {
        width: 200px;
        height: 220px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goods-detail {
        .goods-name {
          margin-left: 20px;
          text-align: left;
          span {
            font-size: 16px;
            font-weight: bold;
            margin-right: 10px;
          }
        }
        .color-box {
          display: flex;
          justify-content: flex-start;
          margin-top: 14px;
          margin-left: 20px;
          ul.color {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-top: -14px;
            li {
              width: 30px;
              height: 30px;
              margin: 10px 0px 10px 10px;
              border: 1px solid #cccccc;
              line-height: 30px;
              cursor: pointer;
              >div {
                width: 26px;
                height: 26px;
                margin: 2px auto;
              }
              &:hover {
                border: 1px solid #e3393c;
              }
            }
          }
        }
      }
      .size-stock {
        width: 500px;
        height: 60px;
        border:1px solid #000;
        margin-left: 20px;
        text-align: left;
        p {
          font-weight: bold;
          margin: 10px;
        }
        span {
          margin: 10px 0px 10px 10px;
        }
      }
      .price-box {
        display: flex;
        justify-content: flex-start;
        margin-top: 20px;
        margin-left: 20px;
        flex-wrap: wrap;
        .price-left, .price-right {
          width: 300px;
          height: 40px;
          text-align: left;
          p {
            font-weight: bold;
            margin: 10px;
          }
          span {
            margin: 10px 0px 10px 10px;
          }
        }
      }
    }
    .goods-introduction {
      text-align: left;
      margin-top: 20px;
      p {
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
    .goods-picture {
      margin-top: 20px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      img {
        width: 500px;
        height: 600px;
        margin: 10px;
      }
    }
  }
}
.selectedItem {
  border: 2px solid #e3393c !important;
  color: #e3393c;
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
</style>