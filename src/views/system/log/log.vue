<!--  -->
<template>
  <a-card>
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="模块名">
              <a-input placeholder="请输入模块名" v-model="queryParam.title"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="操作者">
              <a-input placeholder="请输入操作者" v-model="queryParam.operator"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="操作类型">
              <a-select @change="changType" placeholder="请选择类型" v-model="queryParam.type">
                <a-select-option value="">全部 </a-select-option>
                <a-select-option value="1">增加 </a-select-option>
                <a-select-option value="3">删除</a-select-option>
                <a-select-option value="2">修改</a-select-option>
                <a-select-option value="4">授权</a-select-option>
                <a-select-option value="5">导出</a-select-option>
                <a-select-option value="6">导入</a-select-option>
                <a-select-option value="7">强退</a-select-option>
                <a-select-option value="0">其它</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)" icon="search">查询</a-button>
              <a-button type="primary" @click="()=>{queryParam ={};$refs.table.refresh(true)}" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table ref="table" size="middle" bordered rowKey="id" :columns="columns" :data="loadData" :loading="loading">
      <span slot="type" slot-scope="type">
        <a-tag :color="statusType(type,'color')">
          {{statusType(type,'name')}}
        </a-tag>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getLog } from '@/api/system/function'
export default {
  data() {
    return {
      list: [],
      loadData: (parameter) => {
        return getLog(Object.assign(parameter, this.queryParam))
      },
      loading: false,
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        {
          title: '操作者',
          align: 'center',
          dataIndex: 'operator',
        },
        {
          title: '操作者IP',
          align: 'center',
          dataIndex: 'reqIp',
        },
        {
          title: '	模块名',
          align: 'center',
          dataIndex: 'title',
        },
         {
          title: '请求Url',
          align: 'center',
          dataIndex: 'reqUrl',
        },
        {
          title: '	操作类型',
          align: 'center',
          dataIndex: 'type',
           scopedSlots: { customRender: 'type' },
        },
      ],
      queryParam: {},
    }
  },

  components: { STable },

  computed: {},

  // mounted: {},

  methods: {
    changType(e){
        this.queryParam.type =e
        this.$refs.table.refresh(true)
    },
    handleDelete() {},
    statusType(id,status){
      switch (id) {
        case 0:
            if(status =='name'){return '其它'}
            if(status =='color'){return ''}
          break;
        case 1:
            if(status =='name'){return '新增'}
            if(status =='color'){return 'green'}
          break;
        case 2:
            if(status =='name'){return '修改'}
            if(status =='color'){return 'geekblue'}
          break;
        case 3:
            if(status =='name'){return '删除'}
            if(status =='color'){return 'volcano'}
          break;
        case 4:
            if(status =='name'){return '授权'}
            if(status =='color'){return 'purple'}
          break;
        case 5:
            if(status =='name'){return '导出'}
            if(status =='color'){return 'pink'}
          break;
        case 6:
            if(status =='name'){return '导入'}
            if(status =='color'){return 'cyan'}
          break;
        case 7:
            if(status =='name'){return '强退'}
            if(status =='color'){return 'red'}
          break;
      
        default:
          break;
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>