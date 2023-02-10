<template>
  <div>

    <a-table :columns="columns" :data-source="data" :pagination="true">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <template #title><span style="font-size: 18px; font-weight: 700;">收入成本费用表{{ text }}</span></template>
    </a-table>

    <a-row>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>
        <echartPie1 />
      </a-col>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>
        <echartPie2 />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>
        <echartPie3 />
      </a-col>
      <a-col :span="12">
        <span style="visibility: hidden;">col-12</span>
        <echartPie4 />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <span style="visibility: hidden;">col-12</span>
        <echartPie5 />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import echartPie1 from './components/echartPie1.vue';
import echartPie2 from './components/echartPie2.vue';
import echartPie3 from './components/echartPie3.vue';
import echartPie4 from './components/echartPie4.vue';
import echartPie5 from './components/echartPie5.vue';

export default {
  components: { echartPie1, echartPie2, echartPie3, echartPie4, echartPie5 },
  // mounted() {
  //   var app = {};

  //   var chartDom = document.getElementById('main');
  //   var myChart = echarts.init(chartDom);
  //   var option;

  //   var chartDom = document.getElementById('main');
  //   var myChart = echarts.init(chartDom);
  //   var option;

  //   const posList = [
  //     'left',
  //     'right',
  //     'top',
  //     'bottom',
  //     'inside',
  //     'insideTop',
  //     'insideLeft',
  //     'insideRight',
  //     'insideBottom',
  //     'insideTopLeft',
  //     'insideTopRight',
  //     'insideBottomLeft',
  //     'insideBottomRight'
  //   ];
  //   app.configParameters = {
  //     align: {
  //       options: {
  //         left: 'left',
  //         center: 'center',
  //         right: 'right'
  //       }
  //     },
  //     verticalAlign: {
  //       options: {
  //         top: 'top',
  //         middle: 'middle',
  //         bottom: 'bottom'
  //       }
  //     },
  //     position: {
  //       options: posList.reduce(function (map, pos) {
  //         map[pos] = pos;
  //         return map;
  //       }, {})
  //     },
  //     distance: {
  //       min: 0,
  //       max: 100
  //     }
  //   };
  //   app.config = {
  //     rotate: 90,
  //     align: 'left',
  //     verticalAlign: 'middle',
  //     position: 'insideBottom',
  //     distance: 15,
  //     onChange: function () {
  //       const labelOption = {
  //         rotate: app.config.rotate,
  //         align: app.config.align,
  //         verticalAlign: app.config.verticalAlign,
  //         position: app.config.position,
  //         distance: app.config.distance
  //       };
  //       myChart.setOption({
  //         series: [
  //           {
  //             label: labelOption
  //           },
  //           {
  //             label: labelOption
  //           },
  //           {
  //             label: labelOption
  //           },
  //           {
  //             label: labelOption
  //           }
  //         ]
  //       });
  //     }
  //   };
  //   const labelOption = {
  //     show: false,
  //     position: app.config.position,
  //     distance: app.config.distance,
  //     align: app.config.align,
  //     verticalAlign: app.config.verticalAlign,
  //     rotate: app.config.rotate,
  //     formatter: '{c}  {name|{a}}',
  //     fontSize: 16,
  //     rich: {
  //       name: {}
  //     }
  //   };
  //   option = {
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'shadow'
  //       }
  //     },
  //     legend: {
  //       data: ['Forest', 'Steppe', 'Desert', 'Wetland']
  //     },
  //     toolbox: {
  //       show: false,
  //       orient: 'vertical',
  //       left: 'right',
  //       top: 'center',
  //       feature: {
  //         mark: { show: true },
  //         dataView: { show: true, readOnly: false },
  //         magicType: { show: true, type: ['line', 'bar', 'stack'] },
  //         restore: { show: true },
  //         saveAsImage: { show: true }
  //       }
  //     },
  //     xAxis: [
  //       {
  //         type: 'category',
  //         axisTick: { show: false },
  //         data: ['1月', '2月', '3月', '4月', '5月', '6月']
  //       }
  //     ],
  //     yAxis: [
  //       {
  //         type: 'value'
  //       }
  //     ],
  //     series: [
  //       {
  //         name: '实际',
  //         type: 'bar',
  //         barGap: 0,
  //         label: labelOption,
  //         emphasis: {
  //           focus: 'series'
  //         },
  //         data: [320, 332, 301, 334, 390, 5000]
  //       },
  //       {
  //         name: '预算',
  //         type: 'bar',
  //         label: labelOption,
  //         emphasis: {
  //           focus: 'series'
  //         },
  //         data: [220, 182, 191, 234, 290, 43]
  //       },
  //       {
  //         name: '去年同期',
  //         type: 'bar',
  //         label: labelOption,
  //         emphasis: {
  //           focus: 'series'
  //         },
  //         data: [150, 232, 201, 154, 190, 321]
  //       }
  //     ]
  //   };

  //   option && myChart.setOption(option);

  // },
}
</script>
<style lang="less" scoped>
#main {
  width: 700px;
  height: 400px;

}
</style>