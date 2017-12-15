<template>
  <div class="edit-wrap">
    <el-dialog title="添加商品" @close="dialogClose" @open="dialogOpen" :visible.sync="dialogFormVisible" width="900px">
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
            </el-upload></li>
          </ul>
        </div>
        <div class="dialog-right">
          <div class="color-box">
            <span>商品颜色：</span>
            <ul class="color">
              <li v-for="(color, index) in colors" @click="tabColorClick(index, color)" :id="index" :class="{selectedItem:index === tabColorIndex}"><div :style="{backgroundColor: color.key}"></div></li>
            </ul>
          </div>
          <div class="color-detail">
            <ul class="main-box">
              <li>
                <span>尺寸：</span>
                <ul class="size">
                  <li @click="clickS" :class="{selectedItem:flagS}"><div>S</div></li>
                  <li @click="clickM" :class="{selectedItem:flagM}"><div>M</div></li>
                  <li @click="clickL" :class="{selectedItem:flagL}"><div>L</div></li>
                  <li @click="click1L" :class="{selectedItem:flag1L}"><div>XL</div></li>
                  <li @click="click2L" :class="{selectedItem:flag2L}"><div>2XL</div></li>
                  <li @click="click3L" :class="{selectedItem:flag3L}"><div>3XL</div></li>
                  <!-- <li v-for="(size, index) in size" @click="tabSizeClick(index, size.key, $event)" :class="{selectedItem:flag}"><div :style="{backgroundColor: size.key}">{{size.key}}</div></li> -->
                </ul>
              </li>
              <li>
                <span>库存：</span>
                <ul class="input">
                  <li v-show="flagS">
                    <el-input style="width: 83px;height:32px;" v-model="sizeS">
                      <template slot="prepend">S</template>
                    </el-input>
                  </li>
                  <li v-show="flagM">
                    <el-input style="width: 83px;height:32px;" v-model="sizeM">
                      <template slot="prepend">M</template>
                    </el-input>
                  </li>
                  <li v-show="flagL">
                    <el-input style="width: 83px;height:32px;" v-model="sizeL">
                      <template slot="prepend">L</template>
                    </el-input>
                  </li>
                  <li v-show="flag1L">
                    <el-input style="width: 83px;height:32px;" v-model="size1L">
                      <template slot="prepend">XL</template>
                    </el-input>
                  </li>
                  <li v-show="flag2L">
                    <el-input style="width: 83px;height:32px;" v-model="size2L">
                      <template slot="prepend">2XL</template>
                    </el-input>
                  </li>
                  <li v-show="flag3L">
                    <el-input style="width: 83px;height:32px;" v-model="size3L">
                      <template slot="prepend">3XL</template>
                    </el-input>
                  </li>
                </ul>
              </li>
              <li>
                <span>效果图：</span>
                <div class="img-cloth">
                  <img src="../assets/logo.png" alt="">
                  <div class="img-bottom">
                    <p>正面</p><el-button size="mini" type="primary" class="upload-btn">上传图片</el-button>
                    <input id="front_ipt" type="file" name="image" accept="image/*" @change="InputChangeFront" style="display: none;">
                  </div>
                </div>
                <div class="img-cloth">
                  <img src="../assets/logo.png" alt="">
                  <div class="img-bottom">
                    <p>反面</p><el-button size="mini" type="primary" class="upload-btn">上传图片</el-button>
                    <input id="back_ipt" type="file" name="image" accept="image/*" @change="InputChangeBack" style="display: none;">
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
  name: 'EditGoods',
  props: {
    dialogShow: {
      default: false,
      type: Boolean
    },
    editType: {
      default: 'add', // add：添加商品弹窗， edit：编辑商品弹窗
      type: String
    }
  },
  data () {
    return {
      dialogFormVisible: this.dialogShow,
      goodName: '', // 弹窗左侧输入框v-model
      skill: '',
      singleCost: '',
      doubleCost: '',
      singlePrice: '',
      doublePrice: '',
      textarea: '',
      tabColorIndex: 0,
      tabSizeIndex: 0,
      flagS: false, // 尺寸选中状态
      flagM: false,
      flagL: false,
      flag1L: false,
      flag2L: false,
      flag3L: false,
      sizeS: '', // 尺寸输入框v-model
      sizeM: '',
      sizeL: '',
      size1L: '',
      size2L: '',
      size3L: '',
      selectList: [], // 选中的尺寸数组
      colors: [{key: 'white'}, {key: 'black'}, {key: 'red'}, {key: 'grey'}], // 色块数组
      size: [{key: 'S'}, {key: 'M'}, {key: 'L'}, {key: 'XL'}, {key: 'XXL'}, {key: 'XXXL'}], // 尺寸数组
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
      value: '1'
    }
  },
  watch: {
    dialogShow (newVal) {
      this.dialogFormVisible = newVal
      console.log(newVal)
    },
    dialogFormVisible (newVal) {
      console.log(newVal)
      this.bus.$emit('ondialogchange', newVal)
    }
  },
  methods: {
    dialogOpen () {
      // 打开dialog时默认选中第一种颜色、S码
      this.flagS = true
      // dialog渲染完后获取DOM
      this.$nextTick(function () {
        let first = document.getElementById('0')
        if (document.all) {
          first.click() // IE
        } else { // 其它浏览器
          let e = document.createEvent('MouseEvents')
          e.initEvent('click', true, true)
          first.dispatchEvent(e)
        }
      })
    },
    // 关闭弹窗
    dialogClose () {
      // // 关闭后初始化
      // this.flagS = this.flagM = this.flagL = this.flag1L = this.flag2L = this.flag3L = false
      // this.sizeS = this.sizeM = this.sizeL = this.size1L = this.size2L = this.size3L = ''
    },
    // 正、反面上传图片
    InputChangeFront () {},
    InputChangeBack () {},
    // 删除尺寸数组元素
    delectSize (size) {
      if (this.selectList.length === 0) {
        return
      }
      for (let i = 0; i < this.selectList.length; i++) {
        if (size === this.selectList[i].key) {
          this.selectList.splice(i, 1)
          return
        }
      }
    },
    // 尺寸点击事件
    clickS () {
      this.flagS = !this.flagS
      if (this.flagS === true) {
        let item = {}
        item.key = 'S'
        this.selectList.push(item)
      } else {
        this.delectSize('S')
      }
    },
    clickM () {
      this.flagM = !this.flagM
      if (this.flagM === true) {
        let item = {}
        item.key = 'M'
        this.selectList.push(item)
      } else {
        this.delectSize('M')
      }
    },
    clickL () {
      this.flagL = !this.flagL
      if (this.flagL === true) {
        let item = {}
        item.key = 'L'
        this.selectList.push(item)
      } else {
        this.delectSize('L')
      }
    },
    click1L () {
      this.flag1L = !this.flag1L
      if (this.flag1L === true) {
        let item = {}
        item.key = 'XL'
        this.selectList.push(item)
      } else {
        this.delectSize('XL')
      }
    },
    click2L () {
      this.flag2L = !this.flag2L
      if (this.flag2L === true) {
        let item = {}
        item.key = 'XXL'
        this.selectList.push(item)
      } else {
        this.delectSize('XXL')
      }
    },
    click3L () {
      this.flag3L = !this.flag3L
      if (this.flag3L === true) {
        let item = {}
        item.key = 'XXXL'
        this.selectList.push(item)
      } else {
        this.delectSize('XXXL')
      }
    },
    // 色块点击事件
    tabColorClick (index, color) {
      this.tabColorIndex = index
    },
    // 添加商品弹窗事件
    addGoods () {
      this.$refs.upload.submit()
      this.dialogFormVisible = false
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
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
    }
  }
  .dialog-right {
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
      span {
        display: inline-block;
        width: 80px;
        height: 32px;
      }
    }
    .color-detail {
      ul.main-box {
        width: 380px;
        border: 1px solid #cccccc;
        margin-left: 20px;
        margin-right: 20px;
        li {
          margin-left: 20px;
          display: flex;
          justify-content: flex-start;
          span {
            display: inline-block;
            width: 60px;
            flex: none;
            text-align: left;
            line-height: 32px;
          }
          ul.size {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            li {
              min-width: 30px;
              height: 30px;
              margin: 10px 0px 10px 10px;
              border: 1px solid #cccccc;
              line-height: 30px;
              padding: 0 2px 0 2px;
              cursor: pointer;
              >div {
                margin: 2px auto;
              }
              &:hover {
                border: 1px solid #e3393c;
              }
            }
          }
          ul.input {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            li {
              min-width: 30px;
              height: 30px;
              margin: 10px 0px 10px 10px;
              line-height: 30px;
              cursor: pointer;
            }
          }
        }
        .img-cloth {
          margin-right: 20px;
          margin-bottom: 20px;
          img {
            width: 130px;
            height: 150px;
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
}
.selectedItem {
  border: 2px solid #e3393c !important;
  color: #e3393c;
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