<template>
  <div>
    <a-row :gutter="[16,16]" type="flex">

      <a-col :xs="24" :sm="24" :md="showBig?7:12">
        <a-card :bodyStyle="{padding:'0',height:'100%'}" :title="null" v-if="customerSaleTopList" style="height:50%">
          <echart-wrap :isParentH="showBig" :height="30">
            <star-title slot="title" title="客户销售额排行榜"  :selectList="chinaselect" type="1" @change="onChange"></star-title>
            <PercentMax v-if="!customerSaleTopType" :percentList="customerSaleTopList"></PercentMax>
            <TableTop v-else  :tableList="customerSaleTopList" />
          </echart-wrap>
        </a-card>

        <a-card :bodyStyle="{padding:'0',height:'100%'}" :title="null" style="margin-top:16px;height:calc(50% - 16px)">
          <echart-wrap :isParentH="showBig" :height="30">

            <template v-if="collectionPercentList">
             <star-title slot="title" title="应收账款账龄情况"></star-title>
             <CircleEcharts :piedatalist="collectionPercentList"></CircleEcharts>
            </template>

            <template v-if="productUnitList">
             <star-title slot="title" title="产品销量变动"></star-title>
             <ColumnEcharts :bardatalist="productUnitList" />
            </template>

            <template v-if="regionSalePercentList">
              <star-title slot="title" title="各区域销售占比"></star-title>
              <CircleEcharts :piedatalist="regionSalePercentList"></CircleEcharts>
            </template>

          </echart-wrap>
        </a-card>

      </a-col>

      <a-col :xs="24" :sm="24" :md="10" v-if="productSaleList||chinaData||productPercentList">
        <a-card :bodyStyle="{padding:'0'}" :title="null">
          <echart-wrap :height="84">
            <template v-if="chinaData">
              <star-title slot="title" title="各地区销售情况" :selectList="chinaselect" type="2" @change="onChange"></star-title>
              <ChinaEcharts :chinaData="chinaData"/>
            </template>
            
            <template v-if="productSaleList">
              <star-title v-if="params.search.department_id.length > 1" slot="title" title="各产品销售总额表" :selectList="chinaselect" type="3" @change="onChange"></star-title>
              <star-title v-else slot="title" title="各部门产品销售总额表" :selectList="chinaselect" type="3" @change="onChange"></star-title>

              <ColumnEcharts :bardatalist="productSaleList" />
            </template>

            <template v-if="productPercentList && params.search.department_id.length == 1">
              <star-title slot="title" title="各产品销售占比" :selectList="chinaselect" type="4" @change="onChange"></star-title>
              <CircleEcharts :piedatalist="productPercentList" />
            </template>

            <!-- <template v-if="saleCompleteList">
             <star-title slot="title" title="销售完成分析"></star-title>
             <ColumnEcharts :bardatalist="saleCompleteList" />
            </template> -->

          </echart-wrap>
        </a-card>

      </a-col>

      <a-col :xs="24" :sm="24" :md="showBig?7:12">
        <a-card :bodyStyle="{padding:'0',height:'100%'}" :title="null" style="height:50%">
            <echart-wrap :isParentH="showBig" :height="30" >

              <template v-if="orderList">
                <star-title slot="title" title="订单完成情况"></star-title>
                <OrderComplete v-if="orderList.list.length==1" :oneList="orderList" />
                <TableTop v-else :tableList="orderList" isLoop=true />
              </template>

              <template v-if="customerSaleList">
                <star-title slot="title" title="客户销售情况" :selectList="chinaselect" type="5" @change="onChange"></star-title>
                <CircleEcharts :piedatalist="customerSaleList" />
              </template>

            </echart-wrap>
        </a-card>

        
        <a-card :bodyStyle="{padding:'0',height:'100%'}" :title="null" style="margin-top:16px;height:calc(50% - 16px)">
          <echart-wrap :isParentH="showBig" :height="30">
            
            <template v-if="saleContributionList">
              <star-title slot="title" title="贡献度分析"></star-title>
              <ColumnEcharts :bardatalist="saleContributionList" />
            </template>
            
            <template v-if="productPercentList && params.search.department_id.length < 1">
              <star-title slot="title" title="各产品销售占比"></star-title>
              <CircleEcharts :piedatalist="productPercentList" />
            </template>

          </echart-wrap>
        </a-card>

        
      </a-col>

    </a-row>

    <a-row :gutter="[16,16]" type="flex" v-if="params.search.region_id.length <= 0">
      <a-col :xs="24" :sm="24" :md="7">
        <a-card :bodyStyle="{padding:'0'}" :title="null">
          <echart-wrap :height="60">

            <template v-if="collectionAnalysisList">
              <star-title slot="title" title="应收账款分析"></star-title>
              <ColumnEcharts :bardatalist="collectionAnalysisList" />
            </template>
            
            <template v-if="productCompareList">
              <star-title slot="title" title="产品收入成本对比"></star-title>
              <ColumnEcharts :bardatalist="productCompareList" />
            </template>
            
          </echart-wrap>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="24" :md="10">
        <a-card :bodyStyle="{padding:'0',height:'100%'}" :title="null" style="height:100%">
          <echart-wrap isParentH>
            <template v-if="saleCompleteList">
             <star-title slot="title" title="销售完成分析"></star-title>
             <ColumnEcharts :bardatalist="saleCompleteList" />
            </template>
            
            <template v-if="productPriceList">
              <star-title slot="title" title="产品价格变动"></star-title>
              <ColumnEcharts :bardatalist="productPriceList" />
            </template>


          </echart-wrap>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="24" :md="7">
        <a-card :bodyStyle="{padding:'0',height:'100%'}" :title="null" style="height:100%">
          <echart-wrap isParentH>
            
            <template v-if="departmentAnalysisList">
             <star-title slot="title" title="各部门销售情况" :selectList="chinaselect" type="6" @change="onChange"></star-title>
             <ColumnEcharts :bardatalist="departmentAnalysisList" />
            </template>

            <template v-if="businessSaleTopList">
              <star-title slot="title" title="员工销售排行" :selectList="chinaselect" type="8" @change="onChange"></star-title>
              <TableTop :tableList="businessSaleTopList"></TableTop>
            </template>
            
            
            <template v-if="saleMoneyList">
             <star-title slot="title" title="销售额变动" :selectList="chinaselect" type="7" @change="onChange"></star-title>
             <ColumnEcharts :bardatalist="saleMoneyList" />
            </template>

          </echart-wrap>
        </a-card>

      </a-col>
    </a-row>
    <template v-if="params && params.search.region_id.length > 0">
      <a-row :gutter="[16,16]" type="flex">
      <a-col :xs="24" :sm="24" :md="24">
        <a-card :bodyStyle="{padding:'0',height:'100%'}" :title="null" style="height:100%">
          <echart-wrap  :height="20">
            <template v-if="saleCompleteList">
             <star-title slot="title" title="销售完成分析"></star-title>
             <ColumnEcharts :bardatalist="saleCompleteList" />
            </template>
          </echart-wrap>
        </a-card>
      </a-col>
      </a-row>
    </template>


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
    customerSale
  } from '@/api/app'

  export default {
    name: 'sales',
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
        customerSaleTopType:false, //客户销售额排行榜是否默认情况
        collectionPercentList: null, // 应收账款账龄情况
        productPercentList: null, // 各产品销售占比
        collectionAnalysisList: null, // 应收账款分析
        saleCompleteList: null, // 销售完成分析
        departmentAnalysisList: null, // 各部门销售情况
        orderList: null, // 订单完成情况
        customerSaleTopList: null, // 客户销售额排行榜
        productSaleList:null, // 产品销售总额表 & 各部门产品销售总额表
        saleContributionList:null, // 贡献度分析
        businessSaleTopList:null, // 员工销售排行
        productCompareList:null, // 产品收入成本对比
        saleMoneyList:null, // 销售额变动
        productPriceList:null, // 产品价格变动
        productUnitList:null, // 产品销量变动
        regionSalePercentList:null, // 各区域销售占比
        customerSaleList:null, // 客户销售情况
        chinaData:null, //地图数据
        chinaselect:[{  //地图筛选
          id: '1',
          name: '订单销售额'
        }, {
          id: '2',
          name: '发票销售额'
        }, {
          id: '3',
          name: '出库销售额'
        }],
        params:{
          search: {    
                department_id: [],
                product_id: [],
                region_id: [],
                customer_id: [],
              },
              date: []
        }, //全局筛选入参
      }
    },
    computed:{
      showBig(){
        return this.productSaleList|| this.chinaData|| this.productPercentList
      }
    },
    created(){
        this.$store.dispatch('getOptions',this.$route.path)
    },
    mounted() {
      this.loadData()
      this.$eventBus.$off('changGlobalParms')
      this.$eventBus.$on('changGlobalParms',(e)=>{
        console.log('全局参数改变',e)
        if(e && e.search || e.startDate){
          this.params = {
            search: e.search,
            date:e.startDate?[e.startDate,e.endDate]:[]
          }
          // if(this.params && this.params.search.customer_id.length ==0 && this.params.search.department_id.length ==0 && this.params.search.product_id.length ==0 && this.params.search.region_id.length ==0 && this.params.date.length==0){
          //   this.params = null
          // }
          this.loadData()
        }
      })
    },
    methods: {
      loadData() {
        this.collectionPercentList= null, // 应收账款账龄情况
        this.productPercentList= null, // 各产品销售占比
        this.collectionAnalysisList= null, // 应收账款分析
        this.saleCompleteList= null, // 销售完成分析
        this.departmentAnalysisList= null, // 各部门销售情况
        this.orderList= null, // 订单完成情况
        this.customerSaleTopList= null, // 客户销售额排行榜
        this.productSaleList= null, // 产品销售总额表 & 各部门产品销售总额表
        this.saleContributionList= null, // 贡献度分析
        this.businessSaleTopList= null, // 员工销售排行
        this.chinaData= null, //地图数据
        this.productCompareList= null, // 产品收入成本对比
        this.saleMoneyList = null, // 销售额变动
        this.productPriceList = null, //产品价格变动
        this.productUnitList = null, // 产品销量变动
        this.regionSalePercentList = null, // 各区域销售占比
        this.customerSaleList = null, // 客户销售情况

        console.log('--------loadData---------')
        console.log(this.params)
        
        // 默认图表
        if(this.params.search.customer_id.length ==0 && this.params.search.department_id.length ==0 && this.params.search.product_id.length ==0 && this.params.search.region_id.length ==0){
          // 客户销售额排行榜
          this.customerSaleTop() 
          // 地图
          this.saleMap()
          //应收账款分析
          this.collAnalysis()
          //应收账款账龄比例
          this.collPercent()
          //销售完成分析
          this.saleComplete()
          //订单完成情况
          this.orderComplete()
          // 产品销售占比
          this.productPercent()
          // 各部门销售情况
          this.departmentAnalysis()
        }else{
          // 贡献度分析
          this.saleContribution()
        }
          
        
        if(this.params.search.department_id.length >= 1){ // 部门多选项时生效
          if(this.params.search.department_id.length > 1){
            // 产品销售总额表 & 各部门产品销售总额表
            this.productSale()
          }else{
            // 产品销售占比
            this.productPercent()
          }
          
          // 客户销售额排行榜
          this.customerSaleTop() 
          //销售完成分析
          this.saleComplete()
          //应收账款分析
          this.collAnalysis()
          //应收账款账龄比例
          this.collPercent()
          //订单完成情况
          this.orderComplete()
          // 员工销售排行
          this.businessSaleTop()
        }else if(this.params.search.product_id.length >= 1){// 产品多选项时生效
          // 产品销售总额表 & 各部门产品销售总额表
          this.productSale()
          // 客户销售额排行榜
          this.customerSaleTop() 
          //订单完成情况
          this.orderComplete()
          // 产品销量变动
          this.productUnit()
          // 产品价格变动
          this.productPrice()
          // 产品收入成本对比
          this.productCompare()
          // 销售额变动
          this.saleMoney()
        }else if(this.params.search.customer_id.length >= 1){// 客户多选项时生效
          //应收账款分析
          this.collAnalysis()
          //应收账款账龄比例
          this.collPercent()
          // 客户销售额排行榜
          this.customerSaleTop() 
          // 客户销售情况
          this.customerSale()
          //销售完成分析
          this.saleComplete()
          // 销售额变动
          this.saleMoney()
          
        }else if(this.params.search.region_id.length >= 1){// 地区多选项时生效 //区域客户销售排行 or 各区域销售排行 懵逼
          // 地图
          this.saleMap()
          // 销售完成分析
          this.saleComplete()
          // 区域客户销售排行
          this.customerSaleTop() 
          // 订单完成情况
          this.orderComplete()
          // 各区域销售占比
          this.regionSalePercent()
        }
        
         
      },
      // 选择事件回调
      onChange(e, type) {
        console.log(e, type)
        console.log('-----------标题右侧选择事件-----------')
        const that = this
        const t = parseInt(type)
        switch (t) {
          case 1:
            that.customerSaleTopType = true
            that.customerSaleTop(e.key)
            break
          case 2:
            that.saleMap(e.key)
            break
          case 3:
            if (that.params.search.department_id.length > 1) {
              that.productSale(e.key)
            } else {
              that.productPercent(e.key)
            }
            break
          case 4:
            that.productPercent(e.key)
            break
          case 5:
            that.customerSale(e.key)
            break
          case 6:
            that.departmentAnalysis(e.key)// 各部门销售情况
            break
          case 7:
            that.saleMoney(e.key)// 销售额变动
            break
          case 8:
            that.businessSaleTop(e.key)// 员工销售排行
            break

          default:
            break
        }
      },
      // 客户销售额排行
      customerSaleTop(type) {
        const data = {
          ...this.params,
          type
        }
        customerSaleTop(type ? data : this.params).then((res) => {
          if (res.code == 1) {
            this.customerSaleTopList = res.data
          }
        })
      },
      // 应收账款分析
      collAnalysis() {
        collectionAnalysis(this.params).then((res) => {
          if (res.code == 1) {
            this.collectionAnalysisList = res.data
          }
        })
      },
      // 应收账款账龄比例
      collPercent() {
        collectionPercent(this.params).then((res) => {
          if (res.code == 1) {
            // 应收账款账龄情况
            // this.piedata1 = res.data.list
            this.collectionPercentList = getPieOption(res.data.list,true)
          }
        })
      },
      // 销售完成分析
      saleComplete() {
        saleComplete(this.params).then((res) => {
          if (res.code == 1) {
            this.saleCompleteList = res.data
          }
        })
      },
      // 各部门销售情况
      departmentAnalysis(type) {
        const data = {
          ...this.params,
          type
        }
        departmentAnalysis(type ? data : this.params).then((res) => {
          if (res.code == 1) {
            this.departmentAnalysisList = res.data
          }
        })
      },
      // 订单完成情况
      orderComplete(type) {
        const data = {
          ...this.params,
          type
        }
        orderComplete(type ? data : this.params).then((res) => {
          if (res.code == 1) {
            this.orderList = res.data
          }
        })
      },
      // 销售热力图
      saleMap(type) {
        const data = {...this.params,type}
        saleMap(type ? data : this.params).then((res) => {
          if (res.code == 1) {
            this.chinaData = res.data
          }
        })
      },
      // 员工销售排行
      businessSaleTop(type) {
        let data = {...this.params,type}
        businessSaleTop(type?data:this.params).then((res) => {
          if (res.code == 1) {
            this.businessSaleTopList = res.data
          }
        })
      },
      // 贡献度分析
      saleContribution() {
        saleContribution(this.params).then((res) => {
          if (res.code == 1) {
            this.saleContributionList = res.data
          }
        })
      },
      // 产品销售总额表 & 各部门产品销售总额表
      productSale(type) {
        let data = {...this.params,type}
        productSale(type?data:this.params).then((res) => {
          if (res.code == 1) {
            this.productSaleList = res.data
            this.productPercentList = null //单个清空
          }
        })
      },
      // 产品销售占比
      productPercent(type) {
        const data = {
          ...this.params,
          type
        }
        productPercent(type ? data : this.params).then((res) => {
          if (res.code == 1) {
            this.productPercentList = getPieOption(res.data.list,false)
            this.productSaleList = null
          }
        })
      },
      // 各区域销售占比
      regionSalePercent() {
        regionSalePercent(this.params).then((res) => {
          if (res.code == 1) {
            this.regionSalePercentList = getPieOption(res.data.list,false)
          }
        })
      },
      // 产品价格变动
      productPrice() {
        productPrice(this.params).then((res) => {
          if (res.code == 1) {
            this.productPriceList = res.data
          }
        })
      },
      // 产品销量变动
      productUnit() {
        productUnit(this.params).then((res) => {
          if (res.code == 1) {
            this.productUnitList = res.data
          }
        })
      },
      // 产品收入成本对比
      productCompare() {
        productCompare(this.params).then((res) => {
          if (res.code == 1) {
            this.productCompareList = res.data
          }
        })
      },
      // 销售额变动
      saleMoney() {
        saleMoney(this.params).then((res) => {
          if (res.code == 1) {
            this.saleMoneyList = res.data
          }
        })
      },
      // 客户销售情况
      customerSale(type) {
        const data = {
          ...this.params,
          type
        }
        customerSale(type ? data : this.params).then((res) => {
          if (res.code == 1) {
            this.customerSaleList = getPieOption(res.data.list,false)
          }
        })
      }
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

  
.ant-col{
    box-sizing:border-box
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

/deep/  .slick-slide h3 {
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
  -ms-overflow-style:none;
}

  
</style>
