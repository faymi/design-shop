<template>
  <div class="img-wrap">
    <div class="img-card">
      <canvas :id="'canvas-front-0'+index" width="600" height="400"></canvas>
      <span>正面</span>
    </div>
    <div class="img-card">
      <canvas :id="'canvas-back-0'+index" width="600" height="400"></canvas>
      <span>反面</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComposePicture',
  props: {
    frontImg: {
      type: String,
      default: ''
    },
    frontImgMade: {
      type: String,
      default: ''
    },
    backImg: {
      type: String,
      default: ''
    },
    backImgMade: {
      type: String,
      default: ''
    },
    index: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 添加图片至画布
    imageToCanvas (canvas, image, imageCover, src, x = 0, y = 0, width = canvas.width, height = canvas.height) {
      image.crossOrigin = 'anonymous' // 图片跨域处理
      imageCover.crossOrigin = 'anonymous' // 图片跨域处理
      let context = canvas.getContext('2d')
      image.onload = function () {
        context.drawImage(image, x, y, width, height)
        context.drawImage(imageCover, width / 4, height / 4, width / 2, height / 2)
      }
      image.src = src
    }
  },
  mounted () {
    let canvas01 = document.getElementById('canvas-front-0' + this.index)
    let img01 = new Image()
    // img01.src = this.frontImg
    // this.imageToCanvas(canvas01, img01, this.frontImg)
    let img01Made = new Image()
    img01Made.src = this.frontImgMade
    this.imageToCanvas(canvas01, img01, img01Made, this.frontImg)
    let canvas02 = document.getElementById('canvas-back-0' + this.index)
    let img02 = new Image()
    // img02.src = this.backImg
    // this.imageToCanvas(canvas02, img02, this.backImg)
    let img02Made = new Image()
    img02Made.src = this.backImgMade
    this.imageToCanvas(canvas02, img02, img02Made, this.backImg)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/function';
.img-wrap {
  display: flex;
  justify-content: flex-start;
  .img-card {
    text-align: center;
    margin-right: 20px;
    canvas {
      width: 140px;
      height: 160px;
      margin: 10px 0;
    }
    span {
      display: block;
    }
    img {
      width: 140px;
      height: 160px;
    }
  }
}
</style>
