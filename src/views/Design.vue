<template>
  <div class="wrap">
      <div class="header">
          <div class="left">
            <span>首页</span>
            <span class="icon-tips size"></span>
          </div>
          <div class="tools">
            <span class="size icon-withdraw"></span>
            <span class="size icon-next"></span>
            <span class="size icon-clear"></span> 
          </div>
          <div class="right">
            <span class="size icon-share"></span>
            <span class="size">下一步</span>
          </div>
      </div>
      <div class="content">
        <canvas id="c" style="width:400px;height:400px;border:1px solid #ececec;"></canvas>
        <div style="width:300px;height:150px;">
          <img style="width:100%;height:100%;background-size: cover;" :src="img_src" id="vue-img">      
        </div>
        <button @click="showSrc">生成图片</button>
        <input type="text" v-model="value" @input="onInput">
      </div>
      <div class="footer">
          <button>选择字体</button>
          <select @change="changeFonts">
            <option v-for="v in fonts" v-model="v.v">{{v.v}}</option>
          </select>
          <div>
            <button @click="rotateFont">旋转字体</button>
            <button @click="clearCanvas">clear</button>
            <button @click="addFont">addFont</button>
            <button @click="remove">移除</button>
          </div>
      </div>
  </div>
</template>

<script>
import {fabric} from 'fabric'
import * as FontFaceObserver from 'fontfaceobserver'
export default {
  data () {
    return {
      msg: 'hello world',
      value: '',
      img_src: require('../assets/logo.png'),
      selected: 'Jolly Lodger',
      cavans: {}, // 画布
      imgElement: {},
      Text: {},
      textbox: {},
      imgInstance: {},
      angle: 0,
      fonts: [
        {v: 'Jolly Lodger'},
        {v: 'OpenSansCondensed'},
        {v: 'IndieFlower'},
        {v: 'Lobster'},
        {v: 'AlexBrush'},
        {v: 'Pacifico'},
        {v: 'Special Elite'},
        {v: 'Gloria Hallelujah'}
      ],
      colors: ['red', 'green', 'yellowgreen', 'pink', 'black', 'purple']
    }
  },
  methods: {
    onInput () {
      // console.log(this.value)
      this.textbox.set({
        'text': this.value
      }).setCoords()
      this.canvas.requestRenderAll()
    },
    changeFonts (e) {
      console.log(e)
      // console.log(this.selected)
      var myfont = new FontFaceObserver(e.target.value)
      var _this = this
      myfont.load()
        .then(function () {
          // when font is loaded, use it.
          _this.canvas.getActiveObject().set({
            'fontFamily': e.target.value, // 设置font-family
            'fill': 'yellowgreen'  // 设置字体颜色
          })
          _this.canvas.requestRenderAll()
        }).catch(function (e) {
          console.log(e)
          alert('font loading failed ' + e.target.value)
        })
    },
    rotateFont () {
      // console.log(this.canvas.getActiveObject().text)
      this.angle += 10
      this.textbox.set({
        'text': 'the text had changed!',
        'angle': parseInt(this.angle, 10),
        'fill': this.colors[parseInt(Math.random() * 5)]
      }).setCoords()
      // this.textbox.set('angle', parseInt(this.angle, 10)).setCoords()
      // this.textbox.set('fill', this.colors[parseInt(Math.random() * 5)]).setCoords()
      this.canvas.requestRenderAll()
    },
    clearCanvas () {
      this.canvas.clear()
    },
    remove () {
      // remove currently selected object
      console.log(this.canvas.getActiveObject())
      this.canvas.remove(this.canvas.getActiveObject())
    },
    addFont () {
      this.textbox = new fabric.Textbox('i am 字体！', {
        left: 50,
        top: 50,
        width: 150,
        fontSize: 20
      })
      this.canvas.add(this.textbox)
    },
    showSrc () {
      // console.log(this.canvas.toDataURL({format: 'png', multiplier: 1}))
      this.img_src = this.canvas.toDataURL({format: 'png', multiplier: 1})  // 将canvas生成base64格式
    },
    create_cavans () {
      this.canvas = new fabric.Canvas('c') // 利用fabric找到我们的画布
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
      this.textbox = new fabric.Textbox('i am 字体！', {
        left: 50,
        top: 50,
        width: 150,
        fontSize: 20
      })

      this.canvas.add(this.imgInstance, this.textbox).setActiveObject(this.textbox) // 加入到canvas中
      // 事件监听
      this.canvas.on('mouse:down', function (options) {
        // alert(options)
      })
    }
  },
  mounted () {
    this.create_cavans()
    var canvasObj = document.getElementById('vue-img')
    // 监听touchmove时间
    canvasObj.addEventListener('touchmove', function (event) {
      var touches = event.touches
      console.log(touches)
    }, false)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';
@import '../../static/com-icon/style';
@import '../assets/css/fonts';

.wrap {
  width: 100%;
  color: #959595;
  .header {
    width: auto;
    height: px2rem(60px);
    line-height: px2rem(60px);
    .left {
      width: 20%;
      float: left;
      .size {
        width: px2rem(60px);
        height: 100%;
        text-align: center;
        float: left;
        font-size: 18px;
      }
    }
    .tools {
      float: left;     
      width: 50%;
    }
    .right {
      float: left;     
      width: 30%;
    }
  }
  .content {
    margin-left: 1rem;
    input {
      border: px2rem(2px) solid #ececec;
    }
  }
}
</style>

