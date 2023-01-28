<template>
  <div ref="chinaMap" class="mapColumn"></div>
</template>

<script>

  import utils from '@/utils/utils.js'

  //   import '../../node_modules/echarts/map/js/world.js'
  import china from '../../assets/china.json' // 引入中国地图数据
import { OptionChinaMap } from './options.js'
  import { saleMap } from '@/api/app'
  var provinces = {
    // 23个省
    '台湾': 'taiwan',
    '河北省': 'hebei',
    '山西省': 'shanxi',
    '辽宁省': 'liaoning',
    '吉林省': 'jilin',
    '黑龙江省': 'heilongjiang',
    '江苏省': 'jiangsu',
    '浙江省': 'zhejiang',
    '安徽省': 'anhui',
    '福建省': 'fujian',
    '江西省': 'jiangxi',
    '山东省': 'shandong',
    '河南省': 'henan',
    '湖北省': 'hubei',
    '湖南省': 'hunan',
    '广东省': 'guangdong',
    '海南省': 'hainan',
    '四川省': 'sichuan',
    '贵州省': 'guizhou',
    '云南省': 'yunnan',
    '陕西省': 'shanxi1',
    '甘肃省': 'gansu',
    '青海省': 'qinghai',
    // 5个自治区
    '新疆维吾尔自治区': 'xinjiang',
    '广西壮族自治区': 'guangxi',
    '内蒙古自治区': 'neimenggu',
    '宁夏回族自治区': 'ningxia',
    '西藏自治区': 'xizang',
    // 4个直辖市
    '北京': 'beijing',
    '天津': 'tianjin',
    '上海': 'shanghai',
    '重庆': 'chongqing',
    // 2个特别行政区
    '香港': 'xianggang',
    '澳门': 'aomen'
}
  export default {
    name: 'App',
    // props: ['userJson'],
    props: {
      chinaData: {
        type: [Object, Array],
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        pagesize: 9999,
        options: {
          title: {},
          series: []
        },
        myChart: null,

        areaParams: 'province', // 查询传入省市县值
        areaNames: '', // 查询传入具体的某个省市县
        ColorData: '2', // 默认颜色

        list:[], //
        between:[],
      }
    },
    created() {
      this.$echarts.registerMap('china', china)
    },
    mounted() {
      setTimeout(() => {
        this.initMap()
      }, 50)
    },
    beforeDestroy() {
      if (!this.myChart) {
        return
      }
      this.myChart.dispose()
      this.myChart = null
    },
    methods: {
      getMapOpt(name) {
        let that = this;
        const opinion = { // 进行相关配置
          tooltip: {}, // 鼠标移到图里面的浮动提示框
          geo: { // 这个是重点配置区
            map: name || 'china', // 表示中国地图
            roam: false,
            zoom:1.2,
            // scaleLimit: { //滚轮缩放的极限控制
            //   min: 1,
            //   max: 2
            // },
            // left: 0, top: 0, right: 0, bottom: 0,
            // boundingCoords: [
            //     // 定位左上角经纬度
            //     [70, 55],
            //     // 定位右下角经纬度
            //     [146, 17]
            // ],
            label: {
              normal: {
                show: false, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.4)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.6)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          visualMap: {
            type: "piecewise",
            right:'10px',
            bottom:'10px',//piecewise. itemWidth 
            piecewise:{
              itemWidth:6,
              itemHeight:6
            },
            // splitNumber: that.between.long ,
            // min: that.between.min,
            // max: that.between.max,
            inRange: {
              color: utils.mapCorlor
            },
            textStyle:{
              color: utils.mapCorlor
            },
            pieces:that.between,
            // formatter:'{value} : {a} ({a}%)',
            // formatter: function (value,a) {
            //    return value +'-'+ a + '元'; // 范围标签显示内容。value +'-'+ a + '元' that.between.unit
            // }
        },
          series: [
            {
              name: '销售趋势', // 浮动框的标题
              type: 'map',
              coordinateSystem: 'geo', // 对应上方配置
              geoIndex: 0,
              label: {
                    show: true,
                    normal: {  
                          textStyle: {
                            fontSize: 12,
                          }
                        }
                },
              data: this.list || OptionChinaMap
            }
          ]
        }
        return opinion
      },
      initMap() {
        this.list = this.chinaData.list
        // this.between = this.chinaData.between
        this.unitConversion(this.chinaData.realBetween)

        
        this.myChart = this.$echarts.init(this.$refs.chinaMap)
        const option = this.getMapOpt()
        this.myChart.setOption(option)
        window.onresize = () => {
          this.myChart.resize()
        }
        this.clickMap()
      },
      clickMap(){
          this.myChart.on('click', (param) => {
            // event.stopPropagation()// 阻止冒泡
            const pinyin = provinces[param.name]
            if (!pinyin) {
              this.initMap()
              return
            }

            const data = require(`../../assets/province/${pinyin}.json`)

            saleMap({province_id:param.data.id}).then((res) => {
              if (res.code == 1) {
                this.list = res.data.list
                this.unitConversion(res.data.realBetween)
                this.$echarts.registerMap(pinyin, data)
                const option = this.getMapOpt(pinyin)
                this.myChart.setOption(option)
              }
            })

              
          })
      },
      // 单位转换
      unitConversion(arr){
        let narr = []
        let minnum = arr[0][1]
        
        arr.map((item,i)=>{
          let pieces = {
              min:item[0],
              max:item[1],
              label:''
            }
          if(minnum > 1000000000){
              pieces.min = item[0]
              pieces.max = item[1]
              pieces.label = item[0]/1000000000 + '-' + item[1]/1000000000 +'亿'
          }else if(minnum> 100000000){
              pieces.min = item[0]
              pieces.max = item[1]
              pieces.label = item[0]/100000000 + '-' + item[1]/100000000 +'千万'
          }else if(minnum > 10000000){
              pieces.min = item[0]
              pieces.max = item[1]
              pieces.label = item[0]/10000000 + '-' + item[1]/10000000 +'百万'
          }else if(minnum > 10000){
              pieces.min = item[0]
              pieces.max = item[1]
              pieces.label = item[0]/10000 + '-' + item[1]/10000 +'万'
          }else if(minnum > 1000){
              pieces.min = item[0]
              pieces.max = item[1]
              pieces.label = item[0]/1000 + '-' + item[1]/1000 +'千'
          }else if(minnum > 100){
              pieces.min = item[0]
              pieces.max = item[1]
              pieces.label = item[0]/100 + '-' + item[1]/100 +'百'
          }else{
            pieces.min = item[0]
            pieces.max = item[1]
            pieces.label = item[0] + '-' + item[1]+'元'
          }
              narr.push(pieces)
        })
        console.log('narrnarr',narr)
        this.between = narr
      }

    },
    watch: { // 监听到数据然后赋值
      chinaData(newV, oldV) {
        if(newV && newV != oldV){
          this.initMap()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .mapColumn {
    width: 100%;
    height: 100%;
  }
</style>
