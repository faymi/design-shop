<template>
  <div class="content-wrap">
    <div class="top">
      <el-row :gutter="40">
          <el-col :span="8">
            <div class="grid-content bg-blue">
              <span class="font-bold">￥26042</span>
              <br>
              <span>今日成交额</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-blue">
              <span class="font-bold">￥26042</span>
              <br>
              <span>今日订单数</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-blue">
              <span class="font-bold">￥26042</span>
              <br>
              <span>今日总成交额</span>
            </div>
          </el-col>
      </el-row>
    </div>
    <div class="text-box"></div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-blue {
  background-color: $card-bg-color;
}
.grid-content {
  border-radius: 4px;
  height: 140px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.font-bold {
  font-weight: bold;
  font-size: 24px;
}
</style>