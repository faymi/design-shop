<template>
  <div class="Customized-wrap">
    <div class="color-bar">
      <div class="div-ul">
        <ul>
          <li v-for="(item, index) in goodsColors" :key="index" :id="'goodsColor_'+index" :class="{hadSelect: index == currentIndex}" @click="selectColor(index,item)">
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
    <div class="tools-bar">
      <div class="tool-left">
        <!-- <span>移动</span>
        <span>缩放</span>
        <span>旋转</span> -->
      </div>
      <div class="tool-right">
        <span class="activeTouch" @click="add_font_show">字体</span>
        <span class="activeTouch" @click="font_color_show">颜色</span>
        <span class="activeTouch" @click="font_size_show">大小</span>
        <div class="font-show">
          <ul v-show="font_toggle">
            <li class="activeTouch" v-for="item in fonts" @click="select_font(item.v)">
              {{item.v}}
            </li>
          </ul>
          <ul v-show="size_toggle">
            <li class="activeTouch" v-for="item in font_size" @click="select_font_size(item.v)">
              {{item.v}}
            </li>
          </ul>
          <div class="color-div" v-show="color_toggle">
            <color-picker v-model="color" :openToggle="openStatus" v-on:change="headleChangeColor"></color-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-design" v-show="isActive">
        <img :src="frontImg">
        <div class="canvas-wrap">
          <canvas id="c"></canvas>
        </div>
      </div>
      <div class="main-design" v-show="!isActive">
        <img :src="backImg">
        <div class="canvas-wrap">
          <canvas id="d"></canvas>
        </div>
      </div> 
    </div>
    <div class="footer">
      <div class="product activeTouch" @click="add_pic">
        <i class="fa fa-picture-o"></i>
        <router-link :to="{}">添加图片</router-link>        
        <input id="add_pic_ipt" type="file" name="image" accept="image/*" @change="handleInputChange" style="display: none;">
      </div>
      <div class="user activeTouch" @click="add_font">
        <i class="fa fa-font"></i>
        <router-link :to="{}">添加文字</router-link>
      </div>
      <div class="delete-btn" @click="delete_item">
        <i class="fa fa-trash-o fa-lg"></i>
      </div>
      <div class="side">
        <button :class="{ active: isActive }" @click="toSide('front')">正面</button>
        <button :class="{ active: !isActive }" @click="toSide('back')">反面</button>
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
      isActive: true,
      hadSelect: false,
      font_toggle: false,
      size_toggle: false,
      color_toggle: false,
      openStatus: false,
      color: '',
      currentIndex: 0,
      colorList: [
        {color: 'white', 'colorId': '1'},
        {color: 'black', 'colorId': '2'},
        {color: 'red', 'colorId': '3'},
        {color: 'green', 'colorId': '4'}
      ],
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
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    // 组件间openStatus双向通信
    on_openStatus_change (val) {
      this.openStatus = val
    },
    // 颜色面板选择颜色  字体颜色
    headleChangeColor () {
      if (this.isActive) {
        this.textboxFront.set({
          'fill': this.color
        }).setCoords()
        this.canvasFront.requestRenderAll()
      } else {
        this.textboxBack.set({
          'fill': this.color
        }).setCoords()
        this.canvasBack.requestRenderAll()
      }
    },
    font_size_show () {
      this.font_toggle = false
      this.color_toggle = false
      this.size_toggle = !this.size_toggle
    },
    font_color_show () {
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
      let _this = this
      const imgCompassMaxSize = 200 * 1024 // 超过 200k 就压缩
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
            if (_this.isActive) {
              _this.canvasFront.centerObject(oImg)
              _this.canvasFront.add(oImg)
            } else {
              _this.canvasBack.centerObject(oImg)
              _this.canvasBack.add(oImg)
            }
          }, {
            originX: 'center',
            originY: 'center',
            scaleX: scale,
            scaleY: scale
          })
        }
        image.src = result
        if (result.length < imgCompassMaxSize) {
          // compress(result, processData, false )    // 图片不压缩
        } else {
          // compress(result, processData)            // 图片压缩
        }
      }
      reader.readAsDataURL(file)
    },
    // compress (dataURL, callback, shouldCompress = true) {
    //   const img = new window.Image()
    //   img.src = dataURL
    //   img.onload = function () {
    //     const canvas = document.createElement('canvas')
    //     const ctx = canvas.getContext('2d')
    //     canvas.width = img.width
    //     canvas.height = img.height
    //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    //     let compressedDataUrl
    //     if (shouldCompress) {
    //       compressedDataUrl = canvas.toDataURL(this.imgFile.type, 0.2)
    //     } else {
    //       compressedDataUrl = canvas.toDataURL(this.imgFile.type, 1)
    //     }
    //     callback(compressedDataUrl)
    //   }
    // },
    // processData (dataURL) {
    //   // 这里使用二进制方式处理dataUrl
    //   const binaryString = window.atob(dataUrl.split(',')[1])
    //   const arrayBuffer = new ArrayBuffer(binaryString.length)
    //   const intArray = new Uint8Array(arrayBuffer)
    //   const imgFile = this.imgFile

    //   for (let i = 0, j = binaryString.length; i < j; i++) {
    //     intArray[i] = binaryString.charCodeAt(i)
    //   }
    //   const data = [intArray]
    //   let blob
    //   try {
    //     blob = new Blob(data, { type: imgFile.type })
    //   } catch (error) {
    //     window.BlobBuilder = window.BlobBuilder ||
    //     window.WebKitBlobBuilder ||
    //     window.MozBlobBuilder ||
    //     window.MSBlobBuilder
    //     if (error.name === 'TypeError' && window.BlobBuilder) {
    //       const builder = new BlobBuilder()
    //       builder.append(arrayBuffer)
    //       blob = builder.getBlob(imgFile.type)
    //     } else {
    //       // Toast.error("版本过低，不支持上传图片", 2000, undefined, false);
    //       throw new Error('版本过低，不支持上传图片')
    //     }
    //   }
    //   // blob 转file
    //   const fileOfBlob = new File([blob], imgFile.name)
    //   const formData = new FormData()
    //   // type
    //   formData.append('type', imgFile.type)
    //   // size
    //   formData.append('size', fileOfBlob.size)
    //   // name
    //   formData.append('name', imgFile.name)
    //   // lastModifiedDate
    //   formData.append('lastModifiedDate', imgFile.lastModifiedDate)
    //   // append 文件
    //   formData.append('file', fileOfBlob)
    //   // uploadImg(formData)
    // },
    // 添加字体
    add_font () {
      if (this.isActive) {
        this.textboxFront = new fabric.Textbox('双击输入文字', {
          left: 30,
          top: 100,
          width: 150,
          fontSize: 20,
          textAlign: 'center'
        })
        this.canvasFront.add(this.textboxFront)
      } else {
        this.textboxBack = new fabric.Textbox('双击输入文字', {
          left: 30,
          top: 100,
          width: 150,
          fontSize: 20,
          textAlign: 'center'
        })
        this.canvasBack.add(this.textboxBack)
      }
    },
    add_font_show () {
      this.color_toggle = false
      this.size_toggle = false
      this.font_toggle = !this.font_toggle
    },
    // 清除active图层
    delete_item () {
      if (this.isActive) {
        this.canvasFront.remove(this.canvasFront.getActiveObject())
      } else {
        this.canvasBack.remove(this.canvasBack.getActiveObject())
      }
    },
    // 选择字体
    select_font (font) {
      this.font_toggle = !this.font_toggle
      // alert(font)
      var myfont = new FontFaceObserver(font)
      var _this = this
      myfont.load()
        .then(function () {
          if (_this.isActive) {
            // when font is loaded, use it.
            _this.canvasFront.getActiveObject().set({
              'fontFamily': font // 设置font-family
              // 'fill': 'yellowgreen'  // 设置字体颜色
            })
            _this.canvasFront.requestRenderAll()
          } else {
            _this.canvasBack.getActiveObject().set({
              'fontFamily': font
            })
            _this.canvasBack.requestRenderAll()
          }
        }).catch(function (e) {
          // console.log(e)
          _.alert('请先选中文字！')
        })
    },
    // 选择字体大小
    select_font_size (fontSize) {
      this.size_toggle = !this.size_toggle
      if (this.isActive) {
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
    create_front_cavans () {
      let itemObj = document.getElementsByClassName('canvas-wrap')
      let canvasWidth = itemObj[0].clientWidth
      let canvasHeight = itemObj[0].clientHeight
      this.canvasFront = new fabric.Canvas('c') // 利用fabric找到我们的画布
      this.canvasFront.setWidth(canvasWidth)
      this.canvasFront.setHeight(canvasHeight)
      // this.imgElement = document.getElementById('vue-img')
      // this.imgInstance = new fabric.Image(this.dataUrl, {  // 设置图片在canvas中的位置和样子
      //   left: 10,
      //   top: 10,
      //   width: 200,
      //   height: 200,
      //   angle: 30,
      //   scaleX: 0.5,
      //   scaleY: 0.5,
      //   backgroundColor: '#ececec'
      // })
      // this.Text = new fabric.Text('I am in fonts', {fontFamily: this.fonts[0]})
      this.textboxFront = new fabric.Textbox('双击输入文字', {
        left: 30,
        top: 50,
        width: 150,
        fontSize: 20,
        textAlign: 'center'
      })

      this.canvasFront.add(this.textboxFront).setActiveObject(this.textboxFront) // 加入到canvas中
    },
    create_back_cavans () {
      let itemObj = document.getElementsByClassName('canvas-wrap')
      let canvasWidth = itemObj[0].clientWidth
      let canvasHeight = itemObj[0].clientHeight
      this.canvasBack = new fabric.Canvas('d') // 利用fabric找到我们的画布
      this.canvasBack.setWidth(canvasWidth)
      this.canvasBack.setHeight(canvasHeight)
      this.textboxBack = new fabric.Textbox('双击输入文字', {
        left: 30,
        top: 50,
        width: 150,
        fontSize: 20,
        textAlign: 'center'
      })

      this.canvasBack.add(this.textboxBack).setActiveObject(this.textboxBack) // 加入到canvas中
    }
  },
  mounted () {
    this.create_front_cavans()
    this.create_back_cavans()
    let itemObj = document.getElementsByClassName('main-design')
    itemObj[0].style.height = document.documentElement.scrollHeight - 152 + 'px'
    itemObj[1].style.height = document.documentElement.scrollHeight - 152 + 'px'
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
          let first = document.getElementById('goodsColor_0')
          first.click()
        })
      }
    })
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
    border-bottom: px2rem(2px) solid #ececec;
    display: flex;
    justify-content: space-between;
    .div-ul {
      overflow: hidden;
      overflow-x:auto;
      white-space: nowrap;
      background: #ececec;
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
      background-color: $btn-color;
      color: $btn-font-color;
      font-size: 16px;
    }
  }
  .tools-bar {
    height: px2rem(80px);
    line-height: px2rem(80px);
    text-align: left;
    border-bottom: px2rem(2px) solid #ececec; 
    display: flex;
    justify-content: space-between;
    .tool-right {
      position: relative;
      .font-show {
        position: absolute;
        top: px2rem(80px);
        right: 0;
        z-index: 999;
        .color-div {
          position: absolute;
          top: px2rem(-44px);
          right: px2rem(440px);
        }
        ul {
          margin: 0 auto;
          width: px2rem(300px);
          height: px2rem(300px);
          overflow-x: auto;
          background-color: #fff;
          li {
            width: 100%;
            height: px2rem(60px);
            margin: px2rem(10px);
            line-height: px2rem(60px);
            border-bottom: px2rem(2px) solid #ececec;
          }
          &::-webkit-scrollbar{
            display:none;
          }
        }
      }
    }
    span {
      display: inline-block;
      width: px2rem(60px);
      height: px2rem(60px);
      margin: px2rem(10px);
      line-height: px2rem(60px);
    }
  }
  .main {
    width: 100%;
    max-height: 100%;
    .main-design {
      width: 96%;
      // height: 100%;
      padding-bottom: px2rem(110px);
      margin: 0 auto;
      background-size: cover;
      img {
        width: 100%;
        height: 100%;
      }
      .canvas-wrap {
        width: px2rem(400px);
        height: px2rem(600px);
        position: absolute;
        top: 50%;
        /* right: 0; */
        /* bottom: 0; */
        left: 50%;
        transform: translate(-50%,-50%);
        margin: px2rem(40px) auto;
        #c {
          width: 100%;
          height: 100%;
          border: px2rem(2px) dashed #000;
        }
        #d {
          width: 100%;
          height: 100%;
          border: px2rem(2px) dashed #000;
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: px2rem(110px);
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-top: px2rem(2px) solid #ececec; 
    position: fixed;
    bottom: 0;
    left: 0;
    .product, .user {
      width: 50%;
      text-align: center;
      line-height: px2rem(110px);
      color: #2f333c;
      a {
        color: #2f333c;
      }
    }
    .delete-btn {
      position: absolute;
      right: px2rem(20px);
      bottom: px2rem(130px);
      width: px2rem(80px);
      height: px2rem(80px);
      line-height: px2rem(80px);
      text-align: center;
      border-radius: px2rem(40px);
      background-color: $btn-color;
      color: $btn-font-color;
    }
    .side {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      width: px2rem(200px);
      height: px2rem(50px);
      bottom: px2rem(150px);
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
  }
}
.hadSelect {
  border: px2rem(2px) solid red;
}
</style>