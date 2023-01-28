// 柱状图默认瀑布流
export function OptionFlow() {
  return {
          legendData:['支出', '收入'],
          xAxisData:['7月21日','7月22日','7月23日'],
          yAxis:{type: 'value'},
          series: [
            {
                name: '辅助',
                type: 'bar',
                stack: '收',
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                data: [0, 860, 1005]
            },
            {
                name: '收入',
                type: 'bar',
                stack: '收',
                label: {
                    show: true,
                    position: 'top'
                },
                data: [900,345, 100]
            },
            {
                name: '辅助',
                type: 'bar',
                stack: '支',
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                data: [860,1005, 605]
            },
            {
                name: '支出',
                type: 'bar',
                stack: '支',
                label: {
                    show: true,
                    position: 'bottom'
                },
                data: [40, 200,500]
            }
          ]
  }
}
// 饼图默认
export function OptionCircle() {
  return {
    emphasis:{
      label:{
      }
    },
    radius: ['0', '70%'],
    label: {
          position: 'inner',
          fontSize: 14,
    },
    data:[
      {value: 1048, name: 'A'},
      {value: 735, name: 'B'},
    ]
  }
}
// 地图默认
export function OptionChinaMap() {
  return [
    {
      'name': '北京',
      'value': 599
    }, {
      'name': '上海',
      'value': 142
    }, {
      'name': '黑龙江',
      'value': 44
    }, {
      'name': '深圳',
      'value': 92
    }, {
      'name': '湖北',
      'value': 810
    }, {
      'name': '四川',
      'value': 453
    }
  ]
}

// 饼图
export function getPieOption(data,hollow=true) {
  // hollow 是否圆环
  return {
    emphasis: {
      label: hollow?{
        show: true,
        fontSize: '14',
        fontWeight: 'bold'
      }:{}
    },
    radius: hollow?['40%', '80%']:['0%','95%'],
    label: {
      show: false,
      position: 'center'
    },
    data
  }
}

export function OptionColumn() {
  return {
    legendData:['税前销售额', '成本金额', '销售费用'],
    xAxisData:['事业一部', '事业二部', '事业三部', '事业四部', '事业五部', '事业六部', '事业七部', '事业八部'],
    yAxis: [
              {
                type: 'value',
                name: '测试数据（元）',
                max: 180, //y轴刻度固定
                min: 0,
                interval: 30, //倍数
                axisLabel: {
                  formatter: '{value} .00'
              }
            }
          ],
    series: [
      {
        name: '税前销售额',
        type: 'bar',
        barMinWidth:5,
        barMaxWidth:20,
        stack: '广告',
        // emphasis: { //悬停显示高亮
        //   focus: 'series'
        // },
        data: [20, 32, 10, 34, 90, 30, 70, 90]
      },
      {
        name: '成本金额',
        type: 'bar',
        barMinWidth:5,
        barMaxWidth:20,
        stack: '广告',
        data: [20, 32, 10, 34, 90, 30, 50, 90]
      },
      {
        name: '销售费用',
        type: 'line',
        smooth: true, //折线曲线
        color:'#bdd3ff',
        data: [20, 32, 10, 34, 90, 30, 160, 90],
      }
  ]
  }
}

// 表格
export function OptionTable() {
  return {
    header: ["排名", "客户名", "测试数据", "发票销售额", "出库销售额"],
    list: [
      {id: 1, name: "甲公司", saleOrderMoney: 200, saleInvoiceMoney: 200, saleShipmentMoney: 90},
      {id: 2, name: "乙公司", saleOrderMoney: 250, saleInvoiceMoney: 250, saleShipmentMoney: 40},
      {id: 3, name: "戊公司", saleOrderMoney: 100, saleInvoiceMoney: 100, saleShipmentMoney: 20},
      {id: 4, name: "己公司", saleOrderMoney: 150, saleInvoiceMoney: 150, saleShipmentMoney: 10},
      {id: 5, name: "丁公司", saleOrderMoney: 50, saleInvoiceMoney: 50, saleShipmentMoney: 10},
    ]
  }
}