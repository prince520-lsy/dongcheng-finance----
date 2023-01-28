<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :i18nRender="i18nRender"
    v-bind="settings"
  >
    <!-- Ads begin
      广告代码 真实项目中请移除
      production remove this Ads
    -->
    <ads v-if="isProPreviewSite && !collapsed"/>
    <!-- Ads end -->

    <!-- 1.0.0+ 版本 pro-layout 提供 API，
          我们推荐使用这种方式进行 LOGO 和 title 自定义
    -->
    <template v-slot:menuHeaderRender>
      <div>
        <img src="../assets/logo1.png" />
        <h1>{{ title }}</h1>
      </div>
    </template>
    <!-- 1.0.0+ 版本 pro-layout 提供 API,
          增加 Header 左侧内容区自定义
    -->
    <template v-slot:headerContentRender>
      <div>
        <!-- <a-tooltip title="刷新页面">
          <a-icon type="reload" style="font-size: 18px;cursor: pointer;" @click="reload" />
        </a-tooltip> -->
          <a-space style="margin-left:30px">
          <!-- <a-row :gutter="[16,16]" type="flex">
            <a-col :xs="24" :sm="24" :md="6"></a-col>
            <a-col :xs="24" :sm="24" :md="6"></a-col>
            <a-col :xs="24" :sm="24" :md="6"></a-col>
          </a-row>   -->
          <a-tree-select
          v-if="selectData && selectData.length>0"
              v-model="selectValue"
              style="width: 340px"
              size="small"
              :tree-data="selectData"
              tree-checkable
              allow-clear
              :maxTagCount='3'
              :show-checked-strategy="SHOW_PARENT"
              search-placeholder="请选择"
              renderExtraFooter
            />

            <template v-if="timeSales">
              <a-range-picker
                :placeholder="['开始时间', '结束时间']"
                format="YYYY-MM"
                v-model="timeValue"
                size="small"
                :mode="['month', 'month']"
                :open="endOpen"
                @panelChange="dataPanelChange"
                @openChange="handleStartOpenChange"
                ref="range-picker"
              >
              <div slot="renderExtraFooter" style="margin-left:245px">
                <a-button value="small" type="primary" @click="()=>{endOpen=false}">确定</a-button>
              </div>
              </a-range-picker>

              <template v-if="timeSalesKey">
                <a-select  placeholder="跨度" style="width: 120px" size="small" @change="handleChange">
                  <a-select-option v-for="(item,index) in across" :key="index" :value="item.id">
                    {{item.name}}
                  </a-select-option>
                </a-select>
              </template>
            </template>

            <a-button  type="primary" size="small" @click="onSelect">确定</a-button>
            <!-- v-if="selectData && selectData.length>0||timeSales" -->
        </a-space>

      

      </div>

    </template>

    <!-- <setting-drawer :settings="settings" @change="handleSettingChange">
      <div style="margin: 12px 0;">
        This is SettingDrawer custom footer content.
      </div>
    </setting-drawer> -->
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <!-- custom footer / 自定义Footer -->
    <!-- <template v-slot:footerRender>
      <global-footer />
    </template> -->
    <router-view v-if="!reloaded" />
  </pro-layout>
</template>

<script>
import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
import { i18nRender } from '@/locales'
import { mapState } from 'vuex'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'
import NProgress from 'nprogress' // progress bar
import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import Ads from '@/components/Other/CarbonAds'

import { TreeSelect } from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

import moment from 'moment'
import { push } from 'store/storages/all'

// import LogoSvg from '../assets/logo.svg?inline'

