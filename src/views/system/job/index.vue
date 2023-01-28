<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="职务编码">
              <a-input placeholder="请输入职务编码" v-model="queryParam.code"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="职务名称">
              <a-input placeholder="请输入职务名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)" icon="search">查询</a-button>
              <a-button type="primary" @click="() => (queryParam = {})" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div> -->

      <s-table ref="table" size="middle" bordered rowKey="id" :columns="columns" :data="loadData" :loading="loading">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </s-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <job-modal ref="modalForm" @ok="modalFormOk"></job-modal>
  </a-card>
</template>

<script>
import Vue from 'vue'
import JobModal from './JobModal'
import { STable } from '@/components'
import '@/assets/less/common.css'
import { listJob, delJob } from '@/api/system/profession'

export default {
  name: 'SysPositionList',
  components: {
    JobModal,
    STable,
  },
  data() {
    return {
      queryParam: {},
      loading: false,
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        return listJob(Object.assign(parameter, this.queryParam))
      },
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
          title: '职务编码',
          align: 'center',
          dataIndex: 'code',
        },
        {
          title: '职务名称',
          align: 'center',
          dataIndex: 'name',
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'remark',
        },
        {
          title: '创建时间',
          align: 'center',
          width: 150,
          dataIndex: 'createTime',
        },
        {
          title: '创建人',
          align: 'center',
          width: 100,
          dataIndex: 'createBy',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  methods: {
    modalFormOk() {
      this.$refs.table.refresh()
    },
    handleEdit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
    },
    handleAdd: function () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
    },
    handleDelete(id) {
      delJob(id).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('操作成功')
          this.$refs.table.refresh()
        } else {
          this.$message.warn(resp.message)
        }
      })
    },
  },
}
</script>
