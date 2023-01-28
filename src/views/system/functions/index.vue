<template>
  <a-card :bordered="false">
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="refreshTable()" type="default" icon="reload" :loading="loading">刷新</a-button>
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        row-key="id"
        :columns="columns"
        size="middle"
        :pagination="false"
        :dataSource="dataSource"
        :loading="loading"
      >
        <template slot="type" slot-scope="text, record">
          <a-tag color="blue" v-if="record.type === 'D'">目录</a-tag>
          <a-tag color="cyan" v-if="record.type === 'M'">菜单</a-tag>
          <a-tag color="purple" v-if="record.type === 'B'">按钮</a-tag>
        </template>

        <template slot="icon" slot-scope="text, record">
          <a-icon :type="record.icon" v-if="record.icon" /> {{ record.icon }}
        </template>

        <template slot="expression" slot-scope="text, record">
          <template v-if="!record.expression">- -</template>
          <template v-else>
            <a-tag color="purple">{{ record.expression }}</a-tag>
          </template>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <permission-modal ref="modalForm" @ok="refreshTable"></permission-modal>
  </a-card>
</template>

<script>
import PermissionModal from './FunctionsModal'
import { listFunctions, deleteFunction } from '@/api/system/function'
import '@/assets/less/common.css'

const columns = [
  {
    title: '功能名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '功能类型',
    dataIndex: 'type',
    key: 'type',
    scopedSlots: { customRender: 'type' },
  },
  {
    title: 'icon',
    dataIndex: 'icon',
    key: 'icon',
    scopedSlots: { customRender: 'icon' },
  },
  {
    title: '权限标识',
    dataIndex: 'expression',
    key: 'expression',
    scopedSlots: { customRender: 'expression' },
  },
  {
    title: '组件名称',
    dataIndex: 'componentName',
    key: 'componentName',
    scopedSlots: { customRender: 'componentName' },
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
    scopedSlots: { customRender: 'path' },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
  },
  {
    title: '显示',
    dataIndex: 'visible',
    key: 'visible',
    customRender: function (text) {
      if (text) {
        return '显示'
      } else {
        return '隐藏'
      }
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
    width: 150,
  },
]

export default {
  name: 'PermissionList',
  components: {
    PermissionModal,
  },
  data() {
    return {
      loading: false,
      // 表头
      dataSource: [],
      columns: columns,
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.dataSource = []
      listFunctions().then((res) => {
        if (res.code == 200) {
          // this.dataSource = res.data
          let dataSource = []
          this.listToTree(res.data,dataSource,0)
          // this.dataSource =dataSource
          this.dataSource = dataSource
          // debugger
        }
      })
    },
    listToTree(list, tree, parentId){
        list.forEach(item => {
            if (item.parentId === parentId) {
                var child = {
                  ...item,
                  children:[]
                }
                this.listToTree(list, child.children, item.id)
                if (child.children.length === 0) {
                    delete child.children
                }
                tree.push(child)
            }
        })
    },
    refreshTable() {
      this.loading = true
      this.loadData()
      this.loading = false
    },
    handleAdd() {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
    },
    handleDelete(id) {
      var that = this
      deleteFunction(id).then((res) => {
        if (res.code == 200) {
          that.refreshTable()
          that.$message.success('成功')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleDetail: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '详情'
      this.$refs.modalForm.disableSubmit = true
    },
    handleEdit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
    },
  },
}
</script>