export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent,
    GlobalFooter,
    // LogoSvg,
    Ads
  },
  data () {
    return {
      // preview.pro.antdv.com only use.
      isProPreviewSite: process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development',
      // end
      reloaded:false,
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        // 布局类型
        // layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        // contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: true,
        hideCopyButton: true
      },
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false,
      //筛选
      selectData:null,
      selectValue: [],

      timeValue: [],
      // mode: ['month', 'month'],
      SHOW_PARENT,
      endOpen:false,
      across:[{id:'year',name:'年'},{id:'quarterly',name:'季度'},{id:'months',name:'月'}], //:年=year,季度=quarterly,月=months
      dataKey:null,
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters,
      topSelect:state => state.business.topSelect,
      defaultType:state => state.business.defaultType,
      salesList:state => state.business.salesList,
      timeSales:state => state.business.timeSales,
      timeSalesKey:state => state.business.timeSalesKey,
    })
  },

  created () {
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
    // first update color
    // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
    if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
      updateTheme(this.settings.primaryColor)
    }
    // this.$store.dispatch('getOptions')

    
    let that = this;
    setTimeout(()=>{
      if(that.salesList.length>0){
        that.selectData = that.salesList
      }
    },500)
  },
  watch: {
    salesList(newV, oldV) {
        this.selectData = newV
        this.selectValue = []
    }
  },
  methods: {
    moment,
    getHeight(){
      let height = window.innerHeight - 36 - 100;
      this.cardStyle.height = height/2 +'px'
      console.log(cardStyle)
    },
    handleChange(value) {
      this.dataKey = value
    },
    handleStartOpenChange(open) {
      this.endOpen = !this.endOpen;
    },
    // onChange(value, dateString) {
    //   console.log('Selected Time: ', value);
    //   console.log('Formatted Selected Time: ', dateString);
    //   this.endOpen=false
    // },
    dataPanelChange(value, mode) {
      console.log('dataPanelChange: ', value);
      this.timeValue = value;
      // this.mode = [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]];
    },
    // changDate(e){
    //   this.$store.commit('setGlobalParams',{
    //     key:'date',
    //     startDate:e[0].format('YYYY-MM-DD'),
    //     endDate:e[1].format('YYYY-MM-DD')
    //   })
    // },
    // changOptions(value){
    //   this.$store.commit('setGlobalParams',{
    //     key:this.defaultType,
    //     value
    //   })
    // },
    i18nRender,
    reload(){
      this.reloaded = true;
       NProgress.start() 
      setTimeout(() => {
        this.reloaded = false;
         NProgress.done() 
      }, 200);
    },
    handleMediaQuery (val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse (val) {
      this.collapsed = val
    },
    handleSettingChange ({ type, value }) {
      console.log('type', type, value)
      type && (this.settings[type] = value)
      const themeStyle = document.getElementById('theme-style')
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'primaryColor':
          let theme = 'antd' //drak antd
          if(value=='#F5222D'){
            theme ='dust'
          }else if(value=='#FA541C'){
            theme ='volcano'
          } else if(value=='#FAAD14'){
            theme ='sunset'
          } else if(value=='#13C2C2'){
            theme ='cyan'
          } else if(value=='#52C41A'){
            theme ='green'
          }else if(value=='#2F54EB'){
            theme ='geekblue'
          }else if(value=='#722ED1'){
            theme ='purple'
          }else{
            theme ='primary'
          }
          themeStyle.href  = `/theme/${theme}.css`
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    },
    // 确定事件，转换数据存全局状态
    onSelect(){

      let search = {
        department_id:[], // 部门
        product_id:[], // 产品
        region_id:[], // 地区
        customer_id:[], // 客户
        supplier_id:[], // 供应商
        category_id:[], // 类别
        warehouse_id:[], // 仓库
        taxation_id:[], // 税种
        expense_id:[], // 费用
      }
      // 最后选择的条件标识：0=默认，1=部门，2=产品，3=地区，4=客户, 5=供应商, 6=费用
      let sign = 0
      if(this.selectValue.length >0){
        let last = this.selectValue[this.selectValue.length -1]
        if(last.includes('department')){
          sign = 1
        }else if(last.includes('product')){
          sign = 2
        }else if(last.includes('region')){
          sign = 3
        }else if(last.includes('customer')){
          sign = 4
        }else if(last.includes('supplier')){
          sign = 5
        } if(last.includes('expense')){
          sign = 6
        }
      }

      this.selectValue.map(item=>{
        if(item.includes('department')){
          if(item.includes('|')){
            let ids = item.split('|')
            if(ids.length>0){
              search.department_id.push(ids[1])
            }
          }else{
            search.department_id = this.topSelect['department']
          }
        }
        if(item.includes('product')){
          if(item.includes('|')){
            let ids = item.split('|')
            if(ids.length>0){
              search.product_id.push(ids[1])
            }
          }else{
            search.product_id = this.topSelect['product']
          }
        }
        if(item.includes('region')){
          if(item.includes('|')){
            let ids = item.split('|')
            if(ids.length>0){
              search.region_id.push(ids[1])
            }
          }else{
            search.region_id = this.topSelect['region']
          }
        }
        if(item.includes('customer')){
          if(item.includes('|')){
            let ids = item.split('|')
            if(ids.length>0){
              search.customer_id.push(ids[1])
            }
          }else{
            search.customer_id = this.topSelect['customer']
          }
        }
        if(item.includes('supplier')){
          if(item.includes('|')){
            let ids = item.split('|')
            if(ids.length>0){
              search.supplier_id.push(ids[1])
            }
          }else{
            search.supplier_id = this.topSelect['supplier']
          }
        }
        if(item.includes('category')){
          if(item.includes('|')){
            let ids = item.split('|')
            if(ids.length>0){
              search.category_id.push(ids[1])
            }
          }else{
            search.category_id = this.topSelect['category']
          }
        }
        if(item.includes('warehouse')){
          if(item.includes('|')){
            let ids = item.split('|')
            if(ids.length>0){
              search.warehouse_id.push(ids[1])
            }
          }else{
            search.warehouse_id = this.topSelect['warehouse']
          }
        }
        if(item.includes('taxation')){
          if(item.includes('|')){
            let ids = item.split('|')
            if(ids.length>0){
              search.taxation_id.push(ids[1])
            }
          }else{
            search.taxation_id = this.topSelect['taxation']
          }
        }
        if(item.includes('expense')){
          if(item.includes('|')){
            let ids = item.split('|')
            if(ids.length>0){
              search.expense_id.push(ids[1])
            }
          }else{
            search.expense_id = this.topSelect['expense']
          }
        }

      })
      
      // let time = moment(this.timeValue[0]._d).format('YYYY-MM-DD');
      if(this.timeValue.length>0){
        console.log(this.timeValue)
      }
      this.$store.commit('setGlobalParams',{
        startDate:this.timeValue.length>0? this.timeValue[0].format('YYYY-MM')+'-01' :'',
        endDate:this.timeValue.length>0? moment(this.timeValue[1]).endOf('month').format('YYYY-MM-DD') :'',
        date_key:this.dataKey,
        sign:sign,
        search
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./BasicLayout.less";
.selectBox{
  .ant-select-selection{
    background:#BDBEBE;
  }
  input:-moz-placeholder{
    color: #BDBEBE;
  }

  input::-moz-placeholder{
    color: #BDBEBE;
  }

  input:-ms-input-placeholder{
    color: #BDBEBE;
  }
}
.pickerStyle{
  .ant-calendar{
    background:#BDBEBE;
    // color:#fff
  }
  .ant-calendar-input {
    background:#BDBEBE;
    color:#fff
  }
  .ant-calendar-input {
    color:#fff!important;
    background-color:#BDBEBE!important;
  }
  .ant-input{
    background-color:#BDBEBE!important;
    color:#fff!important;
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #BDBEBE;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #BDBEBE;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #BDBEBE;
  } 
  input::-webkit-input-placeholder{
    color: #BDBEBE;
  }

  input:-moz-placeholder{
    color: #BDBEBE;
  }

  input::-moz-placeholder{
    color: #BDBEBE;
  }

  input:-ms-input-placeholder{
    color: #BDBEBE;
  }
  
}
</style>
