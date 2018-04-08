<template>
  <div class="Customized-wrap">
    <div class="color-bar">
      <div class="div-ul">
        <ul>
          <li v-for="(item, index) in goodsColors" :key="index" :id="'goodsColor_'+(index+1)" :class="{hadSelect: index == currentIndex}" @click="selectColor(index,item)">
            <div :style="{backgroundColor: item.color}"></div>
          </li>
        </ul>
      </div>
      <div class="done-btn">
        <router-link to="/total">
          <button @click="doneMade">完成</button>        
        </router-link>
      </div>
    </div>
    <div class="main">
      <div class="main-design" v-show="isFrontSide">
        <img :src="frontImg" class="img-cls">
        <div @click="design_btn" class="canvas-wrap">
          <canvas id="c"></canvas>
        </div>
      </div>
      <div class="main-design" v-show="!isFrontSide">
        <img :src="backImg" class="img-cls">
        <div @click="design_btn" class="canvas-wrap">
          <canvas id="d"></canvas>
        </div>
      </div> 
    </div>
    <div class="design-btn">
      <button @click="design_btn" v-show="isFrontSide && frontDesignBtnShow">点击定制</button>
    </div>
    <div class="design-btn">
      <button @click="design_btn" v-show="!isFrontSide && backDesignBtnShow">点击定制</button>
    </div>
    <!-- 按钮区 -->
    <div class="footer">
      <!-- 删除、打钩按钮 -->
      <div class="delete-btn" v-show="operationBtn" @click="delete_item">
        <i class="fa fa-trash-o fa-lg"></i>
      </div>
      <div class="checked-btn" v-show="operationBtn" @click="check_item">
        <i class="fa fa-check fa-lg"></i>
      </div>
      <!-- 底部按钮 -->
      <div class="operation" v-show="operationBtn">
        <!-- 添加图片按钮 -->
        <div class="operation-btn" v-show="!comActiveShow" @click="add_pic">
          <i class="fa fa-picture-o fa-lg"></i>
          <input id="add_pic_ipt" type="file" name="image" accept="image/*" @change="handleInputChange" style="display: none;">
        </div>
        <!-- 添加文字按钮 -->
        <div class="operation-btn" v-show="!comActiveShow" @click="add_font">
          <i class="fa fa-font fa-lg"></i>
        </div>
        <!-- 预览按钮 -->
        <div class="operation-btn" v-show="!comActiveShow" @click="preview">
          <i class="fa fa-eye fa-lg"></i>
        </div>
        <!-- 编辑文字按钮 -->
        <div class="operation-btn" :class="{'operation-btn-disactive': btnActiveIndex == 0}" v-show="comActiveShow && !isFrontImg" @click="is_editing(0)">
          <i class="fa fa-pencil fa-lg"></i>
        </div>
        <!-- 选择字体按钮 -->
        <div class="operation-btn" :class="{'operation-btn-disactive': btnActiveIndex == 1}" v-show="comActiveShow && !isFrontImg" @click="add_font_show(1)">
          <i class="fa fa-font fa-lg"></i>
        </div>
        <!-- 选择颜色按钮 -->
        <div class="operation-btn" :class="{'operation-btn-disactive': btnActiveIndex == 2}" v-show="comActiveShow && !isFrontImg" @click="font_color_show(2)">
          <i class="fa fa-dashboard fa-lg"></i>
        </div>
        <!-- 旋转及其子按钮 -->
        <div class="operation-btn" v-show="comActiveShow" :class="{'operation-btn-disactive': btnActiveIndex == 3}" @click="rotate(3)">
          <i class="fa fa-rotate-left fa-lg"></i>
          <div class="rotate-operation">
            <div class="operation-btn" :class="[btnActiveIndex == 3 ? 'rotateItemA' : 'rotateItemBack']" @click="rotate_angle('0')">
              <i class="fa">0°</i>
            </div>
            <div class="operation-btn" :class="[btnActiveIndex == 3 ? 'rotateItemB' : 'rotateItemBack']" @click="rotate_angle('90')">
              <i class="fa">&nbsp;90°</i>
            </div>
            <div class="operation-btn" :class="[btnActiveIndex == 3 ? 'rotateItemC' : 'rotateItemBack']" @click="rotate_angle('180')">
              <i class="fa">&nbsp;180°</i>
            </div>
            <div class="operation-btn" :class="[btnActiveIndex == 3 ? 'rotateItemD' : 'rotateItemBack']" @click="rotate_angle('270')">
              <i class="fa">270°</i>
            </div>
          </div>
        </div>
        <!-- 缩放按钮 -->
        <div class="operation-btn" :class="{'operation-btn-disactive': btnActiveIndex == 4}" v-show="comActiveShow" @click="expand(4)">
          <i class="fa fa-expand fa-lg"></i>
        </div>
        <!-- 颜色选择器 -->
        <div class="color-div" v-show="color_toggle">
          <color-picker v-model="color" :openToggle="openStatus" v-on:change="headleChangeColor"></color-picker>
        </div>
        <!-- 字体选择 -->
        <ul v-show="font_toggle">
          <li class="activeTouch" v-for="item in fonts" v-bind:key="item.v" @click="select_font(item.v)">
            {{item.v}}
          </li>
        </ul>
      </div>
      <div class="side" v-show="!operationBtn">
        <button :class="{ active: !isFrontSide }" @click="toSide('front')">正面</button>
        <button :class="{ active: isFrontSide }" @click="toSide('back')">反面</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {fabric} from 'fabric'
