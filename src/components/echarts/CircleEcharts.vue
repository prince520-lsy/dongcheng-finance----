<template>
  <div class="caver" ref="mycirde"></div>

</template>

<script>
  import * as echarts from 'echarts'
  import utils from '@/utils/utils.js'
  import { OptionCircle } from './options.js'

  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: 'yourID'
      },
      width: {
        type: String,
        default: '500px'
      },
      height: {
        type: String,
        default: '400px'
      },
      url: {
        type: String,
        default: ''
      },
      piedatalist: {
        type: [Object, Array],
        default: () => {
          return null
        }
      }
    },
    data() {
      return {
        chart: null,
        list:null,
      }
    },
    methods: {
      drawPie() {
        const that = this
        this.chart = this.$echarts.init(this.$refs.mycirde)
        this.chart.setOption({
          color: utils.pieCorlor,
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            top: 'auto',
            left: 'right',
             textStyle: {
                color: utils.barCorlor
              }
          },
          series: 
          [{
            type: 'pie',
            radius: that.list.radius,
            avoidLabelOverlap: false,
            label: that.list.label,
            emphasis: that.list.emphasis,
            labelLine: {
              show: false
            },
            data: that.list.data
          }]
        },true)
      }
    },
    mounted() {
      // this.list = this.piedatalist
      let defaultOption = OptionCircle()
      this.list = this.piedatalist?this.piedatalist : defaultOption

      window.addEventListener('resize', () => {
        if (this.chart) {
          this.chart.resize()
        }
      })
      // this.realTimeData = setInterval(this.drawPie, 1000)
      setTimeout(() => {
        this.drawPie()
      }, 300)
    },
    watch: { // 监听到数据然后赋值
      piedatalist(newV, oldV) {
        if(newV != oldV){
          this.list = newV
          this.drawPie()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .caver {
    width: 100%;
    height: 100%;
    box-sizing:border-box
  }
</style>
