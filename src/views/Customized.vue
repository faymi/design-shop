<template>
  <div class="Customized-wrap">
    <div class="color-bar">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="done-btn">
        <button>完成</button>
      </div>
    </div>
    <div class="tools-bar">
      <span>移动</span>
      <span>缩放</span>
      <span>旋转</span>
    </div>
    <div class="main">
      <div class="main-design">
        <img src="../assets/t-shirt.png">
        <div class="canvas-wrap">
          <canvas id="c"></canvas>
        </div>
      </div> 
    </div>
    <Tool-bar></Tool-bar>
  </div>
</template>

<script>
import {fabric} from 'fabric'
import ToolBar from '@/components/ToolBar'

export default {
  name: 'Customized',
  components: {
    ToolBar
  },
  data () {
    return {
      canvas: {}, // 画布
      imgElement: {},
      Text: {},
      textbox: {},
      imgInstance: {}
    }
  },
  methods: {
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
      this.textbox = new fabric.Textbox('i am 字体！', {
        left: 50,
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

.Customized-wrap {
  width: 100%;
  height: 100%;
  .color-bar {
    width: 100%;
    height: px2rem(110px);
    border-bottom: px2rem(2px) solid #ececec;
    display: flex;
    justify-content: space-between;
    ul {
      width: 100%;
      height: 100%; 
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      padding-right: px2em(180px);
      li {
        width: px2rem(90px);
        height: px2rem(90px);
        background-color: yellow;
        margin: px2rem(10px);
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
}
</style>