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
      userId: '',
      dayIncome: 36042,
      dayOrder: 5412,
      dayToatalIncome: 45617,
      start: 0,
      limit: 7,
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
        let startTime = this.moment().add(-(this.moment().weekday() - 1), 'day').format('YYYY-MM-DD')
        let endTime = this.moment().format('YYYY-MM-DD')
        this.getDayStat(startTime, endTime, 'week')
      } else if (this.value === '2') { // 本月
        let startTime = this.moment().startOf('month').format('YYYY-MM-DD')
        let endTime = this.moment().format('YYYY-MM-DD')
        this.getDayStat(startTime, endTime, 'month')
        // this.myChart.setOption({
        //   title: {
        //     text: '本月收益'
        //   },
        //   xAxis: {
        //     data: monthDaysList
        //   },
        //   series: [
        //     {
        //       data: [123, 687, 134, 541, 121, 184, 223, 411, 674, 324, 345, 333]
        //     }
        //   ]
        // })
      } else { // 本年
        this.getMonthStat()
      }
    },
    getDayStat (startTime, endTime, sign) {
      let _this = this
      // 获取当月有多少天
      let d = new Date()
      let curMonthDays = new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDate()
      let monthDaysList = []
      for (let i = 1; i <= curMonthDays; i++) {
        monthDaysList.push(d.getMonth() + 1 + '/' + i)
      }
      this.axios.get('ideat/dataManage/getDayStat', {
        params: {
          userId: this.userId,
          startTime: startTime,
          endTime: endTime
        }
      })
      .then(function (response) {
        let result = response.data.body
        let dayProfit = []
        for (let i = 0; i < result.length; i++) {
          // console.log(result[i].statMonth + '===' + result[i].monthProfit)
          dayProfit.push(result[i].dayProfit)
        }
        console.log(dayProfit)
        console.log(sign)
        if (sign === 'week') {
          _this.myChart.setOption({
            title: {
              text: '本周收益'
            },
            series: [
              {
                data: dayProfit.slice(1, dayProfit.length)
              }
            ]
          })
        } else {
          _this.myChart.setOption({
            title: {
              text: '本月收益'
            },
            xAxis: {
              data: dayProfit
            },
            series: [
              {
                data: dayProfit.slice(1, dayProfit.length)
              }
            ]
          })
        }
      })
      .then(function (error) {
        console.log(error)
      })
    },
    getMonthStat () {
      let _this = this
      let monthList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      let statYear = this.moment().format('YYYY')
      this.axios.get('ideat/dataManage/getMonthStat', {
        params: {
          userId: this.userId,
          statYear: statYear
        }
      })
      .then(function (response) {
        let result = response.data.body
        let monthProfit = []
        for (let i = 0; i < result.length; i++) {
          // console.log(result[i].statMonth + '===' + result[i].monthProfit)
          monthProfit[result[i].statMonth] = result[i].monthProfit
        }
        _this.myChart.setOption({
          title: {
            text: '本年收益'
          },
          xAxis: {
            data: monthList
          },
          series: [
            {
              data: monthProfit.slice(1, monthProfit.length)
            }
          ]
        })
      })
      .then(function (error) {
        console.log(error)
      })
    }
    // getYearStat () {
    //   let startTime = this.moment().startOf('year').format('YYYY-MM-DD')
    //   let endTime = this.moment().format('YYYY-MM-DD')
    //   this.axios.get('ideat/dataManage/getYearStat', {
    //     params: {
    //       start: 0,
    //       limit: 12,
    //       userId: this.userId,
    //       startTime: startTime,
    //       endTime: endTime
    //     }
    //   })
    //   .then(function (response) {
    //     console.log(response.data)
    //   })
    //   .then(function (error) {
    //     console.log(error)
    //   })
    // }
  },
  mounted () {
    this.userId = sessionStorage.getItem('username')
    this.initEchart()
    let startTime = this.moment().add(-(this.moment().weekday() - 1), 'day').format('YYYY-MM-DD')
    let endTime = this.moment().format('YYYY-MM-DD')
    this.getDayStat(startTime, endTime, 'week')
    // this.getDayStat()
    // this.getMonthStat()
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