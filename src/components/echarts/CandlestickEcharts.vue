<template>
  <div class="caver" ref="candlestick"></div>

</template>

<script>
import * as echarts from 'echarts'
import utils from '@/utils/utils.js'
import { OptionColumn } from './options.js'

  export default {
    name: 'App',
    props: {
      className: {
        type: String,
        default: 'yourClassName'
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
        default: '300px'
      },
      canddatalist: {
        type: Object,
        default: () => {
          return null
        }
      }
    },
    data () {
      return {
        chart: null,
        list:null,
        end:100,
      }
    },
    created(){
    },
    methods: {
      // handleSelect (key) {
      //   // this.$router.push({ path: key })
      // },
      drawPie () {
        const that = this
        // this.chart = this.$echarts.init(this.$refs.candlestick)
        this.chart.on('click', (param) => {
          console.log(param)
        })
        
        this.chart.setOption({
          color: utils.barCorlor,
          // darMode:true,
          tooltip: {
          trigger: 'item',  //此时不要为'axis',否则params.name或者params.value不显示
          formatter: function (params) {
            // return '流出'+ params.value[5]
            let type = params.value[6]=='+'?'流入:':'流出:'
              return params.name + '<br>' + 
                    // '开盘:' + params.value[1] + '<br>' +
                    '期末:' + params.value[2] + '<br>' +
                    // '最低:' + params.value[3] + '<br>' +
                    // '最高:' + params.value[4]
                     type + params.value[5]
              },
          // axisPointer: {
          //   animation: false,
          //   type: 'cross',
          //   lineStyle: {
          //     color: '#376df4',
          //     width: 2,
          //     opacity: 1
          //   }
          // }
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          top:'50',
          left: '3%',
          right: '10',
          bottom: '0',
          containLabel: true
        },
        xAxis: {
            data: that.list.xAxisData,
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: '#8392A5' } }
        },
        dataZoom: [
          {
            type: 'inside', // inside 平移
            start: 0,
            end: that.end,
            minValueSpan: 3
          },
          // {
          //   show: true,
          //   type: 'slider',
          //   start: 0,
          //   end: 5,
          //   minValueSpan: 5
          // }
        ],
        series: {
            type: 'candlestick',
            data: that.list.series,
            },
        },true)
      }
    },
    mounted () {
      let defaultOption = OptionColumn()
      let newlist = this.canddatalist && this.canddatalist.series?this.canddatalist : defaultOption
      
      // let newlist = {
      //   xAxisData:['1月','2月','3月','4月'],
      //   series:[
      //     [20, 34, 20, 34,168,1],
      //     [40, 35, 35, 40,100,-1],
      //     [31, 38, 31, 38,120,1],
      //     [38, 15, 15, 38,110,-1]
      //   ]
      // }
      console.log('newlist=====',newlist)
      

    //   newlist.series = newlist.series.map(item=>{
    //     // 加悬停显示高亮
    //     return {...item,emphasis:{focus:'series'}}
    //   })
    //   // 一屏显示多少数据
     let end =  Math.round(newlist.series.length/3)
     this.end = Math.ceil(100/end)

      this.list =  newlist

      this.chart = this.$echarts.init(this.$refs.candlestick)
      // this.chart.clear()
      this.drawPie()
      // this.chart.setOption(OptionColumn(), true)
      // 解决初次生成会超过父容器宽度
      setTimeout(() => {
        this.chart.resize()
      }, 1)

      window.addEventListener('resize', () => {
        // console.log(this.chart)
        if (this.chart) {
          this.chart.resize()
        }
      })
      // this.realTimeData = setInterval(this.drawPie, 1000)

      this.$nextTick(function () {
        this.drawPie()
      })
    },
    watch: { // 监听到数据然后赋值
      canddatalist(newV, oldV) {
        if(newV && newV != oldV){
          this.list = newV
          this.drawPie()
        }
      }
    }
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .caver{
    width: 100%;height: 100%;
    box-sizing:border-box
  }
</style>
