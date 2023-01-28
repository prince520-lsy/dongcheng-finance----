<template>
  <div class="caver" ref="mainColumn"></div>

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
      bardatalist: {
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
        // this.chart = this.$echarts.init(this.$refs.mainColumn)
        this.chart.on('click', (param) => {
          console.log(param)
        })
        this.chart.setOption({
          color: utils.barCorlor,
          darMode:true,
          tooltip: {
            // 冒泡弹框
            // trigger: 'item',
            // position: 'top',
            // 所有内容都展现的弹框
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }

            // alwaysShowContent:false,
            // formatter:function(params){
            //   console.log('------------------')
            //   console.log(params)
            //   return `<div>${params.seriesName}<br/>${params.name}<br/>${params.data}</div>`
            // }
            // axisPointer: { // 坐标轴指示器，坐标轴触发有效
            //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            // }
          },
          dataZoom: [
            {
              type: 'inside', // inside 平移
              start: 0,
              end: that.end,//this.list.xAxisData.length > 5? 50:100,
              zoomLock: true,
              //  startValue:0,
              //  endValue:2,
              // minValueSpan:1,
              // maxValueSpan:6
            }
        ],
        legend: {
          type: 'scroll',
          data: that.list.legendData,
          textStyle: {
            color: utils.barCorlor
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
                type: 'category',
                data: that.list.xAxisData,
                // splitLine:{
                //    show: true,
                //    interval:1,
                //    lineStyle:{
                //     color: ['#7C8284']
                //    }
                // }
                // axisLabel :{
                //         interval:0,
                //         rotate:-2
                //         }
            },
        yAxis: that.list.yAxis,
        series: that.list.series,
        },true)
      },
      init(){
        
      let defaultOption = OptionColumn()
      let newlist = this.bardatalist && this.bardatalist.series?this.bardatalist : defaultOption

      newlist.series = newlist.series.map(item=>{
        // 加悬停显示高亮
        return {...item,emphasis:{focus:'series'}}
      })
      // 一屏显示多少数据
     let end =  Math.round(newlist.xAxisData.length/3)
     this.end = Math.ceil(100/end)
     console.log('newlist==',newlist)
     console.log('end==',this.end)

      this.list =  newlist

      this.chart = this.$echarts.init(this.$refs.mainColumn)
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
      }
    },
    mounted () {
      this.init()
    },
    watch: { // 监听到数据然后赋值
      bardatalist(newV, oldV) {
        if(newV && newV != oldV){
          this.list = newV
          console.log(222)
          this.init()
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
