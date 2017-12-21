<template>
  <div class="content-wrap">
    <div class="top">
      <el-row :gutter="40">
          <el-col :span="8">
            <div class="grid-content bg-blue">
              <span class="font-bold">￥{{dayIncome}}</span>
              <br>
              <span>今日成交额</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-blue">
              <span class="font-bold">￥{{dayOrder}}</span>
              <br>
              <span>今日订单数</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-blue">
              <span class="font-bold">￥{{dayToatalIncome}}</span>
              <br>
              <span>今日总成交额</span>
            </div>
          </el-col>
      </el-row>
    </div>
    <div class="echart-wrap">
      <div id="echartBox"></div>
      <div class="select-bar">
        <el-select v-model="value" placeholder="请选择" size="mini" @change="onChange">
          <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      dayIncome: 36042,
      dayOrder: 5412,
      dayToatalIncome: 45617,
      value: '1',
      selectData: [
        {
          value: '1',
          label: '本周'
        },
        {
          value: '2',
          label: '本月'
        },
        {
          value: '3',
          label: '本年'
        }
      ],
      myChart: {},
      options: {
        title: {
          text: '本周收益',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '￥ {value}'
          }
        },
        series: [
          {
            name: '收益',
            type: 'line',
            data: [541, 687, 321, 541, 121, 184, 761],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]},
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      }
    }
  },
  methods: {
    initEchart () {
      this.myChart = this.echarts.init(document.getElementById('echartBox'))
      this.myChart.setOption(this.options)
    },
    onChange () {
      if (this.value === '1') { // 本周
        this.myChart.setOption(this.options)
      } else if (this.value === '2') { // 本月
        // 获取当月有多少天
        let d = new Date()
        let curMonthDays = new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDate()
        let monthDaysList = []
        for (let i = 1; i <= curMonthDays; i++) {
          monthDaysList.push(d.getMonth() + 1 + '/' + i)
        }
        this.myChart.setOption({
          title: {
            text: '本月收益'
          },
          xAxis: {
            data: monthDaysList
          },
          series: [
            {
              data: [123, 687, 134, 541, 121, 184, 223, 411, 674, 324, 345, 333]
            }
          ]
        })
      } else { // 本年
        let monthList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        this.myChart.setOption({
          title: {
            text: '本年收益'
          },
          xAxis: {
            data: monthList
          },
          series: [
            {
              data: [541, 687, 321, 541, 121, 184, 888, 466, 766, 123, 422, 333]
            }
          ]
        })
      }
    }
  },
  mounted () {
    this.initEchart()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';
.echart-wrap {
  width: 96%;
  height: 400px;
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  #echartBox {
    width: 100%;
    height: 100%;
  }
  .select-bar {
    width: 100px;
  }
}
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