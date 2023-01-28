<template>
  <div>
    <a-spin :spinning="loading">

      <a-row :gutter="[16,16]" type="flex" >

        <template v-for="(item,index) in cols">

          <!-- 2:1:2 布局 -->
          <a-col :xs="24" :sm="24" :md="item.col" :key="index" v-if="item.childer">
            <a-card :bodyStyle="{padding:'0',height:'100%'}" :style="sub.style" :title="null" v-for="(sub,Sindex) in item.childer" :key="Sindex">
              <echart-wrap :isParentH="sub.isParentH">

                <star-title slot="title" :title="sub.nameCn" v-if="sub.selectType" :selectList="chinaselect" :type="sub.selectType" @change="onChange"></star-title>
                <star-title slot="title" :title="sub.nameCn" v-else></star-title>

                <template v-if=" sub.chart =='circle' ">
                  <CircleEcharts :piedatalist="sub.data" :name="sub.name" />
                </template>
                <template v-else-if="sub.chart =='bar' ">
                  <ColumnEcharts :bardatalist="sub.data" />
                </template>
                <template v-else-if="sub.chart =='map'">
                  <ChinaEcharts :chinaData="sub.data" />
                </template>
                <template v-else-if="sub.chart =='per'">
                  <PercentMax :percentList="sub.data"/>
                </template>
                <template v-else-if="sub.chart =='order'">
                  <OrderComplete :oneList="sub.data" :isLoop='sub.data.list.length>3' />
                </template>
                <template v-else-if="sub.chart =='table'">
                  <TableTop :tableList="sub.data" :isLoop='sub.data.list.length>4' />
                </template>
              </echart-wrap>
            </a-card>
          </a-col>

          <a-col :xs="24" :sm="24" :md="item.col" :key="index" v-else>
            <a-card :bodyStyle="{padding:'0'}" :title="null">
              <echart-wrap  :height="item.kgb">
                <star-title slot="title" :title="item.nameCn" v-if="item.selectType" :selectList="chinaselect" :type="item.selectType" @change="onChange"></star-title>
                <star-title slot="title" :title="item.nameCn" v-else></star-title>
                <template v-if="item.chart =='circle'">
                  <CircleEcharts :piedatalist="item.data" :name="item.name" />
                </template>
                <template v-else-if="item.chart =='bar' ">
                  <ColumnEcharts :bardatalist="item.data" />
                </template>
                <template v-else-if="item.chart =='map'">
                  <ChinaEcharts :chinaData="item.data" />
                  <!-- <MapEcharts /> -->
                </template>
                <template v-else-if="item.chart =='order'">
                  <OrderComplete :oneList="item.data" />
                </template>
                <template v-else-if="item.chart =='table'||item.chart =='list'">
                  <TableTop :tableList="item.data" :isLoop='item.data.list.length>5'/>
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
  import {
    getPieOption
  } from '@/components/echarts/options.js'
  import {
    customerSaleTop,
    collectionAnalysis,
    collectionPercent,
    saleComplete,
    departmentAnalysis,
    orderComplete,
    productPercent,
    saleMap,
    businessSaleTop,
    saleContribution,
    productSale,
    regionSalePercent,
    productPrice,
    productUnit,
    productCompare,
    saleMoney,
    customerSale,
    regionSaleTop,
    accountsReceivable
  } from '@/api/app'

  export default {
    name: 'Sales',
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
        cardStyle:{
  　　　　　 height:'',
            padding:0
  　　　　},
        cardStyleMaxHeight:0,//地图高度
        loading: false,
        originData:[],
        bodyData:[],
        chinaselect: [{ // 地图筛选
          id: '1',
          name: '订单销售额'
        }, {
          id: '2',
          name: '发票销售额'
        }, {
          id: '3',
          name: '出库销售额'
        }],
        params: { // 全局筛选入参
          search: {
            department_id: [],
            product_id: [],
            region_id: [],
            customer_id: []
          },
          date: [],
          sign:0,
          date_key:0,
        },
        cols: [],
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
      this.$eventBus.$on('changGlobalParms', (e) => {
        console.log('全局参数改变', e)
        if (e && e.search || e.startDate) {
          this.params = {
            search: {
              customer_id:e.search.customer_id,
              department_id:e.search.department_id,
              product_id:e.search.product_id,
              region_id:e.search.region_id
            },
            sign:e.sign,
            date_key:e.date_key,
            date: e.startDate ? [e.startDate, e.endDate] : []
          }
          this.loadData()
        }
      })
    },
    methods: {
      calcCols() {
        this.loading = true
        if (this.timer != null) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => { // 多次触发后在5秒后执行最后一次触发
          let cols = []
          const list = this.originData//.filter(a => a.data)
          const bigs = list.filter(a => a.size == 'big')
          const small = list.filter(a => a.size == 'small')
          const smallLen = small.length
          const wh = window.innerHeight - 118

          // list.forEach(a => {
          //   a.isParentH = true
          //   a.size == 'big' ? a.style = {height:(wh/3)*2 - 16 +'px'} : '100%'//a.style = {height:wh/3 - 16 +'px'} // wh/3 - 16 +'px'
          // })

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
                if (ys == 1) {
                  arr[i].kgb = 16
                }else if(arr.length > 1||smallLen>1) {
                  arr[i].kgb = 26
                }
              }
            }
            return arr
          }

          if (bigs.length == 0) { // 如果没有大图
            cols = changColSmall(small)
          } else {
            const blen = bigs.length
            const slen = small.length
            if (blen == 1) {
              if (slen >= 4) {
                const a = small.splice(0, 1)[0]
                a.isParentH = true
                a.col = 7
                a.style = {
                  height: '50%'
                }
                const b = small.splice(0, 1)[0]
                b.isParentH = true
                b.col = 7
                b.style = {
                  marginTop: '16PX',
                  height: 'calc(50% - 16px)'
                }
                
                // cols[0].isParentH = true
                // cols[0].style = {height:(wh/3)*2 - 16 +'px'}
                cols[0] = {
                  col: 7,
                  childer: [a, b]
                }
                cols[1] = bigs.splice(0, 1)[0]
                cols[1].col = 10
                cols[1].kgb = 72
                // cols[1].isParentH = true
                cols[1].style = {
                  height:(wh/3)*2 - 16 +'px'
                }
                const c = small.splice(0, 1)[0]
                c.isParentH = true
                c.style = {
                  height: '50%' //wh/3  //'50%'
                }
                const d = small.splice(0, 1)[0]
                d.isParentH = true

                d.style = {
                  marginTop: '16PX',
                  height: 'calc(50% - 16px)' // calc(50% - 16px)  wh/3 - 16 +'px'
                }
                cols[2] = {
                  col: 7,
                  childer: [c, d]
                }
                cols = cols.concat(changColSmall(small))
              } else {
                const h = 100 / slen
                // const h = (wh/3) * 2
                cols[0] = bigs.splice(0, 1)[0]
                cols[0].col = 12
                cols[0].kgb = 100
                cols[1] = {
                  col: 12,
                  childer: []
                }
                small.forEach((a, i) => {
                  if (i == 0) {
                    a.style = { height: `${h}%` }
                  } else {
                    a.style = {
                      marginTop: '16PX',
                      height: `calc(${h}% - 16px)`
                    }
                  }
                  a.isParentH = true
                  cols[1].childer.push(a)
                })
              }
            } else if (blen == 2) {
              bigs.forEach(a => {
                a.col = 12
                a.kgb = 60
              })
              cols = [...bigs, ...changColSmall(small)]
            }
          }
          this.$nextTick(() => {
            this.cols = cols
          })
          this.loading = false
          console.log(cols)
       }, 1000)
      },
      loadData() {
        this.cols = []
        // this.originData = [];
        // this.originData.forEach(a => {
        //   a.data = null
        //   a.isParentH = false
        //   a.size == 'big' ? a.kgb = 84 : a.kgb = 60
        // })

        console.log('--------loadData---------')
        console.log(this.params)
        // 默认图表
        if (this.params.sign == 0) {
          this.bodyData = [
            {url:'customerSaleTopList',name:'客户销售额排行榜',data:customerSaleTop,chart:'per',seat:0,selectType: 1}, //
            {url:'chinaData',name:'各地区销售情况',data:saleMap,chart:'map',size:'big',seat:1,selectType: 2},
            {url:'productPercentList',name:'产品销售占比',data:productPercent,chart:'circle',seat:2, selectType: 4},
            {url:'orderList',name:'订单完成情况',data:orderComplete,chart:'Order',seat:3},  //
            {url:'collectionPercentList',name:'应收账款账龄情况',data:collectionPercent,chart:'circle',seat:4},
            {url:'collectionAnalysisList',name:'应收账款分析',data:collectionAnalysis,chart:'bar',seat:5},
            {url:'saleCompleteList',name:'销售完成分析',data:saleComplete,chart:'bar',seat:6},
            {url:'departmentAnalysisList',name:'各部门销售情况',data:departmentAnalysis,chart:'bar',seat:7,selectType: 6},
            ]
        } else {
          // 贡献度分析
          // this.saleContribution()
        }

        if (this.params.sign == 1) { // 部门项时生效
          let list = [
            {url:'customerSaleTopList',name:'客户销售额排行榜',data:customerSaleTop,chart:'table',seat:0,selectType: 1}, //
            {url:'collectionPercentList',name:'应收账款账龄情况',data:collectionPercent,chart:'circle',seat:1},
            {url:'orderList',name:'订单完成情况',data:orderComplete,chart:'Order',seat:2},  //
            {url:'businessSaleTopList',name:'员工销售排行',data:businessSaleTop,chart:'table',seat:3,selectType: 8},
            {url:'collectionAnalysisList',name:'应收账款分析',data:collectionAnalysis,chart:'bar',seat:5},
            {url:'saleCompleteList',name:'销售完成分析',data:saleComplete,chart:'bar',seat:6},// ,selectType: 4
            {url:'saleContributionList',name:'贡献度分析',data:saleContribution,chart:'bar',seat:7},
            ]
            if (this.params.search.department_id.length > 1) {
              list.push({url:'productSaleList',name:'各部门产品销售总额表',data:productSale,chart:'bar',seat:4,selectType: 3},)
            }else{
              list.push({url:'productPercentList',name:'产品销售占比',data:productPercent,chart:'circle',seat:4,selectType: 4},)
            }
            this.bodyData = list

        } else if (this.params.sign == 2) { // 产品多选项时生效
          
          this.bodyData = [
            {url:'customerSaleTopList',name:'客户销售额排行榜',data:customerSaleTop,chart:'table',seat:0,selectType: 1}, //
            {url:'productSaleList',name:'产品销售总额表',data:productSale,chart:'bar',seat:1,selectType: 3},
            {url:'orderList',name:'订单完成情况',data:orderComplete,chart:'Order',seat:2},  //
            {url:'productUnitList',name:'产品销量变动',data:productUnit,chart:'bar',seat:3,selectType: 10},
            {url:'productPriceList',name:'产品价格变动',data:productPrice,chart:'bar',seat:4,selectType: 11},
            {url:'productCompareList',name:'产品收入成本对比',data:productCompare,chart:'bar',seat:5}, //,selectType: 4
            {url:'saleMoneyList',name:'销售额变动',data:saleMoney,chart:'bar',seat:6,selectType: 7},
            {url:'saleContributionList',name:'贡献度分析',data:saleContribution,chart:'bar',seat:7},
            ]

        } else if (this.params.sign == 4) { // 客户多选项时生效
          this.bodyData = [
            {url:'customerSaleTopList',name:'客户销售额排行榜',data:customerSaleTop,chart:'table',seat:0,selectType: 1}, //
            {url:'collectionPercentList',name:'应收账款账龄情况',data:collectionPercent,chart:'circle',seat:1},
            {url:'customerSaleList',name:'客户销售情况',data:customerSale,chart:'circle',seat:2,selectType: 5},
            {url:'saleMoneyList',name:'销售额变动',data:saleMoney,chart:'bar',seat:7,selectType: 7},
            {url:'collectionAnalysisList',name:'应收账款分析',data:collectionAnalysis,chart:'bar',seat:4},
            {url:'saleCompleteList',name:'销售完成分析',data:saleComplete,chart:'bar',seat:5}, //,selectType: 4
            {url:'saleContributionList',name:'贡献度分析',data:saleContribution,chart:'bar',seat:6},
            {url:'capitalReminderList',name:'超期账龄情况',data:accountsReceivable,chart:'table',seat:3},
            ]
        } else if (this.params.sign == 3) { // 地区多选项时生效 

          this.bodyData = [
            {url:'customerSaleTopList',name:'客户销售额排行榜',data:customerSaleTop,chart:'table',seat:0,selectType: 1}, //
            {url:'regionSalePercentList',name:'各区域销售占比',data:regionSalePercent,chart:'circle',seat:1},
            {url:'orderList',name:'订单完成情况',data:orderComplete,chart:'Order',seat:2},  //
            {url:'regionSaleTopList',name:'各区域销售排行',data:regionSaleTop,chart:'table',seat:3,selectType: 9},
            {url:'saleCompleteList',name:'销售完成分析',data:saleComplete,chart:'bar',seat:4}, //,selectType: 4
            {url:'chinaData',name:'各地区销售情况',data:saleMap,chart:'map',size:'big',seat:5,selectType: 2},
            {url:'saleContributionList',name:'贡献度分析',data:saleContribution,chart:'bar',seat:6},
            ]
          
        }

        
          let params = this.params
          let defData = []
          this.bodyData.map((item,index)=>{

          item.data(params).then((res) => {
            let data = null;
            let chart = item.chart;
            if (res.code == 1) {

              if(item.chart =='circle'){
                
                // if(item.url =='collectionPercentList'){  //一个图表内放两个图
                //   let circle1 = getPieOption(res.data.list, true)
                //   let circle2 = getPieOption(res.data.list2, true)
                //   data = [circle1,circle2]
                // }else{
                  data = getPieOption(res.data.list, true)
                //}
              }else{
                if(res.data.type == 'list'){ chart = 'list' }
                if(res.data.type =='table'){ chart = 'table' }
                if(item.url =='customerSaleTopList' && res.data.type == 'list'){  //客户销售额排行榜
                  chart = 'per'
                  //全局筛选后展示表格
                  let temp = res.data.list.map(item=>item.money)
                  let max = Math.max.apply(null,temp)
                    res.data.list.forEach(item=>{
                      item.percent = (item.money*100/max).toFixed(2)
                    })
                }
                if(item.url =='orderList' && res.data.type == 'list'){ //订单完成情况
                  chart = 'order'
                }
                data = res.data
              }
            }
            let subdata = {
              name:item.url,
              data,
              nameCn:item.name,
              chart:chart,
              selectType:item.selectType?item.selectType:null,
              seat:item.seat,
              size: item.size?item.size:'small',
            }

            defData.push(subdata)
            defData.sort((x,y)=> x.seat - y.seat)
            // let list =  this.originData.concat(subdata)
            // this.originData =  list.sort((x,y)=> x.seat - y.seat)
            // this.calcCols()
            
          })
        })
        this.originData =  defData//.sort((x,y)=> x.seat - y.seat)
            console.log('originData===',this.originData)
        this.calcCols()

      },
      getHeight(){
        let height = window.innerHeight - 118;
        this.cardStyle.height = height/3 - 16 +'px'
        this.cardStyleMaxHeight = (height/3)*2 - 16 +'px'
      },
      // 选择事件回调
      onChange(e, type) {
        const that = this
        const t = parseInt(type)
        let url = '';
        switch (t) {
          case 1:
            url = 'customerSaleTopList';
            // that.customerSaleTop(e.key)
            break
          case 2:
            url = 'chinaData';
            // that.saleMap(e.key)
            break
          case 3:
            url = 'productSaleList';
            // that.productSale(e.key)
            break
          case 4:
            url = 'productPercentList';
            // that.productPercent(e.key)
            break
          case 5:
            url = 'customerSaleList';
            // that.customerSale(e.key)
            break
          case 6:
            url = 'departmentAnalysisList';
            // that.departmentAnalysis(e.key)// 各部门销售情况
            break
          case 7:
            url = 'saleMoneyList';
            // that.saleMoney(e.key)// 销售额变动
            break
          case 8:
            url = 'businessSaleTopList';
            // that.businessSaleTop(e.key)// 员工销售排行
            break
          case 9:
            url = 'regionSaleTopList';
            break
          case 10:
            url = 'productUnitList';
            break
          case 11:
            url = 'productPriceList';
            break
          default:
            break
        }
        that.filterData(url,e.key)
      },
      // 标题右边筛选
      filterData(url,type){
        let params = {...this.params,type}
        let i = this.originData.findIndex(a => a.name == url)
        let bodyi = this.bodyData.findIndex(a => a.url == url)

        this.bodyData[bodyi].data(params).then((res) => {
        console.log('-----------标题右侧选择事件-----------')
          console.log(res)
            if (res.code == 1) {
              let data = null;
              if(this.bodyData[bodyi].chart =='circle'){
                data = getPieOption(res.data.list, true)
              }else{
                data = res.data
              }
              // if(this.bodyData[bodyi].url =='customerSaleTopList'){ //客户销售额排行筛选后展示表格
              //   this.originData[i].chart = 'table'
              // }
              this.originData[i].data = data
              console.log(this.originData[i])
            }
          })
      },
      subData(name,nameCn,data,size,selectType){
        const i = this.originData.findIndex(a => a.name == name)
        let sub = [{
          name,
          nameCn,
          col: 8,
          isParentH: false,
          kgb: 60,
          data,
          selectType,
          size
        }]
        if(i != -1){
          this.originData[i].data = data
        }else{
          this.originData = this.originData.concat(sub)
        }
        
        this.calcCols()
      },
    }
  }
</script>
<style lang="less" scoped>
  /deep/ .ant-card-head-title {
    padding: 0;
  }

  /deep/ .ant-card-head {
    min-height: 32px;
  }

  /deep/ .ant-card-extra {
    padding: 0;
  }

  .ant-col {
    box-sizing: border-box
  }

  .box-content {
    color: var(--cardTitbg);
    height: 94%;
    overflow: hidden;
    // background: rgba(255, 255, 255, 0.1);
    // border: 1px solid rgba(255, 255, 255, 0.3);
  }

  /deep/ .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }

  /deep/ .slick-slide h3 {
    color: #fff;
  }

  .ant-select-selection {
    background-color: transparent !important;
    border: none !important;
  }

  //
  body::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  body {
    scrollbar-width: none;
  }

  body {
    -ms-overflow-style: none;
  }
</style>
