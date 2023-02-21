// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import VueAMap from 'vue-amap';
import * as echarts from 'echarts';
import EventBus from "@/utils/eventBus"

Vue.use(VueAMap);
Vue.use(VueCompositionApi)
VueAMap.initAMapApiLoader({
  key: '2c89c54bff6c27a39666a7632ef5196c',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geocoder','AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'


// topology左侧工具栏图标
import './assets/font/iconfont.css'
// 右侧图形库图标
import './assets/font/libs/iconfont.css'
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

//表单生成器
// import KFormDesign from './lib/k-form-design-mini.umd.min'
// import './lib/k-form-design.css'
// Vue.use(KFormDesign)
//表单生成器

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})


import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.prototype.$echarts = echarts
Vue.prototype.$eventBus = EventBus
window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
