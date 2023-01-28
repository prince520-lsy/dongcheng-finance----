<template>
  <a-card :bordered="false" class="card-area">
    <div>
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <div>
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item label="角色名称" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                <a-input v-model="queryParams.name" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建时间" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                <range-date @change="handleDateChange" ref="createTime"></range-date>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset">重置</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </div>
    <div>
      <div class="table-operator">
        <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      </div>
      
      <!-- 表格区域 -->
      <s-table ref="table" size="middle" :rowKey="(record) => record.id" :columns="columns" :data="loadData" :loading="loading">
        <template slot="remark" slot-scope="text">
          <a-popover placement="topLeft">
            <template slot="content">
              <div style="max-width: 200px">{{ text }}</div>
            </template>
            <p style="width: 200px; margin-bottom: 0">{{ text }}</p>
          </a-popover>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="view(record)">查看</a>
          <a-divider type="vertical" />
          <a-dropdown>
          <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
          <a-menu slot="overlay">
              <a-menu-item>
              <a-popconfirm title="确定删除吗?" @confirm="() => remove(record)">
                  <a>删除</a>
              </a-popconfirm>
              </a-menu-item>
          </a-menu>
          </a-dropdown>
        </template>
      </s-table>

      <!-- 角色信息查看 -->
      <role-info @close="handleRoleInfoClose" :roleInfoVisiable="roleInfo.visiable" :roleInfoData="roleInfo.data">
      </role-info>
      <!-- 修改角色 -->
      <role-edit
        ref="roleEdit"
        @ok="modalFormOk"
      >
      </role-edit>
      
    </div>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import RangeDate from '@/components/datetime/RangeDate'
import RoleInfo from './RoleInfo'
import RoleEdit from './editRole'
import { mapState } from 'vuex'
import { getRoleList, removeRole } from '@/api/system/role'
import { functionTree } from '@/api/system/function'
import {  listFunctions } from '@/api/system/function'
export default {
  name: 'Role',
  components: { STable, RoleEdit, RangeDate, RoleInfo },
  data() {
    return {
      loadData: (parameter) => {
        return getRoleList(Object.assign(parameter, this.queryParams))
      },
      roleIds:[],
      roleInfo: {
        visiable: false,
        data: {},
      },
      roleAdd: {
        visiable: false,
      },
      roleEdit: {
        visiable: false,
      },
      queryParams: {
        createTimeFrom: '',
        createTimeTo: '',
      },
      loading: false,
      columns: [
        {
          title: '角色名称',
          dataIndex: 'name',
        },
        {
          title: '唯一编码',
          dataIndex: 'code',
        },
        {
          title: '描述',
          dataIndex: 'remark',
          scopedSlots: { customRender: 'remark' },
          width: 350,
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
        },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  created() {
    this.getfunctionTree()
  },
  mounted() {
    this.fetch()
  },
  methods: {
    modalFormOk() {
      this.fetch()
    },
    handleAdd: function () {
      this.$refs.roleEdit.add(this.roleIds)
      this.$refs.roleEdit.title = '新增'
    },
    handleEdit: function (record) {
      record.roleIds = this.roleIds
      this.$refs.roleEdit.edit(record)
      this.$refs.roleEdit.title = '编辑'
    },
    
    getfunctionTree(){
      // 转成多选树需要的格式
      listFunctions().then((res) => {
          let newdata = []
          // res.data.map(a=> {
          //     let children =[]
          //     a.children && a.children.map(b=> {
          //       let bchildren =[]
          //       let bdata = {value:b.key,label:b.title,children:bchildren}
          //       children.push(bdata)
          //     })
          //     let adata = {value:a.key,label:a.title,children}
          //     newdata.push(adata)
          // })
         let dataSource = []
          // that.listToTree(res.data, dataSource, 0)
          function listToTree2(arr){
            arr.forEach(item=>{
               var child = {
                    ...item,
                  label:item.title,
                  key:item.id,
                  value:item.id,
                }
                if(child.children&&child.children.length){
                  listToTree2(child.children)
                  delete child.children
                }
                dataSource.push(child)
            })
          }
          listToTree2(res.data)
          let tree =[]
          this.listToTree(dataSource,tree,0)
          this.roleIds = tree
      })
    },
     listToTree(list, tree, parentId) {
      list.forEach((item) => {
        if (item.parentId === parentId) {
          var child = {
            title:item.name,
            key:item.id,
            value:item.id,
            children:[],
          }
          this.listToTree(list, child.children, item.id)
          if (child.children.length === 0) {
            delete child.children
          }
          tree.push(child)
        }
      })
    },
    remove(record) {
      removeRole(record.id).then((r) => {
        if (r.code === 200) {
          this.$message.info('删除成功')
          this.fetch()
        }
      })
    },
    view(record) {
      this.roleInfo.data = record
      this.roleInfo.visiable = true
    },
    handleRoleInfoClose() {
      this.roleInfo.visiable = false
    },
    edit(record) {
      this.$refs.roleEdit.setFormValues(record)
      this.roleInfo.data = record
      this.roleEdit.visiable = true
    },
    handleDateChange(value) {
      if (value) {
        this.queryParams.createTimeFrom = value[0]
        this.queryParams.createTimeTo = value[1]
      }
    },
    reset() {
      // 重置查询参数
      this.queryParams = {}
      // 清空时间选择
      this.$refs.createTime.reset()
      this.fetch()
    },
    fetch() {
      this.$refs.table.refresh(true)
    },
  },
}
</script>
