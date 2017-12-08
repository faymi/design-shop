<template>
  <div class="Customized-wrap">
    <div class="color-bar">
      <div class="div-ul">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="done-btn">
        <router-link to="/total">
          <button>完成</button>        
        </router-link>
      </div>
    </div>
    <div class="tools-bar">
      <div class="tool-left">
        <span>移动</span>
        <span>缩放</span>
        <span>旋转</span>
      </div>
      <div class="tool-right">
        <span @click="add_font_show">字体</span>
        <span @click="font_color_show">颜色</span>
        <span @click="font_size_show">大小</span>
        <div class="font-show">
          <ul v-show="font_toggle">
            <li v-for="item in fonts" @click="select_font(item.v)">
              {{item.v}}
            </li>
          </ul>
          <ul v-show="size_toggle">
            <li v-for="item in font_size" @click="select_font_size(item.v)">
              {{item.v}}
            </li>
          </ul>
          <div class="color-div" v-show="color_toggle">
            <color-picker v-model="color":openStatus="openStatus" v-on:change="headleChangeColor"></color-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-design">
        <img src="../assets/t-shirt.png">
        <div class="canvas-wrap">
          <canvas id="c"></canvas>
        </div>
      </div> 
    </div>
    <div class="footer">
      <div class="product">
        <i class="fa fa-picture-o"></i>
        <router-link class="" :to="{ name: 'List', params: {}}">添加图片</router-link>
      </div>
      <div class="user" @click="add_font">
        <i class="fa fa-font"></i>
        <router-link :to="{}">添加文字</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {fabric} from 'fabric'
import * as FontFaceObserver from 'fontfaceobserver'

export default {
  name: 'Customized',
  data () {
    return {
      font_toggle: false,
      size_toggle: false,
      color_toggle: false,
      openStatus: false,
      color: '',
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
      canvas: {}, // 画布
      imgElement: {},
      Text: {},
      textbox: {},
      imgInstance: {}
    }
  },
  methods: {
    // 颜色面板选择颜色事件  字体颜色
    headleChangeColor () {
      this.textbox.set({
        'fill': this.color
      }).setCoords()
      this.canvas.requestRenderAll()
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
    // 添加字体
    add_font () {
      this.textbox = new fabric.Textbox('双击输入文字', {
        left: 30,
        top: 100,
        width: 150,
        fontSize: 20
      })
      this.canvas.add(this.textbox)
    },
    add_font_show () {
      this.color_toggle = false
      this.size_toggle = false
      this.font_toggle = !this.font_toggle
    },
    // 选择字体
    select_font (font) {
      this.font_toggle = !this.font_toggle
      // alert(font)
      var myfont = new FontFaceObserver(font)
      var _this = this
      myfont.load()
        .then(function () {
          // when font is loaded, use it.
          _this.canvas.getActiveObject().set({
            'fontFamily': font // 设置font-family
            // 'fill': 'yellowgreen'  // 设置字体颜色
          })
          _this.canvas.requestRenderAll()
        }).catch(function (e) {
          // console.log(e)
          alert('请先选中字体！')
        })
    },
    // 选择字体大小
    select_font_size (fontSize) {
      this.size_toggle = !this.size_toggle
      this.textbox.set({
        'fontSize': fontSize
      }).setCoords()
      this.canvas.requestRenderAll()
    },
    create_cavans () {
      this.canvas = new fabric.Canvas('c') // 利用fabric找到我们的画布
      this.canvas.setWidth(200)
      this.canvas.setHeight(300)
      this.imgElement = document.getElementById('vue-img')
      this.imgInstance = new fabric.Image(this.imgElement, {  // 设置图片在canvas中的位置和样子
        left: 10,
        top: 10,
        width: 200,
        height: 200,
        angle: 30,
        scaleX: 0.5,
        scaleY: 0.5,
        backgroundColor: '#ececec'
      })
      // this.Text = new fabric.Text('I am in fonts', {fontFamily: this.fonts[0]})
      this.textbox = new fabric.Textbox('双击输入文字', {
        left: 30,
        top: 50,
        width: 150,
        fontSize: 20
      })

      this.canvas.add(this.imgInstance, this.textbox).setActiveObject(this.textbox) // 加入到canvas中
    }
  },
  mounted () {
    this.create_cavans()
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
      ul {
        width: 100%;
        height: 100%; 
        padding-right: px2em(180px);
        line-height: px2rem(110px);
        li {         
          width: px2rem(90px);
          height: px2rem(90px);
          background-color: yellowgreen;
          margin: px2rem(10px);
          display:inline-block;
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
      height: 100%;
      padding-bottom: px2rem(110px);
      margin: 0 auto;
      img {
        width: 100%;
        height: 90%;
      }
      .canvas-wrap {
        width: px2rem(400px);
        height: px2rem(500px);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        #c {
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
  }
}
</style>