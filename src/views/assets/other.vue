<!-- 资产 > 其它 -->
<template>
  <div>
    <a-spin :spinning="loading">
      <a-row :gutter="[16,16]" type="flex" v-if="cols.length>0">
        <template v-for="item in cols">
          <a-col :xs="24" :sm="24" :md="item.col">
            <a-card :bodyStyle="cardStyle" :title="null">
              <echart-wrap  :isParentH='true'>
                <star-title slot="title" :title="item.nameCn"></star-title>
                <template v-if="item.chart =='table'">
                  <TableTop :tableList="item.data"  :isLoop='item.data.list.length>5'/>
                </template>
                <template v-else-if="item.chart =='circle'">
                  <CircleEcharts :piedatalist="item.data" />
                </template>
                <template v-else-if="item.chart =='bar' ">
                  <ColumnEcharts  :bardatalist="item.data" />
                </template>
              </echart-wrap>
            </a-card>
          </a-col>
        </template>
      </a-row>
    </a-spin>
  </div>
</template>
<script>
  import echartWrap from '@/components/EchartWrap/Index.vue'
  import ColumnEcharts from '@/components/echarts/ColumnEcharts.vue'
  import CircleEcharts from '@/components/echarts/CircleEcharts.vue'
  import MapEcharts from '@/components/echarts/MapEcharts.vue'
  import ChinaEcharts from '@/components/echarts/ChinaEcharts.vue'
  import starTitle from '../components/star-title.vue'
  import PercentMax from '../components/PercentMax.vue'
  import TableTop from '../components/TableTop.vue'
  import OrderComplete from '../components/OrderComplete.vue'
  import { getPieOption } from '@/components/echarts/options.js'
  import {
  otherMoneyAnalysis,
  otherMoneyTimeAnalysis,
  otherMoneyLevelAnalysis,
  otherMoneyLevelPercent,
  otherMortgage,
} from '@/api/assets'
  export default {
    name: 'other',
    components: {
      starTitle,
      echartWrap,
      CircleEcharts,
      ColumnEcharts,
      MapEcharts,
      ChinaEcharts,
      PercentMax,
      TableTop,
      OrderComplete
    },
    data() {
      return {
        params: { // 全局筛选入参
          date: [],
          date_key:0,
        },
        loading: false,
        originData:[],
        cols:[],
        cardStyle:{
　　　　　　height:'',
           padding:0
　　　　},
      }
    },
    created(){
      this.$store.dispatch('getOptions',this.$route.path)
      window.addEventListener('resize', this.getHeight);
      this.getHeight()
    },
    destroyed(){
      window.removeEventListener('resize', this.getHeight)
    },
    mounted() {
      this.loadData()
      this.$eventBus.$off('changGlobalParms')
      this.$eventBus.$on('changGlobalParms',(e)=>{
        console.log('全局参数改变',e)
        if(e){
          this.params = {
            date_key:e.date_key,
            date: e.startDate ? [e.startDate, e.endDate] : []
          }
          this.loadData()
        }
      })
    },
    methods: {
      getHeight(){
        let height = window.innerHeight - 16 - 118;
        this.cardStyle.height = height/2 +'px'
      },
      
      calcCols() {
        this.loading = true
        if (this.timer != null) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => { // 多次触发后在5秒后执行最后一次触发
          let cols = []
          const list = this.originData.sort((x,y)=> x.seat - y.seat)//.filter(a => a.data)
          const bigs = list.filter(a => a.size == 'big')
          const small = list.filter(a => a.size == 'small')
          const smallLen = small.length

          function changColSmall(arr) {
            let baseYs = 3
            const ys3 = arr.length % 3
            const ys2 = arr.length % 4
            if (ys3 < ys2) {
              baseYs = 3
            }
            if (arr.length % baseYs == 0) {
              arr.forEach(a => {
                a.col = 24 / baseYs
              })
              console.log(0)
            } else if (arr.length % baseYs != 0) {
              const ys = arr.length % baseYs
              const col = 24 / ys
              arr.forEach(a => {
                a.col = 24 / baseYs
              })

              for (let i = arr.length - ys; i < arr.length; i++) {
                arr[i].col = col
              }
            }
            return arr
          }

          cols = changColSmall(small)
          
          this.$nextTick(() => {
            this.cols = cols
          })
          this.loading = false
          console.log(cols)
       }, 1000)
      },
      loadData(){
        this.originData =[]
        let name = [
          {url:'capitalReminderList',name:'抵押资产表',data:otherMortgage,chart:'table',seat:0},
          {url:'capitalMoneyPercentList',name:'资产各类价值占比',data:otherMoneyLevelPercent,chart:'circle',seat:1},
          {url:'capitalChangeAnalysisList',name:'各类资产价值情况',data:otherMoneyLevelAnalysis,chart:'bar',seat:2},
          {url:'capitalMoneyAnalysisList',name:'资产价值趋势（分）',data:otherMoneyTimeAnalysis,chart:'bar',seat:3},
          {url:'capitalInList',name:'资产价值趋势（总）',data:otherMoneyAnalysis,chart:'bar',seat:4}]
        name.map((item,index)=>{
          item.data(this.params).then((res) => {
            let data = null;
                if(item.chart =='circle'){
                  data = getPieOption(res.data.list, true)
                }else{
                  data = res.data
                }
              let subdata = [{
                  name:item.url,
                  data,
                  nameCn:item.name,
                  chart:item.chart,
                  col:item.col?item.col:8,
                  size: 'small',
                  seat:item.seat
                  // kgb:item.kgb?item.kgb:60
                }]
              this.originData = this.originData.concat(subdata)
              this.calcCols()
          }).catch((err) => {
            console.log('errerrerr',err)
            //  let subdata = [{
            //       name:item.url,
            //       data:null,
            //       nameCn:item.name,
            //       chart:item.chart,
            //       col:item.col?item.col:8,
            //       size: 'small',
            //       seat:item.seat
            //       // kgb:item.kgb?item.kgb:60
            //     }]
            //   this.originData = this.originData.concat(subdata)
            //   this.calcCols()
          })
        })

      }
    }
  }
</script>