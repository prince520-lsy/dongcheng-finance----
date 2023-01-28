<template>
  <div>

    <a-row :gutter="[16,16]">
      <a-col :xs="24" :sm="12" :md="8">
        <a-card title="未来一周气温变化" :bodyStyle="{padding:'10px'}">
          <echart-wrap :height="50">
            <div id="main" class="chart-box"></div>
          </echart-wrap>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="8">
        <a-card title="未来两周气温变化" :bodyStyle="{padding:'10px'}">
          <echart-wrap :height="50">
            <div id="main1" class="chart-box"></div>
          </echart-wrap>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="8">
        <a-card title="未来三周气温变化" :bodyStyle="{padding:'10px'}">
          <echart-wrap :height="50">
            <div id="main2" class="chart-box"></div>
          </echart-wrap>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8">
        <a-card title="未来三周气温变化" :bodyStyle="{padding:'10px'}">
          <echart-wrap :height="50">
            <div id="main3" class="chart-box"></div>
          </echart-wrap>
        </a-card>
      </a-col>

    </a-row>

  </div>
</template>

<script>
  import echartWrap from '@/components/EchartWrap/Index.vue'
  import { mapState } from 'vuex'
  export default {
    components: {
      echartWrap
    },
    computed: {
      ...mapState({
         sideCollapsed: state => state.app.sideCollapsed,
      })
    },
    watch: {
      sideCollapsed(newValue, oldValue) {
        setTimeout(() => {
         console.log(123)
         this.myChart.resize()
         this.myChart1.resize()
         this.myChart2.resize()
         this.myChart3.resize()
        }, 1000)
      }
    },
    mounted() {
      setTimeout(() => {
         console.log(this.sideCollapsed)
        this.initEcharts()
      }, 50)
    },
    methods: {
      initEcharts() {
        const option = {

          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高气温', '最低气温']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [{
              name: '最高气温',
              type: 'line',
              data: [10, 11, 13, 11, 12, 12, 9],
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
            },
            {
              name: '最低气温',
              type: 'line',
              data: [1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                data: [{
                  name: '周最低',
                  value: -2,
                  xAxis: 1,
                  yAxis: -1.5
                }]
              },
              markLine: {
                data: [{
                    type: 'average',
                    name: '平均值'
                  },
                  [{
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max'
                  }, {
                    symbol: 'circle',
                    label: {
                      position: 'start',
                      formatter: '最大值'
                    },
                    type: 'max',
                    name: '最高点'
                  }]
                ]
              }
            }
          ]
        }
        this.myChart = this.$echarts.init(document.getElementById('main'))
        this.myChart1 = this.$echarts.init(document.getElementById('main1'))
        this.myChart2 = this.$echarts.init(document.getElementById('main2'))
        this.myChart3 = this.$echarts.init(document.getElementById('main3'))
        this.myChart.setOption(option)
        this.myChart1.setOption(option)
        this.myChart2.setOption(option)
        this.myChart3.setOption(option)

        window.onresize = () => {
          this.myChart.resize()
          this.myChart1.resize()
          this.myChart2.resize()
          this.myChart3.resize()
        }
      }
    }
  }
</script>

<style>
  .chart-box {
    width: 100%;
    height: 100%;
  }
</style>
