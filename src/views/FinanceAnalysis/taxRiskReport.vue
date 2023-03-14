<template>
  <div>
    <h2 style="font-weight: 700;">某某公司2023年：税务风险分析报告：</h2>



    <taxRiskReport />


    <h3 style="font-weight: 700;">二、企业税务风险比照表：</h3>







    <a-table :data-source="data" :columns="columns" bordered :pagination="false">

    </a-table>








    <!-- <a-table :data-source="data1" :columns="columns1" bordered :pagination="false">

    </a-table> -->

    <!-- <a-table :data-source="data2" :columns="columns2" bordered :pagination="false">

    </a-table> -->

    <h3 style="font-weight: 700;">三、企业税务风险说明：</h3>

    <a-table :data-source="data3" :columns="columns3" bordered>

    </a-table>

  </div>
</template>

<script>
import taxRiskReport from './components/taxRiskReport.vue'
import { getTaxRiskReport } from '@/api/taxRiskReport'

export default {
  components: { taxRiskReport },

  data() {
    return {
      columns: [


        {
          title: '风险等级',

          dataIndex: 'title',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 6;
            }

            // These two are merged into above cell
            if (index === 1) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 2) {
              obj.attrs.colSpan = 0;
            }
            if (index === 3) {
              obj.attrs.colSpan = 0;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            if (index === 5) {
              obj.attrs.colSpan = 0;
            }
            if (index === 6) {
              obj.attrs.rowSpan = 6;
            }
            if (index === 7) {
              obj.attrs.colSpan = 0;
            }
            if (index === 8) {
              obj.attrs.colSpan = 0;
            }
            if (index === 9) {
              obj.attrs.colSpan = 0;
            }
            if (index === 10) {
              obj.attrs.colSpan = 0;
            }
            if (index === 11) {
              obj.attrs.colSpan = 0;
            }
            if (index === 12) {
              obj.attrs.rowSpan = 12;
            }
            if (index === 13) {
              obj.attrs.colSpan = 0;
            }
            if (index === 14) {
              obj.attrs.colSpan = 0;
            }
            if (index === 15) {
              obj.attrs.colSpan = 0;
            }
            if (index === 16) {
              obj.attrs.colSpan = 0;
            }
            if (index === 17) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          },
        },
        {
          title: '风险类型',
          dataIndex: 'name',
          // rowSpan: 6,
        },
        {
          title: '税务风险指标',
          dataIndex: 'taxrisk',

        },
        {
          title: '企业风险指标',
          dataIndex: 'incometax',

        },

        {
          title: '增值税',

          dataIndex: 'incometax1',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 6;
            }

            // These two are merged into above cell
            if (index === 1) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 2) {
              obj.attrs.colSpan = 0;
            }
            if (index === 3) {
              obj.attrs.colSpan = 0;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            if (index === 5) {
              obj.attrs.colSpan = 0;
            }
            if (index === 6) {
              obj.attrs.rowSpan = 6;
            }
            if (index === 7) {
              obj.attrs.colSpan = 0;
            }
            if (index === 8) {
              obj.attrs.colSpan = 0;
            }
            if (index === 9) {
              obj.attrs.colSpan = 0;
            }
            if (index === 10) {
              obj.attrs.colSpan = 0;
            }
            if (index === 11) {
              obj.attrs.colSpan = 0;
            }
            if (index === 12) {
              obj.attrs.rowSpan = 12;
            }
            if (index === 13) {
              obj.attrs.colSpan = 0;
            }
            if (index === 14) {
              obj.attrs.colSpan = 0;
            }
            if (index === 15) {
              obj.attrs.colSpan = 0;
            }
            if (index === 16) {
              obj.attrs.colSpan = 0;
            }
            if (index === 17) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          },
        },
        {
          title: '所得税',

          dataIndex: 'taxrisk1',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 6;
            }

            // These two are merged into above cell
            if (index === 1) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 2) {
              obj.attrs.colSpan = 0;
            }
            if (index === 3) {
              obj.attrs.colSpan = 0;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            if (index === 5) {
              obj.attrs.colSpan = 0;
            }
            if (index === 6) {
              obj.attrs.rowSpan = 6;
            }
            if (index === 7) {
              obj.attrs.colSpan = 0;
            }
            if (index === 8) {
              obj.attrs.colSpan = 0;
            }
            if (index === 9) {
              obj.attrs.colSpan = 0;
            }
            if (index === 10) {
              obj.attrs.colSpan = 0;
            }
            if (index === 11) {
              obj.attrs.colSpan = 0;
            }
            if (index === 12) {
              obj.attrs.rowSpan = 12;
            }
            if (index === 13) {
              obj.attrs.colSpan = 0;
            }
            if (index === 14) {
              obj.attrs.colSpan = 0;
            }
            if (index === 15) {
              obj.attrs.colSpan = 0;
            }
            if (index === 16) {
              obj.attrs.colSpan = 0;
            }
            if (index === 17) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          },
        },

        // {
        //   title: '所得税',

        //   dataIndex: 'incometax1',
        //   customRender: (value, row, index) => {
        //     const obj = {
        //       children: value,
        //       attrs: {},
        //     };
        //     if (index === 0) {
        //       obj.attrs.rowSpan = 6;
        //     }
        //     // These two are merged into above cell
        //     if (index === 1) {
        //       obj.attrs.rowSpan = 0;
        //     }
        //     if (index === 2) {
        //       obj.attrs.colSpan = 0;
        //     }
        //     if (index === 3) {
        //       obj.attrs.colSpan = 0;
        //     }
        //     if (index === 4) {
        //       obj.attrs.colSpan = 0;
        //     }
        //     if (index === 5) {
        //       obj.attrs.colSpan = 0;
        //     }
        //     return obj;
        //   },
        // },


      ],
      columns1: [


        {
          title: '风险等级',

          dataIndex: 'title',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 6;
            }
            // These two are merged into above cell
            if (index === 1) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 2) {
              obj.attrs.colSpan = 0;
            }
            if (index === 3) {
              obj.attrs.colSpan = 0;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            if (index === 5) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          },
        },
        {
          title: '风险类型',
          dataIndex: 'name',
          // rowSpan: 6,
        },
        {
          title: '税务风险指标',
          dataIndex: 'taxrisk',

        },
        {
          title: '企业风险指标',
          dataIndex: 'incometax',

        },

        {
          title: '增值税',

          dataIndex: 'taxrisk1',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 6;
            }
            // These two are merged into above cell
            if (index === 1) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 2) {
              obj.attrs.colSpan = 0;
            }
            if (index === 3) {
              obj.attrs.colSpan = 0;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            if (index === 5) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          },
        },

        {
          title: '所得税',

          dataIndex: 'incometax1',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 6;
            }
            // These two are merged into above cell
            if (index === 1) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 2) {
              obj.attrs.colSpan = 0;
            }
            if (index === 3) {
              obj.attrs.colSpan = 0;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            if (index === 5) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          },
        },


      ],
      columns2: [


        {
          title: '风险等级',

          dataIndex: 'title',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 6;
            }
            // These two are merged into above cell
            if (index === 1) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 2) {
              obj.attrs.colSpan = 0;
            }
            if (index === 3) {
              obj.attrs.colSpan = 0;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            if (index === 5) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          },
        },
        {
          title: '风险类型',
          dataIndex: 'name',
          // rowSpan: 6,
        },
        {
          title: '税务风险指标',
          dataIndex: 'taxrisk',

        },
        {
          title: '企业风险指标',
          dataIndex: 'incometax',

        },

        {
          title: '增值税',

          dataIndex: 'taxrisk1',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 6;
            }
            // These two are merged into above cell
            if (index === 1) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 2) {
              obj.attrs.colSpan = 0;
            }
            if (index === 3) {
              obj.attrs.colSpan = 0;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            if (index === 5) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          },
        },

        {
          title: '所得税',

          dataIndex: 'incometax1',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 6;
            }
            // These two are merged into above cell
            if (index === 1) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 2) {
              obj.attrs.colSpan = 0;
            }
            if (index === 3) {
              obj.attrs.colSpan = 0;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            if (index === 5) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          },
        },
        // {
        //   title: '增值税',
        //   dataIndex: 'incometax',

        // },
        // {
        //   title: '所得税',
        //   dataIndex: 'taxrisk'

        // },

      ],




      columns3: [

        {
          title: '异常指标名称',
          dataIndex: 'name',
        },
        {
          title: '风险程度',
          dataIndex: 'level',
        },
        {
          title: '企业出现税务风险说明',
          dataIndex: 'explain',
        },
        {
          title: '指标类型',
          dataIndex: 'classify',
        },
        {
          title: '归属税种',
          dataIndex: 'taxes',
        },
      ],
      // data1: [],
      // data2: [],
      data3: [],
      data: [
        {
          key: '1',
          title: '高风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '2',
          title: '高风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '3',
          title: '高风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '4',
          title: '高风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '5',
          title: '高风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '6',
          title: '高风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },

        {
          key: '1',
          title: '中风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '2',
          title: '中风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '3',
          title: '中风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '4',
          title: '中风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '5',
          title: '中风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '6',
          title: '中风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '1',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '2',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '3',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '4',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '5',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '6',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },

      ],
      data1: [
        {
          key: '1',
          title: '中风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '2',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '3',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '4',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '5',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '6',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },

        {
          key: '7',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '8',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '9',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '10',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '11',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '12',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },

      ],
      data2: [
        {
          key: '1',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '2',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '3',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '4',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '5',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },
        {
          key: '6',
          title: '低风险',
          name: '3',
          taxrisk: '2',
          incometax: '0',
          taxrisk1: '1',
          incometax1: '3',
        },

      ],
    }
  },
  methods: {
    async getTaxRiskReport() {
      let res = await getTaxRiskReport()
      console.log(97, res);
      let height = res.data.list.risktable[0].height

      // let center = res.data.list.risktable[1].center

      // let low = res.data.list.risktable[2].low

      let riskdescription = res.data.list.riskdescription
      // console.log("height", height);
      // this.data = height
      // this.data1 = center
      // this.data2 = low
      console.log("riskdescription", riskdescription);
      this.data3 = riskdescription


    }
  },
  created() {
    this.getTaxRiskReport()
  },

}
</script>

<!-- <style lang="less" scoped>
/deep/.ant-table-placeholder {
  border-right: 1px solid #e8e8e8;
  border-left: 1px solid #e8e8e8;
  display: none;
}
</style> -->