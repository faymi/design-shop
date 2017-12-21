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
      <el-table stripe :data="tableData" @row-dblclick="goodsRow_DbClick" align="left" style="width: 100%">
        <el-table-column prop="goodsId" label="商品编号" width="180"></el-table-column>
        <el-table-column prop="goodsName" label="商品" width="180"></el-table-column>
        <el-table-column  label="图片">
            <template slot-scope="scope">
                <img class="row-img" :src="scope.row.goodsPicPath" alt="">
            </template>
        </el-table-column>
        <!-- <el-table-column  prop="cost" label="成本价格"></el-table-column> -->
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
        <el-table-column label="零售价格">
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
              action="ideat/goodsManage/addGoodsPic"
              :on-preview="handlePreview"
              :on-success="onSuccess"
              :before-upload="beforeUpload"
              :on-remove="handleRemove"
              :file-list="fileList"
              accept="image/*"
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
        <div class="dialog-right">
          <div class="color-box">
            <span>商品颜色：</span>
            <ul class="color">
              <li v-for="(color, index) in colors" @click="tabColorClick(index, color)" :key="index" :id="index" :class="{selectedItem:index === tabColorIndex}"><div :style="{backgroundColor: color.key}"></div></li>
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
                    <el-input style="width: 83px;height:32px;" v-model="sizeS" @blur="inputBlur('S')">
                      <template slot="prepend">S</template>
                    </el-input>
                  </li>
                  <li v-show="flagM">
                    <el-input style="width: 83px;height:32px;" v-model="sizeM" @blur="inputBlur('M')">
                      <template slot="prepend">M</template>
                    </el-input>
                  </li>
                  <li v-show="flagL">
                    <el-input style="width: 83px;height:32px;" v-model="sizeL" @blur="inputBlur('L')">
                      <template slot="prepend">L</template>
                    </el-input>
                  </li>
                  <li v-show="flag1L">
                    <el-input style="width: 83px;height:32px;" v-model="size1L" @blur="inputBlur('XL')">
                      <template slot="prepend">XL</template>
                    </el-input>
                  </li>
                  <li v-show="flag2L">
                    <el-input style="width: 83px;height:32px;" v-model="size2L" @blur="inputBlur('2XL')">
                      <template slot="prepend">2XL</template>
                    </el-input>
                  </li>
                  <li v-show="flag3L">
                    <el-input style="width: 83px;height:32px;" v-model="size3L" @blur="inputBlur('3XL')">
                      <template slot="prepend">3XL</template>
                    </el-input>
                  </li>
                </ul>
              </li>
              <li>
                <span>效果图：</span>
                <div class="img-cloth">
                  <img :src="frontImg" alt="">
                  <div class="img-bottom">
                    <p>正面</p><el-button size="mini" type="primary" class="upload-btn" @click ="uploadFront">上传图片</el-button>
                    <input id="front_ipt" type="file" name="image" accept="image/*" @change="InputChangeFront" style="display: none;">
                  </div>
                </div>
                <div class="img-cloth">
                  <img :src="backImg" alt="">
                  <div class="img-bottom">
                    <p>反面</p><el-button size="mini" type="primary" class="upload-btn" @click ="uploadBack">上传图片</el-button>
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
    <el-dialog :visible.sync="preViewDialog" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GoodsManage',
  data () {
    return {
      userId: '',
      currentPage1: 5, // 分页
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      searchInput: '',
      goodName: '', // 弹窗左侧输入框v-model
      skill: '',
      singleCost: '',
      doubleCost: '',
      singlePrice: '',
      doublePrice: '',
      textarea: '',
      goodsId: '',
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
      colors: [{key: 'white', color: 1}, {key: 'black', color: 2}, {key: 'red', color: 3}, {key: 'grey', color: 4}], // 色块数组
      size: [{key: 'S'}, {key: 'M'}, {key: 'L'}, {key: 'XL'}, {key: 'XXL'}, {key: 'XXXL'}], // 尺寸数组
      params: [],
      mainParams: [],
      currentColor: '',
      detail: [],
      fileList: [],
      imgFile: {},
      dataUrl: [],
      fileData: [],
      dialogImageUrl: '',
      goodsPicPath: '',
      frontImg: require('../assets/logo.png'),
      backImg: require('../assets/logo.png'),
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
      tableData: [],
      dialogFormVisible: false,
      preViewDialog: false,
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
    selectChange (goodsId, status) {
      console.log(this.userId)
      let _this = this
      let time = this.moment().format('YYYY-MM-DD HH:mm:ss')
      this.axios.post('ideat/goodsManage/editGoodsInfo', {
        userId: this.userId,
        goodsId: goodsId,
        status: status,
        inserTime: time
      })
      .then(function (response) {
        console.log(response)
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
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    goodsRow_DbClick (row, event) {
      console.log(row)
      const {href} = this.$router.resolve({
        name: 'GoodsDetail',
        query: { goodsId: row.goodsId }
      })
      window.open(href, '_blank')
    },
    dialogOpen () {
      // 打开dialog时默认选中第一种颜色、S码
      this.flagS = true
      // dialog渲染完后获取DOM
      this.$nextTick(function () {
        let first = document.getElementById('0') // 此处的id值不能和编辑商品处的id一样
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
    uploadImg (action) {
      console.log(action)
    },
    // 转换为base64 side =>0：正面，1：反面，type => 0：素材，1：效果图
    transformFileToDataUrl (file, side, type) {
      // console.log(file)
      let _this = this
      // 封装好的函数
      const reader = new FileReader()
      // file转dataUrl是个异步函数，要将代码写在回调里(onload)
      reader.onload = function (e) {
        let params = []
        params.side = side
        params.goodsPicType = type
        params.goodsPicInfo = reader.result
        if (side === 0 && type === 1) {
          _this.frontImg = reader.result
        }
        if (side === 1 && type === 1) {
          _this.backImg = reader.result
        }
        _this.dataUrl.push(params)
      }
      reader.readAsDataURL(file)
    },
    getFile (event, size, type) {
      // 获取当前选中的文件
      const file = event.target.files[0]
      const imgMasSize = 1024 * 1024 * 10 // 10MB
      // 检查文件类型
      if (['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split('/')[1]) < 0) {
          // 自定义报错方式
          // Toast.error("文件类型仅支持 jpeg/png/gif！", 2000, undefined, false);
        this.$message.error('文件类型仅支持 jpeg/png/gif！')
        return
      }
      // 文件大小限制
      if (file.size > imgMasSize) {
        // 文件大小自定义限制
        // Toast.error("文件大小不能超过10MB！", 2000, undefined, false);
        this.$message.error('文件大小不能超过10MB！')
        return
      }
      // 图片压缩之旅
      this.transformFileToDataUrl(file, size, type)
    },
    // 触发上传图片事件
    uploadFront () {
      let tag = document.getElementById('front_ipt')
      tag.click()
    },
    uploadBack () {
      let tag = document.getElementById('back_ipt')
      tag.click()
    },
    // 正、反面上传图片
    InputChangeFront (event) {
      this.getFile(event, 0, 1)
    },
    InputChangeBack (event) {
      this.getFile(event, 1, 1)
    },
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
      this.sizeS = this.sizeM = this.sizeL = this.size1L = this.size2L = this.size3L = ''
      this.currentColor = color.color
      let flag = false
      for (let i = 0; i < this.params.length; i++) {
        if (this.params[i].color === color.color) {
          flag = true
        }
      }
      if (!flag) {
        let item = {}
        item.color = color.color
        item.detail = []
        this.params.push(item)
      }
      console.log(this.params)
      // 切换回来已输入尺寸的色块时显示已输入的尺寸
      for (let i = 0; i < this.params.length; i++) {
        if (this.params[i].color === this.currentColor) {
          if (this.params[i].detail.length === 0) {
            this.flagS = true
            this.flagM = this.flagL = this.flag1L = this.flag2L = this.flag3L = false
            this.sizeS = this.sizeM = this.sizeL = this.size1L = this.size2L = this.size3L = ''
          } else {
            this.flagS = this.flagM = this.flagL = this.flag1L = this.flag2L = this.flag3L = false
            this.sizeS = this.sizeM = this.sizeL = this.size1L = this.size2L = this.size3L = ''
            for (let k = 0; k < this.params[i].detail.length; k++) {
              if (this.params[i].detail[k].sizeId === 'S') {
                this.flagS = true
                this.sizeS = this.params[i].detail[k].amount
              }
              if (this.params[i].detail[k].sizeId === 'M') {
                this.flagM = true
                this.sizeM = this.params[i].detail[k].amount
              }
              if (this.params[i].detail[k].sizeId === 'L') {
                this.flagL = true
                this.sizeL = this.params[i].detail[k].amount
              }
              if (this.params[i].detail[k].sizeId === 'XL') {
                this.flag1L = true
                this.size1L = this.params[i].detail[k].amount
              }
              if (this.params[i].detail[k].sizeId === '2XL') {
                this.flag2L = true
                this.size2L = this.params[i].detail[k].amount
              }
              if (this.params[i].detail[k].sizeId === '3XL') {
                this.flag3L = true
                this.size3L = this.params[i].detail[k].amount
              }
            }
          }
        }
      }
    },
    // 尺寸输入框失去焦点事件
    inputBlur (type) {
      let itemChild = {}
      let detail = []
      switch (type) {
        case 'S':
          if (this.sizeS !== '') {
            itemChild.sizeId = 'S'
            itemChild.amount = this.sizeS
            detail.push(itemChild)
          }
          break
        case 'M':
          if (this.sizeM !== '') {
            itemChild.sizeId = 'M'
            itemChild.amount = this.sizeM
            detail.push(itemChild)
          }
          break
        case 'L':
          if (this.sizeL !== '') {
            itemChild.sizeId = 'L'
            itemChild.amount = this.sizeL
            detail.push(itemChild)
          }
          break
        case 'XL':
          if (this.size1L !== '') {
            itemChild.sizeId = 'XL'
            itemChild.amount = this.sizeXL
            detail.push(itemChild)
          }
          break
        case '2XL':
          if (this.size2L !== '') {
            itemChild.sizeId = '2XL'
            itemChild.amount = this.size2L
            detail.push(itemChild)
          }
          break
        case '3XL':
          if (this.size3L !== '') {
            itemChild.sizeId = '3XL'
            itemChild.amount = this.size3L
            detail.push(itemChild)
          }
          break
      }
      for (let i = 0; i < this.params.length; i++) {
        if (this.params[i].color === this.currentColor) {
          if (itemChild.hasOwnProperty('sizeId')) {
            for (let j = 0; j < this.params[i].detail.length; j++) {
              if (this.params[i].detail[j].sizeId === itemChild.sizeId) {
                this.params[i].detail.splice(j, 1)
              }
            }
            this.params[i].detail.push(itemChild)
          }
        }
      }
      console.log(this.params)
    },
    // 尺寸点击事件
    // tabSizeClick (index, size, event) {
    //   console.log(event)
    //   // this.tabSizeIndex = index
    // },
    // 添加商品完成事件
    addGoods () {
      // console.log(this.dataUrl)
      this.$refs.upload.submit()
      // this.$refs.upload.submit()
      // console.log(this.params)
      // 去除detail为空的数组项
      for (let i = 0; i < this.params.length; i++) {
        if (this.params[i].detail.length === 0) {
          this.params.splice(i, 1)
          i = 0
        }
      }
      console.log(this.params)
      let _this = this
      let time = this.moment().format('YYYY-MM-DD HH:mm:ss')
      this.axios.post('ideat/goodsManage/addGoods', {
        goodsName: this.goodName,
        goodsTypeId: this.value,
        printing: this.skill,
        singleCost: this.singleCost,
        doubleCost: this.doubleCost,
        goodsDescript: this.textarea,
        insertTime: time
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
        // console.log(data)
        _this.goodsId = data.body.goodsId
        _this.addGoodsExtra()
        // this.dialogFormVisible = false
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    addGoodsExtra () {
      let _this = this
      this.axios.post('ideat/goodsManage/addGoodsExtra', {
        params: [
          {color: 1, detail: [{sizeId: 'S', amount: 100}, {sizeId: 'M', amount: 145}, {sizeId: 'L', amount: 654}]},
          {color: 2, detail: [{sizeId: 'S', amount: 101}, {sizeId: 'M', amount: 645}, {sizeId: 'L', amount: 484}]},
          {color: 3, detail: [{sizeId: 'S', amount: 651}, {sizeId: 'M', amount: 444}, {sizeId: 'L', amount: 997}]}
        ],
        goodsId: this.goodsId
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
        console.log(data)
        // _this.goodsId = data.body.goodsId
        // this.dialogFormVisible = false
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    beforeUpload (file) {
      // this.fileData.push(file)
      this.transformFileToDataUrl(file, 0, 0)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      // this.dataUrl = file.url
      this.preViewDialog = true
      this.dialogImageUrl = file.url
      // console.log(file)
    },
    onSuccess (response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  watch: {
    dialogFormVisible (curVal, oldVal) {
      if (!curVal) {
        // 关闭后初始化
        this.flagS = this.flagM = this.flagL = this.flag1L = this.flag2L = this.flag3L = false
        this.sizeS = this.sizeM = this.sizeL = this.size1L = this.size2L = this.size3L = ''
      }
    }
  },
  mounted () {
    let _this = this
    this.userId = sessionStorage.getItem('username')
    let data = {userId: this.userId}
    let params = data
    this.axios.get('/ideat/goodsManage/getGoodsList', {
      params: {
        ...params,
        start: 0,
        limit: 10
      }
    })
    .then(function (response) {
      console.log(response)
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
      _this.tableData = result
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
  border: 1px solid #e3393c !important;
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