import * as FontFaceObserver from 'fontfaceobserver'
import * as _ from '@/util/tool'
import api from '@/api/fetch'

export default {
  name: 'Customized',
  data () {
    return {
      btnActiveIndex: 4,
      isFrontImg: false, // 当前选中的是否为图片框，false: 选中文字框，true：选中图片框
      isBackImg: false,
      rotateItem: false,
      btnDisactive: false,
      comActiveShow: false,
      isChecked: false,
      frontDesignBtnShow: true,
      backDesignBtnShow: true,
      operationBtn: false,
      isFrontSide: true,
      hadSelect: false,
      font_toggle: false,
      size_toggle: false,
      color_toggle: false,
      openStatus: false,
      color: '',
      currentIndex: 0,
      currentCanvas: 'canvasFront',
      colorList: [
        {color: 'white', 'colorId': '1'},
        {color: 'black', 'colorId': '2'},
        {color: 'red', 'colorId': '3'},
        {color: 'green', 'colorId': '4'}
      ],
      selectedColorId: '1',
      goodsColors: [],
      frontImg: require('../assets/t-shirt-front.jpg'),
      backImg: require('../assets/t-shirt.png'),
      fonts: [
        {v: 'OpenSansCondensed'},
        {v: 'IndieFlower'},
        {v: 'Lobster'},
        {v: 'AlexBrush'},
        {v: 'Pacifico'},
        {v: 'Special Elite'},
        {v: 'Gloria Hallelujah'},
        {v: 'huakang-haibao'}
      ],
      font_size: [
        {v: 12},
        {v: 14},
        {v: 16},
        {v: 18},
        {v: 20},
        {v: 24},
        {v: 48}
      ],
      canvasFront: {}, // 画布
      canvasBack: {},
      imgElement: {},
      Text: {},
      textboxFront: {},
      textboxBack: {},
      imgInstance: {},
      imgFile: {},
      dataUrl: ''
    }
  },
  computed: {
    ...mapGetters({
      goodsId: 'goodsId',
      domain: 'domain'
    })
  },
  methods: {
    typeChangeEvt (target, active) {
      if (active) {
        if (target.type === 'textbox') {
          this.isFrontImg = false
        } else {
          this.isFrontImg = true
        }
      } else {
        if (target.type === 'textbox') {
          this.isBackImg = false
        } else {
          this.isBackImg = true
        }
      }
    },
    // checkBtn
    check_item (e) {
      this.isChecked = true
      this.comActiveShow = false
      // 取消选择
      this[this.currentCanvas]._discardActiveObject(e)
      this[this.currentCanvas].requestRenderAll()
    },
    // previewBtn
    preview () {
      this.operationBtn = false
      let imgDom = document.getElementsByClassName('img-cls')
      let canvasDom = document.getElementsByClassName('canvas-wrap')
      let canvasHasObjects = this[this.currentCanvas].getObjects().length === 0
      if (this.isFrontSide && canvasHasObjects) {
        canvasDom[0].style.display = 'none'
        this.frontDesignBtnShow = true
      } else if (!this.isFrontSide && canvasHasObjects) {
        canvasDom[1].style.display = 'none'
        this.backDesignBtnShow = true
      }
      if (this.isFrontSide) {
        imgDom[0].classList.remove('scale-img-20')
      } else {
        imgDom[1].classList.remove('scale-img-20')
      }
      if (this.isChecked && this.isFrontSide && !canvasHasObjects) {
        this.frontDesignBtnShow = false
        canvasDom[0].classList.remove('canvas-scale-10')
        canvasDom[0].classList.add('canvas-scale-05')
      }
      if (this.isChecked && !this.isFrontSide && !canvasHasObjects) {
        this.backDesignBtnShow = false
        canvasDom[1].classList.remove('canvas-scale-10')
        canvasDom[1].classList.add('canvas-scale-05')
      }
    },
    // 进入编辑状态
    is_editing (index) {
      this.btnActiveIndex = index
      this[this.currentCanvas].getActiveObject().enterEditing()
    },
    // 旋转
    rotate (index) {
      this.btnActiveIndex = index
      this.btnDisactive = true
      this.rotateItem = !this.rotateItem
    },
    // rotate angle
    rotate_angle (angle) {
      let currentRotateObject = this[this.currentCanvas].getActiveObject()
      if (currentRotateObject === null) {
        this.$toast('请先选中图层！')
        return
      }
      currentRotateObject.animate('angle', angle, {
        duration: 1000,
        easing: fabric.util.ease.easeOutBounce,
        onChange: this[this.currentCanvas].renderAll.bind(this[this.currentCanvas])
      })
    },
    // 放大缩小
    expand (index) {
      this.btnActiveIndex = index
      this.btnDisactive = false
    },
    // 点击定制
    design_btn () {
      let canvasDom = document.getElementsByClassName('canvas-wrap')
      if (this.isFrontSide) {
        this.frontDesignBtnShow = false
        canvasDom[0].style.display = 'block'
      } else {
        this.backDesignBtnShow = false
        canvasDom[1].style.display = 'block'
      }
      this.operationBtn = true
      let imgDom = document.getElementsByClassName('img-cls')
      if (this.isFrontSide) {
        imgDom[0].classList.add('scale-img-20')
      } else {
        imgDom[1].classList.add('scale-img-20')
      }
      if (this.isChecked && this.isFrontSide) {
        canvasDom[0].classList.add('canvas-scale-10')
      } else if (this.isChecked && !this.isFrontSide) {
        canvasDom[1].classList.add('canvas-scale-10')
      }
    },
    // 完成定制
    doneMade () {
      let data = {
        frontMadeImg: this.canvasFront.toDataURL({format: 'png', multiplier: 1}),
        backMadeImg: this.canvasBack.toDataURL({format: 'png', multiplier: 1})
      }
      this.$store.dispatch('setMadeImg', data)
    },
    // 颜色选择
    selectColor (index, item) {
      this.currentIndex = index
      this.selectedColorId = item.colorId
      let params = {
        domain: this.domain,
        colorId: item.colorId,
        goodsId: this.goodsId
      }
      this.$store.dispatch('showLoading', true)
      api.getGoodsInfo(params)
      .then(res => {
        this.$store.dispatch('showLoading', false)
        if (res.code === 0) {
          let goodsInfo = {
            colorId: item.colorId,
            ...res.body
          }
          this.$store.dispatch('setGoodsInfo', goodsInfo)
          this.frontImg = res.body.imageList[0].frontXGPath
          this.backImg = res.body.imageList[0].backXGPath
        }
      })
    },
    // 点击正反面
    toSide (type) {
      if (type === 'front') {
        this.isFrontSide = true
      } else {
        this.isFrontSide = false
      }
    },
    // 组件间openStatus双向通信
    on_openStatus_change (val) {
      this.openStatus = val
    },
    // 颜色面板选择颜色  字体颜色
    headleChangeColor () {
      this[this.currentCanvas].getActiveObject().set({
        'fill': this.color
      }).setCoords()
      this[this.currentCanvas].requestRenderAll()
    },
    font_size_show () {
      this.font_toggle = false
      this.color_toggle = false
      this.size_toggle = !this.size_toggle
    },
    font_color_show (index) {
      this.btnActiveIndex = index
      this.openStatus = !this.openStatus
      this.font_toggle = false
      this.size_toggle = false
      this.color_toggle = !this.color_toggle
    },
    add_pic () {
      let tag = document.getElementById('add_pic_ipt')
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
      let _this = this
      // 存储文件相关信息
      this.imgFile.type = file.type || 'image/jpeg'   // 部分安卓出现获取不到type的情况
      this.imgFile.size = file.size
      this.imgFile.name = file.name
      this.imgFile.lastModifiedDate = file.lastModifiedDate
      // console.log(file)
      // 封装好的函数
      const reader = new FileReader()
      // file转dataUrl是个异步函数，要将代码写在回调里(onload)
      reader.onload = function (e) {
        const result = e.target.result
        let image = new Image()
        let width, scale
        image.onload = function () {
          width = image.width
          // height = image.height
          // 固定150宽度，等比例缩放
          scale = (150 / width)
          this.dataUrl = reader.result
          fabric.Image.fromURL(this.dataUrl, function (oImg) {
            _this.comActiveShow = true
            if (_this.isFrontSide) {
              _this.canvasFront.centerObject(oImg)
              _this.canvasFront.add(oImg).setActiveObject(oImg)
              // console.log(_this.canvasFront.getActiveObject().toJSON())
              let target = _this.canvasFront.getActiveObject().toJSON()
              _this.typeChangeEvt(target, true)
            } else {
              _this.canvasBack.centerObject(oImg)
              _this.canvasBack.add(oImg).setActiveObject(oImg)
              let target = _this.canvasBack.getActiveObject().toJSON()
              _this.typeChangeEvt(target, false)
            }
          }, {
            originX: 'center',
            originY: 'center',
            scaleX: scale,
            scaleY: scale
          })
        }
        image.src = result
      }
      reader.readAsDataURL(file)
    },
    // 添加字体
    add_font () {
      this.comActiveShow = true
      if (this.isFrontSide) {
        let canvasWidth = this.canvasFront.getWidth()
        let canvasHeight = this.canvasFront.getHeight()
        this.textboxFront = new fabric.Textbox('双击输入文字', {
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          width: 150,
          fontSize: 20,
          textAlign: 'center'
        })
        this.canvasFront.add(this.textboxFront).setActiveObject(this.textboxFront)
        let target = this.canvasFront.getActiveObject().toJSON()
        this.typeChangeEvt(target, true)
      } else {
        let canvasWidth = this.canvasBack.getWidth()
        let canvasHeight = this.canvasBack.getHeight()
        this.textboxBack = new fabric.Textbox('双击输入文字', {
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          width: 150,
          fontSize: 20,
          textAlign: 'center'
        })
        this.canvasBack.add(this.textboxBack).setActiveObject(this.textboxBack)
        let target = this.canvasBack.getActiveObject().toJSON()
        this.typeChangeEvt(target, false)
      }
    },
    add_font_show (index) {
      this.btnActiveIndex = index
      this.color_toggle = false
      this.size_toggle = false
      this.font_toggle = true
    },
    // 清除active图层
    delete_item () {
      this[this.currentCanvas].remove(this[this.currentCanvas].getActiveObject())
      this[this.currentCanvas].requestRenderAll()
    },
    // 选择字体
    select_font (font) {
      this.font_toggle = false
      // alert(font)
      var myfont = new FontFaceObserver(font)
      var _this = this
      myfont.load()
        .then(function () {
          // when font is loaded, use it.
          _this[_this.currentCanvas].getActiveObject().set({
            'fontFamily': font // 设置font-family
            // 'fill': 'yellowgreen'  // 设置字体颜色
          })
          _this[_this.currentCanvas].requestRenderAll()
        }).catch(function (e) {
          // console.log(e)
          _.alert('请先选中文字！')
        })
    },
    // 选择字体大小
    select_font_size (fontSize) {
      this.size_toggle = !this.size_toggle
      if (this.isFrontSide) {
        this.textboxFront.set({
          'fontSize': fontSize
        }).setCoords()
        this.canvasFront.requestRenderAll()
      } else {
        this.textboxBack.set({
          'fontSize': fontSize
        }).setCoords()
        this.canvasBack.requestRenderAll()
      }
    },
    create_front_cavans (width, height) {
      let _this = this
      let itemObj = document.getElementsByClassName('canvas-wrap')
      itemObj[0].style.width = width + 'px'
      itemObj[0].style.height = height + 'px'
      let canvasWidth = itemObj[0].clientWidth
      let canvasHeight = itemObj[0].clientHeight
      this.canvasFront = new fabric.Canvas('c') // 利用fabric找到我们的画布
      this.canvasFront.setWidth(canvasWidth)
      this.canvasFront.setHeight(canvasHeight)
      // this.textboxFront = new fabric.Textbox('双击输入文字', {
      //   left: canvasWidth / 2,
      //   top: canvasHeight / 2,
      //   width: 150,
      //   fontSize: 20,
      //   textAlign: 'center'
      // })

      // this.canvasFront.add(this.textboxFront).setActiveObject(this.textboxFront) // 加入到canvas中

      // this.canvasFront.on('object:selected', function (e) {
      //   console.log(e.target.toJSON())
      // })
      this.canvasFront.on('mouse:down', function (e) {
        if (e.target !== null) {
          // console.log(e.target.toJSON())
          let target = e.target.toJSON()
          if (target.type === 'textbox') {
            _this.isFrontImg = false
          } else {
            _this.isFrontImg = true
          }
        }
      })
    },
    create_back_cavans (width, height) {
      let _this = this
      let itemObj = document.getElementsByClassName('canvas-wrap')
      itemObj[1].style.width = width + 'px'
      itemObj[1].style.height = height + 'px'
      let canvasWidth = itemObj[0].clientWidth
      let canvasHeight = itemObj[0].clientHeight
      this.canvasBack = new fabric.Canvas('d') // 利用fabric找到我们的画布
      this.canvasBack.setWidth(canvasWidth)
      this.canvasBack.setHeight(canvasHeight)
      // this.textboxBack = new fabric.Textbox('双击输入文字', {
      //   left: canvasWidth / 2,
      //   top: canvasHeight / 2,
      //   width: 150,
      //   fontSize: 20,
      //   textAlign: 'center'
      // })

      // this.canvasBack.add(this.textboxBack).setActiveObject(this.textboxBack) // 加入到canvas中

      this.canvasBack.on('mouse:down', function (e) {
        if (e.target !== null) {
          let target = e.target.toJSON()
          if (target.type === 'textbox') {
            _this.isFrontImg = false
          } else {
            _this.isFrontImg = true
          }
        }
      })
    }
  },
  mounted () {
    let optionsopt = {
      'bl': true,
      'br': true,
      'mb': false,
      'ml': false,
      'mr': false,
      'mt': false,
      'tl': true,
      'tr': true,
      'mtr': true
    }
    fabric.Object.prototype.setControlsVisibility(optionsopt)
    fabric.Object.prototype.set({
      cornerStyle: 'circle',
      cornerStrokeColor: '#578ffe',
      cornerColor: '#578ffe',
      transparentCorners: false,
      centeredRotation: true,
      originX: 'center',
      originY: 'center'
    })
    let mainDesign = document.getElementsByClassName('main-design')
    // 正反面底图高度
    let imgHeight = document.documentElement.clientHeight
    // 定制区域相对正反图的缩小倍数 2:3
    let scale = 2 / 3
    // 屏幕宽度
    let deviceWidth = document.documentElement.clientWidth

    let width, height

    mainDesign[0].style.height = imgHeight + 'px'
    mainDesign[1].style.height = imgHeight + 'px'
    mainDesign[0].style.width = deviceWidth + 'px'
    mainDesign[1].style.width = deviceWidth + 'px'
    width = deviceWidth * scale
    height = imgHeight * scale

    this.create_front_cavans(width, height)
    this.create_back_cavans(width, height)
  },
  activated () {
    let canvasDom = document.getElementsByClassName('canvas-wrap')
    if (this.canvasFront.getObjects().length !== 0) {
      canvasDom[0].style.display = 'block'
    } else if (this.canvasBack.getObjects().length !== 0) {
      canvasDom[0].style.display = 'block'
    } else {
      canvasDom[0].style.display = 'none'
      canvasDom[1].style.display = 'none'
    }
    this.goodsColors = []
    let params = {
      domain: this.domain,
      // color: item.val,
      goodsId: this.goodsId
    }
    this.$store.dispatch('showLoading', true)
    api.getgoodsColor(params)
    .then(res => {
      if (res.code === 0) {
        this.$store.dispatch('showLoading', false)
        for (let i in res.body) {
          for (let k in this.colorList) {
            if (res.body[i].colorId === this.colorList[k].colorId) {
              this.goodsColors.push(this.colorList[k])
            }
          }
        }
        this.$nextTick(function () {
          let first = document.getElementById('goodsColor_' + this.selectedColorId)
          first.click()
        })
      }
    })
  },
  watch: {
    btnDisactive: function (newV, oldV) {
      let canvasSide = this.isFrontSide ? 'canvasFront' : 'canvasBack'
      if (newV) {
        let optionsopt = {
          'bl': false,
          'br': false,
          'mb': false,
          'ml': false,
          'mr': false,
          'mt': false,
          'tl': false,
          'tr': false,
          'mtr': true
        }
        this[canvasSide].getActiveObject().setControlsVisibility(optionsopt).setCoords()
        this[canvasSide].requestRenderAll()
      } else {
        let optionsopt = {
          'bl': true,
          'br': true,
          'mb': false,
          'ml': false,
          'mr': false,
          'mt': false,
          'tl': true,
          'tr': true,
          'mtr': false
        }
        this[canvasSide].getActiveObject().setControlsVisibility(optionsopt).setCoords()
        this[canvasSide].requestRenderAll()
      }
    },
    isFrontImg: function (newVal, oldVal) {
      console.log(newVal)
    },
    isBackImg: function (newVal, oldVal) {
      console.log(newVal)
    },
    isFrontSide: function (newVal, oldVal) {
      this.currentCanvas = newVal ? 'canvasFront' : 'canvasBack'
    },
    btnActiveIndex: function (newVal, oldVal) {
      this.font_toggle = newVal === 1
      // 文本框退出编辑状态
      if (newVal !== 0) {
        let objectArr = this[this.currentCanvas].getObjects()
        for (let i in objectArr) {
          if (objectArr[i].type === 'textbox') {
            objectArr[i].exitEditing()
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
@import '../assets/css/fonts';

.Customized-wrap {
  width: 100%;
  height: 100%;
  .color-bar {
    width: 100%;
    height: px2rem(110px);
    display: flex;
    justify-content: space-between;
    background: transparent;
    position: absolute;
    .div-ul {
      overflow: hidden;
      overflow-x:auto;
      white-space: nowrap;
      ul {
        width: 100%;
        height: 100%; 
        padding-right: px2em(180px);
        line-height: px2rem(110px);
        li {         
          width: px2rem(90px);
          height: px2rem(90px);
          // background-color: yellowgreen;
          margin: px2rem(10px) 0 px2rem(10px) px2rem(10px);
          display:inline-block;
          div {
            width: px2rem(80px);
            height: px2rem(80px);
            margin: px2rem(4px) auto;
          }
        }
      }
      &::-webkit-scrollbar{
        display:none;
      }
    }
    .done-btn button{
      width: px2rem(180px);
      height: px2rem(110px);
      border: none;
      background: rgba(228,230,251,.5);
      color: $btn-color;
      font-size: 16px;
      :active {
        background: rgba(228,230,251,.9);
      }
    }
  }
  .main {
    width: 100%;
    max-height: 100%;
    .main-design {
      margin: 0 auto;
      background-size: cover;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        transition: all .7s ease;
      }
      .scale-img-20 {
        transform: scale(2);
      }
      .scale-img-10 {
        transform: scale(1);
      }
      .canvas-scale-05 {
        transform: translate(-50%, -50%) scale(0.5)!important;
      }
      .canvas-scale-10 {
        transform: translate(-50%, -50%) scale(1)!important;
      }
      .canvas-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        margin: px2rem(40px) auto;
        transition: all .7s ease;
        #c {
          width: 100%;
          height: 100%;
          border: px2rem(2px) dashed #999;
        }
        #d {
          width: 100%;
          height: 100%;
          border: px2rem(2px) dashed #999;
        }
      }
    }
  }
  .delete-btn {
    position: absolute;
    left: px2rem(40px);
    top: px2rem(20px);
    width: px2rem(80px);
    height: px2rem(80px);
    line-height: px2rem(80px);
    text-align: center;
    border-radius: px2rem(40px);
    background: rgba(228,230,251,.8);
    color: $btn-color;
    :active {
      background-color: #ececec;
      color: #999;
    }
  }
  .checked-btn {
    position: absolute;
    right: px2rem(40px);
    top: px2rem(20px);
    width: px2rem(80px);
    height: px2rem(80px);
    line-height: px2rem(80px);
    text-align: center;
    border-radius: px2rem(40px);
    background: rgba(228,230,251,.8);
    color: $btn-color;
    :active {
      background-color: #ececec;
      color: #999;
    }
  }
  .operation {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: px2rem(50px);
    text-align: center;
    color: $btn-font-color;
    display: flex;
    justify-content: space-between;
    .operation-btn {
      width: px2rem(80px);
      height: px2rem(80px);
      line-height: px2rem(80px);
      border-radius: px2rem(40px);
      background-color: $btn-color;
      margin: 0 px2rem(20px);
      transition: all .5 linear;
      &:active {
        background-color: #e4e6fb !important;
        color: #578ffe;
      }
    }
    .color-div {
      position: absolute;
      top: px2rem(-480px);
      right: px2rem(508px);
    }
    >ul {
      margin: 0 auto;
      width: px2rem(300px);
      height: px2rem(300px);
      overflow-x: auto;
      background-color: #fff;
      position: absolute;
      top: px2rem(-320px);
      left: px2rem(32px);
      li {
        width: 100%;
        height: px2rem(60px);
        margin: px2rem(10px);
        line-height: px2rem(60px);
        border-bottom: px2rem(2px) solid #ececec;
        color: #000;
      }
      &::-webkit-scrollbar{
        display:none;
      }
    }
  }
  .rotate-operation {
    position: absolute;
    text-align: center;
    color: $btn-font-color;
    top: 6px;
    .operation-btn {
      position: absolute;
      width: px2rem(60px);
      height: px2rem(60px);
      line-height: px2rem(60px);
      border-radius: px2rem(30px);
      background-color: $btn-color;
      margin: 0 px2rem(10px);
      transform: translate3d(0, 0, 0);
      transition: all .5 ease-out;
      z-index: -99;
      &:active {
        background-color: #e4e6fb !important;
        color: #578ffe;
      }
    }
    .rotateItemA {
      transform: translate3d(px2rem(-40px), px2rem(-80px), 0);
      z-index: 1;
      transition-duration: 500ms;
      transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
      opacity: 1;
    }
    .rotateItemB {
      transform: translate3d(px2rem(40px), px2rem(-80px), 0);
      z-index: 1;
      transition-duration: 500ms;
      transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
      opacity: 1;
    }
    .rotateItemC {
      transform: translate3d(px2rem(120px), px2rem(-80px), 0);
      z-index: 1;
      transition-duration: 500ms;
      transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
      opacity: 1;
    }
    .rotateItemD {
      transform: translate3d(px2rem(200px), px2rem(-80px), 0);
      z-index: 1;
      transition-duration: 500ms;
      transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
      opacity: 1;
    }
    .rotateItemBack {
      transform: translate3d(0, 0, 0);
      transition-duration: 500ms;
      transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
      z-index: -99;
      opacity: 0;
    }
  }
  .side {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: px2rem(200px);
    height: px2rem(50px);
    bottom: px2rem(70px);
    color: $btn-font-color;
    button {  
      border: none;
      background: inherit;
      color: inherit;
      width: px2rem(80px);
      height: 100%;
      line-height: px2rem(50px);
      border-radius: px2rem(10px);
      background-color: $btn-color;
      margin-right: px2rem(10px);
      text-align: center;
    }
    .active {
      color: #000;
      background: #ececec;
    }
  }
  .design-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    button {
      width: px2rem(170px);
      height: px2rem(70px);
      line-height: px2rem(70px);
      border-radius: px2rem(6px);
      border: none;
      color: #000;
      font-size: 14px;
      background: rgba(228,230,251,.8);
      &:active {
        color: #999;
        background: rgba(236,236,236,.9);
      }
    }
  }
}
.hadSelect {
  border: px2rem(2px) solid red;
}
.operation-btn-disactive {
  background-color: rgb(228, 230, 251)!important;
  color: #578ffe;
}
</style>